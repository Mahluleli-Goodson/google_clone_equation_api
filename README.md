## An Express API for solving first degree linear equations STEP by STEP

### example:
```
    2(4x + 3)/4 + 6 = 24 -4x | 4x - 1 = 5 | 2x = 8 | ...etc
```

## Requirements:
1. Node Version >= 16.13.0
2. Postman OR any other API testing tool you prefer

## Set Up:
1. git clone project
2. cd into project you just cloned
3. inside directory, you'll find a file called `.env.example`, make your own copy and save as `.env`
4. `.env` will have your local config settings, you can change the parameters to suite your own environment
5. with node installed run `npm install` inside project
6. once your `node_modules` have been installed, run:
    - `npm run dev` => to start development version of the project, then navigate to `http://127.0.0.1:[PORT_FROM_ENV]/uptime` to check if app is running.
    - `npm run test` => to run tests with coverage.
    - `npm run build` => to make a production build, this will create a `build` directory.
    - `npm start` => to run the production build. This will only after running previous step.

### Optional (but recommended):
- If you have postman, you'll find a beginner collection in the directory `deploy`, import that for quick start to test the API locally. Remember to edit the `URI` to match your setup.
- If your want to deploy API for PRODUCTION, please use PROCESS MANAGER such as `PM2` (https://pm2.keymetrics.io/)

### `.env` important parameters:
- `ENV` => defines the current operating environment, valid values are `dev`|`prod`
- `ACTIVATE_LOGGER` => if you want terminal logging with `logUtil`, you can set this to `true`
- `PORT` => the port you want the app to run on
- `API_KEY` => the authorization key of the API

# API Document:
The API has 2 endpoints:
1. `[YOUR_BASE_URI:PORT_FROM_ENV]/api/uptime`: to test app health or if app is running, this will return an http status of `200` if everything is working.
    - METHOD: `GET`
    - RESPONSE: `200` | `OK`
   <br/>
   
2. `[YOUR_BASE_URI:PORT_FROM_ENV]/api/algebra/solve`: to get an equation solution.
   - METHOD: `POST`
   - Authorization API KEY is required, this is the key in your `.env` called `API_KEY`, send as header in the form `Bearer [API_KEY]`
   - PAYLOAD:
   ```
    { "equation": "2(4x + 3)/4 + 6 = 24 -4x" }
    ```
   - `PAYLOAD` and `Authorization` header are all required, otherwise you'll get a validation error or `Forbidden` error respectively.
   - RESPONSE (example):
```json
{
    "code": 200,
    "message": "Request was successful",
    "errors": [],
    "result": [
        {
            "description": "SUBTRACT FROM BOTH SIDES",
            "before": "2x + 6 = 6",
            "after": "(2x + 6) - 6 = 6 - 6"
        },
        {
            "description": "SIMPLIFY LEFT SIDE",
            "before": "(2x + 6) - 6 = 6 - 6",
            "after": "2x = 6 - 6"
        },
        {
            "description": "SIMPLIFY ARITHMETIC",
            "before": "2x = 6 - 6",
            "after": "2x = 0"
        },
        {
            "description": "FIND ROOTS",
            "before": "2x = 0",
            "after": "x = 0"
        }
    ]
}
```

### Space Time Complexity
The main entry function of the app is the `solveEquation` function of the `AlgebraService`.
With:
```
O(n), where n denotes the length of the equation string.
```
- As each character of the string/equation gets processed in maximum once by `doTheMath`, the complexity of the algorithm is `O(n)`.
- We will require `O(n)` space to store the equation string, auxiliary space used is `O(n)`, and `O(1)` is used to store the result; hence, total complexity is `O(n)`.

### Improvements that can be done
1. Instead of using only an `API_KEY` to secure the requests, use expiring/refresh tokens (JWT Tokens)
2. Add rate limiting to the API to prevent over usage/spammers
3. Structure validation responses with less code/API implementation detail, as this can be a security risk
4. Set timeouts for requests
5. Use OpenAPI/Swagger for API Documentation
