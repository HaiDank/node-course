const calculateTip = (total, tipPercent) => {
	const tip = total * tipPercent;
	return total + tip;
};

const FtoC = (degree) => (degree - 32) / 1.8;

const CtoF = (degree) => degree * 1.8 + 32;

module.exports = { calculateTip, FtoC, CtoF };
