import db from '../../data/data';

describe('Functional programming', function(){
	// database is defined in data/data.js file
	const employees = db.getEmployees();

	describe('Processing data simple scenario', function(){

		it('is possible using for loop, yet inconvenient', function(){
			// calculate total amount of bonus
			// given to all employees with nationality equal "DE"
			// whose salary is below 5000
			// where bonus equals 20% of the salary

			// use FOR loops
			let totalBonus;
			// for(...; ...; ...)

			expect(totalBonus).toEqual(42499);
		});

		it('is more readable and more convenient using functional programming', function(){
			// calculate total amount of bonus
			// given to all employees with nationality equal "DE"
			// whose salary is below 5000
			// where bonus equals 20% of the salary

			// use functional programming
			let totalBonus;
			// = employees
			// .filter(...)
			// .map(...)
			// .reduce(...)

			expect(totalBonus).toEqual(42499);
		});

	});

	it('makes it easy to filter data by condition', function(){
		// fetch the employee with ID 651065
		let employee651065;

		expect(employee651065.id).toEqual(651065);
		expect(employee651065.firstName).toEqual("Marta");
		expect(employee651065.personalInfo.address.city).toEqual("Calista furt");
		expect(employee651065.personalInfo.phone).toEqual("(134) 899-1656");

		// fetch a employee with nationality US
		let USEmployee;

		expect(USEmployee.nationality).toEqual("US");
	});

	it('makes it easy to filter data by condition', function(){
		// fetch all employees with nationality DE only
		let DEEmployees;

		expect(DEEmployees.length).toEqual(155);
		expect(DEEmployees[0].lastName).toEqual("Biesenbach");
		expect(DEEmployees[10].lastName).toEqual("Verniest");
		expect(DEEmployees[20].lastName).toEqual("Steding");

		// fetch all employees with gmail.com email domain only
		let GmailEmployees;

		expect(GmailEmployees[0].lastName).toEqual("Kruszewski");
		expect(GmailEmployees[10].lastName).toEqual("Radecki");
		expect(GmailEmployees[20].lastName).toEqual("Benedetti");
	});

	it('makes it easy to search for single objects', function(){
		// fetch the phone to the richest employee who is American
		// or (gives the same result in this case)
		// fetch the phone to the richest American
		let maxSalary;

		expect(RichestUSEmployeePhone).toEqual("623-711-7686 x7328");
	});

});
