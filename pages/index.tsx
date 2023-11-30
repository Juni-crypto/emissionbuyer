import { useState } from 'react';
import { ConnectWallet, useContract, useContractRead, Web3Button, useAddress } from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";
import { NextPage } from "next";
import { CONTRACT_ADDRESS } from "../Constants/addresses";
import 'bootstrap/dist/css/bootstrap.min.css';


const Home: NextPage = () => {
  const {
    contract
  } = useContract(CONTRACT_ADDRESS);

  const {
    data: owner,
    isLoading: isOwnerLoading,
  } = useContractRead(contract, "owner");






  const addProvider = async (contract: any) => {
    setIsProviderLoading(true);
    try {
      await contract.call("addProvider", [providerAddress, providerName]);
    } catch (error) {
      alert(error);
    } finally {
      setproviderAddress("");
      setProviderName("");
      setIsProviderLoading(false);
    }
  };

  const transferCredits = async (contract: any) => {
    setIsProviderLoading(true);
    try {
      await contract.call("transferCredits", [buyerAddress, Credits]);
    } catch (error) {
      alert(error);
    } finally {
      setbuyerAddress("");
      setCredits("");
      setIsProviderLoading(false);
    }
  };

  const addBuyer = async (contract: any) => {
    setIsBuyerLoading(true);
    try {
      await contract.call("addBuyer", [buyerAddress, buyerName]);
    } catch (error) {
      alert(error);
    } finally {
      setbuyerAddress("");
      setBuyerName("");
      setIsBuyerLoading(false);
    }
  };

  const addCredits = async (contract: any) => {
    setisCreditLoading(true);
    try {
      await contract.call("addCredits", [providerAddressforCredit, Credits]);
    } catch (error) {
      alert(error);
    } finally {
      setproviderAddress("");
      setCredits("");
      setisCreditLoading(false);
    }
  };
  const address = useAddress();
  const [providerName, setProviderName] = useState("");
  const [providerAddress, setproviderAddress] = useState("");
  const [buyerName, setBuyerName] = useState("");
  const [providerAddressforCredit, setproviderAddressforCredit] = useState("");
  const [buyerAddress, setbuyerAddress] = useState("");
  const [Credits, setCredits] = useState("");

  const [isProviderLoading, setIsProviderLoading] = useState(false);
  const [isBuyerLoading, setIsBuyerLoading] = useState(false);
  const [isCreditLoading, setisCreditLoading] = useState(false);


  const { data: isProvider, isLoading: fetchedisProviderLoading } = useContractRead(contract, "providers", [address]);

  const { data: fetchedproviderName, isLoading: isNameLoading } = useContractRead(contract, "providerNames", [address]);

  const { data: isBuyer, isLoading: fetchedisBuyerLoading } = useContractRead(contract, "buyers", [address]);

  const { data: fetchedBuyer, isLoading: isfetchedBuyerLoading } = useContractRead(contract, "buyerNames", [address]);

  const { data: creditBalance, isLoading: isCreditBalanceLoading, error: creditBalanceError } = useContractRead(contract, "getCreditBalance", [address]);


  return (
    <main className={styles.main}>
      <div >
        <div className={styles.header}>
          <ConnectWallet />
          <h1>Carbon Emission Credit</h1>
          <p>Connected Wallet Address: {address}</p>
          <div>
            {isOwnerLoading ? (
              <p>Loading...</p>
            ) : (
              <p>{address === owner ? "Owner is logged in" : ""}</p>
            )}
            {address !== owner && (
              fetchedisProviderLoading ? (
                <p>Loading provider data...</p>
              ) : (
                <>
                  {fetchedproviderName ? (
                    <p>Provider Name: {fetchedproviderName}</p>
                  ) : (
                    <p></p>
                  )}
                </>
              )
            )}
                        {address !== owner && (
              fetchedisBuyerLoading ? (
                <p>Loading Buyer data...</p>
              ) : (
                <>
                  {fetchedBuyer ? (
                    <p>Buyer Name: {fetchedBuyer}</p>
                  ) : (
                  <p></p>
                  )}
                </>
              )
            )}
            {address !== owner && (
              <>
                {isCreditBalanceLoading ? (
                  <p>Loading credit balance...</p>
                ) : (
                  <>
                    {creditBalanceError ? (
                      <p>Error fetching credit balance  </p>
                    ) : (
                      <p>Your Credit Balance: {creditBalance.toString()}</p>
                    )}
                  </>
                )}
              </>
            )}

          </div>

        </div>

        {/* Add Provider Section */}
        {address === owner && (
          <div className={styles.container} style={{ marginTop: "20px" }}>
            <div className="container">
              <div className="row">
                <h2>Add Provider</h2>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Provider Name"
                    value={providerName}
                    style={{ marginBottom: "20px" }}
                    onChange={(e) => setProviderName(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Provider Address"
                    value={providerAddress}
                    style={{ marginBottom: "20px" }}
                    onChange={(e) => setproviderAddress(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <Web3Button
                    contractAddress="0x34Db8Aa2D4364487C73FA6FbB9eA06Ee8f9E789f"
                    action={addProvider}
                    className="btn btn-success"
                    isDisabled={isProviderLoading}
                    style={{ marginBottom: "20px" }}
                  >
                    {isProviderLoading ? "Loading..." : "Add Provider"}
                  </Web3Button>
                </div>
              </div>
              <div className="row">
                <h2>Add Buyer</h2>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Buyer Name"
                    value={buyerName}
                    style={{ marginBottom: "20px" }}
                    onChange={(e) => setBuyerName(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Buyer Address"
                    value={buyerAddress}
                    style={{ marginBottom: "20px" }}
                    onChange={(e) => setbuyerAddress(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <Web3Button
                    contractAddress="0x34Db8Aa2D4364487C73FA6FbB9eA06Ee8f9E789f"
                    action={addBuyer}
                    className="btn btn-primary"
                    isDisabled={isBuyerLoading}
                    style={{ marginBottom: "20px" }}
                  >
                    {isBuyerLoading ? "Loading..." : "Add Buyer"}
                  </Web3Button>
                </div>
              </div>
              <div className="row">
                <h2>Add Credits</h2>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Provider Address"
                    value={providerAddressforCredit}
                    style={{ marginBottom: "20px" }}
                    onChange={(e) => setproviderAddressforCredit(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Number of Credits"
                    value={Credits}
                    style={{ marginBottom: "20px" }}
                    onChange={(e) => setCredits(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <Web3Button
                    contractAddress="0x34Db8Aa2D4364487C73FA6FbB9eA06Ee8f9E789f"
                    action={addCredits}
                    className="btn btn-primary"
                    isDisabled={isCreditLoading}
                    style={{ marginBottom: "20px" }}
                  >
                    {isBuyerLoading ? "Loading..." : "Add Credits"}
                  </Web3Button>
                </div>
              </div>
            </div>
          </div>
        )}
        {creditBalance?.toString() > 0 ? (
          <div className={styles.container} style={{ marginTop: "20px" }}>
            <div className="container">
              <div className="row">
                <h2 style={{ marginBottom: "20px" }}>Transfer Credits</h2>

                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Buyer Address"
                    value={buyerAddress}
                    style={{ marginBottom: "20px" }}
                    onChange={(e) => setbuyerAddress(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Transfer Credit Amount"
                    value={Credits}
                    style={{ marginBottom: "20px" }}
                    onChange={(e) => setCredits(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <Web3Button
                    contractAddress="0x34Db8Aa2D4364487C73FA6FbB9eA06Ee8f9E789f"
                    action={addProvider}
                    className="btn btn-success"
                    isDisabled={ parseInt(creditBalance?.toString()) < parseInt(Credits?.toString()) || isNaN(parseInt(Credits?.toString())) || isProviderLoading}
                    style={{ marginBottom: "20px" }}
                  >
                    {isProviderLoading ? "Loading..." : "Add Provider"}
                  </Web3Button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.container} style={{ marginTop: "20px" }} >No credits please Recharge your credits from owner</div>
        )
        }


        
      </div>
    </main>
  );
};

export default Home;
