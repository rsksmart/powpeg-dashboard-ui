import { utils } from 'ethers'

export function rskAddressFromPublicKey(pubKey: string) {
  const uncompressed = utils.computePublicKey(pubKey, false)
  const bytes = utils.arrayify(uncompressed).slice(1)

  return utils.keccak256(bytes).slice(-40)
}
