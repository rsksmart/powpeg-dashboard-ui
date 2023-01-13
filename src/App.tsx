import './App.css';
import { useEffect, useState } from 'react';
import { getBtcPublicKeys, getRskPublicKeys } from './services/getPublicKeys';
import { rskAddressFromPublicKey } from './utils/rskAddressFromPublicKey';

function App() {
  const [btcPubKeys, setBtcPubKeys] = useState<string[]>([]);
  const [rskPubKeys, setRskPubKeys] = useState<string[]>([]);

  useEffect(() => {
    getBtcPublicKeys()
      .then((keys) => setBtcPubKeys(keys))
      .catch((err) => console.log(err));
    getRskPublicKeys()
      .then((keys) => setRskPubKeys(keys))
      .catch((err) => console.log(err));
  }, []);

  if (btcPubKeys.length === 0 || rskPubKeys.length === 0) return <p>Loading...</p>;

  return (
    <table className="table" data-testid="btc-rsk-addresses-table">
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
            <td>{btcKey.slice(0,8)}...{btcKey.slice(62,68)}</td>
            <td>{rskPubKeys[index].slice(0,8)}...{rskPubKeys[index].slice(62,68)}</td>
            <td>
              <a
                target="_blank"
                href={`https://explorer.rsk.co/address/0x${rskAddressFromPublicKey(
                  rskPubKeys[index]
                )}`}
                rel="noreferrer"
              >
                0x{rskAddressFromPublicKey(rskPubKeys[index]).slice(0,6)}...{rskAddressFromPublicKey(rskPubKeys[index]).slice(36,42)}
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default App;
7