interface MarketData {
	total_supply: number;
	max_supply: number;
	circulating_supply: number;
	current_price: Currencies;
	market_cap: Currencies;
	market_cap_change_percentage_24h_in_currency: Currencies;
	fully_diluted_valuation: Currencies;
	total_volume: Currencies;
	high_24h: Currencies;
	low_24h: Currencies;
}

export interface Currencies {
	usd: number;
	eur: number;
	chf: number;
	gbp: number;
	cny: number;
	jpy: number;
	rub: number;
	pln: number;
}

export interface CryptoDetails {
	id: string;
	symbol: string;
	name: string;
	description: {
		en: string;
	};
	image: {
		thumb: string;
		small: string;
		large: string;
	},
	market_data: MarketData;
}
