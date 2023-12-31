/**
 * Utility functions
 */

import { ethers } from "hardhat";
import { readFileSync } from "fs";
import { Wallet } from "ethers";
import { JsonRpcProvider } from "@ethersproject/providers";

const NOVA_RPC_URL = process.env.NOVA_RPC_URL;
const SIGNER_PRIVATE_KEY = process.env.SIGNER_PRIVATE_KEY;

export function validateEnv() {
    if (!SIGNER_PRIVATE_KEY || !NOVA_RPC_URL) {
        throw new Error(
            "SIGNER_PRIVATE_KEY and NOVA_RPC_URL must be set in the .env file"
        );
    }
}

export async function checkBalance(signer: Wallet, provider: JsonRpcProvider) {
    // Get the balance of the signer
    const balance = await signer.getBalance();

    const gasPrice = await provider.getGasPrice();

    // Check if the signer has enough balance than required gas
    if (balance.lt(gasPrice.mul(21000))) {
        throw new Error(
            `The address ${signer.address} does not have sufficient balance to send transactions`
        );
    }
}

/**
 * Checks if the given address is a contract address.
 * @param address - The address to check.
 * @param provider - The ethers provider to use for checking the code.
 * @returns A promise that resolves to a boolean indicating whether the address is a contract.
 */
export async function isContractAddress(
    address: string,
    provider: JsonRpcProvider
): Promise<boolean> {
    // Check if the address is well-formed
    if (!ethers.utils.isAddress(address)) {
        return false;
    }

    // Check if the address is a contract (has associated code)
    const code = await provider.getCode(address);
    return code !== "0x"; // if code is '0x', it's an EOA (Externally Owned Account), not a contract
}

/**
 * Represents the contract addresses.
 */
interface ContractAddresses {
    Pairing: string;
    SemaphoreVerifier: string;
    Poseidon: string;
    IncrementalBinaryTree: string;
    Semaphore: string;
    DidRegistry: {
        address: string;
        txHash: string;
    };
}

/**
 * Reads the contract addresses from a JSON file.
 *
 * @param filePath - The path to the JSON file.
 * @returns The contract address as string.
 * @throws Error if there is an error reading the JSON file.
 */
export function readContractAddresses(filePath: string): ContractAddresses {
    try {
        const rawData = readFileSync(filePath, { encoding: "utf8" });
        const data: ContractAddresses = JSON.parse(rawData);
        return data;
    } catch (error) {
        throw new Error(
            `Error reading the JSON file for Semaphore addresses: ${error}`
        );
    }
}

export function readDidRegistry(filePath: string): [string, string] {
    try {
        const rawData = readFileSync(filePath, { encoding: "utf8" });
        const data: ContractAddresses = JSON.parse(rawData);

        return [data.DidRegistry.address, data.DidRegistry.txHash];
    } catch (error) {
        throw new Error(
            `Error reading the JSON file for DID Registry: ${error}`
        );
    }
}

/**
 * Retrieves the current timestamp of the latest block.
 * @returns A Promise that resolves to the current block timestamp.
 */
export async function now(): Promise<number> {
    return (
        await ethers.provider.getBlock(await ethers.provider.getBlockNumber())
    ).timestamp;
}
