import React, { useState, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Container from '@material-ui/core/Container';
import { Grid, Typography } from '@material-ui/core';
import ShadowParamsInput from './ShadowParamsInput';
import TabPanel from './TabPanel';
import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';

import ObjectWithShadow from './ObjectWithShadow';

const useStyles = createUseStyles({
	gridRoot: {
		display: 'flex',
		flexDirection: 'row',
	},
	gridItem: {
		margin: 'auto !important',
	},
	innerGridContainer: {
		display: 'flex',
		flexDirection: 'column',
	},
	innerGridItem: {
		margin: 'auto !important',
	},
	paperRoot: {
		flexGrow: 1,
		marginBottom: '2rem',
	},
	tabLabelIcon: {
		minHeight: '0px !important',
	},
	tabRoot: {
		maxWidth: '30% !important',
		alignItems: 'flex-end !important',
	},
	tabWrapper: {
		flexDirection: 'row !important',

		justifyContent: 'space-around !important',
		'& svg': {
			order: 1,
			height: '0.9rem',
			position: 'absolute',
			right: '0',

			'&:hover': {
				transform: 'scale(1.2)',
			},
		},
	},
	object: {
		margin: '5rem auto',
		backgroundColor: 'red',
		width: '200px',
		height: '200px',
		boxShadow: (shadow) => shadow,
	},
});

export default function ObjectContainer({ children, ...props }) {
	const [shadow, setShadow] = useState([{}]);
	const [value, setValue] = useState(0);
	const [color, setColor] = useState([{ r: 0, g: 0, b: 0, a: '0.5' }]);
	const [shadowText, setShadowText] = useState('');

	const handleValueChange = (e, value, name, index) => {
		let shadowClone = [...shadow];
		shadowClone[index] = { ...shadowClone[index], [name]: value };
		setShadow(shadowClone);
	};

	const classes = useStyles();
	const handleCloseIconClick = (event, index) => {
		event.stopPropagation();
		shadow.splice(index, 1);
		color.splice(index, 1);

		setShadow([...shadow]);
		setColor([...color]);
		let newValue = value;
		if (value !== 0) {
			newValue = newValue - 1;
		}
		setValue(newValue);
	};
	const handleNewIconClick = (event, index) => {
		setShadow([...shadow, {}]);
		setColor([...color, { r: 0, g: 0, b: 0, a: 0.5 }]);
	};

	const handleColorChange = (value, index) => {
		console.log(value, index);
		const { r, g, b, a } = value.rgb;
		shadow[index].color = `rgb(${r},${g},${b},${a})`;
		setShadow([...shadow]);
		const colorClone = [...color];
		colorClone[index] = value.rgb;
		setColor([...colorClone]);
	};
	const handleTabChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<Container>
			<Typography variant='h3' align='center' gutterBottom>
				the shadow boxer
			</Typography>
			<Grid container className={classes.gridRoot} spacing={3}>
				<Grid item xs={6}>
					<Tabs
						value={value}
						onChange={handleTabChange}
						variant='fullWidth'
						indicatorColor='primary'
						textColor='primary'
						aria-label='icon tabs example'
					>
						{shadow.map((s, i) => (
							<Tab
								key={i}
								className={classes.tab}
								classes={{
									wrapper: classes.tabWrapper,
									root: classes.tabRoot,
									labelIcon: classes.tabLabelIcon,
								}}
								label={<span>{i}</span>}
								icon={
									<CloseIcon
										onClick={(event) => handleCloseIconClick(event, i)}
									/>
								}
							/>
						))}
						{shadow.length < 3 && (
							<Tab
								classes={{
									wrapper: classes.tabWrapper,
									root: classes.tabRoot,
									labelIcon: classes.tabLabelIcon,
								}}
								label={'add a shadow'}
								onClick={(event) => handleNewIconClick(event)}
								icon={<AddIcon />}
							></Tab>
						)}
					</Tabs>

					{shadow.map((s, i) => (
						<TabPanel key={i} value={value} index={i}>
							<ShadowParamsInput
								key={i}
								index={i}
								color={color[i]}
								handleValueChange={handleValueChange}
								handleColorChange={handleColorChange}
							/>
						</TabPanel>
					))}
				</Grid>{' '}
				<Grid item xs={6} className={classes.gridItem}>
					<Grid className={classes.innerGridContainer} container>
						<Grid item>
							{/* <ObjectWithShadow shadow={shadow} color={color} /> */}
							<ObjectWithShadow shadow={shadow} color={color} />
						</Grid>
						<Grid item>
							<Typography variant='h6' align='center'>
								{shadowText}
							</Typography>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</Container>
	);
}
