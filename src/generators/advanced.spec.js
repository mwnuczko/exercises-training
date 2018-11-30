describe('generators', () => {

	function* evenNumbers() {
		let result, value = 0;
		while (true) {
			result = yield value;
			value += 2;
			if (result) {
				return result
			}
		}
	}

	function* oddNumbers() {
		let result, value = 1;
		while (true) {
			result = yield value;
			value += 2;
			if (result) {
				return result
			}
		}
	}

	it('can run in infinite loops', () => {
		const odds = oddNumbers()

		expect(odds.next().value).toBe(/* YOUR ANSWER */)
		expect(odds.next().value).toBe(/* YOUR ANSWER */)
		expect(odds.next().value).toBe(/* YOUR ANSWER */)
		expect(odds.next("Clinton lost").done).toBe(/* YOUR ANSWER */)
		expect(odds.next().value).toBe(/* YOUR ANSWER */)

		const even = evenNumbers()

		expect(even.next().value).toBe(/* YOUR ANSWER */)
		expect(even.next().value).toBe(/* YOUR ANSWER */)
		expect(even.next().value).toBe(/* YOUR ANSWER */)
		expect(even.next("Trump won").done).toBe(/* YOUR ANSWER */)
		expect(even.next().value).toBe(/* YOUR ANSWER */)
	})

	it('can be terminated manually using .return()', () => {
		const odds = oddNumbers()

		expect(odds.next().value).toBe(/* YOUR ANSWER */)
		expect(odds.return("Clinton").value).toBe(/* YOUR ANSWER */)
		expect(odds.next().done).toBe(/* YOUR ANSWER */)
		expect(odds.next().value).toBe(/* YOUR ANSWER */)

		const even = evenNumbers()

		expect(even.next().value).toBe(/* YOUR ANSWER */)
		expect(even.next("Trump").value).toBe(/* YOUR ANSWER */)
		expect(even.next().done).toBe(/* YOUR ANSWER */)
		expect(even.next().value).toBe(/* YOUR ANSWER */)
	})

	function* allNumbers(type) {
		while (true) {
			if (type === 'even') {
				type = yield* evenNumbers()
			} else if (type === 'odd') {
				type = yield* oddNumbers()
			} else {
				type = yield
			}
		}
	}

	it('can delegate execution to another generator', () => {
		const numbers = allNumbers()

		expect(numbers.next().value).toBe(/* YOUR ANSWER */)

		expect(numbers.next("even").value).toBe(/* YOUR ANSWER */)
		expect(numbers.next().value).toBe(/* YOUR ANSWER */)
		expect(numbers.next().value).toBe(/* YOUR ANSWER */)

		expect(numbers.next("odd").value).toBe(/* YOUR ANSWER */)
		expect(numbers.next().value).toBe(/* YOUR ANSWER */)
		expect(numbers.next().value).toBe(/* YOUR ANSWER */)

		expect(numbers.next("God bless America").value).toBe(/* YOUR ANSWER */)
		expect(numbers.next().value).toBe(/* YOUR ANSWER */)

		expect(numbers.next("even").value).toBe(/* YOUR ANSWER */)
		expect(numbers.next().value).toBe(/* YOUR ANSWER */)
	})
})
