const { calculateTip, FtoC, CtoF } = require('../math');

test('Calculate total with tip', () => {
	expect(calculateTip(100, 0.2)).toBe(120);
});

test('Convert 32F to 0C', () => {
	expect(FtoC(32)).toBe(0);
});

test('Convert 0C to 32F', () => {
	expect(CtoF(0)).toBe(32);
});

// test('faill', () => {
// 	throw new Error('It failed successfully');
// });
