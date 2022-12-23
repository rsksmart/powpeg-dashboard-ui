import './App.css'
import Web3 from 'web3'
import { bridge } from '@rsksmart/rsk-precompiled-abis'
import { useEffect, useState } from 'react'

const MAINNET_URL = 'https://public-node.rsk.co'
const BRIDGE = bridge.build(new Web3(MAINNET_URL))

function App() {
  const [federationSize, setFederationSize] = useState(0)
  const [btcPubKeys, setBtcPubKeys] = useState([])

  function getFederationSize() {
    return BRIDGE.methods
      .getFederationSize()
      .call()
      .then((size: number) => setFederationSize(size))
  }

  async function getBtcPublicKeys() {
    const requests = []
    for (let fed = 0; fed < federationSize; fed++) {
      requests.push(BRIDGE.methods.getFederatorPublicKeyOfType(fed, 'btc').call())
    }
    await Promise.all(requests).then((responses) => setBtcPubKeys(responses))
  }

  useEffect(() => {
    getFederationSize().then(getBtcPublicKeys)
  }, [])

  return (
    <div>
      <h1>PowPeg Dashboard</h1>
      <span>Federation size: {federationSize}</span>
      <ul>
        {btcPubKeys.map((key) => (
          <li key={key}>{key}</li>
        ))}
      </ul>
    </div>
  )
}

export default App
