# Express-typeorm-demo

Express-typeorm-demo, build with typescript, typeorm, postgres and express.
To show introducer and introducee tree, in level order traversal, order by creation date, level

## Prerequisite

- nodejs: "^20.xx.x"
- docker
- docker compose
- .env.development.local and .env.production.local (set according to the env example)

## How to

### To start

- Initialization:

  ```bash
  make init
  ```

- start app development without nginx:

  ```bash
  make up
  ```

- start app development without nginx:

  ```bash
  npm run dev
  make db
  ```

### To test

- unit test

  ```bash
  npm run test
  ```

- swagger ui route

   ```md
   {host}/api-docs/
   ```

### To deploy

- build:
  change the APP_NAME in the make file and then run:

  ```bash
  make build
  ```

---

## Folder structure

```markdown
├── src
│   ├── app.ts
│   ├── config
│   │   └── index.ts
│   ├── controllers   
│   │   (Handle incoming requests and return responses.)
│   │   └── policyholder.controller.ts
│   ├── database
│   │   (database configuration and migrations)
│   │   ├── index.ts
│   │   └── migrations
│   │       └── 1722449269775-policyholder_test_data.migration.ts
│   ├── dtos
│   │   (encapsulate data, making it easier to transfer multiple pieces of data in a single object)
│   │   └── policyholders.dto.ts
│   ├── entities
│   │   (typeorm entities)
│   │   └── policyholders.entity.ts
│   ├── exceptions
│   │   (classes for exceptions)
│   │   └── HttpException.ts
│   ├── interfaces
│   │   ├── policyholders.interface.ts
│   │   └── routes.interface.ts
│   ├── logs
│   │   ├── debug
│   │   └── error
│   ├── middlewares
│   │   ├── error.middleware.ts
│   │   └── validation.middleware.ts
│   ├── routes
│   │   └── policyholder.route.ts
│   ├── server.ts
│   ├── services
│   │   (uses entities to create model for business logic)
│   │   └── policyholders.service.ts
│   ├── test
│   │   ├── mockdata
│   │   (mock data for unit tests, which meant to be isolated from real database)
│   │   │   └── policyholders.mockdata.ts
│   │   ├── policyholders.route.test.ts
│   │   └── policyholders.service.test.ts
│   └── utils
│       ├── logger.ts
│       └── validateEnv.ts
├── .dockerignore
├── .editorconfig
|   (maintain consistent coding styles across different editors and IDEs)
├── .env.development.local
├── .env.example
├── .env.production.local
├── .env.test.local
├── .eslintignore
├── .eslintrc
├── .gitignore
├── .huskyrc
|   (manage git hooks, ensures code integrity)
├── .lintstagedrc.json
|   (runs scripts on staged Git files)
├── .prettierrc
├── .swcrc
|   (configuration for blazing fast compiler built on Rust)
├── .vscode
│   ├── launch.json
│   └── settings.json
├── Dockerfile.dev
├── Dockerfile.prod
├── Makefile
|   (runs scripts, to learn more, use make help)
├── README.md
├── docker-compose.yml
├── jest.config.js
├── nginx.conf
├── nodemon.json
├── package-lock.json
├── package.json
├── swagger.yaml
└── tsconfig.json
```

---

## Libraries used

- **class-transformer:**
  Transforms plain JavaScript objects into class instances and vice versa, helpful when working with TypeScript classes.
- **class-validator:**
Provides decorators for validating class properties, check data before processing.
- **compression:**
  Middleware to compress HTTP responses, improves performance by reducing the size of the response body.
- **cookie-parser:**
  Parses cookies attached to the client request object.
- **cors:**
  Middleware to enable Cross-Origin Resource Sharing (CORS).
- **dotenv:**
  Loads environment variables, for configuration and secrets to be managed safely
- **envalid:**
  Validates environment variables.
- **express:**
  Web framework for Node.js. widely used.
- **helmet:**
  Sets various HTTP headers to secure Express apps, protect it from common web vulnerabilities.
- **hpp:**
  Middleware to protect against HTTP Parameter Pollution attacks, ensures that query parameters are not polluted with multiple values
- **morgan:**
  Logger middleware, logs incoming requests for debugging and monitoring
- **pg:**
  PostgreSQL client for Node.js.
- **reflect-metadata:**
  Adds metadata reflection capabilities to JavaScript, used with typedi.
- **swagger-ui-express:**
  Serves Swagger UI for API documentation.
- **typedi:**
  Dependency injection framework for TypeScript and JavaScript,to improve code modularity
- **typeorm:**
  ORM for TypeScript and JavaScript, simplifies migration, interaction, which improves maintainability, type security, supports raw sql for cases which requires flexibility, and supports various databases.
- **typeorm-typedi-extensions:**
  Integrates TypeORM with TypeDI.
- **winston:**
  Logging library, provides flexible and configurable logging for the application.
- **winston-daily-rotate-file:**
  Transport for Winston that rotates log files daily.
- **yaml:**
  Parses and stringifies YAML, used for Swagger.

---

## Note

- this application did not use redis or any other cache service on purpose, since the users' data should be treated securely to avoid privacy concerns, and the assumption is that the data wont be frequently accessed.
