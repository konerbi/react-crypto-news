import { Market } from "../models/market.interface";
import React, { Component } from "react";
import CryptoListItem from "./CryptoListItem";
import {CryptoService} from '../services/crypto.service';
import {map, mergeMap, take} from 'rxjs/operators';
import {CryptoDetails} from '../models/crypto-details.interface';
import CryptoDetailsComponent from './CryptoDetailsComponent';
import {Subscription, interval} from 'rxjs';

class CryptoList extends Component<{ cryptos: Market[] }, { currentCryptoDetails: CryptoDetails | null }> {
  private detailsSubscription: Subscription = new Subscription();
  private detailsRefreshSubscription: Subscription = new Subscription();

  constructor(props: { cryptos: Market[]; } | Readonly<{ cryptos: Market[]; }>) {
    super(props);
    this.state = { currentCryptoDetails: null };
  }

  componentWillUnmount() {
    this.detailsSubscription.unsubscribe();
    this.detailsRefreshSubscription.unsubscribe();
  }

  render() {
    let { cryptos } = this.props;
    let currentCrypto: Market;
    let isCryptoDetailsVisible = false;
    let refreshInterval = 60000;

    const runRefreshDetails = () => {
      this.detailsRefreshSubscription = interval(refreshInterval)
        .pipe(
          mergeMap((i) => {
            return CryptoService.getCryptoDetails(currentCrypto.id);
          })
        )
        .subscribe((crypto) => {
          console.log('===refresh====');
          this.setState({ currentCryptoDetails: crypto });
        });
    }

    const openDetails = (crypto: CryptoDetails | null) => {
      this.detailsSubscription.unsubscribe();

      this.setState({ currentCryptoDetails: crypto });
      isCryptoDetailsVisible = true;

      runRefreshDetails();
    }

    const handleListItemClick = (index: number) => {
      this.detailsSubscription.unsubscribe();
      this.detailsRefreshSubscription.unsubscribe();

      currentCrypto = cryptos[index];

      this.detailsSubscription = CryptoService.getCryptoDetails(currentCrypto.id)
        .pipe(
          take(1),
          map((res) => {
            if (res) {
              return res;
            } else {
              return null;
            }
          })
        )
        .subscribe((crypto) => {
          console.log('===getCryptoDetails====');
          openDetails(crypto);
        });
    }

    return (
      <>
        <div className={`crypto-list ${isCryptoDetailsVisible ? "hide" : "show"}`}>
          {cryptos.map((item, index) => {
            return <CryptoListItem key={'crypto-item' + index} crypto={item} onClick={() => handleListItemClick(index)}/>;
          })}
        </div>
        <div className={`crypto-details ${isCryptoDetailsVisible ? "show" : "hide"}`}>
          <CryptoDetailsComponent crypto={this.state.currentCryptoDetails}/>
        </div>
      </>
    );
  }
}

export default CryptoList;
