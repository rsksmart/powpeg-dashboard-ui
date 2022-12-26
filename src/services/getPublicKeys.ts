import { bridgeMethods } from './settings'
import { getFederationSize } from './getFederationSize'

const federationSize = await getFederationSize
const btcRequests: string[] = []
const rskRequests: string[] = []

for (let i = 0; i < federationSize; i++) {
  btcRequests.push(bridgeMethods.getFederatorPublicKeyOfType(i, 'btc').call())
  rskRequests.push(bridgeMethods.getFederatorPublicKeyOfType(i, 'rsk').call())
}

export const getBtcPublicKeys = async () => await Promise.all(btcRequests)
export const getRskPublicKeys = async () => await Promise.all(rskRequests)
