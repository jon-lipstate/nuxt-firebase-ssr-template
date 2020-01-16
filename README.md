# Nuxt Firebase SSR Template

> Nuxt, Vuetify, Firebase Template for SSR. Contains pre-wired User [Store, Authorization, Roles]

## Build Setup

```bash
# install dependencies
$ npm run install
$ cd functions
$ npm run install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and deploy to firebase
$ npm run prepare
$ firebase deploy
```

## Project Setup

> revise `.firebaserc` with your project id

> add firebase config object to `src/services/fireInit.js`

> add a `.env` file in the `src/` directory

> edit `nuxt.config.js` at `sitemap.hostname` with your hostname

Note: `functions/package.json` needs to have the same dependencies as the main project's `package.json` file, otherwise SSR is unable to perform its role.
