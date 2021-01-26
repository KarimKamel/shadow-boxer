import React from 'react';
import useStyles from '../styles/ObjectWithShadowStyles';

export default function ObjectWithShadow({ shadowString }) {
	const classes = useStyles(shadowString);
	return <div className={classes.object}></div>;
}
