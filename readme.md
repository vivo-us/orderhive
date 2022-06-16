# Orderhive

Orderhive is a module that integrates with [Orderhive](https://orderhive.com) and manages the exchange of tokens for you.

This module is under active development currently, although much of the core functionality has been complete.

## Installation

Use npm to install the package

```bash
npm install orderhive
```

## Usage

```javascript
import {Orderhive} from 'orderhive';

// Create a new instance of Orderhive
// ID Token and Refresh token are given once you have
const orderhive = new Orderhive({
  idToken: /*Orderhive ID Token*/,
  refreshToken: /*Orderhive Refresh Token*/,
});

let warehouses = await orderhive.listWarehouses();
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change. Please allow some time for requests to be reviewed.

## License

[MIT](https://choosealicense.com/licenses/mit/)
