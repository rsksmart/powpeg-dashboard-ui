import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import App from '../App';
import { rskAddressFromPublicKey } from '../utils/rskAddressFromPublicKey';

vi.mock('../services/getPublicKeys', () => ({
  getBtcPublicKeys: vi
    .fn()
    .mockResolvedValue(['0x020ace50bab1230f8002a0bfe619482af74b338cc9e4c956add228df47e6adae1c']),
  getRskPublicKeys: vi
    .fn()
    .mockResolvedValue(['0x0305a99716bcdbb4c0686906e77daf8f7e59e769d1f358a88a23e3552376f14ed2']),
}));

const mockedAddress =
  '0x' +
  rskAddressFromPublicKey('0x0305a99716bcdbb4c0686906e77daf8f7e59e769d1f358a88a23e3552376f14ed2');

test('renders content', async () => {
  render(<App />);
  expect(await screen.findByTestId('btc-rsk-addresses-table')).toContainHTML(
    '<td>0x020ace50bab1230f8002a0bfe619482af74b338cc9e4c956add228df47e6adae1c</td>'
  );
  expect(await screen.findByTestId('btc-rsk-addresses-table')).toContainHTML(
    '<td>0x0305a99716bcdbb4c0686906e77daf8f7e59e769d1f358a88a23e3552376f14ed2</td>'
  );
  expect(await screen.findByTestId('btc-rsk-addresses-table')).toContainHTML(
    `<td>${mockedAddress}</td>`
  );
});

test('render the exact amount of columns', async () => {
  render(<App/>);
  expect(await screen.findByTestId('btc-rsk-addresses-table')).toContainHTML('<th>Index</th>')
  expect(await screen.findByTestId('btc-rsk-addresses-table')).toContainHTML('<th>Bitcoin public key</th>')
  expect(await screen.findByTestId('btc-rsk-addresses-table')).toContainHTML('<th>RSK public key</th>')
  expect(await screen.findByTestId('btc-rsk-addresses-table')).toContainHTML('<th>Address</th>')
})
