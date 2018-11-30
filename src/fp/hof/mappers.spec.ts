import db from '../../../data/data';

// database is defined in `db/employees.json` file
const employees = db.getEmployees();
const projects = db.getProjects();

describe('Data Mapping', () => {
	it('can grab all telephone numbers of all employees without modifying the order', () => {
		// grab all telephone numbers of all employees without modifying the order
		let EmployeePhoneNumbers;

		expect(EmployeePhoneNumbers.length).toEqual(1311);
		expect(EmployeePhoneNumbers[0]).toEqual("1-390-798-9734 x32319");
		expect(EmployeePhoneNumbers[10]).toEqual("1-583-018-1424 x4546");
		expect(EmployeePhoneNumbers[20]).toEqual("081-262-6352 x884");
		expect(EmployeePhoneNumbers[30]).toEqual("1-275-073-0399 x830");
		expect(EmployeePhoneNumbers[40]).toEqual("455-316-8539 x789");
	});
});
