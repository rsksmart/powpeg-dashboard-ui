import './App.css'
import Web3 from 'web3'
import { bridge } from '@rsksmart/rsk-precompiled-abis'
import { useEffect, useState } from 'react'

const MAINNET_URL = 'https://public-node.rsk.co'
const BRIDGE = bridge.build(new Web3(MAINNET_URL))

function App() {
  const [federationSize, setFederationSize] = useState(0)

  useEffect(() => {
    BRIDGE.methods
      .getFederationSize()
      .call()
      .then((size: number) => setFederationSize(size))
  }, [])

  return (
    <div>
      <h1>PowPeg Dashboard</h1>
      <span>Federation size: {federationSize}</span>
    </div>
  )
}

export default App
