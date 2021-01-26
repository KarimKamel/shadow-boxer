import React, { useState, useEffect } from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import { Grid, Typography } from '@material-ui/core';
import ShadowParamsInput from './ShadowParamsInput';
import TabPanel from './TabPanel';
import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';
import ObjectWithShadow from './ObjectWithShadow';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import {
	makeShadowString,
	makeRandomColor,
	makeRandomShadow,
} from '../util/util';
import useStyles from '../styles/ObjectContainerStyles';

export default function ObjectContainer() {
	const [shadow, setShadow] = useState([makeRandomShadow()]);
	const [tabValue, setTabValue] = useState(0);
	const [color, setColor] = useState([makeRandomColor()]);
	const [shadowString, setShadowString] = useState(
		makeShadowString(shadow, color),
	);

	const classes = useStyles();

	const handleValueChange = (e, value, name, index) => {
		let shadowClone = [...shadow];
		shadowClone[index] = { ...shadowClone[index], [name]: value };
		setShadow(shadowClone);
	};

	const handleCloseIconClick = (event, index) => {
		event.stopPropagation();
		shadow.splice(index, 1);
		color.splice(index, 1);

		setShadow([...shadow]);
		setColor([...color]);
		let newValue = tabValue;
		if (tabValue !== 0) {
			newValue = newValue - 1;
		}
		setTabValue(newValue);
	};
	const handleNewIconClick = (event, index) => {
		setShadow([...shadow, makeRandomShadow()]);
		setColor([...color, makeRandomColor()]);
	};

	const handleColorChange = (value, index) => {
		const colorClone = [...color];
		colorClone[index] = value.rgb;
		setColor([...colorClone]);
	};
	const handleTabChange = (event, newValue) => {
		setTabValue(newValue);
	};

	useEffect(() => {
		const shadowString = makeShadowString(shadow, color);
		setShadowString(shadowString);
	}, [shadow, color]);

	return (
		<Container className={classes.root}>
			<Box mt={3}>
				<Card className={classes.cardRoot}>
					<CardContent className={classes.cardContent} variant='outlined'>
						<Box p={3} pb={5}>
							<Card className={classes.titleCard}>
								<Typography variant='h3' align='center'>
									the shadow boxer
								</Typography>
							</Card>
						</Box>

						<Grid container className={classes.gridRoot}>
							<Grid item xs={6} className={classes.gridItem}>
								<Tabs
									classes={{
										indicator: classes.tabIndicator,
									}}
									value={tabValue}
									onChange={handleTabChange}
									variant='fullWidth'
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
												selected: classes.selected,
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
									<TabPanel key={i} value={tabValue} index={i}>
										<ShadowParamsInput
											key={i}
											shadow={shadow[i]}
											index={i}
											color={color[i]}
											handleValueChange={handleValueChange}
											handleColorChange={handleColorChange}
										/>
									</TabPanel>
								))}
							</Grid>{' '}
							<Grid item xs={6} className={classes.gridItem}>
								<ObjectWithShadow shadowString={shadowString} />
							</Grid>{' '}
						</Grid>
						<Grid container>
							<Grid item xs={12} className={classes.gridItem}>
								<Box mt={5} mb={0} ml={3}>
									<Typography variant='h6'>
										{' '}
										Use the String below to achieve this effect:
									</Typography>
								</Box>
								<Box m={2}>
									<Card>
										<CardContent className={classes.ShadowStringContainer}>
											<Typography
												classes={{ root: classes.shadowStringDisplay }}
												align='center'
											>
												{shadowString}
											</Typography>
										</CardContent>
									</Card>
								</Box>
							</Grid>
						</Grid>
					</CardContent>
				</Card>
			</Box>
		</Container>
	);
}
