import { Market } from "../models/market.interface";
import React from "react";
import CryptoListItem from "./CryptoListItem";

class CryptoList extends React.Component<{ cryptos: Market[] }> {
  render() {
    let { cryptos } = this.props;
    return (
      <>
        {cryptos.map((item) => {
          return <CryptoListItem crypto={item} />;
        })}
      </>
    );
  }
}

export default CryptoList;
