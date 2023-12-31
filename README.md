# Auto Contracts Hardhat

This is DID Registry contract based on Semaphore. It comes with DID Registry contract, a test for that contract and a task that deploys that contract.

## Usage

### Compile

```bash
yarn compile
```

### Testing

```bash
yarn test
```

You can also generate a test coverage report:

```bash
yarn test:coverage
```

Or a test gas report:

```bash
yarn test:report-gas
```

### Deploy

1. Copy the `.env.example` file as `.env`.

```bash
cp .env.example .env
```

2. Add your environment variables.

> **Note**  
> For networks except Nova, you should at least set a valid Ethereum URL (e.g. Infura) and a private key with some ethers.

3. And deploy your contract.

```bash
yarn deploy-nova
```

> **Note**  
> Check the Semaphore contract addresses [here](https://semaphore.pse.dev/docs/deployed-contracts#semaphore) for the supported EVM networks. If you want to deploy the Semaphore contract into your own preferred EVM network, you can do it by `$ yarn deploy --network <network-name>`.

> **Warning**  
> The group id is a number!

Or deploy contract with a new Semaphore contract.
> This would cost extra gas fee because of 5 new deployments

```bash
yarn deploy-nova
# set the deployed block number for event query from
yarn post-deploy-nova
```
