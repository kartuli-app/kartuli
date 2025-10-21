#!/bin/bash

# Conventional Commits validator for Kartuli
# Validates commit messages follow the format: <type>(<scope>): <description>

commit_msg_file="$1"

# Read the commit message
commit_msg=$(cat "$commit_msg_file")

# Conventional Commits regex pattern
# Supports: feat, fix, chore, docs, test, refactor, perf, style, ci
# Optional scope in parentheses
# Required colon and space
# Required description
pattern='^(feat|fix|chore|docs|test|refactor|perf|style|ci)(\(.+\))?: .+'

if ! echo "$commit_msg" | grep -E "$pattern" >/dev/null; then
  echo ""
  echo "❌ Commit message must follow Conventional Commits format"
  echo ""
  echo "Format: <type>(<scope>): <description>"
  echo ""
  echo "Supported types:"
  echo "  feat     - New feature"
  echo "  fix      - Bug fix"
  echo "  chore    - Infrastructure, setup tasks, non-feature work"
  echo "  docs     - Documentation changes"
  echo "  test     - Testing-related changes"
  echo "  refactor - Code refactoring"
  echo "  perf     - Performance improvements"
  echo "  style    - Code style changes (formatting, etc.)"
  echo "  ci       - CI/CD changes"
  echo ""
  echo "Examples:"
  echo "  feat(game-client): add user authentication"
  echo "  fix(ui): resolve button alignment on mobile"
  echo "  docs: update contributing guidelines"
  echo "  chore(e2e): upgrade Playwright to v1.40"
  echo "  test: add unit tests for auth module"
  echo ""
  echo "Your message: \"$commit_msg\""
  echo ""
  echo "Use 'git commit --no-verify' to bypass this check (not recommended)."
  exit 1
fi

echo "✅ Commit message follows Conventional Commits format"
exit 0
