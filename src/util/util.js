const makeRandomShadow = () => {
	const base = 10;
	const hOffset = Math.floor(base * Math.random()) + 1;
	const vOffset = Math.floor(base * Math.random()) + 1;
	const blur = Math.floor(base * Math.random()) + 1;
	const spread = Math.floor(base * Math.random()) + 1;
	return { spread, blur, hOffset, vOffset };
};

const makeRandomColor = () => {
	const colorBase = 255;

	const r = Math.floor(Math.random() * colorBase);
	const g = Math.floor(Math.random() * colorBase);
	const b = Math.floor(Math.random() * colorBase);
	const a = Math.floor(Math.random() * 10) / 10;
	return { r, g, b, a };
};

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
export { makeShadowString, makeRandomColor, makeRandomShadow };
