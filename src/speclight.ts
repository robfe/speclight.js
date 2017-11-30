export interface BddTemplateTagFunction {
	(strings: TemplateStringsArray):
		(step: (done: DoneFn) => void) => void;
	<T1>(strings: TemplateStringsArray, a1: T1):
		(step: (a1: T1, done: DoneFn) => void) => void;
	<T1, T2>(strings: TemplateStringsArray, a1: T1, a2: T2):
		(step: (a1: T1, a2: T2, done: DoneFn) => void) => void;
	<T1, T2, T3>(strings: TemplateStringsArray, a1: T1, a2: T2, a3: T3):
		(step: (a1: T1, a2: T2, a3: T3, done: DoneFn) => void) => void;
	<T1, T2, T3, T4>(strings: TemplateStringsArray, a1: T1, a2: T2, a3: T3, a4: T4):
		(step: (a1: T1, a2: T2, a3: T3, a4: T4, done: DoneFn) => void) => void;
	<T1, T2, T3, T4, T5>(strings: TemplateStringsArray, a1: T1, a2: T2, a3: T3, a4: T4, a5: T5):
		(step: (a1: T1, a2: T2, a3: T3, a4: T4, a5: T5, done: DoneFn) => void) => void;
	<T1, T2, T3, T4, T5, T6>(strings: TemplateStringsArray, a1: T1, a2: T2, a3: T3, a4: T4, a5: T5, a6: T6):
		(step: (a1: T1, a2: T2, a3: T3, a4: T4, a5: T5, a6: T6, done: DoneFn) => void) => void;
	<T1, T2, T3, T4, T5, T6, T7>(strings: TemplateStringsArray, a1: T1, a2: T2, a3: T3, a4: T4, a5: T5, a6: T6, a7: T7):
		(step: (a1: T1, a2: T2, a3: T3, a4: T4, a5: T5, a6: T6, a7: T7, done: DoneFn) => void) => void;
	<T1, T2, T3, T4, T5, T6, T7, T8>(strings: TemplateStringsArray, a1: T1, a2: T2, a3: T3, a4: T4, a5: T5, a6: T6, a7: T7, a8: T8):
		(step: (a1: T1, a2: T2, a3: T3, a4: T4, a5: T5, a6: T6, a7: T7, a8: T8, done: DoneFn) => void) => void;
}

export const given: BddTemplateTagFunction = function (strings: TemplateStringsArray, ...args: any[]) {
	return (step: Function) => {
		bddIt('Given', strings, args, step);
	};
};

export const when: BddTemplateTagFunction = function (strings: TemplateStringsArray, ...args: any[]) {
	return (step: Function) => {
		bddIt('When', strings, args, step);
	};
};

export const then: BddTemplateTagFunction = function (strings: TemplateStringsArray, ...args: any[]) {
	return (step: Function) => {
		bddIt('Then', strings, args, step);
	};
};

export const and: BddTemplateTagFunction = function (strings: TemplateStringsArray, ...args: any[]) {
	return (step: Function) => {
		bddIt(' And', strings, args, step);
	};
};

function formatArg(args: object[], i: number) {
	if (i >= args.length) {
		return '';
	}
	const a = args[i];
	switch (typeof a) {
		case 'string': return `"${a}"`;
	}

	return a.toString();
}

function bddIt(stepType: string, strings: TemplateStringsArray, args: any[], step: Function) {
	const text = `${stepType} ${strings.reduce((result, item, index) => result + item + formatArg(args, index), '')}`;
	if (step.length === args.length) {
		it(text, () => step(...args));
	} else if (step.length === args.length + 1) {
		it(text, done => step(...args, done));
	} else {
		throw new Error(`Expected a step function with ${args.length} or ${args.length + 1} arguments (to match values "${args}") but got ${step}`);
	}
}
