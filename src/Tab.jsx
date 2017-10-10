import React from "react";
import { extend } from "./Util";

const Radium = require('radium');

const tabStyles = {
	flex: 1,
	color: "#32aae1",
	backgroundColor: "#F5F5F5",
	borderTop: "1px solid #B9B9B9",
	borderRight: "1px solid #B9B9B9",
	borderBottom: "1px solid #B9B9B9",
	':lastOfType': {
		borderRight: 'none !important'
	}
};

const activeTabStyles = {
	color: "#222",
	backgroundColor: "transparent",
	borderBottom: 'none'
};

export default Radium(({ index, name, isActive, changeTab }) => (
	<div style={isActive ? extend(tabStyles, activeTabStyles) : tabStyles}
	     onClick={() => changeTab(index)}>{name}</div>
));
