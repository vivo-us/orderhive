# Orderhive

Orderhive is a module that integrates with [Orderhive](https://orderhive.com) and manages the exchange of tokens for you.

In 1.1.0, the module has been updated to store keys in a database to abide by Orderhive's new tokens policy (read [here](https://orderhive.docs.apiary.io/#reference/account/refresh-token/refresh-token)). These API keys are encrypted with an encryption key passed when creating a new orderhive instance.

- NOTE: Currently only MySQL is supported, however, more will be added if there is enough requests.

This module is under active development currently, although much of the core functionality has been complete.

Documentation will be added as I get to it. However everything has been typed, so you can use that for reference until then.

## Installation

Use npm to install the package

```bash
npm install orderhive
```

## Usage

Check [Orderhive Documentation](https://orderhive.docs.apiary.io/#introduction/api-requirements) for how to register your app.

_NOTE:_ All functions are asynchronous, so you will need to await the response.

```javascript
import { Orderhive } from "orderhive"; // import statement
const { Orderhive } = require("orderhive"); // require statement

// Creates a new instance of Orderhive.
// ID and Refresh Tokens are aquired once you have registered your application with Orderhive.
// This will create a table called "orderhiveApiTokens" if it doesn't already exist.
// Logging of SQL queries is on by default, but can be turned off below.

const orderhive = new Orderhive({
  idToken: "orderhiveIdToken",
  refreshToken: "orderhiveRefreshToken",
  db: {
    host: "12.34.56.78",
    port: 3306,
    username: "testUser1",
    password: "password",
    database: "demo_database",
    encryptionKey: "longEncrytionKey",
    logging: true, // This field is optional and defaults to true
  },
});

// Example request
let tags = await orderhive.listTags("sales_order");
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change. Please allow some time for requests to be reviewed.

## License

[MIT](https://choosealicense.com/licenses/mit/)
