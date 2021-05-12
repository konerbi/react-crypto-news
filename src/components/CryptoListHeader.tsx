import {Grid} from '@material-ui/core';
import React from 'react';

const CryptoListHeader = () => {
	return (
	<div className="crypto-row crypto-list-header">
		<Grid item lg={2} md={1} sm={1} xs={1} className="crypto crypto-data-field"></Grid>

		<Grid item lg={10} md={11} sm={11} xs={11} className="crypto-data">
			<Grid item lg={1} md={1} sm={1} xs={1}>
				<p>Symbol</p>
			</Grid>
			<Grid item lg={2} md={2} sm={2} xs={2} className="crypto-data-field">
				<p>Price</p>
			</Grid>
			<Grid item lg={3} md={4} sm={4} xs={4} className="crypto-data-field">
				<p>Market cap</p>
			</Grid>
			<Grid item lg={1} md={1} sm={1} xs={1} className="crypto-data-field">
				<p>24h</p>
			</Grid>
			<Grid item lg={3} md={3} sm={3} xs={3} className="crypto-data-field">
				<p>Total volume</p>
			</Grid>
		</Grid>
	</div>
	)
}

export default CryptoListHeader;
