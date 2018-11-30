import API from '../../data/api';

import { Employee, Nationality } from '../../data/data';

describe('async functions', () => {

	// consider examples from promises/api.spec.js file
	// (!) fetch appropriate employees by their IDs: 8569129, 254808831, 58197, 651065

	describe('async patterns', () => {
		// define EmployeeListPromise datatype here

		it('sequential asynchronous calls', (done) => {
			// write an async function which will request data of 4 employees SEQUENTIALLY (when one finished,
			// request another one) and return list of these 4 employees to make `expect` calls pass
			// find appropriate employees in src/data.js file

			async function fetchEmployees(): EmployeeListPromise {
				// async function body
			}

			fetchEmployees()
				.then(([e1, e2, e3, e4]) => {
					expect(e1.salary).toBe(7191)
					expect(e2.salary).toBe(5941)
					expect(e3.salary).toBe(4157)
					expect(e4.salary).toBe(8146)
					done();
				});
		})

		it('sequential asynchronous calls using for..of loop', (done) => {
			async function fetchEmployees(...ids: number[]): EmployeeListPromise {
				// coroutine body
			}

			fetchEmployees(id1, id2, id3, id4 /* put IDs here */)
				.then(([e1, e2, e3, e4]) => {
					expect(e1.salary).toBe(7191)
					expect(e2.salary).toBe(5941)
					expect(e3.salary).toBe(4157)
					expect(e4.salary).toBe(8146)
					done();
				});
		})

		it('simultaneous asynchronous calls', (done) => {
			// write an async function which will request data of 4 employees SIMULTANEOUSLY (all at the same time)
			// and return list of these 4 employees to make `expect` calls pass
			// the data expectations are the same as in previous exercise

			async function fetchEmployees(): EmployeeListPromise {
				// async function body
			}

			fetchEmployees()
				.then(([e1, e2, e3, e4]) => {
					expect(e1.salary).toBe(7191)
					expect(e2.salary).toBe(5941)
					expect(e3.salary).toBe(4157)
					expect(e4.salary).toBe(8146)
					done();
				});
		})

	})

	describe('business domain scenarios', () => {

		// define SalaryPromise datatype here

		it('total salaries for certain nationalities', (done) => {
			// write an async function which will calculate and return total salaries of employees filtered by nationality

			async function getTotalNationalSalary(nationality: Nationality): SalaryPromise {
				// async function body
			}

			Promise.all([
				getTotalNationalSalary("UK"),
				getTotalNationalSalary("US"),
				getTotalNationalSalary("FR"),
				getTotalNationalSalary("DE")
			]).then(salaries => {
				let [UK, US, FR, DE] = salaries
				expect(UK).toBe(913138)
				expect(US).toBe(1401960)
				expect(FR).toBe(411725)
				expect(DE).toBe(876208)
				done();
			});
		})

		// define CountrySalaries datatype here
		// define CountrySalariesPromise datatype here

		it('map of total salaries for all nationalities (country code -> total salary)', (done) => {
			// similarly to the previous exercise write an async function which will
			// calculate and return total salaries of employees of all nationalities
			// available in the system
			// the response should be a map: { UK: amount, US: amount, ...}

			async function getTotalSalariesByNationality(): CountrySalariesPromise {
				// async function body
			}

			getTotalSalariesByNationality()
				.then((salaries: CountrySalaries) => {
					let { US, UK, DE, FR } = salaries
					expect(UK).toBe(913138)
					expect(US).toBe(1401960)
					expect(FR).toBe(411725)
					expect(DE).toBe(876208)
					done();
				});
		})

		it('total project costs for certain projects (given by id)', (done) => {
			// for a given project (determined by its ID), find the total monthly cost of salaries of all its members
			// project members are the team AND the manager
			// all IDs of the team members are guaranteed to be found in the `employees` dataset

			// consider introducing helper functions (not to put all code in 1 async function)

			async function getProjectCost(projectId): Promise<number> {
				// async function body
			}

			Promise.all([
				getProjectCost("1b05249e-1f6a-4bc2-bc1d-136c6adeb686")
				.then(cost => expect(cost).toBe(65385)),
				getProjectCost("5d379fe7-52d9-4831-8b66-be54d9aab25c")
				.then(cost => expect(cost).toBe(105674)),
				getProjectCost("6eb66b37-1996-4a2a-a110-be6a299bc541")
				.then(cost => expect(cost).toBe(101438)),
			]).then(done)
		})

		// define OfficeEmployeeSkillset datatype here
		// define OfficeEmployeeSkillsetPromise datatype here

		it('office stats for a certain country (map: office -> number of FE, BE, FS devs)', (done) => {
			// calculate advanced statistics: geo-based analysis of employees skillsets within a single country
			// wooh...
			// so for a given country
			// analyse all offices (cities)
			// and within each office calculate the number of FE devs, BE devs and fullstack devs (calculate all 3 numbers)

			// use the following functions: isFrontendDev, isBackendDev, isFullStack
			// (defined in previous exercises)


			async function getOfficeStats(country: string): OfficeEmployeeSkillsetPromise {
				// async function body
			}

			Promise.all([
				getOfficeStats('Poland')
					.then(stats => expect(stats).toEqual({
						"Warszawa": { "frontend": 20, "backend": 31, "fullstack": 13 },
						"Radom": { "frontend": 15, "backend": 22, "fullstack": 8 },
						"Łódź": { "frontend": 86, "backend": 139, "fullstack": 56 },
						"Wrocław": { "frontend": 19, "backend": 34, "fullstack": 16 },
						"Lublin": { "frontend": 43, "backend": 74, "fullstack": 33 },
						"Gdańsk": { "frontend": 24, "backend": 41, "fullstack": 15 }
					})),
				getOfficeStats('Spain')
					.then(stats => expect(stats).toEqual({
						"Madrid": { "frontend": 19, "backend": 28, "fullstack": 14 },
						"Granada": { "frontend": 7, "backend": 8, "fullstack": 4 }
					})),
			]).then(done)
		})

		// define SalaryOfficeMap datatype here
		// define SalaryOfficeMapPromise datatype here

		it('average salary of employees having a certain skill, per each office', (done) => {
			// calculate average salary of employees
			// but only ones who have a certain skill
			// and out of those emplyees, group them by office
			// in other words...
			// among all employees who know VB.net, the average salary in London is... and in Berlin is... and in Paris is...

			async function getEmployeeCountPerOfficeForSkill(skill: Skill): SalaryOfficeMapPromise {
				// async function body
			}

			Promise.all([
				getEmployeeCountPerOfficeForSkill('JavaScript')
					.then(stats => expect(stats).toEqual({
						"Torino": 4222.53, "Warszawa": 5539.3, "Frankfurt am Main": 6749.5, "Dallas": 5697.83, "Brest": 5653.18, "Paris": 6642.56, "Plymouth": 5301.5, "Madrid": 5450.68, "London": 5841.38, "Bracknell": 4459.13, "Granada": 4273.86, "Radom": 5236.73, "Reading": 5231, "Rennes": 4888.91, "Den Haag": 5828.91, "Łódź": 5666.08, "Wrocław": 5975.63, "Utrecht": 5507.6, "Lublin": 5429.37, "Gdańsk": 5912.92, "Darmstadt": 5565.16, "Manchester": 5356.38, "Lille": 5323, "Amsterdam": 6687.6, "München": 5093.81, "Milpitas": 4535.19, "San Francisco": 6287.73, "Roma": 5800.43, 
					})),
				getEmployeeCountPerOfficeForSkill('Java')
					.then(stats => expect(stats).toEqual({
						"Torino": 5355, "Warszawa": 5258.68, "Frankfurt am Main": 6971.17, "Dallas": 5661.83, "Brest": 5264.22, "Paris": 4867.4, "Plymouth": 5213.13, "Madrid": 4892, "London": 6100.83, "Bracknell": 4827.23, "Granada": 5446.4, "Radom": 4961.79, "Reading": 4491.89, "Rennes": 6045.44, "Den Haag": 6329, "Łódź": 5237.08, "Wrocław": 5654.79, "Utrecht": 5653.96, "Lublin": 5568.36, "Gdańsk": 5271.17, "Darmstadt": 5419.81, "Manchester": 7797.18, "Lille": 3930.17, "Amsterdam": 5367, "München": 4847.52, "Milpitas": 4965.3, "San Francisco": 6572.2, "Roma": 6132.25
					})),
				getEmployeeCountPerOfficeForSkill('IIS')
					.then(stats => expect(stats).toEqual({
						"Torino": 4002.33, "Warszawa": 5860.54, "Frankfurt am Main": 5831.38, "Dallas": 5726.5, "Brest": 5895.9, "Paris": 5728.11, "Plymouth": 3989.8, "Madrid": 5763.64, "London": 4834.77, "Bracknell": 5670.59, "Granada": 5708.33, "Radom": 4398.46, "Reading": 3474.5, "Rennes": 4897.88, "Den Haag": 7227.6, "Łódź": 5258.49, "Wrocław": 5989.44, "Utrecht": 6103.84, "Lublin": 5981.11, "Gdańsk": 5619.22, "Darmstadt": 4599, "Manchester": 5660, "Lille": 4315.43, "Amsterdam": 5362.13, "München": 4941.43, "Milpitas": 5654.91, "San Francisco": 5268.2, "Roma": 5192.89
					})),
			]).then(done)
		})

		// define EmployeesCountryMap datatype here
		// define EmployeesCountryMapPromise datatype here

		it('find employees unassigned to projects, per country', (done) => {
			// retrieve all employees (objects, not just their numbers) who are not assigned to any project
			// but also split them by country they work in (_not_ by employee nationality)

			async function getUnassignedEmployeesPerCountry(): EmployeesCountryMapPromise {
				// async function body
			}

			getUnassignedEmployeesPerCountry()
				.then((stats) => {
					expect(stats["France"].length).toBe(30);
					expect(stats["Germany"].length).toBe(58);
					expect(stats["Italy"].length).toBe(40);
					expect(stats["Netherlands"].length).toBe(37);
					expect(stats["Poland"].length).toBe(172);
					expect(stats["Spain"].length).toBe(22);
					expect(stats["United Kingdom"].length).toBe(64);
					expect(stats["United States of America"].length).toBe(96);
				})
				.then(done);
		})

		// define SkillCountMap datatype here
		// define SkillCountMapPromise datatype here

		it('certain skills count of employees by nationality', (done) => {
			// calculate the statistics on how many employees of a given nationality have certail skills
			// that's not as hard as it may sound :)
			// so for employees of a given nationality
			// we're interested only in some skills
			// and... just count them

			async function skillsCountByNationality(nationality: Nationality, chosenSkills: Skill[]): SkillCountMapPromise {
				// async function body
			}

			Promise.all([
				skillsCountByNationality('PL', ['Java', '.net', 'JavaScript'])
					.then(stats => expect(stats).toEqual({
						"Java": 208, ".net": 198, "JavaScript": 207
					})),
				skillsCountByNationality('DE', ['Java', '.net', 'JavaScript'])
					.then(stats => expect(stats).toEqual({
						"Java": 69, ".net": 83, "JavaScript": 74
					})),
				skillsCountByNationality('FR', ['Java', '.net', 'JavaScript'])
					.then(stats => expect(stats).toEqual({
						"Java": 29, ".net": 41, "JavaScript": 39
					})),
			]).then(done)
		})

		it('certain skills count of employees unassigned to projects, by nationality', (done) => {
			// a composition of both previous exercises (skill count, employees unassigned to any project)
			// for all employees who are not assigned to any project
			// count how many of them do have certain skills that are interesting to us
			// and group them by the _country_ they work in (_not_ their nationality) 

			// define EmployeeSkillsetCountryMap datatype here
			// define EmployeeSkillsetCountryMapPromise datatype here

			async function getUnassignedEmployeesSkillsCountPerCountry(chosenSkills: Skill[]): EmployeeSkillsetCountryMapPromise {
				// async function body
			}
			
			getUnassignedEmployeesSkillsCountPerCountry(['Java', '.net', 'JavaScript'])
				.then(stats => {
					expect(stats).toEqual({
						"Italy": { "JavaScript": 17, "Java": 19, ".net": 17 },
						"Poland": { "JavaScript": 82, "Java": 80, ".net": 77 },
						"Germany": { "JavaScript": 28, "Java": 24, ".net": 29 },
						"United States of America": { "JavaScript": 40, "Java": 53, ".net": 42 },
						"France": { "JavaScript": 16, "Java": 10, ".net": 17 },
						"United Kingdom": { "JavaScript": 33, "Java": 32, ".net": 25 },
						"Spain": { "JavaScript": 11, "Java": 9, ".net": 11 },
						"Netherlands": { "JavaScript": 19, "Java": 16, ".net": 13 }
					})
				})
				.then(done)
		})
	})
})
