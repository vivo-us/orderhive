# Orderhive

Orderhive is a module that integrates with [Orderhive](https://orderhive.com) and manages the exchange of tokens for you.

This module is under active development currently, although much of the core functionality has been complete.

Documentation will be added as we get to it. However everything has been typed, so you can use that for reference.

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

// Create a new instance of Orderhive
// ID Token and Refresh token are given once you have registered your application with Orderhive
const orderhive = new Orderhive({
  idToken: "dfli3lhvnklas",
  refreshToken: "jfo208vnaslf8324",
});

// Example request
let details = await orderhive.getOrderDetails();
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change. Please allow some time for requests to be reviewed.

## License

[MIT](https://choosealicense.com/licenses/mit/)
