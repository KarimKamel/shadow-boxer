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
import AppBar from '@material-ui/core/AppBar';
import ObjectWithShadow from './ObjectWithShadow';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

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
			colorString = `rgba(0,0,0,0.5})`;
		}

		shadowString += `${shadow[i].hOffset}px ${shadow[i].vOffset}px ${shadow[i].blur}px ${shadow[i].spread}px ${colorString}`;
		if (i < shadow.length - 1) {
			shadowString += ',';
		}
	}
	return shadowString;
};

const useStyles = createUseStyles({
	root: {},
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
	shadowStringDisplay: {
		marginTop: '2rem !important',
	},
	// cardContent: {
	// 	display: 'flex',
	// 	width: '100vw',
	// },
});

export default function ObjectContainer({ children, ...props }) {
	const [shadow, setShadow] = useState([{}]);
	const [value, setValue] = useState(0);
	const [color, setColor] = useState([{ r: 0, g: 0, b: 0, a: '0.5' }]);
	const [shadowString, setShadowString] = useState(
		makeShadowString(shadow, color),
	);

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
		const colorClone = [...color];
		colorClone[index] = value.rgb;
		setColor([...colorClone]);
	};
	const handleTabChange = (event, newValue) => {
		setValue(newValue);
	};

	useEffect(() => {
		const shadowString = makeShadowString(shadow, color);
		setShadowString(shadowString);
	}, [shadow, color]);

	return (
		<Container className={classes.root}>
			<Typography variant='h3' align='center' gutterBottom>
				the shadow boxer
			</Typography>
			<Card>
				<CardContent className={classes.cardContent}>
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
							{/* <Grid className={classes.innerGridContainer} container>
								<Grid item>
									<ObjectWithShadow shadow={shadow} color={color} />
								</Grid>
								<Grid item>
									<Typography variant='h6' align='center'>
										{shadowText}
									</Typography>
								</Grid>
							</Grid> */}

							<ObjectWithShadow shadowString={shadowString} />
						</Grid>{' '}
					</Grid>
					<Grid container>
						<Grid item xs={12}>
							<Typography
								classes={{ root: classes.shadowStringDisplay }}
								// className={classes.shadowStringDisplay}
								align='center'
							>
								{shadowString}
							</Typography>
						</Grid>
					</Grid>
				</CardContent>
			</Card>
		</Container>
	);
}
