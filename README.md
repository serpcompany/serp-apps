# Supersaas Essentials (Single User variant)

This is a single user variant of the Supersaas Starter Kit, the original repo can be found [here](https://github.com/SupersaasHQ/essentials-v3)

This version does not include the teams feature, and is focused on being a simple, single user SaaS application.

This is 1 to 1 on feature parity with the original repo, and will always stay in sync with the latest features and improvements.

I did not include this in the original repo as a separate branch to avoid cluttering it with a lot of commits, conflicts, etc.

## Setup

Make sure to install the dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
