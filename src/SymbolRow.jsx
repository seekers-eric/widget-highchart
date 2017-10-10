import React from 'react';

const cellPadding = '3px 5px'

const firstCellStyles = {
	width: '40%',
	padding: cellPadding
}

const cellStyles = {
	width: '20%',
	padding: cellPadding
}

const activeStyles = {
	backgroundColor: '#F5F5F5'
}

export default ({ index, name, price, change, isActive, pctChange, changeInstrument }) =>
	<tr style={isActive ? activeStyles : null} onClick={() => changeInstrument(index)}>
		<td style={firstCellStyles}>{name}</td>
		<td style={cellStyles}>{price}</td>
		<td style={cellStyles}>{change}</td>
		<td style={cellStyles}>{pctChange}</td>
	</tr>
