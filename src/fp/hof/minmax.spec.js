import db from '../../../data/data';

// database is defined in `db/employees.json` file
const employees = db.getEmployees();
const projects = db.getProjects();

describe('Finding minimum / maximum', () => {
	it('can find highest & lowest salary within Poles', () => {
		// find Poles with highest salary and with lowest salary
		let highestSalaryPole, lowestSalaryPole;

		expect(highestSalaryPole.salary).toEqual(9976);
		expect(lowestSalaryPole.salary).toEqual(1013);
	});

	it('can find youngest & oldest contractors', () => {
		// find the youngest and the oldest contractor
		let youngestContractor, oldestContractor;

		expect(youngestContractor.id).toEqual(727478);
		expect(oldestContractor.id).toEqual(329356734);
	});

	it('can find the most and the least expensive projects', () => {
		// find projects with highest/lowest monthly cost
		// where monthly cost is the sum of monthly salaries of the manager and all team members
		let mostExpensiveProject, leastExpensiveProject;

		expect(mostExpensiveProject.id).toEqual('2734bc74-23f8-416a-8b97-bba927329485');
		expect(mostExpensiveProject.monthlyCost).toEqual(37940);

		expect(leastExpensiveProject.id).toEqual('158c4f20-2209-417c-b659-49cc9bb7c31d');
		expect(leastExpensiveProject.monthlyCost).toEqual(118007);
	});
});
