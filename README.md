speclight is a simple JavaScript BDD framework for [Jasmine](https://jasmine.github.io/)

Look at the Tests project for examples:
```js
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

/* Output with jasmine-spec-reporter:
  In order to know how much money I can save
        As a Math Idiot
        I want to add two numbers
    √ Given I enter 5
    √  And I enter 6
    √ When I press add
    √ Then The result should be 11
*/
```
