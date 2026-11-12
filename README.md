# Advanced React course portfolio
A course exercise from the Advanced React course in the Meta Front-End Developer certificate on Coursera, done in 2023 to 2024. It is not the owner's real portfolio.

The deployed copy is at https://advanced-react-course-portfolio.thomasscheiber.com/

## What the app does

The app is one page with a fixed header and three content sections. Several components still carry comments from the course instructions.

- Header. Icon links for email, GitHub, LinkedIn, Medium and Stack Overflow. The last four point to the site home pages, not to a profile. The Projects and Contact Me links scroll smoothly to their sections.
- Landing. An avatar loaded from Gravatar, a heading and two lines of text.
- Projects. Four cards, each with a photo, a title and a description. The cards contain no links.
- Contact me. A form with name, email, enquiry type and message.

## Contact form

The form makes no network request. Name and email are required, the email must be valid, and the message needs at least 25 characters. The enquiry type is stored with the form but never sent or used.

On a valid submit, `useSubmit` waits 2 seconds. It then returns an error when `Math.random()` is below 0.5, and success otherwise. A success opens an "All good!" dialog that names the sender, then clears the form. A failure opens an "Oops!" dialog and keeps the entered values for another try. A submit made while a request is pending returns the same promise, so no second timer starts.

## Stack

- React 19.3.1 and Chakra UI 3.38.0, using the v3 `ChakraProvider` with `defaultSystem`.
- Formik 2.4.9 and Yup 1.7.1 for the contact form.
- Font Awesome 7.3.1 for the icons.
- Vite 8.3.8 with `@vitejs/plugin-react` 6.3.0 for the dev server and the build.
- TypeScript 6.0.3 type-checks the JavaScript sources through `checkJs`.
- Jest 30.5.2 with ts-jest 29.4.15 and Testing Library for the tests, and ESLint 10.14.0 with React Hooks rules.

## Run it

Use Node 22.23.2 and npm 12.0.2, as set in `package.json`.

```sh
npm ci --ignore-scripts --strict-peer-deps --engine-strict
npm start
```

The other scripts:

- `npm run build` runs `tsc`, then writes the app to `build/`.
- `npm test` runs 12 Jest tests in `src/App.test.jsx`.
- `npm run lint` runs ESLint on the repository.
- `npm run validate` checks the lockfile pins, the list of build files and that the four photos are copied unchanged.
- `npm run test:production` serves `build/` on 127.0.0.1, port 18741, and compares every file byte for byte. It expects POSIX path separators, so it fails on Windows.

## Configuration and deployment

The app reads no environment variables and needs no secrets. The repository has no deployment configuration, so the hosting setup for the live site is not recorded here.
