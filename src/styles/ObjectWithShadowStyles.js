import { createUseStyles } from 'react-jss';
const useStyles = createUseStyles({
	object: {
		margin: 'auto',
		backgroundColor: 'red',
		width: '200px',
		height: '200px',
		border: '2px solid black',
		boxShadow: (shadow) => shadow,
	},
});

export default useStyles;
