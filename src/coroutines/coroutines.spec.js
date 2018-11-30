import API from '../../data/api';
import { async } from '../../data/async';

describe('coroutines', () => {

	// consider examples from promises/api.spec.js file
	// (!) fetch appropriate employees by their IDs: 8569129, 254808831, 58197, 651065

	it('should perform asynchronous calls sequentially', (done) => {
		// write a coroutine which will request data of 4 employees SEQUENTIALLY (when one finished,
		// request another one) and return list of these 4 employees to make `expect` calls pass

		function* fetchEmployees(){
			// coroutine body
		}

		async(fetchEmployees)()
			.then(([e1, e2, e3, e4]) => {
				expect(e1.salary).toBe(7191)
				expect(e2.salary).toBe(5941)
				expect(e3.salary).toBe(4157)
				expect(e4.salary).toBe(8146)
				done();
			});
	})

	it('should perform asynchronous calls sequentially using for..of loop', (done) => {
		function* fetchEmployees(...ids){
			// async function body
		}

		async(fetchEmployees)(id1, id2, id3, id4 /* put IDs here */)
			.then(([e1, e2, e3, e4]) => {
				expect(e1.salary).toBe(7191)
				expect(e2.salary).toBe(5941)
				expect(e3.salary).toBe(4157)
				expect(e4.salary).toBe(8146)
				done();
			});
	})

	it('should perform asynchronous calls simultaneously', (done) => {
		// write a coroutine which will request data of 4 employees SIMULTANEOUSLY (all at the same time)
		// and return list of these 4 employees to make `expect` calls pass
		// the data expectations are the same as in previous exercise

		function* fetchEmployees(){
			// coroutine body
		}

		async(fetchEmployees)()
			.then(([e1, e2, e3, e4]) => {
				expect(e1.salary).toBe(7191)
				expect(e2.salary).toBe(5941)
				expect(e3.salary).toBe(4157)
				expect(e4.salary).toBe(8146)
				done();
			});
	})

	it('should perform a simple business domain scenario', (done) => {
		// write a coroutine which will calculate and return total salaries of employees filtered by nationality

		function* getTotalNationalSalary(nationality){
			// coroutine body
		}

		let asyncGetNationalSalary = async(getTotalNationalSalary)
		Promise.all([
			asyncGetNationalSalary("UK"),
			asyncGetNationalSalary("US"),
			asyncGetNationalSalary("FR"),
			asyncGetNationalSalary("DE")
		]).then(salaries => {
			let [UK, US, FR, DE] = salaries
			expect(UK).toBe(913138)
			expect(US).toBe(1401960)
			expect(FR).toBe(411725)
			expect(DE).toBe(876208)
			done();
		});
	})

	it('should perform a complex business domain scenario', (done) => {
		// similarly to the previous exercise write a coroutine which will
		// calculate and return total salaries of employees of all nationalities
		// available in the system
		// the response should be a map: { UK: amount, US: amount, ...}

		function* getTotalSalariesByNationality(){
			// coroutine body
		}

		async(getTotalSalariesByNationality)()
			.then(salaries => {
				let { US, UK, DE, FR } = salaries
				expect(UK).toBe(913138)
				expect(US).toBe(1401960)
				expect(FR).toBe(411725)
				expect(DE).toBe(876208)
				done();
			});
	})
})
