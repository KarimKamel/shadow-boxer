import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
	gridRoot: {
		display: 'flex',
		flexDirection: 'row',
	},

	gridItem: {
		// margin: 'auto !important',
		backgroundColor: 'aliceblue',
		display: 'flex',
		flexDirection: 'column',
	},

	cardContent: { padding: '0 !important' },
	tabLabelIcon: {
		minHeight: '0px !important',
		// backgroundColor: 'blue !important',
		padding: '0 !important',
	},
	selected: {
		backgroundColor: '#b4b0e3 !important',
		borderRadius: '0.3rem !important',
	},
	tabRoot: {
		maxWidth: '30% !important',
		alignItems: 'flex-end !important',
		padding: '0 !important',

		// backgroundColor: 'blue !important',
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
	tabIndicator: {
		backgroundColor: 'unset !important	',
	},
	ShadowStringContainer: {
		padding: '1rem !important',
	},
	shadowStringDisplay: {
		// marginTop: '2rem !important',
		fontFamily: 'Courier New, monospace !important',
	},
});
export default useStyles;
