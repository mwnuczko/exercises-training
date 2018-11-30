import db from '../../../data/data';

// database is defined in `db/employees.json` file
const employees = db.getEmployees();
const offices = db.getOffices();
const projects = db.getProjects();

describe('Data Filtering', () => {
	it('can filter employees who know JavaScript', () => {
		// find all employees who have 'JavaScript' skill
		let JSDevs;

		expect(JSDevs.length).toEqual(633);
	});

	it('can filter European employees', () => {
		// find all European employees (non-US)
		let Europeans;

		expect(Europeans.length).toEqual(1059);
	});

	it('can filter French permanent employees', () => {
		// find all French permanent employees
		let FrenchPermanents;

		expect(FrenchPermanents.length).toEqual(37);
	});

	it('can filter Polish contractor employees', () => {
		// find all Polish contractor employees
		let PolishContractors;

		expect(PolishContractors.length).toEqual(221);
	});

	it('can filter FullStack developer employees', () => {
		// find all fullstack developer employees
		// fullstack developer is a Frontend (JavaScript _AND_ HTML) & (Java _OR_ .net)
		let FullStackDevs;

		expect(FullStackDevs.length).toEqual(442);
	});

	it('can filter FullStack developers with pretty small (3000-5000) salary', () => {
		// find all fullstack developers with pretty small (3000-5000) salary
		let theseGuys;

		expect(theseGuys.length).toEqual(97);
	});

	it('can filter employees having at least n skills', () => {
		// find all employees who have at least 3 skills from the following list:
		// redux, react, Angular, AngularJS, rxjs
		let FPDevs;

		expect(FPDevs.length).toEqual(93);
	});

	it('can filter employees having at least n skills from location', () => {
		// find all employees who have at least 3 skills from the following list:
		// redux, react, Angular, AngularJS, rxjs
		// and are located in
		// office: Warszawa
		let FPDevsFromWarszawa;

		expect(FPDevsFromWarszawa.length).toEqual(1);
	});

	it('can filter employees whose account expires in a particular period of time', () => {
		// find employees byaccount expiration date range
		let theseGuys;

		const period1Start = '2018-12-01', period1End = '2018-12-31';
		expect(theseGuys.length).toEqual(43);

		const period2Start = new Date('2019-01-01'), period2End = new Date('2019-01-31');
		expect(theseGuys.length).toEqual(34);
	});

	it('can filter FullStack developers with a specified range of salary', () => {
		// find employees by salary ranges
		let theseGuys;

		// salary 3000+
		expect(theseGuys.length).toEqual(340);

		// salary 5000-
		expect(theseGuys.length).toEqual(199);

		// salary 3000-5000
		expect(theseGuys.length).toEqual(97);

		// salary: any
		expect(theseGuys.length).toEqual(employees.filter(isFullStack).length);
	});

	it('can filter employees who work in small offices (at most 50 people in an office)', () => {
		// find all employees working in small offices (< 50 employees)
		let GuysWorkingInSmallOffices;

		// find other employees (working in offices with >= 50 employees)
		let GuysWorkingInBigOffices;

		expect(GuysWorkingInSmallOffices.length).toEqual(557);

		expect(GuysWorkingInBigOffices.length).toEqual(754);
	});

	it('can filter employees who have (or) have no benefits', () => {
		// find all employees that have (or) have no benefits
		let employeesWithAnyBenefits, employeesWithoutAnyBenefits;

		expect(employeesWithAnyBenefits.length).toEqual(396);
		expect(employeesWithoutAnyBenefits.length).toEqual(915);
	});

	it('can find employees assigned (or) unassigned to any projects', () => {
		// find all employees assigned (or) unassigned to any projects
		let all, assigned, unassigned;

		expect(all.length).toBe(1311)
		expect(assigned.length).toBe(792)
		expect(unassigned.length).toBe(519)
	});
});
