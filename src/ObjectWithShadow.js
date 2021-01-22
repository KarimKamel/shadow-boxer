import React, { useState, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
const useStyles = createUseStyles({
	object: {
		margin: '5rem auto',
		backgroundColor: 'red',
		width: '200px',
		height: '200px',
		boxShadow: (shadow) => shadow,
	},
});

export default function ObjectWithShadow({ shadow, color }) {
	const makeShadowString = (shadow, color) => {
		let shadowString = '';
		let colorString = '';
		for (let i = 0; i < shadow.length; i++) {
			shadow[i].hOffset = shadow[i].hOffset || 10;
			shadow[i].vOffset = shadow[i].vOffset || 10;
			shadow[i].blur = shadow[i].blur || 10;
			shadow[i].spread = shadow[i].spread || 10;
			if (color[i]) {
				let { r, g, b, a } = color[i];
				colorString = `rgba(${r},${g},${b},${a})`;
			} else {
				let { r, g, b, a } = { r: 0, g: 0, b: 0, a: 0.5 };
				colorString = `rgba(${r},${g},${b},${a})`;
			}

			shadowString += `${shadow[i].hOffset}px ${shadow[i].vOffset}px ${shadow[i].blur}px ${shadow[i].spread}px ${colorString}`;
			if (i < shadow.length - 1) {
				shadowString += ',';
			}
		}
		return shadowString;
	};

	const classes = useStyles(makeShadowString(shadow, color));
	return <div className={classes.object}></div>;
}
