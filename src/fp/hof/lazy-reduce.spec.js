import db from '../../../data/data';

// database is defined in `db/employees.json` file
const employees = db.getEmployees();

describe('Lazy Reducers', () => {

	// implement `lazyReduce`

	it('summing up numbers', () => {
		// calculate sum of numbers passed
		// implement `sumReducer`
		let myLazySum;

		expect(myLazySum(1)).toEqual(1);
		expect(myLazySum(5)).toEqual(6);
		expect(myLazySum(10)).toEqual(16);
		expect(myLazySum(30)).toEqual(46);
	});

	it('concatenating strings', () => {
		// calculate text by concatenating phrases passed
		// implement `concatReducer`
		let myLazyConcat;

		expect(myLazyConcat('to')).toEqual('to');
		expect(myLazyConcat('be')).toEqual('to be');
		expect(myLazyConcat('or')).toEqual('to be or');
		expect(myLazyConcat('not')).toEqual('to be or not');
		expect(myLazyConcat('to')).toEqual('to be or not to');
		expect(myLazyConcat('be')).toEqual('to be or not to be');
	});

	it('summing up employee salary sum', () => {
		// calculate employee salary sum by first 10 employees passed
		const first10Employees = employees.slice(0, 10);

		// VARIANT A: reduce
		let employeeSalarySum;

		expect(employeeSalarySum).toEqual(53338);

		// VARIANT B: lazy reduce
		let employeeSalaryLazySum;

		let sum;
		for (let e of first10Employees) {
			sum = employeeSalaryLazySum(e);
		}
		expect(sum).toEqual(53338);
	});

	it('retrieving unique skills of employees: Italian, contractors, earning 9000-10000 (inclusive)', () => {
		// unique skills - no repetition, no counts (how many emplloyees have the skill)
		// employee criteria:
		// - nationality: "IT"
		// - contractType: "contractor"
		// - 9000 <= salary <= 10000
		let uniqueSkills;

		const checkSkills = ['Java', 'JVM', 'JSP', 'Hibernate', 'JavaScript', 'CoffeeScript', 'react', 'redux', 'Angular', 'AngularJS', 'jQuery', 'HTML','data structures', 'scrum', 'MVC', 'Scalability', 'scala', 'spring', 'algorithms', 'testing', 'sql', 'Security', 'C#', '.net', 'EntityFramework', 'OData', 'VisualStudio', 'MongoDB', 'SOA', 'IIS', 'Rx.net', 'VSTS', 'TypeScript', 'CSS'];
		const checkSkillsSet = new Set(checkSkills);
		expect(uniqueSkills.length).toEqual(checkSkills.length);
		uniqueSkills.forEach(s => {
			expect(checkSkillsSet.has(s)).toBeTruthy(`skill "${s}" should have been retrieved`);
		});
	});

	describe('Arithmetic Mean', () => {
		// implement generic `arithmeticMean`

		it('arithmetic mean of numbers', () => {
			// calculate arithmetic mean of numbers
			let numbersMean;

			expect(numbersMean([1, 5, 12, 42])).toEqual(15);
		});

		it('arithmetic mean of Polish employees salary', () => {
			// calculate arithmetic mean of _Polish_ employees salary
			let salaryMeanPL;

			expect(salaryMeanPL).toEqual(5520.5162037037035);
		});

		it('arithmetic mean of European employees salary', () => {
			// calculate arithmetic mean of _European_ employees salary
			let salaryMeanEU;

			expect(salaryMeanEU).toEqual(5483.05193578848);
		});

		it('arithmetic mean of all employees salary', () => {
			// calculate arithmetic mean of _all_ employees salary
			let salaryMeanALL;

			expect(salaryMeanALL).toEqual(5498.4836003051105);
		});

	});

	describe('Lazy Arithmetic Mean', () => {

		it('lazy arithmetic mean of numbers', () => {
			// calculate _lazy_ arithmetic mean of numbers
			let myLazyNumbersMean;

			expect(myLazyNumbersMean(1)).toEqual(1);
			expect(myLazyNumbersMean(5)).toEqual(3);
			expect(myLazyNumbersMean(12)).toEqual(6);
			expect(myLazyNumbersMean(42)).toEqual(15);
		});

		it('lazy arithmetic mean of Polish employees salary', () => {
			// calculate _lazy_ arithmetic mean of _Polish_ employees salary
			let lazySalaryMeanPL;

			let sumPL;
			for (let e of thoseEmployees) {
				sumPL = lazySalaryMeanPL(e);
			}
			expect(sumPL).toEqual(5520.5162037037035);
		});

		it('lazy arithmetic mean of European employees salary', () => {
			// calculate _lazy_ arithmetic mean of _European_ employees salary
			let lazySalaryMeanEU;

			let sumEU;
			for (let e of thoseEmployees) {
				sumEU = lazySalaryMeanEU(e);
			}
			expect(sumEU).toEqual(5483.05193578848);
		});

		it('lazy arithmetic mean of all employees salary', () => {
			// calculate _lazy_ arithmetic mean of _all_ employees salary
			let lazySalaryMeanALL;

			let sumALL;
			for (let e of thoseEmployees) {
				sumALL = lazySalaryMeanALL(e);
			}
			expect(sumALL).toEqual(5498.4836003051105);
		});

	});

	describe('Rounded Arithmetic Mean', () => {

		it('rounded arithmetic mean of all employees salary', () => {
			// calculate _rounded_ arithmetic mean of _all_ employees salary
			// rounding to 4 digits precision
			let salaryMeanALL;

			expect(salaryMeanALL).toEqual(5498.4836);
		});

		it('rounded lazy arithmetic mean of all employees salary', () => {
			// calculate _rounded lazy_ arithmetic mean of _all_ employees salary
			// rounding to 4 digits precision
			let lazySalaryMeanALL;

			let sumALL;
			for (let e of thoseEmployees) {
				sumALL = lazySalaryMeanALL(e);
			}
			expect(sumALL).toEqual(5498.4836);
		});

	});

	describe('Median', () => {

		it('median of numbers', () => {
			// calculate median of numbers
			let numbersMedian;

			expect(numbersMedian([1, 5, 12, 42])).toEqual(8.5);
			expect(numbersMedian([1, 42, 5, 12])).toEqual(8.5);
			expect(numbersMedian([1, 5, 12, 42, 60])).toEqual(12);
			expect(numbersMedian([12, 42, 1, 60, 5])).toEqual(12);
		});

		it('arithmetic mean of Polish employees salary', () => {
			// calculate arithmetic mean of _Polish_ employees salary
			let salaryMedianPL;

			expect(salaryMedianPL).toEqual(5477.5);
		});

		it('arithmetic mean of European employees salary', () => {
			// calculate arithmetic mean of _European_ employees salary
			let salaryMedianEU;

			expect(salaryMedianEU).toEqual(5451);
		});

		it('arithmetic mean of all employees salary', () => {
			// calculate arithmetic mean of _all_ employees salary
			let salaryMedianALL;

			expect(salaryMedianALL).toEqual(5473);
		});

	});

	describe('Lazy Median', () => {

		it('lazy median of numbers', () => {
			// calculate _lazy_ median of numbers
			let myLazyNumbersMedian;

			expect(myLazyNumbersMedian(5)).toEqual(5);
			expect(myLazyNumbersMedian(1)).toEqual(3);
			expect(myLazyNumbersMedian(60)).toEqual(5);
			expect(myLazyNumbersMedian(42)).toEqual(23.5);
			expect(myLazyNumbersMedian(12)).toEqual(12);
		});

		it('lazy median of all employees salary', () => {
			// calculate _lazy_ median of _all_ employees salary
			let lazyMedianALL;

			let sumALL;
			for (let e of employees) {
				sumALL = lazyMedianALL(e);
			}
			expect(sumALL).toEqual(5473);
		});
	});

});
