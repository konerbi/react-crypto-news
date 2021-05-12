import React from "react";
import { Market } from "../models/market.interface";
import { Grid } from "@material-ui/core";

class CryptoListItem extends React.Component<{ crypto: Market; onClick: any }> {
  render() {
    let { crypto, onClick } = this.props;

    return (
      <div onClick={onClick}>
        <div className="crypto-row">
          <Grid item lg={2} md={1} sm={1} xs={1} className="crypto crypto-data-field">
            <div className="crypto">
              <img
                src={crypto.image}
                alt={crypto.name}
                className="crypto-img"
              />
              <h1 className="crypto-h1">{crypto.name}</h1>
            </div>
          </Grid>

          <Grid item lg={10} md={11} sm={11} xs={11} className="crypto-data">
            <Grid item lg={1} md={1} sm={1} xs={1}>
              <p className="crypto-symbol">{crypto.symbol}</p>
            </Grid>
            <Grid item lg={2} md={2} sm={2} xs={2} className="crypto-data-field">
              <p>${crypto.current_price}</p>
            </Grid>
            <Grid item lg={3} md={4} sm={4} xs={4} className="crypto-data-field">
              <p>
                ${crypto.market_cap.toLocaleString()}
              </p>
            </Grid>
            <Grid item lg={1} md={1} sm={1} xs={1} className="crypto-data-field">
              <p
                className={`${crypto.price_change_percentage_24h < 0 ? "red" : "green"}`}
              >
                {crypto.price_change_percentage_24h.toFixed(2)}%
              </p>
            </Grid>
            <Grid item lg={3} md={3} sm={3} xs={3} className="crypto-data-field">
              <p>
                ${crypto.total_volume.toLocaleString()}
              </p>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

export default CryptoListItem;
