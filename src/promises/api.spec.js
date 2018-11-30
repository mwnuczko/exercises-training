import API from '../../data/api';

describe('REST API promises', () => {

	it('handles API.getNationalities call', (done) => {
		// imagine, that API.getNationalities executes AJAX call to a REST API
		// that is asynchronously resolved with list of nationalities
		//
		// use API.getNationalities function to fetch data and make the `expect` call pass

		expect(nationalities).toEqual(["US", "UK", "DE", "FR", "PL", "IT", "ES"])
	})

	it('handles API.getEmployee call', (done) => {
		// imagine, that API.getEmployee executes AJAX call to a REST API
		// that is asynchronously resolved with data of the employee, given by id
		// Judd Bogan is id:651065
		//
		// use API.getEmployee function to fetch appropriate employee and make the `expect` call pass

		expect(employee.firstName).toBe("Marta")
		expect(employee.lastName).toBe("Ziemann")
	})

	it('handles API.getEmployeesByNationality call', (done) => {
		// imagine, that API.getEmployeesByNationality executes AJAX call to a REST API
		// that is asynchronously resolved with list of all employees of a given nationality
		//
		// use API.getEmployeesByNationality function to fetch appropriate employees and make the `expect` call pass

		expect(employeesUK.length).toBe(170)
		expect(employeesUS.length).toBe(252)
		expect(employeesFR.length).toBe(75)
		expect(employeesDE.length).toBe(155)

		// order problem? hint:
		// no need to use API.getNationalities
		// use Promise.all to execute done, each promise can have its .then to manage assertion
	})

	it('should perform a simple business domain scenario', (done) => {
		// write a function which will calculate and return total salaries of employees filtered by nationality

		function getTotalNationalSalary(nationality){
			// function body
		}

		Promise.all([
			getTotalNationalSalary("UK"),
			getTotalNationalSalary("US"),
			getTotalNationalSalary("FR"),
			getTotalNationalSalary("DE")
		]).then(([UK, US, FR, DE]) => {
			expect(UK).toBe(913138)
			expect(US).toBe(1401960)
			expect(FR).toBe(411725)
			expect(DE).toBe(876208)
			done();
		});
	})

	it('should perform a complex business domain scenario', (done) => {
		// similarly to the previous exercise write a function which will
		// calculate and return total salaries of employees of all nationalities
		// available in the system
		// the response should be a map: { UK: amount, US: amount, ...}

		function getTotalSalariesByNationality(){
			// function body
		}

		getTotalSalariesByNationality()
			.then(({ US, UK, DE, FR }) => {
				expect(UK).toBe(913138)
				expect(US).toBe(1401960)
				expect(FR).toBe(411725)
				expect(DE).toBe(876208)
				done();
			});
	})
})
