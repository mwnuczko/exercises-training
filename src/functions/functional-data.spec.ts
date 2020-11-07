import { find } from 'lodash';
import db, { Employee, Project, Skill } from '../../data/data';

describe('Functional programming', function(){
	// database is defined in data/data.js file
	const employees = db.getEmployees();
	const projects = db.getProjects();

	describe('Processing data simple scenario', function(){

		it('is possible using for loop, yet inconvenient', function(){
			// calculate total amount of bonus
			// given to all employees with nationality equal "DE"
			// whose salary is below 5000
			// where bonus equals 20% of the salary

		// NOTES: type-safe
		// type-unsafe
		// array index access is type-UNSAFE
		const numbers = [1,2,3,4,5];
		const myNumber1 = numbers[1];
		const myNumber6  = numbers[6]; // = undefined, it's NOT number, it's type-UNSAFE

		// [number, number] - tuple
		type NumberPair = [number, number];
		const pair: NumberPair = [0, 1];
		const inferenceNotNumberPair = [0, 1];
		const pairEl0 = pair[0];
		const pairEl1 = pair[1];
		// const pairEl2 = pair[2];


			// use FOR loops
			let totalBonus = 0;
			// for(...; ...; ...)
			// for(let i = 0; i < employees.length; i++ ) {
			// 	const employee = employees[i];
			// 	if (employee.nationality === 'DE' && employee.salary < 5000) {
			// 		totalBonus += 0.2 * employee.salary;
			// 	}
			// }

			for(const employee of employees) {
				if (employee.nationality === 'DE' && employee.salary < 5000) {
					totalBonus += 0.2 * employee.salary;
				}
			}

			expect(totalBonus).toEqual(42499);
		});

		it('is more readable and more convenient using functional programming', function(){
			// calculate total amount of bonus
			// given to all employees with nationality equal "DE"
			// whose salary is below 5000
			// where bonus equals 20% of the salary

			// use functional programming
			// = employees
			// .filter(...)
			// .map(...)
			// .reduce(...)

			// let totalBonus = employees.filter(employee => employee.nationality === 'DE' && employee.salary < 5000)
			// .map((employee => employee.salary))
			// .reduce((accumulator, salary) => accumulator + 0.2 * salary, 0);

			const totalBonus: number = employees.filter(employee => employee.nationality === 'DE' && employee.salary < 5000)
				// .reduce((accumulator, employee) => accumulator + 0.2 * employee.salary, 0);
				.reduce<number>((accumulator, employee) => accumulator + 0.2 * employee.salary, 0);

			expect(totalBonus).toEqual(42499);
		});

	});
	it('makes it easy to filter data by condition', function(){
		// fetch the employee with ID 651065
		// let employee651065: Employee | undefined = employees.find(e => e.id === 651065);
		// discriminant unions - we can split union to independent subsets
		// type guards
		// if(employee651065) {
		// 	expect(employee651065.id).toEqual(651065);
		// 	expect(employee651065.firstName).toEqual("Marta");
		// 	expect(employee651065.personalInfo.address.city).toEqual("Calista furt");
		// 	expect(employee651065.personalInfo.phone).toEqual("(134) 899-1656");
		// } else if(typeof employee651065 == 'undefined') {
		// 	employee651065
		// } else {
		// 	// defensive programming - teoretically we should NEVER enter this, but practically we can
		// 	// exhaustiveness check - if we add another type to the union it will fail, allows us to make sure that we process all types from union
		// 	const n: never = employee651065; // benefit in compile
		// 	logger.error(`Critical Error ${err} ${e.componentStack}`); // benefit in runtime
		// }



 		// let employee651065 = employees.find(e => e.id === 651065); // type inference
		// let employee651065 = employees.find(e => e.id === 651065) as Employee; // hey compiler, I know better, it's Employee; type inference
		// let employee651065: Employee = employees.find(e => e.id === 651065)!; // hey compiler, I know better, it's Employee
		let employee651065: Employee | undefined = employees.find(e => e.id === 651065);
		if(employee651065) {
			expect(employee651065.id).toEqual(651065);
			expect(employee651065.firstName).toEqual("Marta");
			expect(employee651065.personalInfo.address.city).toEqual("Calista furt");
			expect(employee651065.personalInfo.phone).toEqual("(134) 899-1656");
		} else {
			fail(`Couldn't find employee with 651065 ID`);
		}

		// fetch a employee with nationality US
		let USEmployee: Employee | undefined = employees.find(employee  => employee.nationality === 'US');

		expect(USEmployee?.nationality).toEqual("US");
	});

	it('makes it easy to filter data by condition', function(){
		// fetch all employees with nationality DE only
		let DEEmployees = employees.filter(employee => employee.nationality === 'DE');

		expect(DEEmployees.length).toEqual(155);
		expect(DEEmployees[0].lastName).toEqual("Biesenbach");
		expect(DEEmployees[10].lastName).toEqual("Verniest");
		expect(DEEmployees[20].lastName).toEqual("Steding");

		// fetch all employees with gmail.com _personal_ email domain only
		let GmailEmployees = employees.filter(employee => employee.personalInfo.email.includes('gmail.com'));

		expect(GmailEmployees[0].lastName).toEqual("Kruszewski");
		expect(GmailEmployees[10].lastName).toEqual("Radecki");
		expect(GmailEmployees[20].lastName).toEqual("Benedetti");
	});

	it('makes it easy to search for single objects', function(){
		// fetch the phone to the richest employee who is American
		// or (gives the same result in this case)
		// fetch the phone to the richest American
		// assuming there's only one person with this salary

		// let usEmployees = employees.filter(employee => employee.nationality === 'US');
		// const usEmployeesSalaries = usEmployees.map(employee => employee.salary);
		// const maxSalary = Math.max(...usEmployeesSalaries);
		// const RichestUSEmployeePhone = usEmployees.find(employee => employee.salary === maxSalary)?.personalInfo.phone;

		const RichestUSEmployeePhone = employees
			.reduce((employeeWithMaxSalary, employee) => employee.salary > employeeWithMaxSalary.salary ? employee : employeeWithMaxSalary)
			.personalInfo.phone;
		expect(RichestUSEmployeePhone).toEqual("623-711-7686 x7328");
	});

	it('should sort offices by how many employees work there', () => { 
		// sort DESC the offices by how many employees work in the office
		// office is defined by the city

		// calculate `officesCountMap` here

		type CountryCountMap = {
			[countryName: string]: number // index signature
		};

		// NOTE: find more elegant solution
		const officesCountMap: CountryCountMap = employees.reduce((officesCountMap, employee) => {
			// if(country in acc)
			// if(country in officesCountMap)			
			return { 
				...officesCountMap,
				[employee.office[1]]: officesCountMap[employee.office[1]] ? officesCountMap[employee.office[1]] + 1 : 1
			}
		}, {});
		const officesArray: {countryName: string, count: number}[] = [];
		for (const officeContry in officesCountMap) {
			officesArray.push({
				countryName: officeContry,
				count: officesCountMap[officeContry]
			}); 
		}
		// console.log(officesCountMap);
		// console.log(officesArray);
		// const sortedOffices = officesArray.sort((office1, office2) => {
		// 	// if (office1.count > office2.count) {
		// 	// 	return -1;
		// 	// } else if (office1.count < office2.count) {
		// 	// 	return 1;
		// 	// } else {
		// 	// 	return 0;
		// 	// }
		// 	return office2.count - office1.count;
		// }).map(office => office.countryName )
		const sortedOffices = _.orderBy(officesArray, 'count', 'desc').map(off => off.countryName);
		console.log(sortedOffices);
		expect(sortedOffices).toEqual(['Poland', 'United States of America', 'United Kingdom', 'Germany', 'Italy', 'Netherlands', 'France', 'Spain'])
	})

	it('should list unique skills by project team', () => {
		// given projectID, determine what is the skillset of the project team
		// project team is all the members of the project, including the manager
		// 
		// you can either find collection elements manually
		// or you can use `db.getProjectById` and `db.getEmployeeById`

		// define `getProjectUniqueSkills` here

		//lookup type Project['id']
		// let skill: Skill = "java";
		// (projectID: Project['id']) => Skill[]
		// MY:
		// const getProjectUniqueSkills = (projectID: Project['id']): Skill[] => {
		// 	const project = db.getProjectById(projectID);
		// 	if(project){
		// 		const employees = [project.manager, ...project.team.map(e => e.id)]
		// 			.map(db.getEmployeeById)
		// 		const skillsObj = employees.reduce((skills, employee) => {
		// 			employee.skills.forEach(skill => {
		// 				skills[skill as string] = null;
		// 			})
		// 			return skills;
		// 		}, {});
		// 		return Object.keys(skillsObj);
		// 	}
		// 	return [];
		// };

		//THEIRS:
		// const getProjectUniqueSkills = (projectID: Project['id']): Skill[] => {
		// 	const project = db.getProjectById(projectID);
		// 	if(!project){
		// 		throw new Error(`project ID ${projectId} not found`)
		// 	}
		// 	const teamMembers: Employee[] = [project.manager, ...project.team.map(e => e.id)]
		// 		.map(db.getEmployeeById);
		// 		const uniqueSkills: Set<Skill> = teamMembers.reduce((skillSet, { skills }) => {
		// 			for(const skill of skills) {
		// 				skillSet.add(skill);
		// 				return skillSet;
		// 			}
		// 		}, new Set<Skill>());
		// 	return [...uniqueSkills]
		// };

		// OUR unique method:
		// constraint over the generic type - T is subtype of object
		// const unique = <T extends object>(collection: T[]) => {
		// const unique = <T>(collection: T[]) => {
		const unique = <T extends String>(collection: T[]) => {
			const set = new Set<T>();
			// let t: T = collection[0];
			// const obj: {} = t;
			// const n: number = t;
			for(const item of collection) {
				// only primitives - safed by: T extends PropertyKey
				set.add(item);
			}
			return [...set];
		}

		///USE unique here:
		const getProjectUniqueSkills = (projectID: Project['id']): Skill[] => {
			const project = db.getProjectById(projectID);
			if(!project){
				throw new Error(`project ID ${projectID} not found`)
			}

			// const teamMembers: Employee[] = [project.manager, ...project.team.map(e => e.id)]
			// 	.map(db.getEmployeeById);
			// const uniqueSkills = teamMembers.reduce<Skill[]>((skillSet, { skills }) => {
			// 	return unique([...skillSet, ...skills]);
			// }, []);
			// return uniqueSkills;

			// USE flatMap here
			const allSkills = [project?.manager, ...project?.team.map(e => e.id)]
				.flatMap(employeeId => db.getEmployeeById(employeeId).skills);
			return unique(allSkills);
		};

		const testcases = [{
			projectID: '86c0cd06-bd83-4d50-82d7-d1c10743ec48',
			expectedSkills: ['Java', 'scala', 'JVM', 'spring', 'Hibernate', 'C#', '.net', 'EntityFramework', 'IIS', 'VisualStudio', 'VSTS', 'algorithms', 'scrum', 'testing', 'management', 'JSP', 'sql', 'Oracle', 'SOA', 'MVC', 'Security', 'OData', 'JavaScript', 'TypeScript', 'rxjs', 'jQuery', 'CSS', 'HTML', 'MongoDB', 'CoffeeScript', 'Angular', 'AngularJS', 'react', 'data structures', 'marketing', 'digital marketing', 'email marketing', 'social media', 'Rx.net', 'neo4j'],
		}, {
			projectID: '8d6ee91f-607d-4cbe-8cf1-eb889c934678',
			expectedSkills: ['C#', '.net', 'EntityFramework', 'IIS', 'VisualStudio', 'VSTS', 'JavaScript', 'redux', 'jQuery', 'CSS', 'HTML', 'SOA', 'MVC', 'Security', 'data structures', 'scrum', 'testing', 'management', 'Scalability', 'OData', 'Rx.net', 'Java', 'spring', 'JSP', 'Hibernate', 'Angular', 'scala', 'JVM', 'TypeScript', 'AngularJS', 'sql', 'SQL Server', 'rxjs', 'F#', 'react', 'DDD', 'CoffeeScript'],
		}, {
			projectID: '6aa3c367-e8f6-43cc-9042-3c19594fadb6',
			expectedSkills: ['C#', '.net', 'IIS', 'VisualStudio', 'VSTS', 'JavaScript', 'TypeScript', 'redux', 'Angular', 'jQuery', 'CSS', 'HTML', 'data structures', 'scrum', 'testing', 'management', 'react', 'rxjs', 'algorithms', 'MVC', 'Scalability', 'Java', 'scala', 'JSP', 'OData', 'Rx.net', 'sql', 'spring', 'Hibernate', 'AngularJS', 'EntityFramework', 'JVM'],
		}]

		for (const { projectID, expectedSkills } of testcases){
			const uniqueSkills = getProjectUniqueSkills(projectID)
			expect(expectedSkills.length).toEqual(uniqueSkills.length)
			for (const skill of expectedSkills){			
				expect(uniqueSkills).toContain(skill)
			}
		}
	})

	it('should calculate average salary of all employees who have certain skill', () => {
		// calculate average salary amonng all employees who have certain skill
		// query entire employees collection
		// round the result to at most 2 decimal digits

		// define `averageSalaryBySkill` here
		const averageSalaryBySkill = (skill: Skill): Employee['salary'] => {
			const employeesWithSkill = employees.filter(employee => employee.skills.includes(skill));
			const avg = employeesWithSkill.reduce(
				(acc: Employee['salary'], employee: Employee) => acc + employee.salary, 0
			) / employeesWithSkill.length;
			return Number(avg.toFixed(2));
		}

		expect(averageSalaryBySkill('C#')).toEqual(5415.39)
		expect(averageSalaryBySkill('EntityFramework')).toEqual(5442.93)
		expect(averageSalaryBySkill('TypeScript')).toEqual(5619.39)
		expect(averageSalaryBySkill('Oracle')).toEqual(5954.85)
	})

	it('should find most known skills', () => {
		// calculate how many employees knonw certain skills
		// and find the three most known skills (among all employee collection)

		// NOTE: find more elegant solution
		const calculateMostKnownSkills = (employees: Employee[]): { skill: string, count: number }[] => {
			// employees.forEach(employee => {});
			const skills = employees.flatMap(employee => employee.skills);
			const skillsCount: { [skill: string]: number } = skills.reduce((acc, skill) => {
				return {...acc, [skill as string]: acc[skill as string] ? acc[skill as string] + 1 : 1}
			}, {});
			const skillsArray: {skill: string, count: number}[] = [];
			for(const skill in skillsCount) {
				skillsArray.push({skill: skill, count: skillsCount[skill]});
			}
			return _.orderBy(skillsArray, 'count', 'desc');
		}

		const [ $1stMostKnownSkill, $2ndMostKnownSkill, $3rdMostKnownSkill ] = calculateMostKnownSkills(employees);
		expect($1stMostKnownSkill).toEqual({ skill: 'scrum', count: 756 })
		expect($2ndMostKnownSkill).toEqual({ skill: 'HTML', count: 715 })
		expect($3rdMostKnownSkill).toEqual({ skill: 'testing', count: 693 })
	})

	it('should find if anyone knows a skill within a project team', () => {
		// determine whether annyone within the project team
		// including the manager or not
		// know a certain skill

		// define `someoneKnowsSkill` here
		const someoneKnowsSkill = (arg: {projectID: Project['id'], skill: Skill, includingManager: boolean}): boolean => {
			const {projectID, skill, includingManager} = arg;
			const project = db.getProjectById(projectID);
			if (project) {
				const employeeIds = project.team.map(e => e.id);
				const ids = includingManager ? [project.manager, ...employeeIds] : employeeIds;
				const skills = ids.flatMap(id => db.getEmployeeById(id).skills);
				return skills.includes(skill);
			}
			return false;
		}

		const testcases = [{
			projectID: 'fded698e-df3d-4483-9359-cfd8537d979f',
			skill: 'TypeScript',
			includingManager: true,
			result: true,
		}, {
			projectID: '3b1775dd-5291-465f-808c-2dbdaa085713',
			skill: 'marketing',
			includingManager: true,
			result: false,
		}, {
			projectID: '6aa3c367-e8f6-43cc-9042-3c19594fadb6',
			skill: 'OData',
			includingManager: false,
			result: true,
		}, {
			projectID: 'b7f64a59-a0d6-4805-a9a8-38fb37e57c6a',
			skill: 'F#',
			includingManager: false,
			result: false,
		}]

		for (const { projectID, skill, includingManager, result } of testcases){
			expect(someoneKnowsSkill({ projectID, skill, includingManager })).toEqual(result, `expected ${skill} to be ${!result && 'not ' }known`)
		}
	})

	it('should filter entities which are within a range', () => {
		// filter the entities of various collection
		// which have a given number property's value within a range
		// use GTE, LTE, instead of GT, LT

		// define `within` here
		const within = <T>(entities: T[], filterBy: string, range: { from: number, to: number } ): T[] => {
			return entities.filter(entity => entity[filterBy] > range.from && entity[filterBy] < range.to);
		}

		expect(within(employees, 'salary', { from: 1000, to: 10000 }).length).toEqual(1310)
		expect(within(employees, 'salary', { from: 4000, to: 4100 }).length).toEqual(12)
		expect(within(employees, 'salary', { from: 9900, to: 10000 }).length).toEqual(23)

		expect(within(projects, 'budget', { from: 0, to: 100000 }).length).toEqual(0)
		expect(within(projects, 'budget', { from: 0, to: 1000000 }).length).toEqual(32)
		expect(within(projects, 'budget', { from: 0, to: 10000000 }).length).toEqual(56)
	})

});
