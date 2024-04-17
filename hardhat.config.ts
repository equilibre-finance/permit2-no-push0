/** @format */

import type { HardhatUserConfig, NetworkUserConfig } from 'hardhat/types';
import '@nomiclabs/hardhat-ethers';
import '@nomiclabs/hardhat-web3';
import '@nomiclabs/hardhat-truffle5';
import 'hardhat-abi-exporter';
import { config as dotenvConfig } from 'dotenv';
dotenvConfig({ path: '/media/veracrypt1/keller/.env' });

import 'hardhat-deploy';
import '@matterlabs/hardhat-zksync-deploy';
import '@matterlabs/hardhat-zksync-solc';
import '@matterlabs/hardhat-zksync-verify';
import '@nomicfoundation/hardhat-verify';
import 'solidity-docgen';

const RPC_MAINNET = process.env.RPC_MAINNET as string;
const RPC_TESTNET = process.env.RPC_TESTNET as string;
const PRIVATE_KEY = process.env.PRIVATE_KEY as string;
const PRIVATE_KEY_TESTNET = process.env.PRIVATE_KEY_TESTNET as string;
const PRIVATE_KEY_HARDHAT = process.env.PRIVATE_KEY_HARDHAT as string;
const FORKING_BLOCK_NUMBER = process.env.FORKING_BLOCK_NUMBER as string;
const SCROLLSCAN_API_KEY = process.env.SCROLLSCAN_API_KEY as string;
if (!RPC_MAINNET) throw new Error('Missing RPC_MAINNET');
if (!RPC_TESTNET) throw new Error('Missing RPC_TESTNET');
if (!PRIVATE_KEY) throw new Error('Missing PRIVATE_KEY');
if (!PRIVATE_KEY_HARDHAT) throw new Error('Missing PRIVATE_KEY_HARDHAT');
if (!PRIVATE_KEY_TESTNET) throw new Error('Missing PRIVATE_KEY_TESTNET');
if (!FORKING_BLOCK_NUMBER) throw new Error('Missing FORKING_BLOCK_NUMBER');
if (!SCROLLSCAN_API_KEY) throw new Error('Missing SCROLLSCAN_API_KEY');

const config: HardhatUserConfig = {
    networks: {
        hardhat: {
            forking: {
                url: process.env.RPC_MAINNET as string,
                blockNumber: parseInt(process.env.FORKING_BLOCK_NUMBER as string),
            },
        },
        mainnet: {
            url: process.env.RPC_MAINNET,
            accounts: [PRIVATE_KEY],
        },
        testnet: {
            url: process.env.RPC_TESTNET,
            accounts: [PRIVATE_KEY_TESTNET],
        },
    },
    etherscan: {
        apiKey: {
            testnet: 'x',
            scroll_testnet: 'x',
            mainnet: 'x',
            sepolia: process.env.ETHERSCAN_API_KEY as string,
            polygonMumbai: process.env.POLYGONSCAN_API_KEY as string,
            scroll: SCROLLSCAN_API_KEY,
            scroll_sepolia: SCROLLSCAN_API_KEY,
        },
        customChains: [
            {
                network: 'scroll_sepolia',
                chainId: 534351,
                urls: {
                    apiURL: 'https://api-sepolia.scrollscan.com/api',
                    browserURL: 'https://api-sepolia.scrollscan.com/',
                },
            },
            {
                network: 'scroll',
                chainId: 534352,
                urls: {
                    apiURL: 'https://api.scrollscan.com/api',
                    browserURL: 'https://scrollscan.com/',
                },
            },
        ],
    },
    solidity: {
        compilers: [
            {
                version: '0.8.17',
                settings: {
                    viaIR: true,
                    optimizer: {
                        enabled: true,
                        runs: 10,
                    },
                },
            },
        ],
    },
    zksolc: {
        version: 'latest',
        settings: {},
    },
    paths: {
        sources: './contracts',
        tests: './test',
        cache: './cache',
        artifacts: './artifacts',
    },
    // abiExporter: {
    //   path: "./data/abi",
    //   clear: true,
    //   flat: false,
    // },
    docgen: {
        pages: 'files',
    },
};

export default config;
