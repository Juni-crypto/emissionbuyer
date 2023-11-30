import { Web3Button } from "@thirdweb-dev/react";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function AddProviderComponent({ provider, name }) {
  return (
    <Web3Button
      contractAddress="0x34Db8Aa2D4364487C73FA6FbB9eA06Ee8f9E789f"
      action={(contract) => {
        contract.call("addProvider", [provider, name]);
      }}
      className="btn btn-success"
    >
      Add Provider
    </Web3Button>
  );
}
