import './App.css'
import { useEffect, useState } from 'react'
import { getBtcPublicKeys, getRskPublicKeys } from './services/getPublicKeys'
import { rskAddressFromPublicKey } from './utils/rskAddressFromPublicKey'

function App() {
  const [btcPubKeys, setBtcPubKeys] = useState<string[]>([])
  const [rskPubKeys, setRskPubKeys] = useState<string[]>([])
  const [address, setAddress] = useState<string>('')

  useEffect(() => {
    getBtcPublicKeys()
      .then((keys) => setBtcPubKeys(keys))
      .catch((err) => console.log(err))
    getRskPublicKeys()
      .then((keys) => setRskPubKeys(keys))
      .catch((err) => console.log(err))
  }, [])

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Index</th>
          <th>Bitcoin public key</th>
          <th>RSK public key</th>
          <th>Address</th>
        </tr>
      </thead>
      <tbody>
        {btcPubKeys.map((btcKey, index) => (
          <tr key={btcKey}>
            <td>{index + 1}</td>
            <td>{btcKey}</td>
            <td>{rskPubKeys[index]}</td>
            <td onClick={(e) => setAddress(e.target.innerHTML)}>
              <a
                target="_blank"
                href={`https://explorer.rsk.co/address/${address}`}
                rel="noreferrer"
              >
                0x{rskAddressFromPublicKey(rskPubKeys[index])}
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default App
