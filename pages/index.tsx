import { ConnectWallet, useContract, useContractRead } from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";
import { NextPage } from "next";
import { CONTRACT_ADDRESS } from "../Constants/addresses";

const Home: NextPage = () => {
  const {
    contract 
  } = useContract(CONTRACT_ADDRESS);

  const {
    data: owner,
    isLoading: isOwnerLoading,
  } = useContractRead(contract, "owner")

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <ConnectWallet />
        <h1>Carbon Emission Credit </h1>
        <div className={styles.ownercontainer}>
          {isOwnerLoading ? (
            <p>Loading...</p>
          ) : (
            <p>Owner: {owner}</p>
          )
          }
        </div>
      </div>
    </main>
  );
};

export default Home;
