import React from 'react';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import useStyles from '../styles/InputSliderStyles';

function valuetext(value) {
	return `${value}px`;
}

export default function InputSlider(props) {
	const classes = useStyles();
	const { maxVal, minVal } = props.params;
	const { label, name, value, handleOnChange } = props;

	return (
		<div className={classes.root}>
			<Typography id='discrete-slider-custom' gutterBottom>
				{label}
			</Typography>
			<Slider
				name={name}
				value={value}
				min={minVal}
				max={maxVal}
				onChange={(e, v) => {
					handleOnChange(e, v, name);
				}}
				getAriaValueText={valuetext}
				aria-labelledby='discrete-slider-custom'
				step={1}
				valueLabelDisplay='auto'
				// marks={marks}
			/>
		</div>
	);
}
