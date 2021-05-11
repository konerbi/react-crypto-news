import { Market } from "../models/market.interface";
import React, { Component } from "react";
import CryptoListItem from "./CryptoListItem";
import {CryptoService} from '../services/crypto.service';
import {map, mergeMap, take} from 'rxjs/operators';
import {CryptoDetails} from '../models/crypto-details.interface';
import CryptoDetailsComponent from './CryptoDetailsComponent';
import {Subscription, interval} from 'rxjs';
import {CircularProgress} from '@material-ui/core';
import {Alert} from '@material-ui/lab';

interface CryptoListState {
  currentCryptoDetails: CryptoDetails | null;
  isLoadingDetails: boolean;
  isCryptoDetailsVisible: boolean;
  loadingDetailsFailed: boolean;
}

interface CryptoListParams {
  cryptos: Market[];
}

class CryptoList extends Component<CryptoListParams, CryptoListState> {
  private detailsSubscription: Subscription = new Subscription();
  private detailsRefreshSubscription: Subscription = new Subscription();

  constructor(props: CryptoListParams | Readonly<CryptoListParams>) {
    super(props);
    this.state = {
      currentCryptoDetails: null,
      isLoadingDetails: false,
      isCryptoDetailsVisible: false,
      loadingDetailsFailed: false
    };
  }

  componentWillUnmount() {
    this.detailsSubscription.unsubscribe();
    this.detailsRefreshSubscription.unsubscribe();
  }

  render() {
    let { cryptos } = this.props;
    let currentCrypto: Market;
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

      this.setState({
        currentCryptoDetails: crypto,
        isLoadingDetails: false,
        isCryptoDetailsVisible: true
      });

      runRefreshDetails();
    }

    const handleListItemClick = (index: number) => {
      if (!this.state.isLoadingDetails) {
        this.detailsSubscription.unsubscribe();
        this.detailsRefreshSubscription.unsubscribe();

        this.setState({isLoadingDetails: true});

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
          .subscribe(
            (crypto) => openDetails(crypto),
            () => this.setState({
              isLoadingDetails: false,
              loadingDetailsFailed: true
            })
          );
      }
    }

    const handleClose = () => {
      this.setState({isCryptoDetailsVisible: false});
    }

    return (
      <>
        <Alert severity="error"
               className={`error-alert ${this.state.loadingDetailsFailed ? "show" : "hide"}`}
               onClose={() => {this.setState({loadingDetailsFailed: false})}}>
          Error loading details — try again
        </Alert>
        <CircularProgress className={`progress ${this.state.isLoadingDetails ? "show" : "hide"}`}/>
        <div className={`crypto-list ${this.state.isCryptoDetailsVisible ? "hide" : "show"} ${this.state.isLoadingDetails ? "disabled" : "enabled"}`}>
          {cryptos.map((item, index) => {
            return <CryptoListItem key={'crypto-item' + index} crypto={item} onClick={() => handleListItemClick(index)}/>;
          })}
        </div>
        <div className={`crypto-details ${this.state.isCryptoDetailsVisible ? "show" : "hide"}`}>
          <CryptoDetailsComponent crypto={this.state.currentCryptoDetails} onClose={() => handleClose()}/>
        </div>
      </>
    );
  }
}

export default CryptoList;
