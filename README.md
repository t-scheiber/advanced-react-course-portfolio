# React portfolio

Thomas's React course portfolio, with four project cards and a simulated contact form. The form waits two seconds, then randomly succeeds or fails with equal probability. It does not send email or contact data to a server. Successful submissions show a confirmation and reset the form; failures keep the entered values for retry.

Use Node 22.23.2 and npm 12.0.2. Dependencies are pinned in package.json and package-lock.json.

```sh
npm ci --ignore-scripts --strict-peer-deps --engine-strict
npm test
npm run build
npm run lint
npm run validate
npm run test:production
npm start
```

The build runs strict JavaScript type checking and Vite, producing the existing `build/` directory. Validation checks the frozen dependency graph, local HTML assets, permitted build files and byte-for-byte preservation of all four project photos. Tests exercise the real Chakra provider, portfolio content, navigation, form validation, success, failure, duplicate submissions and retry. The production smoke starts the pinned local static server on loopback and verifies all built files against their exact bytes, including images. No live API credentials are needed.

The application uses Chakra UI v3 APIs and retains the original colors, content, photos, icons and root-relative public assets. The avatar continues to use its original Gravatar URL. The only contact requests are local simulations.

For static hosting, publish only `build/` after the checks pass. The previous repository deployment records identify Vercel, but its old deployment URL and configured custom domain were unavailable during baseline verification. This source change does not create a deployment, repair DNS or establish a live hosting binding. The legacy Renovate repair workflow remains disabled in GitHub; its action references are pinned for archival safety.
