import {Observable} from 'rxjs';
import {Market} from '../models/market.interface';
import BaseRequest from '../models/base-request';
import {CryptoDetails} from '../models/crypto-details.interface';

const baseUrl = 'https://api.coingecko.com/api/v3';
const getMarketsUrl = '/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=5&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d';
const getCryptoDetailsUrl = '/coins/';

const headersGet = {
	'Access-Control-Allow-Origin': '*'
};

export class CryptoService {
	static getMarkets():Observable<Market[]> {
		const markets = new BaseRequest(`${baseUrl}${getMarketsUrl}`, 'GET', headersGet);
		return markets.request();
	}

	static getCryptoDetails(id: string): Observable<CryptoDetails> {
		const cryptoDetails = new BaseRequest(`${baseUrl}${getCryptoDetailsUrl}${id}`, 'GET', headersGet);
		return cryptoDetails.request();
	}
}
