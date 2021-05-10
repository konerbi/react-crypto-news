import {Component} from 'react';
import {CryptoDetails} from '../models/crypto-details.interface';

class CryptoDetailsComponent extends Component<{ crypto: CryptoDetails | null }> {
	render() {
		let {crypto} = this.props;
		return (
			<div>
				<div className="crypto-details-page">
					<div className="crypto-details-container">
						<img
							src={crypto?.image.large}
							alt={crypto?.name}
							className="crypto-details-image"
						/>
						<h1 className="crypto-details-name">{crypto?.name}</h1>
						<p className="crypto-details-ticker">{crypto?.symbol}</p>
						<p className="crypto-details-current">
							{crypto?.market_data.current_price.usd}
						</p>
					</div>
				</div>
			</div>
		);
	}
}

export default CryptoDetailsComponent;
