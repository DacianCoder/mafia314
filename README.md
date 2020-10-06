# Quick setup of a React project

## Available project setup scripts
Can be found in the `./bin` folder  
 - `clean_project.sh` -> used for removal of unwanted default features

## Available Scripts

In the project directory, you can run:

- `yarn start` - runs the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

- `yarn test` - launches the test runner in the interactive watch mode.

- `yarn build` - builds the app for production to the `build` folder.

- `yarn eject` - exposes content of `react-script` package

- `yarn lint` - lints project files according to eslint rules, see below. Typical use case: continuous integration environments, Travis, CircleCI, etc.

- `yarn fix` - same as `yarn lint`, but also fixes errors, when possible. Typical use case: local development environment, git hooks.

Due to CRA template limitations (we can change only `scripts` and `dependencies` inside generated `package.json`) all configuration is done by adding config files where possible. Also no `devDependencies` for now, sorry.

## Redux configuration

The template provides basic Redux configuration using [Redux Toolkit](https://redux-toolkit.js.org/)


## IMPORTANT: Form Solutions

For the moment the template provides a basic implementation of final-form library, in the future more libraries will be added  

### REMOVED ~~Final Form~~ [project](https://final-form.org/react)
Basic implementation contains a [FormWrapper](/src/form/final-form/FormWrapper.tsx) that should be used to declare a form  
A TextField, CheckboxField and ConditionField is provided by default
You can remove final form by using the command `./bin/clean_project.sh final-form`

## Testing
### E2E
[Cypress](https://docs.cypress.io/api/api/table-of-contents.html)
is the default library for e2e testing, contains a minimal implementation with custom commands
For the local setup please use `npm run test:e2e`
### Unit and integration testing
[React Testing library](https://testing-library.com/docs/react-testing-library/api) is used in this case
For the local setup please use `npm run test`, also `npm run test:coverage` can be used
### Mutation testing
Mutation tester provider is [Stryker](https://stryker-mutator.io/)
Stryker provides a real coverage report of the current tests and offers an insight on where bugs might appear

In order to see this report locally, run `npm run test:mutation`
This report can pe visualised on each branch pipeline by triggering a manual job and then downloading the artifact with the report on a html format 
In order to add/remove tests or files from mutation scope, please edit [stryker.conf.js](./stryker.conf.js)

Stryker can be removed by adding `mutation` as an argument to the `./bin/clean_project.sh`

## Internationalization

Translations is provided using React Intl.  
Also a [DynamicFormattedMessage](src/components/common/DynamicFormattedMessage.tsx) 
component is provided to wrap the intl import and provide conditional rendering of the text

## [Prettier](https://prettier.io/)

`Prettier` is added to force consistent formatting. Don't like trailing semicolons? Feel free to [tweak prettier rules](https://prettier.io/docs/en/configuration.html) inside `.prettierrc` file to match your code style.

## Eslint configurations

The template extends CRA ESLint rules with a custom set, tailored for the reasonable and clean development process.

Eslint rules are commented for your convenience feel free to tweak or remove them inside `.eslintrc`  
Import order not configured, a plugin can be found [here](https://www.npmjs.com/package/eslint-plugin-ordered-imports) 

## REMOVED ~~Open API Tools generator~~ [project](https://github.com/OpenAPITools/openapi-generator)
The provided template uses fetch, if you wish to modify it, please consult the project, axios/superagent are also suported
 
By providing a valid endpoint for `swagger.json` retrieval in the `.env` file the script found at `bin/install_api.sh`
will generate models and APIs defined in that particular `swagger.json`

### Machine requirements
- `chmod +x ./bin/install.sh` -> to be able to run it  
- `docker` -> required in order to abstract the java dependency of the generator

### Removal of generator
Run `./bin/clean_project open-api` in order to remove added files
