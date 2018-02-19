import { given, when, then, and } from '../src/speclight';

describe(
	`In order to know how much money I can save
As a Math Idiot
I want to add two numbers`,
	() => {
		let a: number;
		let b: number;
		let actual: number;

		given`I enter ${5}`(input => a = input);
		and`I enter ${6}`(input => b = input);
		when`I press add`(() => actual = add(a, b));
		then`The result should be ${11}`(expected => expect(expected).toBe(actual));
	});

function add(a: number, b: number) {
	return a + b;
}
