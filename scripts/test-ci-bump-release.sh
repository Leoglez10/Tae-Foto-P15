#!/usr/bin/env bash
set -euo pipefail

# El bumper reescribe la version en los tres archivos que la declaran. Lo que se
# comprueba aca es que NO toque nada mas: un `jq` re-serializa el JSON entero y
# reformatea lo que no coincida con su estilo, y eso ensucia el diff de cada release.
# Tambien cubre que falle fuerte en vez de escribir un archivo a medias.

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BUMP="$SCRIPT_DIR/ci-bump-release.sh"

if [[ ! -f "$BUMP" ]]; then
  echo "bump script not found: $BUMP" >&2
  exit 1
fi

FAILURES=0
WORK_ROOT="$(mktemp -d)"
trap 'rm -rf "$WORK_ROOT"' EXIT

pass() {
  echo "PASS: $1"
}

fail() {
  echo "FAIL: $1 - $2"
  FAILURES=$((FAILURES + 1))
}

# Deja el repo de prueba como directorio actual, con su origin bare para que el
# script pueda hacer el push.
setup_repo() {
  local name="$1"
  local tauri_json="$2"
  local dir="$WORK_ROOT/$name"
  mkdir -p "$dir/src-tauri"
  cd "$dir"
  git init -q -b main
  git config user.name "Bump Test"
  git config user.email "bump-test@example.invalid"
  printf '%s' "$tauri_json" > src-tauri/tauri.conf.json
  printf '{\n  "name": "fixture",\n  "version": "0.1.0"\n}\n' > package.json
  printf '[package]\nname = "fixture"\nversion = "0.1.0"\n\n[dependencies]\n' > src-tauri/Cargo.toml
  git add -A
  git commit -q -m "chore: init"
  git init -q --bare "$WORK_ROOT/$name-origin.git"
  git remote add origin "$WORK_ROOT/$name-origin.git"
  git push -q -u origin main
  echo "0.1.0"
}

# El archivo de antes, con solo el numero de version cambiado, tiene que ser
# identico byte por byte al de despues.
assert_only_version_changed() {
  local before="$1"
  local after="$2"
  local new_version="$3"
  local label="$4"

  if python3 - "$before" "$after" "$new_version" <<'PY'
from pathlib import Path
import sys

before = Path(sys.argv[1]).read_bytes().decode()
after = Path(sys.argv[2]).read_bytes().decode()
new_version = sys.argv[3]

if before.replace('"0.1.0"', '"%s"' % new_version) != after:
    print("el contenido cambio mas alla de la version", file=sys.stderr)
    raise SystemExit(1)
PY
  then
    pass "$label"
  else
    fail "$label" "the bump touched more than the version number"
  fi
}

case_only_version_changes_with_inline_arrays() {
  setup_repo inline-arrays '{
  "version": "0.1.0",
  "bundle": {
    "targets": ["msi", "nsis"],
    "icon": ["icons/icon.ico"]
  }
}
' >/dev/null
  cp src-tauri/tauri.conf.json "$WORK_ROOT/inline-before.json"
  if ! bash "$BUMP" 9.9.9 >/dev/null 2>&1; then
    fail "inline arrays survive the bump" "bump exited non-zero"
    return
  fi
  assert_only_version_changed "$WORK_ROOT/inline-before.json" src-tauri/tauri.conf.json 9.9.9 "inline arrays survive the bump"
}

case_crlf_is_preserved() {
  setup_repo crlf "$(printf '{\r\n  "version": "0.1.0",\r\n  "bundle": {\r\n    "targets": ["msi"]\r\n  }\r\n}\r\n')" >/dev/null
  cp src-tauri/tauri.conf.json "$WORK_ROOT/crlf-before.json"
  if ! bash "$BUMP" 9.9.9 >/dev/null 2>&1; then
    fail "CRLF line endings survive the bump" "bump exited non-zero"
    return
  fi
  assert_only_version_changed "$WORK_ROOT/crlf-before.json" src-tauri/tauri.conf.json 9.9.9 "CRLF line endings survive the bump"
}

case_nested_version_is_untouched() {
  setup_repo nested '{
  "version": "0.1.0",
  "dependencies": {
    "something": {
      "version": "0.1.0"
    }
  }
}
' >/dev/null
  if ! bash "$BUMP" 9.9.9 >/dev/null 2>&1; then
    fail "a nested version key is not touched" "bump exited non-zero"
    return
  fi
  local nested
  nested="$(python3 -c "import json;print(json.load(open('src-tauri/tauri.conf.json'))['dependencies']['something']['version'])")"
  if [[ "$nested" == "0.1.0" ]]; then
    pass "a nested version key is not touched"
  else
    fail "a nested version key is not touched" "nested version became $nested"
  fi
}

case_all_three_files_bumped() {
  setup_repo three-files '{
  "version": "0.1.0"
}
' >/dev/null
  if ! bash "$BUMP" 9.9.9 >/dev/null 2>&1; then
    fail "all three version files are bumped" "bump exited non-zero"
    return
  fi
  local tauri package cargo
  tauri="$(python3 -c "import json;print(json.load(open('src-tauri/tauri.conf.json'))['version'])")"
  package="$(python3 -c "import json;print(json.load(open('package.json'))['version'])")"
  cargo="$(python3 - "$PWD/src-tauri/Cargo.toml" <<'PY'
from pathlib import Path
import re
import sys
text = Path(sys.argv[1]).read_text(encoding="utf-8")
match = re.search(r'(?m)^version\s*=\s*"([^"]+)"', text)
print(match.group(1) if match else "missing")
PY
)"
  if [[ "$tauri" == "9.9.9" && "$package" == "9.9.9" && "$cargo" == "9.9.9" ]]; then
    pass "all three version files are bumped"
  else
    fail "all three version files are bumped" "tauri=$tauri package=$package cargo=$cargo"
  fi
}

case_release_commit_reaches_origin() {
  setup_repo reaches-origin '{
  "version": "0.1.0"
}
' >/dev/null
  if ! bash "$BUMP" 9.9.9 >/dev/null 2>&1; then
    fail "the release commit is pushed to main" "bump exited non-zero"
    return
  fi
  local subject remote_subject
  subject="$(git log -1 --format=%s)"
  remote_subject="$(git --git-dir="$WORK_ROOT/reaches-origin-origin.git" log -1 --format=%s refs/heads/main)"
  if [[ "$subject" == "release: v9.9.9" && "$remote_subject" == "release: v9.9.9" ]]; then
    pass "the release commit is pushed to main"
  else
    fail "the release commit is pushed to main" "local='$subject' remote='$remote_subject'"
  fi
}

case_missing_toplevel_version_fails() {
  setup_repo missing-version '{
  "dependencies": {
    "something": {
      "version": "0.1.0"
    }
  }
}
' >/dev/null
  local before after
  before="$(cat src-tauri/tauri.conf.json)"
  if bash "$BUMP" 9.9.9 >/dev/null 2>&1; then
    fail "a missing top-level version fails loudly" "bump exited zero"
    return
  fi
  after="$(cat src-tauri/tauri.conf.json)"
  if [[ "$before" == "$after" ]]; then
    pass "a missing top-level version fails loudly"
  else
    fail "a missing top-level version fails loudly" "the file was modified anyway"
  fi
}

case_same_version_makes_no_commit() {
  setup_repo same-version '{
  "version": "0.1.0"
}
' >/dev/null
  if ! bash "$BUMP" 9.9.9 >/dev/null 2>&1; then
    fail "bumping twice to the same version adds no commit" "first bump exited non-zero"
    return
  fi
  local before after
  before="$(git rev-list --count HEAD)"
  if ! bash "$BUMP" 9.9.9 >/dev/null 2>&1; then
    fail "bumping twice to the same version adds no commit" "second bump exited non-zero"
    return
  fi
  after="$(git rev-list --count HEAD)"
  if [[ "$before" == "$after" ]]; then
    pass "bumping twice to the same version adds no commit"
  else
    fail "bumping twice to the same version adds no commit" "commit count went from $before to $after"
  fi
}

case_only_version_changes_with_inline_arrays
case_crlf_is_preserved
case_nested_version_is_untouched
case_all_three_files_bumped
case_release_commit_reaches_origin
case_missing_toplevel_version_fails
case_same_version_makes_no_commit

if [[ "$FAILURES" -gt 0 ]]; then
  echo "FAIL: $FAILURES ci-bump-release case(s) failed"
  exit 1
fi

echo "PASS: all ci-bump-release cases passed"
