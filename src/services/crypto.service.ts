import {Observable} from 'rxjs';
import {Market} from '../models/market.interface';
import BaseRequest from '../models/base-request';

const baseUrl = 'https://api.coingecko.com/api/v3/';
const getMarketsUrl = '/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=5&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d';

const headersGet = {
	'Access-Control-Allow-Origin': '*'
};

export const CryptoService = {
	getMarkets: (): Observable<Market[]> => {
		const headers = {
			'Access-Control-Allow-Origin': '*'
		};
		const markets = new BaseRequest(`${baseUrl}${getMarketsUrl}`, 'GET', headersGet);
		return markets.request();
	},


}
