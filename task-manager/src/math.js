export const calculateTip = (total, tipPercent) => {
	const tip = total * tipPercent;
	return total + tip;
};

export const FtoC = (degree) => (degree - 32) / 1.8;

export const CtoF = (degree) => degree * 1.8 + 32;

export const add = (a, b) => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(a + b);
		}, 2000);
	});
};

