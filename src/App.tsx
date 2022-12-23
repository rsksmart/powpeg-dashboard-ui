import './App.css'
import Web3 from 'web3'
import { bridge } from '@rsksmart/rsk-precompiled-abis'
import { useEffect, useState } from 'react'

const MAINNET_URL = 'https://public-node.rsk.co'
const BRIDGE = bridge.build(new Web3(MAINNET_URL))

function App() {
  const [federationSize, setFederationSize] = useState(0)
  const [btcPubKeys, setBtcPubKeys] = useState([])

  // function getFederationSize() {
  //   return BRIDGE.methods
  //     .getFederationSize()
  //     .call()
  //     .then((size: number) => setFederationSize(size))
  // }

  async function getBtcPublicKeys() {
    BRIDGE.methods
      .getFederationSize()
      .call()
      .then((size: number) => {
        setFederationSize(size)
        const requests = []
        for (let fed = 0; fed < size; fed++) {
          requests.push(BRIDGE.methods.getFederatorPublicKeyOfType(fed, 'btc').call())
        }
        Promise.all(requests)
          .then((responses) => setBtcPubKeys(responses))
          .catch((e) => console.log(e))
      })
  }

  useEffect(() => {
    getBtcPublicKeys().catch((e) => console.log(e))
  }, [])

  return (
    <div>
      <h1>PowPeg Dashboard</h1>
      <span>Federation size: {federationSize}</span>
      <ul>
        {btcPubKeys.length > 0 ? (
          btcPubKeys.map((key) => <li key={key}>{key}</li>)
        ) : (
          <li>Loading...</li>
        )}
      </ul>
    </div>
  )
}

export default App
