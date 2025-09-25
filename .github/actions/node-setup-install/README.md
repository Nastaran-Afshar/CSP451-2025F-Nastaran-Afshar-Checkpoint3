# node-setup-install (composite action)

Sets up Node.js with npm cache and installs dependencies.

## Inputs
- `node-version` (required): Node.js version string, e.g. `"20"`.

## What it does
- Uses `actions/setup-node@v4` with `cache: npm`
- Runs `npm ci` to install from lockfile

## Example
```yaml
- uses: ./.github/actions/node-setup-install
  with:
    node-version: "20"
