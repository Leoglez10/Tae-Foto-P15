#!/usr/bin/env bash
set -euo pipefail

usage() {
  echo "usage: $0 <X.Y.Z>" >&2
}

if [[ $# -ne 1 ]]; then
  usage
  exit 2
fi

new_version="$1"
if [[ ! "$new_version" =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
  echo "Invalid version: $new_version" >&2
  usage
  exit 2
fi

TAURI_CONF="src-tauri/tauri.conf.json"
PACKAGE_JSON="package.json"
CARGO_TOML="src-tauri/Cargo.toml"
TRACKED_VERSION_FILES=("$TAURI_CONF" "$PACKAGE_JSON" "$CARGO_TOML")

# Reemplaza SOLO el valor de la clave "version" de nivel superior, sin tocar el resto
# del archivo. Antes esto usaba jq, que re-serializa el JSON entero con su propio
# estilo: expandia los arrays en linea del tauri.conf.json y metia ruido en el diff
# de cada release.
write_json_version() {
  local file="$1"
  local version="$2"
  python3 - "$file" "$version" <<'PY'
from pathlib import Path
import json
import re
import sys

path = Path(sys.argv[1])
new_version = sys.argv[2]
# newline="" para leer los saltos de linea tal cual: con la traduccion por defecto,
# un archivo con CRLF se convertiria a LF sin que nadie lo pida.
with open(path, encoding="utf-8", newline="") as handle:
    text = handle.read()


def net_depth(line):
    """Llaves y corchetes de la linea, ignorando los que van dentro de un string."""
    depth = 0
    in_string = False
    escaped = False
    for char in line:
        if in_string:
            if escaped:
                escaped = False
            elif char == "\\":
                escaped = True
            elif char == '"':
                in_string = False
        elif char == '"':
            in_string = True
        elif char in "{[":
            depth += 1
        elif char in "}]":
            depth -= 1
    return depth


pattern = re.compile(r'^(\s*"version"\s*:\s*)"[^"]*"(.*)$')
lines = text.split("\n")
depth = 0
for index, line in enumerate(lines):
    # La clave de nivel superior vive a profundidad 1: la abre el `{` del inicio.
    if depth == 1:
        match = pattern.match(line)
        if match:
            lines[index] = f'{match.group(1)}"{new_version}"{match.group(2)}'
            break
    depth += net_depth(line)
else:
    raise SystemExit(f'no se encontro la clave "version" de nivel superior en {path}')

updated = "\n".join(lines)

# Lo de arriba toca una sola linea. Esto lo comprueba en vez de confiar: el JSON
# tiene que seguir siendo valido y no puede haber cambiado nada mas que la version.
before = json.loads(text)
after = json.loads(updated)
before["version"] = new_version
if before != after:
    raise SystemExit(f"el bump cambio algo mas que la version en {path}")

path.write_text(updated, encoding="utf-8", newline="")
PY
}

write_cargo_toml_version() {
  local file="$1"
  local version="$2"
  python3 - "$file" "$version" <<'PY'
from pathlib import Path
import re
import sys

path = Path(sys.argv[1])
version = sys.argv[2]
text = path.read_text(encoding="utf-8")

match = re.search(r'(?ms)^\[package\]\n(?P<body>.*?)(?=^\[|\Z)', text)
if not match:
    raise SystemExit("missing [package] section")

body = re.sub(r'(?m)^version\s*=\s*"[^"]*"', f'version = "{version}"', match.group('body'), count=1)
updated = text[:match.start('body')] + body + text[match.end('body'):]
path.write_text(updated, encoding="utf-8", newline="")
PY
}

cargo_package_name() {
  python3 - "$CARGO_TOML" <<'PY'
from pathlib import Path
import re
import sys
text = Path(sys.argv[1]).read_text(encoding="utf-8")
match = re.search(r'(?ms)^\[package\]\n(?P<body>.*?)(?=^\[|\Z)', text)
if not match:
    raise SystemExit(0)
name = re.search(r'(?m)^name\s*=\s*"([^"]+)"', match.group('body'))
if name:
    print(name.group(1))
PY
}

update_cargo_lock_best_effort() {
  local lock_file="src-tauri/Cargo.lock"
  local crate_name="$1"
  local version="$2"

  if [[ ! -f "$lock_file" ]] || [[ -z "$crate_name" ]]; then
    return 0
  fi

  python3 - "$lock_file" "$crate_name" "$version" <<'PY' || true
from pathlib import Path
import re
import sys

path = Path(sys.argv[1])
crate_name = sys.argv[2]
version = sys.argv[3]
text = path.read_text(encoding="utf-8")

pattern = re.compile(r'(?ms)(^\[\[package\]\]\n(?:(?!^\[\[package\]\]).)*?^name\s*=\s*"' + re.escape(crate_name) + r'"\n(?:(?!^\[\[package\]\]).)*?^version\s*=\s*")([^"]+)(")')
updated, count = pattern.subn(lambda m: m.group(1) + version + m.group(3), text, count=1)
if count:
    path.write_text(updated, encoding="utf-8", newline="")
PY
}

assert_versions() {
  local expected="$1"
  local tauri_version package_version cargo_version
  tauri_version="$(jq -r '.version' "$TAURI_CONF")"
  package_version="$(jq -r '.version' "$PACKAGE_JSON")"
  cargo_version="$(python3 - "$CARGO_TOML" <<'PY'
from pathlib import Path
import re
import sys
text = Path(sys.argv[1]).read_text(encoding="utf-8")
match = re.search(r'(?ms)^\[package\]\n(?P<body>.*?)(?=^\[|\Z)', text)
if not match:
    raise SystemExit("missing [package] section")
version = re.search(r'(?m)^version\s*=\s*"([^"]+)"', match.group('body'))
if not version:
    raise SystemExit("missing package version")
print(version.group(1))
PY
)"

  if [[ "$tauri_version" != "$expected" || "$package_version" != "$expected" || "$cargo_version" != "$expected" ]]; then
    echo "Version assertion failed:" >&2
    echo "  $TAURI_CONF: $tauri_version" >&2
    echo "  $PACKAGE_JSON: $package_version" >&2
    echo "  $CARGO_TOML: $cargo_version" >&2
    exit 1
  fi
}

ensure_git_identity() {
  if ! git config user.name >/dev/null; then
    git config user.name "github-actions[bot]"
  fi
  if ! git config user.email >/dev/null; then
    git config user.email "41898282+github-actions[bot]@users.noreply.github.com"
  fi
}

write_json_version "$TAURI_CONF" "$new_version"
write_json_version "$PACKAGE_JSON" "$new_version"
write_cargo_toml_version "$CARGO_TOML" "$new_version"
update_cargo_lock_best_effort "$(cargo_package_name)" "$new_version"
assert_versions "$new_version"

ensure_git_identity

git add "${TRACKED_VERSION_FILES[@]}"
if git diff --cached --quiet -- "${TRACKED_VERSION_FILES[@]}"; then
  echo "Version files already at v${new_version}; no release commit needed."
else
  git commit -m "release: v${new_version}"
fi

git push origin HEAD:main
