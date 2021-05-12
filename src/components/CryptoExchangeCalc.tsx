import SyncAltIcon from '@material-ui/icons/SyncAlt';
import React, {useEffect, useState} from 'react';

interface CalcProps {
	crypto: string | undefined;
	currency: string;
	value: number | undefined;
}
const CryptoExchangeCalc = (props: CalcProps) => {
	const [cryptoAmount, setCryptoAmount] = useState(0);
	const [currencyAmount, setCurrencyAmount] = useState(0);
	const [isToggled, setIsToggled] = useState(false);

	const handleToggle = () => {
		setIsToggled(!isToggled);
	}

	const handleExchangeCrypto = (event: any) => {
		setCryptoAmount(event.target.value);
		if (props.value) {
			setCurrencyAmount(event.target.value * props.value);
		}
	}

	const handleExchangeCurrency = (event: any) => {
		setCurrencyAmount(event.target.value);
		if (props.value) {
			setCryptoAmount(event.target.value / props.value);
		}
	}

	useEffect(() => {
		if (props.value) {
			setCurrencyAmount(cryptoAmount * props.value);
		}
	}, [props.value]);

	return (
		<div className={`crypto-calc-input-container ${isToggled ? "toggled" : ""}`}>
			<div className="crypto-calc-field">
				<div className="calc-currency-symbol">{props.crypto}</div>
				<input type="number"
				       id="crypto-input"
				       min={0}
				       value={cryptoAmount}
				       onChange={(event)=> handleExchangeCrypto(event)}/>
			</div>
			<SyncAltIcon className="change-icon" onClick={() => handleToggle()} />
			<div className="crypto-calc-field">
				<div className="calc-currency-symbol">{props.currency}</div>
				<input type="number"
				       id="currency-input"
				       min={0}
				       value={currencyAmount}
				       onChange={(event)=> handleExchangeCurrency(event)}/>
			</div>
		</div>
	);
}

export default CryptoExchangeCalc;
