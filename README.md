## Express with TypeScript Starter

Starter scaffolding for Express with TypeScript, including routes for HTML views and API endpoints, error handling, unit tests.

### Comes with:
- cookie-parser
- cors
- dotenv
- eslint
- express v5
- helmet
- jest
- morgan
- prettier
- supertest
- typescript

### Project Structure

```
├── config
│   └── .env.dev
├── data
│   └── users.json
└── src
    ├── database
    │   └── userStore.ts
    ├── error
    │   └── ApiError.ts
    ├── model
    │   └── user.ts
    ├── public
    │   └── stylesheets
    │       └── styles.css
    ├── routes
    │   ├── api
    │   │   └── users.ts
    │   ├── view
    │   │   ├── home.ts
    │   │   └── users.ts
    │   ├── apiRouter.ts
    │   └── viewRouter.ts
    ├── service
    │   └── userService.ts
    ├── views
    │   ├── 404.ejs
    │   ├── 500.ejs
    │   ├── home.ejs
    │   └── users.ejs
    ├── app.ts
    └── server.ts
```

### Scripts

#### Install:

```
$ yarn install
```

#### Clean install:

```
$ yarn clean-install
```

#### Start in dev mode:

```
$ yarn dev-start
```

#### Start in dev mode with hot-deploy:

```
$ yarn dev-start:hot
```

#### Run eslint:

```
$ yarn lint
```

#### Run prettier check:

```
$ yarn prettier
```

#### Run unit tests:

```
$ yarn test
```

#### Run unit tests in 'hot' mode:

```
$ yarn test:hot
```

#### Run type check:

```
$ yarn type-check
```

### Endpoints

#### Views:

http://localhost:3000 - Renders the home page

http://localhost:3000/users - Renders the user page

#### APIs:

GET http://localhost:3000/api/users - Get users

GET http://localhost:3000/api/users/:userId - Get a user

PUT http://localhost:3000/api/users - Create a user (placeholder)

POST http://localhost:3000/api/users - Update a user (placeholder)

DELETE http://localhost:3000/api/users - Delete a user (placeholder)


