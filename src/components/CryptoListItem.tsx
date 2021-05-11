import React from "react";
import { Link } from "react-router-dom";
import { Market } from "../models/market.interface";
import { Grid } from "@material-ui/core";

class CryptoListItem extends React.Component<{ crypto: Market; onClick: any }> {
  render() {
    let { crypto, onClick } = this.props;

    return (
      <div onClick={onClick}>
        {/*<Grid>*/}
        <div className="crypto-row">
          <Grid item xs={3} sm={3} className="crypto crypto-data-field">
            <Grid item xs={6} sm={10} className="crypto">
              <img
                src={crypto.image}
                alt={crypto.name}
                className="crypto-img"
              />
              <h1 className="crypto-h1">{crypto.name}</h1>
            </Grid>
            <Grid item xs={6} sm={2}>
              <p className="crypto-symbol">{crypto.symbol}</p>
            </Grid>
          </Grid>
          <Grid item xs={9} sm={9} className="crypto-data">
            <Grid item xs={2} sm={2} className="crypto-data-field">
              <p>${crypto.current_price}</p>
            </Grid>
            <Grid item xs={3} sm={3} className="crypto-data-field">
              <p>
                ${crypto.market_cap.toLocaleString()}
              </p>
            </Grid>
            <Grid item xs={1} sm={1} className="crypto-data-field">
              <p
                className={`${crypto.price_change_percentage_24h < 0 ? "red" : "green"}`}
              >
                {crypto.price_change_percentage_24h.toFixed(2)}%
              </p>
            </Grid>
            <Grid item xs={3} sm={3} className="crypto-data-field">
              <p>
                ${crypto.total_volume.toLocaleString()}
              </p>
            </Grid>
          </Grid>
        </div>
        {/*</Grid>*/}
        {/*<div className="crypto-container">*/}
        {/*  <div className="crypto-row">*/}
        {/*    <div className="crypto">*/}
        {/*      <img*/}
        {/*        src={crypto.image}*/}
        {/*        alt={crypto.name}*/}
        {/*        className="crypto-img"*/}
        {/*      />*/}
        {/*      <h1 className="crypto-h1">{crypto.name}</h1>*/}
        {/*      <p className="crypto-symbol">{crypto.symbol}</p>*/}
        {/*    </div>*/}
        {/*    <div className="crypto-data">*/}
        {/*      <p className="crypto-price">${crypto.current_price}</p>*/}
        {/*      <p className="crypto-volume">*/}
        {/*        ${crypto.market_cap.toLocaleString()}*/}
        {/*      </p>*/}
        {/*      <p*/}
        {/*        className={`crypto-percent ${*/}
        {/*          crypto.price_change_percentage_24h < 0 ? "red" : "green"*/}
        {/*        }`}*/}
        {/*      >*/}
        {/*        {crypto.price_change_percentage_24h.toFixed(2)}%*/}
        {/*      </p>*/}
        {/*      <p className="crypto-marketcap">*/}
        {/*        ${crypto.total_volume.toLocaleString()}*/}
        {/*      </p>*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*</div>*/}
      </div>
    );
  }
}

export default CryptoListItem;
