#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
RELEASE_GATE="$SCRIPT_DIR/release-gate.sh"

if [[ ! -f "$RELEASE_GATE" ]]; then
  echo "release gate not found: $RELEASE_GATE" >&2
  exit 1
fi

FAILURES=0
WORK_ROOT="$(mktemp -d)"

pass() {
  echo "PASS: $1"
}

fail() {
  echo "FAIL: $1 - $2"
  FAILURES=$((FAILURES + 1))
}

setup_repo() {
  local name="$1"
  local dir="$WORK_ROOT/$name"
  mkdir -p "$dir/src-tauri"
  cd "$dir"
  git init -q -b main
  git config user.name "Release Gate Test"
  git config user.email "release-gate-test@example.invalid"
  cat > src-tauri/tauri.conf.json <<'JSON'
{"version":"0.1.0"}
JSON
  git add src-tauri/tauri.conf.json
  git commit -q -m "chore: init"
  echo "$dir"
}

commit_subject() {
  local subject="$1"
  local file="fixture-$(git rev-list --count HEAD).txt"
  echo "$subject" > "$file"
  git add "$file"
  git commit -q -m "$subject"
}

value_of() {
  local key="$1"
  local output="$2"
  printf '%s\n' "$output" | awk -F= -v key="$key" '$1 == key {print substr($0, length(key) + 2)}'
}

expect_gate() {
  local case_name="$1"
  local expected_should="$2"
  local expected_previous="$3"
  local range_arg="$4"
  local output should previous

  if ! output="$(bash "$RELEASE_GATE" --range "$range_arg")"; then
    fail "$case_name" "gate exited non-zero"
    return
  fi

  should="$(value_of should_release "$output")"
  previous="$(value_of previous_tag "$output")"
  if [[ "$should" == "$expected_should" && "$previous" == "$expected_previous" ]]; then
    pass "$case_name"
  else
    fail "$case_name" "expected should_release=$expected_should previous_tag='$expected_previous' but got should_release=$should previous_tag='$previous' output=[$output]"
  fi
}

case_feat_only() {
  setup_repo feat-only >/dev/null
  git tag v0.1.0
  commit_subject "feat: add camera import"
  expect_gate "feat-only releases" true "v0.1.0" "v0.1.0..HEAD"
}

case_fix_only() {
  setup_repo fix-only >/dev/null
  git tag v0.1.0
  commit_subject "fix: restore admin export"
  expect_gate "fix-only releases" true "v0.1.0" "v0.1.0..HEAD"
}

case_docs_chore_skip() {
  setup_repo docs-chore >/dev/null
  git tag v0.1.0
  commit_subject "docs: update README"
  commit_subject "chore: adjust ignores"
  expect_gate "docs+chore only skips" false "v0.1.0" "v0.1.0..HEAD"
}

case_release_head_skip() {
  setup_repo release-head >/dev/null
  git tag v0.1.0
  commit_subject "feat: add dashboard"
  commit_subject "release: v0.1.1"
  expect_gate "release head skips even with feat in range" false "v0.1.0" "v0.1.0..HEAD"
}

case_no_tags_release() {
  setup_repo no-tags >/dev/null
  commit_subject "feat: first releasable change"
  expect_gate "no tags releases with empty previous_tag" true "" "0000000000000000000000000000000000000000..HEAD"
}

case_scoped_feat_release() {
  setup_repo scoped-feat >/dev/null
  git tag v0.1.0
  commit_subject "feat(admin): improve summaries"
  expect_gate "scoped feat releases" true "v0.1.0" "v0.1.0..HEAD"
}

case_breaking_fix_release() {
  setup_repo breaking-fix >/dev/null
  git tag v0.1.0
  commit_subject "fix!: replace import format"
  expect_gate "breaking fix releases" true "v0.1.0" "v0.1.0..HEAD"
}

case_merge_only_skip() {
  setup_repo merge-only >/dev/null
  git tag v0.1.0
  git checkout -q -b topic
  commit_subject "docs: topic note"
  git checkout -q main
  git merge --no-ff -q topic -m "Merge branch 'topic'"
  expect_gate "merge commit with no functional subject skips" false "v0.1.0" "v0.1.0..HEAD"
}

case_missing_range_usage_error() {
  setup_repo missing-range >/dev/null
  if bash "$RELEASE_GATE" --range >"$WORK_ROOT/release-gate-missing-range.out" 2>&1; then
    fail "missing --range is a usage error" "expected non-zero exit"
  else
    pass "missing --range is a usage error"
  fi
}

case_feat_only
case_fix_only
case_docs_chore_skip
case_release_head_skip
case_no_tags_release
case_scoped_feat_release
case_breaking_fix_release
case_merge_only_skip
case_missing_range_usage_error

if [[ "$FAILURES" -gt 0 ]]; then
  echo "FAIL: $FAILURES release-gate case(s) failed"
  exit 1
fi

echo "PASS: all release-gate cases passed"
