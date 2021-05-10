import React from "react";
import { Link } from "react-router-dom";
import { Market } from "../models/market.interface";

class CryptoListItem extends React.Component<{ crypto: Market, onClick: any }> {
  render() {
    let { crypto, onClick } = this.props;

    return (
      <div onClick={onClick}>
      {/*<Link to={`/crypto/${crypto.id}`}>*/}
        <a>
          <div className="crypto-container">
            <div className="crypto-row">
              <div className="crypto">
                <img
                  src={crypto.image}
                  alt={crypto.name}
                  className="crypto-img"
                />
                <h1 className="crypto-h1">{crypto.name}</h1>
                <p className="crypto-symbol">{crypto.symbol}</p>
              </div>
              <div className="crypto-data">
                <p className="crypto-price">${crypto.current_price}</p>
                <p className="crypto-volume">
                  ${crypto.market_cap.toLocaleString()}
                </p>
                <p
                  className={`crypto-percent ${
                    crypto.price_change_percentage_24h < 0 ? "red" : "green"
                  }`}
                >
                  {crypto.price_change_percentage_24h.toFixed(2)}%
                </p>
                <p className="crypto-marketcap">
                  Mkt Cap: ${crypto.total_volume.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </a>
      {/*</Link>*/}
      </div>
    );

  }
}

export default CryptoListItem;
