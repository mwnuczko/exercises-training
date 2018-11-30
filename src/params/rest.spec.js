describe('rest parameters', () => {

	it('catch non-specified params', () => {
		function resty(first, second, ...others) {
			return others
		}

		expect(resty().length).toBe(/* YOUR ANSWER */)
		expect(resty(1).length).toBe(/* YOUR ANSWER */)
		expect(resty(1, 2).length).toBe(/* YOUR ANSWER */)
		expect(resty(1, 2, 3).length).toBe(/* YOUR ANSWER */)
		expect(resty(1, 2, 3, undefined, 5, undefined, 7, undefined, 9, 10).length).toBe(/* YOUR ANSWER */)
	})

	it('has a different length than `arguments`', () => {
		function resty(first, second, ...others) {
			return others.length == arguments.length
		}

		expect(resty()).toBe(/* YOUR ANSWER */)
		expect(resty(1)).toBe(/* YOUR ANSWER */)
		expect(resty(1, 2)).toBe(/* YOUR ANSWER */)
		expect(resty(1, 2, 3)).toBe(/* YOUR ANSWER */)
		expect(resty(1, 2, 3, undefined, 5, undefined, 7, undefined, 9, 10)).toBe(/* YOUR ANSWER */)
	})

})
