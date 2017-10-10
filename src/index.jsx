import React from 'react';
import { render } from 'react-dom';

import SymbolRow from "./SymbolRow.jsx";
import Tab from './Tab.jsx';
import data from './data';

const Highcharts = require('highcharts');
const stockChart = require('highcharts/highstock');

const STOCKS = "STOCKS";
const FOREX = "FOREX";

const tabsContainerStyles = {
	border: "1px solid #B9B9B9",
	borderTop: "none"
};

const tabsStyles = {
	display: "flex"
};

const tableStyles = {
	width: "100%",
	borderSpacing: 0
};

const aqt_data = data.aqt_data;
const closePrices = aqt_data.closePrices;
const dateTimes = aqt_data.dateTimes;
const length = dateTimes.length;

let chart_data = [];
for (let i = 0; i < length; i++) {
	const dt = dateTimes[i].split('T')[0].split('-');
	const utc = Date.UTC(dt[0], dt[1], dt[2]);
	const price = closePrices[i];
	chart_data.push([utc, price]);
}

const options = {

	title: {
		text: 'AAPL stock price by minute'
	},

	subtitle: {
		text: 'Using explicit breaks for nights and weekends'
	},

	rangeSelector: {
		buttons: [{
			type: 'month',
			count: 1,
			text: '1M'
		}, {
			type: 'all',
			count: 1,
			text: 'All'
		}],
		selected: 1,
		inputEnabled: false
	},

	series: [{
		name: 'AAPL',
		type: 'area',
		data: chart_data,
		gapSize: 5,
		tooltip: {
			valueDecimals: 2
		},
		fillColor: {
			linearGradient: {
				x1: 0,
				y1: 0,
				x2: 0,
				y2: 1
			},
			stops: [
				[0, Highcharts.getOptions().colors[0]],
				[1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
			]
		},
		threshold: null
	}]
};

class Chart extends React.Component{
  constructor(props){
    super(props);
  }

  componentDidMount() {

		if (this.props.modules) {
			this.props.modules.forEach(function (module) {
				module(stockChart);
			});
		}

		this.chart = new stockChart["stockChart"](
			this.props.container,
			this.props.options
		);
  }

	componentWillUnmount() {
	}

  render() {
    return React.createElement('div', { id: this.props.container });
  }
}

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			instruments: [
				{
					type: STOCKS,
					name: "Stocks",
					isActive: true,
					items: [
						{
							instrumentId: "BBG000BJ35N5",
							isActive: true,
							name: "Tencent Holdings",
							price: "loading...",
							change: "loading...",
							pctChange: "loading..."
						},
						{
							instrumentId: "0293.HK",
							isActive: false,
							name: "Cathay Pacific Air",
							price: "loading...",
							change: "loading...",
							pctChange: "loading..."
						},
						{
							instrumentId: "0941.HK",
							isActive: false,
							name: "China Mobile Ltd",
							price: "loading...",
							change: "loading...",
							pctChange: "loading..."
						},
						{
							instrumentId: "0388.HK",
							isActive: false,
							name: "Hong Kong Exchange",
							price: "loading...",
							change: "loading...",
							pctChange: "loading..."
						},
						{
							instrumentId: "0005.HK",
							isActive: false,
							name: "HSBC Holdings",
							price: "loading...",
							change: "loading...",
							pctChange: "loading..."
						},
						{
							instrumentId: "0011.HK",
							isActive: false,
							name: "Hang Seng Bank",
							price: "loading...",
							change: "loading...",
							pctChange: "loading..."
						}
					]
				},
				{
					type: FOREX,
					name: "Forex",
					isActive: false,
					items: [
						{
							instrumentId: "EUR=",
							isActive: true,
							name: "EUR/USD",
							price: "loading...",
							change: "loading...",
							pctChange: "loading..."
						}
					]
				}
			],
			activeTab: 0
		};
		this._changeTab = this._changeTab.bind(this);
		this._changeInstrument = this._changeInstrument.bind(this);
	}

	componentDidMount() {
	}

	_changeTab(activeTab) {
		let newInstruments = this.state.instruments.slice(0);
		let newActiveTab;
		newInstruments.map((e, i) => {
			if (i === activeTab) {
				e.isActive = true;
				newActiveTab = i;
			} else {
				e.isActive = false;
			}
			return e;
		});
		this.setState({
			instruments: newInstruments,
			activeTab: newActiveTab
		});
	}

	_changeInstrument(activeInstrument) {
		let newInstruments = this.state.instruments.slice(0);
		newInstruments[this.state.activeTab].items.map((e, i) => {
			if (activeInstrument === i) {
				e.isActive = true;
			} else {
				e.isActive = false;
			}
			return e;
		});
		this.setState({ instruments: newInstruments });
	}

	render() {
		const { instruments, activeTab } = this.state;
		return (
			<div style={tabsContainerStyles}>
				<div style={tabsStyles}>
					{instruments.map((e, i) => (
						<Tab
							key={i}
							index={i}
							changeTab={this._changeTab}
							isActive={e.isActive}
							name={e.type}
						/>
					))}
				</div>
				<div>
					<Chart container={this.props.chart_container} options={this.props.options}/>
				</div>
				<div>
					<table style={tableStyles}>
						<tbody>
						{instruments[activeTab].items.map((e, i) => (
							<SymbolRow
								key={i}
								index={i}
								changeInstrument={this._changeInstrument}
								{...e}
							/>
						))}
						</tbody>
					</table>
				</div>
			</div>
		);
	}
}

const element = React.createElement(App, { chart_container: 'chart', options: options });

render(element, document.getElementById('container'));
