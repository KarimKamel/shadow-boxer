import React from 'react';
import { createUseStyles } from 'react-jss';
const useStyles = createUseStyles({
	object: {
		margin: 'auto',
		backgroundColor: 'red',
		width: '200px',
		height: '200px',
		boxShadow: (shadow) => shadow,
	},
});

export default function ObjectWithShadow({ shadowString }) {
	const classes = useStyles(shadowString);
	return <div className={classes.object}></div>;
}
