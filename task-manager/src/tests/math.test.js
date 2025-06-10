import { calculateTip, FtoC, CtoF } from '../math.js';

test('Calculate total with tip', () => {
	expect(calculateTip(100, 0.2)).toBe(120);
});

test('Convert 32F to 0C', () => {
	expect(FtoC(32)).toBe(0);
});

test('Convert 0C to 32F', () => {
	expect(CtoF(0)).toBe(32);
});

// test('Async test', (done) => {
// 	add(1, 1).then((res) => {
// 		expect(res).toBe(2);
// 		done();
// 	});
// });

// test('Async await test', async () => {
// 	const sum = await add(1, 1)

//   expect(sum).toBe(2)
// });
