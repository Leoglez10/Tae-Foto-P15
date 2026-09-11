#!/usr/bin/env bash
set -euo pipefail

usage() {
  echo "usage: $0 [--range <before>..<after>]" >&2
}

is_all_zero_sha() {
  [[ "${1:-}" =~ ^0+$ ]]
}

resolve_commit() {
  local ref="${1:-}"
  if [[ -z "$ref" ]] || is_all_zero_sha "$ref"; then
    git rev-parse HEAD
    return
  fi
  git rev-parse "${ref}^{commit}" 2>/dev/null || git rev-parse HEAD
}

version_from_tauri_config() {
  jq -r '.version' src-tauri/tauri.conf.json
}

next_patch_version() {
  local version="$1"
  IFS=. read -r major minor patch <<< "$version"
  echo "${major}.${minor}.$((patch + 1))"
}

infer_ref_type() {
  if [[ -n "${GITHUB_REF_TYPE:-}" ]]; then
    echo "$GITHUB_REF_TYPE"
  elif [[ "${GITHUB_REF:-}" == refs/tags/* ]]; then
    echo "tag"
  elif [[ "${GITHUB_REF:-}" == refs/heads/* ]]; then
    echo "branch"
  else
    echo ""
  fi
}

infer_ref_name() {
  if [[ -n "${GITHUB_REF_NAME:-}" ]]; then
    echo "$GITHUB_REF_NAME"
  elif [[ "${GITHUB_REF:-}" == refs/tags/* ]]; then
    echo "${GITHUB_REF#refs/tags/}"
  elif [[ "${GITHUB_REF:-}" == refs/heads/* ]]; then
    echo "${GITHUB_REF#refs/heads/}"
  else
    echo ""
  fi
}

previous_tag_before() {
  local target="$1"
  git describe --tags --abbrev=0 "${target}^" 2>/dev/null || true
}

nearest_tag_for_ref() {
  local ref="$1"
  if [[ -z "$ref" ]] || is_all_zero_sha "$ref"; then
    echo ""
    return
  fi
  git describe --tags --abbrev=0 "${ref}^{commit}" 2>/dev/null || true
}

functional_commit_count() {
  local range_spec="$1"
  local subjects
  subjects="$(git log --no-merges --format=%s $range_spec 2>/dev/null || true)"
  printf '%s\n' "$subjects" \
    | awk '/^(feat|fix)(\([^)]+\))?!?: .+/ { count++ } END { print count + 0 }'
}

emit() {
  local should_release="$1"
  local reason="$2"
  local previous_tag="$3"
  local release_tag="$4"
  local functional_commits="$5"
  local target_sha="$6"
  local release_version="$7"

  echo "should_release=${should_release}"
  echo "reason=${reason}"
  echo "previous_tag=${previous_tag}"
  echo "release_tag=${release_tag}"
  echo "functional_commits=${functional_commits}"
  echo "target_sha=${target_sha}"
  echo "release_version=${release_version}"
}

range_mode=false
range_value=""
while [[ $# -gt 0 ]]; do
  case "$1" in
    --range)
      if [[ $# -lt 2 ]] || [[ "$2" != *..* ]]; then
        usage
        exit 2
      fi
      range_mode=true
      range_value="$2"
      shift 2
      ;;
    -h|--help)
      usage
      exit 0
      ;;
    *)
      usage
      exit 2
      ;;
  esac
done

current_version="$(version_from_tauri_config)"

if [[ "$range_mode" == true ]]; then
  before="${range_value%%..*}"
  after="${range_value#*..}"
  target_sha="$(resolve_commit "$after")"

  if [[ -z "$before" ]] || is_all_zero_sha "$before"; then
    previous_tag=""
    range_spec="$target_sha"
  else
    previous_tag="$(nearest_tag_for_ref "$before")"
    range_spec="${before}..${target_sha}"
  fi

  head_subject="$(git log -1 --format=%s "$target_sha")"
  if [[ "$head_subject" =~ ^release:\ v[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
    emit false "release_commit" "$previous_tag" "" 0 "$target_sha" ""
    exit 0
  fi

  functional_commits="$(functional_commit_count "$range_spec")"
  if [[ "$functional_commits" -gt 0 ]]; then
    release_version="$(next_patch_version "$current_version")"
    emit true "functional_commits" "$previous_tag" "v${release_version}" "$functional_commits" "$target_sha" "$release_version"
  else
    emit false "no_functional_commits" "$previous_tag" "" "$functional_commits" "$target_sha" ""
  fi
  exit 0
fi

ref_type="$(infer_ref_type)"
ref_name="$(infer_ref_name)"
target_sha="$(resolve_commit "${GITHUB_SHA:-HEAD}")"
dry_run="${DRY_RUN:-${INPUT_DRY_RUN:-false}}"

if [[ "$ref_type" == "tag" ]]; then
  previous_tag="$(previous_tag_before "$target_sha")"
  emit true "tag_push" "$previous_tag" "$ref_name" 0 "$target_sha" ""
  exit 0
fi

previous_tag="$(previous_tag_before "$target_sha")"

if [[ "$dry_run" == "true" ]]; then
  emit false "dry_run" "$previous_tag" "" 0 "$target_sha" ""
  exit 0
fi

if [[ "${GITHUB_EVENT_NAME:-}" == "workflow_dispatch" ]]; then
  emit true "manual_dispatch" "$previous_tag" "v${current_version}" 0 "$target_sha" ""
  exit 0
fi

if [[ "$ref_type" != "branch" ]] || [[ "$ref_name" != "main" ]]; then
  emit false "unsupported_ref" "$previous_tag" "" 0 "$target_sha" ""
  exit 0
fi

head_subject="$(git log -1 --format=%s "$target_sha")"
if [[ "$head_subject" =~ ^release:\ v[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
  emit false "release_commit" "$previous_tag" "" 0 "$target_sha" ""
  exit 0
fi

if [[ -n "$previous_tag" ]]; then
  range_spec="${previous_tag}..${target_sha}"
else
  range_spec="$target_sha"
fi

functional_commits="$(functional_commit_count "$range_spec")"
if [[ "$functional_commits" -gt 0 ]]; then
  release_version="$(next_patch_version "$current_version")"
  emit true "functional_commits" "$previous_tag" "v${release_version}" "$functional_commits" "$target_sha" "$release_version"
else
  emit false "no_functional_commits" "$previous_tag" "" "$functional_commits" "$target_sha" ""
fi
