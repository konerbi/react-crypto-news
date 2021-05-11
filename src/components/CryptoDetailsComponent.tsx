import {Component} from 'react';
import {CryptoDetails, Currencies} from '../models/crypto-details.interface';
import NumberFormat from 'react-number-format';
import {constants} from 'crypto';
import {CurrencySymbolEnum} from '../models/currency-symbol.enum';

class CryptoDetailsComponent extends Component<{ crypto: CryptoDetails | null }, { currentCurrency: string }> {
	constructor(props: { crypto: CryptoDetails | null }) {
		super(props);
		this.state = {
			currentCurrency: 'usd'
		};
	}
	render() {
		let {crypto} = this.props;

		function isValueNegative(value: number | undefined) {
			return Number(value) <= 0;
		}

		return (
			<div>
				<div className="header-container">
					<div className="crypto-details-header">
						<img
							src={crypto?.image.small}
							alt={crypto?.name}
							className="crypto-details-image"
						/>
						<h1 className="crypto-details-name">{crypto?.name + '(' + crypto?.symbol.toUpperCase() + ')'}</h1>
					</div>
					<div className="crypto-details-value">
						<h1>
							<NumberFormat value={crypto?.market_data.current_price[this.state.currentCurrency as keyof Currencies]}
							              displayType={'text'}
							              thousandSeparator={true}
							              prefix={CurrencySymbolEnum[this.state.currentCurrency as keyof Currencies]} />
						</h1>
						<p className={`crypto-percentage ${isValueNegative(crypto?.market_data.market_cap_change_percentage_24h_in_currency[this.state.currentCurrency as keyof Currencies]) ? "red" : "green"}`}>
							{crypto?.market_data.market_cap_change_percentage_24h_in_currency[this.state.currentCurrency as keyof Currencies]}%
						</p>
					</div>
					{/*<></> //currency select*/}
				</div>
				<div className="data-container">
					<div>
						<div>
							<h4>Market Cap</h4>
							<p>
								<NumberFormat value={crypto?.market_data.market_cap[this.state.currentCurrency as keyof Currencies]}
								              displayType={'text'}
								              thousandSeparator={true}
								              prefix={CurrencySymbolEnum[this.state.currentCurrency as keyof Currencies]} />
							</p>
						</div>
						<div>
							<h4>24h Low / 24h High</h4>
							<p>
								<NumberFormat value={crypto?.market_data.low_24h[this.state.currentCurrency as keyof Currencies]}
								              displayType={'text'}
								              thousandSeparator={true}
								              prefix={CurrencySymbolEnum[this.state.currentCurrency as keyof Currencies]} />
								<span> / </span>
								<NumberFormat value={crypto?.market_data.high_24h[this.state.currentCurrency as keyof Currencies]}
								              displayType={'text'}
								              thousandSeparator={true}
								              prefix={CurrencySymbolEnum[this.state.currentCurrency as keyof Currencies]} />
							</p>
						</div>
						<div>
							<h4>Fully Diluted Valuation</h4>
							<p>
								<NumberFormat value={crypto?.market_data.fully_diluted_valuation[this.state.currentCurrency as keyof Currencies]}
								              displayType={'text'}
								              thousandSeparator={true}
								              prefix={CurrencySymbolEnum[this.state.currentCurrency as keyof Currencies]} />
							</p>
						</div>
					</div>

					<div>
						<div>
							<h4>24 Hour Trading Vol</h4>
							<p>
								<NumberFormat value={crypto?.market_data.total_volume[this.state.currentCurrency as keyof Currencies]}
								              displayType={'text'}
								              thousandSeparator={true}
								              prefix={CurrencySymbolEnum[this.state.currentCurrency as keyof Currencies]} />
							</p>
						</div>
						<div>
							<h4>Circulating Supply</h4>
							<p>
								<NumberFormat value={crypto?.market_data.circulating_supply}
								              displayType={'text'}
								              thousandSeparator={true}
								              prefix={CurrencySymbolEnum[this.state.currentCurrency as keyof Currencies]} />
								<span> / </span>
								<NumberFormat value={crypto?.market_data.max_supply}
								              displayType={'text'}
								              thousandSeparator={true}
								              prefix={CurrencySymbolEnum[this.state.currentCurrency as keyof Currencies]} />
							</p>
						</div>
						<div>
							<h4>Max Supply</h4>
							<p>
								<NumberFormat value={crypto?.market_data.max_supply}
								              displayType={'text'}
								              thousandSeparator={true}
								              prefix={CurrencySymbolEnum[this.state.currentCurrency as keyof Currencies]} />
							</p>
						</div>
					</div>
				</div>

				{/*Market Cap*/}
				{/*$1,072,504,626,371*/}


				{/*24h Low / 24h High*/}
				{/*$56,636.68 / $59,577.80*/}

				{/*Fully Diluted Valuation*/}
				{/*$1,204,052,010,000*/}

				{/*24 Hour Trading Vol*/}
				{/*$64,623,539,571*/}


				{/*Circulating Supply*/}
				{/*18,705,668 / 21,000,000*/}

				{/*Max Supply*/}
				{/*21,000,000*/}

			</div>
		);
	}
}

export default CryptoDetailsComponent;
