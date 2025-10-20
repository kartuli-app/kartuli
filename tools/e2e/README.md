# E2E Testing Setup

## Vercel Protection Bypass

The E2E tests use Vercel's Protection Bypass feature to test against preview URLs without authentication issues.

### Setup Instructions

1. **Enable Protection Bypass in Vercel:**
   - Go to your Vercel project settings
   - Navigate to "Security" → "Deployment Protection"
   - Enable "Protection Bypass for Automation"
   - Copy the generated secret

2. **Add Secret to GitHub:**
   - Go to your GitHub repository settings
   - Navigate to "Secrets and variables" → "Actions"
   - Add a new repository secret:
     - **Name**: `VERCEL_PROTECTION_BYPASS_SECRET`
     - **Value**: The secret from Vercel

3. **How It Works:**
   - The E2E tests automatically detect the `VERCEL_PROTECTION_BYPASS_SECRET` environment variable
   - If present, they add the `x-vercel-protection-bypass` header to all requests
   - This allows tests to bypass Vercel's deployment protection

### Testing Locally

For local testing, you can set the environment variable:

```bash
export VERCEL_PROTECTION_BYPASS_SECRET="your-secret-here"
pnpm test:e2e
```

Or run with the environment variable inline:

```bash
VERCEL_PROTECTION_BYPASS_SECRET="your-secret-here" pnpm test:e2e
```

### Security Notes

- The bypass secret is only used for E2E testing
- It's stored securely in GitHub Secrets
- The secret is only available in CI/CD environments
- Local testing requires manual setup (as shown above)

### Troubleshooting

If tests are still being skipped:
1. Verify the secret is correctly set in GitHub repository secrets
2. Check that the secret matches the one in Vercel project settings
3. Ensure the secret name is exactly `VERCEL_PROTECTION_BYPASS_SECRET`
4. Check the CI logs for any environment variable issues