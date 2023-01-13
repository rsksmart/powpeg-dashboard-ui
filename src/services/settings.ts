import Web3 from 'web3';
import { bridge } from '@rsksmart/rsk-precompiled-abis';

const MAINNET_URL = 'https://public-node.rsk.co';
const BRIDGE = bridge.build(new Web3(MAINNET_URL));

export const bridgeMethods = BRIDGE.methods;
