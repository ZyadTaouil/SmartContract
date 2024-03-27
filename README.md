
# MusicSale Smart Contract

## Introduction

The `MusicSale` smart contract is developed for a decentralized marketplace on the Ethereum blockchain, focused on the sale and purchase of music-related products. This contract allows sellers to list their music products, set prices, and allows buyers to purchase these products securely.

## Features

- Role-based permissions: Users can be assigned roles such as `Seller`, `Buyer`, or `User`.
- Product listing: Sellers can list their music products with details like title, composer, artist, and description.
- Sale management: Sellers can initiate and cancel sales, and buyers can purchase products.
- Fee handling: A marketplace fee is considered in each transaction.

## Contract Functions

- `newProduct(string memory _title, string memory _compositor, string memory _artist, string memory _description)`: Allows a seller to list a new product.
- `newSale(uint _productId, uint _price)`: Initiates a new sale for a product.
- `buyProduct(uint _saleId, uint _price)`: Allows a buyer to purchase a product that is on sale.
- `cancelSale(uint _saleId)`: Cancels an ongoing sale.

## Project Setup

### Requirements

- Node.js
- npm
- Ethereum wallet with test Ether

### Installation

1. Clone the repository:
   ```sh
   git clone [URL of the repository]
   ```
2. Navigate to the project directory:
   ```sh
   cd MusicSale
   ```
3. Install dependencies:
   ```sh
   npm install
   ```

### Configuration

Create a `.env` file in the root directory and add the following:

```env
SEPOLIA_URL=[Infura or Alchemy Sepolia API URL]
PRIVATE_KEY=[Your private key]
```

### Testing

To run the unit tests:

```sh
npx hardhat test
```

## Usage

To deploy the contract, compile it using Hardhat:

```sh
npx hardhat compile
```

Then, to deploy to the Sepolia test network:

```sh
npx hardhat run scripts/deploy.js --network sepolia
```

## Contributing

Contributions are welcome! Please feel free to submit a pull request or create an issue for bugs, suggestions, and feature requests.

## Security

This contract has not been audited. Use at your own risk. Ensure that you have addressed all the security concerns and conducted thorough testing before deploying to the main network.

## License

This project is open-sourced under the MIT License.
