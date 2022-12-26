import './App.css'
import { useEffect, useState } from 'react'
import { getBtcPublicKeys, getRskPublicKeys } from './services/getPublicKeys'

function App() {
  const [btcPubKeys, setBtcPubKeys] = useState<string[]>([])
  const [rskPubKeys, setRskPubKeys] = useState<string[]>([])

  useEffect(() => {
    getBtcPublicKeys()
      .then((keys) => setBtcPubKeys(keys))
      .catch((err) => console.log(err))
    getRskPublicKeys()
      .then((keys) => setRskPubKeys(keys))
      .catch((err) => console.log(err))
  }, [])

  return (
    <table>
      <thead>
        <tr>
          <th colSpan={3}>PowPeg Dashboard</th>
        </tr>
        <tr>
          <th>Index</th>
          <th>Bitcoin public key</th>
          <th>RSK public key</th>
        </tr>
      </thead>
      <tbody>
        {btcPubKeys.map((btcKey, index) => (
          <tr key={btcKey}>
            <td>{index + 1}</td>
            <td>{btcKey}</td>
            <td>{rskPubKeys[index]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default App
