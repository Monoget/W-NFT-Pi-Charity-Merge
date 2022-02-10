import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "./redux/blockchain/blockchainActions";
import { fetchData } from "./redux/data/dataActions";
import * as s from "./styles/globalStyles";
import styled from "styled-components";
import i1 from "./assets/images/1.png";
import './css/app.9874624c.css';

export const StyledButton = styled.button`
  padding: 10px;
  border-radius: 50px;
  border: none;
  background-color: #ffffff;
  padding: 10px;
  font-weight: bold;
  color: #000000;
  width: 100px;
  cursor: pointer;
  box-shadow: 0px 6px 0px -2px rgba(250, 250, 250, 0.3);
  -webkit-box-shadow: 0px 6px 0px -2px rgba(250, 250, 250, 0.3);
  -moz-box-shadow: 0px 6px 0px -2px rgba(250, 250, 250, 0.3);
  :active {
    box-shadow: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
  }
`;

export const ResponsiveWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: stretched;
  align-items: stretched;
  width: 100%;
  @media (min-width: 767px) {
    flex-direction: row;
  }
`;

export const StyledImg = styled.img`
  width: 200px;
  height: 200px;
  @media (min-width: 767px) {
    width: 350px;
    height: 350px;
  }
  transition: width 0.5s;
  transition: height 0.5s;
`;

function App() {
  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  const data = useSelector((state) => state.data);
  const [feedback, setFeedback] = useState("Maybe it's your lucky day.");
  const [claimingNft, setClaimingNft] = useState(false);

  const claimNFTs = (_amount) => {
    if (_amount <= 0) {
      return;
    }
    setFeedback("Minting your Nerdy Coder Clone...");
    setClaimingNft(true);
    blockchain.smartContract.methods
      .mint(blockchain.account, _amount)
      .send({
        gasLimit: "285000",
        to: "0x827acb09a2dc20e39c9aad7f7190d9bc53534192",
        from: blockchain.account,
        value: blockchain.web3.utils.toWei((100 * _amount).toString(), "ether"),
      })
      .once("error", (err) => {
        console.log(err);
        setFeedback("Sorry, something went wrong please try again later.");
        setClaimingNft(false);
      })
      .then((receipt) => {
        setFeedback(
          "WOW, you now own a Nerdy Coder Clone. go visit Opensea.io to view it."
        );
        setClaimingNft(false);
        dispatch(fetchData(blockchain.account));
      });
  };

  const getData = () => {
    if (blockchain.account !== "" && blockchain.smartContract !== null) {
      dispatch(fetchData(blockchain.account));
    }
  };

  useEffect(() => {
    getData();
  }, [blockchain.account]);

  return (
      <div>
        <div className="page" style={{ backgroundImage:`url("./img/gold-digger-house-4@1x.2c3b3a00.png")` }}>
          <div className="viewContainer mint">
            <div className="mintCard">
              <center>
                <p className="title1 mintTitle"
                   style={{fontSize: "70px", fontWeight: "bold", color: 'white'}}>THE PI CHARITY CLUB</p>
                <p className="title1 mintTitle" style={{fontSize: "20px", color: 'white'}}>PI Holders are official
                  investors of school in
                  Africa</p>
              </center>
              <div className="inline22">
                <button className="mintButton" style={{borderRadius: '50%'}}>-</button>
                <button className="mintButton1 selected">1</button>
                <button className="mintButton" style={{borderRadius: '50%'}}>+</button>
              </div>
              <p className="text nftPrice titleFont" style={{fontSize: 25}}>Price : X.X ETH</p>
              <div className="text nbNft titleFont" style={{fontSize: 25}}>Minted : XXX / 1800</div>
              <center>
                <button className="connectButton titleFont" style={{fontWeight: "bold"}}>Connect wallet
                </button>
                <br/>
                <button className="validateButton titleFont" style={{fontWeight: "bold"}}> Mint</button>
              </center>
            </div>
          </div>
          <img src="./img/redlip.png" className="redlip22"/>
          <img src="./img/coin-5@1x_cut.a0f51c8b.png" className="coin22"/>
        </div>
      </div>
  );
}

export default App;
