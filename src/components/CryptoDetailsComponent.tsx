import React, {ChangeEvent, Component} from 'react';
import {CryptoDetails, Currencies} from '../models/crypto-details.interface';
import NumberFormat from 'react-number-format';
import {CurrencySymbolEnum} from '../models/currency-symbol.enum';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import CloseIcon from '@material-ui/icons/Close';
import CryptoExchangeCalc from './CryptoExchangeCalc';

class CryptoDetailsComponent extends Component<{ crypto: CryptoDetails | null, onClose: any }, { currentCurrency: string }> {
	constructor(props: { crypto: CryptoDetails | null, onClose: any }) {
		super(props);
		this.state = {
			currentCurrency: 'usd'
		};
	}
	render() {
		let {crypto} = this.props;
		let availableCurrencies = Object.values(CurrencySymbolEnum);
		let availableCurrenciesValues = Object.keys(CurrencySymbolEnum);

		function isValueNegative(value: number | undefined) {
			return Number(value) <= 0;
		}

		const handleCurrencyChange = (event: ChangeEvent<{ value: unknown }>) => {
			this.setState({currentCurrency: event.target.value as string});
		}

		const handleCloseDetails = () => {
			this.props.onClose();
		}

		return (
			<div>
				<div className="crypto-details-header-container">
					<div className="crypto-details-header">
						<div className="crypto-name">
							<img
								src={crypto?.image.small}
								alt={crypto?.name}
								className="crypto-details-image"
							/>
							<h1 className="crypto-details-name">{crypto?.name + '(' + crypto?.symbol.toUpperCase() + ')'}</h1>
							<h1 className="crypto-details-symbol">{crypto?.symbol.toUpperCase()}</h1>
						</div>
						<CloseIcon className="close-icon" onClick={() => handleCloseDetails()} />
					</div>
					<div className="crypto-details-subheader">
						<Select className="currency-select"
							value={this.state.currentCurrency as keyof Currencies}
							onChange={handleCurrencyChange}
							label="Currency"
						>
							{availableCurrencies.map((item, index) => {
								return <MenuItem key={`select-item-${index}`} value={availableCurrenciesValues[index]}>{item}</MenuItem>;
							})}
						</Select>

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
					</div>
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

				<CryptoExchangeCalc crypto={crypto?.symbol.toUpperCase()}
				                    currency={CurrencySymbolEnum[this.state.currentCurrency as keyof Currencies]}
				                    value={crypto?.market_data.current_price[this.state.currentCurrency as keyof Currencies]}/>
			</div>
		);
	}
}

export default CryptoDetailsComponent;
