import { shoppingData } from '../../../data/shopping'
import db from '../../../data/data'

const employees = db.getEmployees();

describe('Grouping Reducers', () => {

	it('can split one big collection into smaller grouped collections', () => {
		// group (count items) shopping data by 'type'
		// return an object that, for each shopping data type, has a count of occurences
		let groupedAggregate;

		expect(groupedAggregate.Clothes.length).toEqual(4);
		expect(groupedAggregate.Music.length).toEqual(3);
		expect(groupedAggregate.Food.length).toEqual(3);
	});

	it('can also apply calculations to grouped items', () => {
		// group (sum total prices) shopping data by 'type'
		let sumAggregate;

		expect(sumAggregate.Clothes).toEqual(63.6);
		expect(sumAggregate.Music).toEqual(30.75);
		expect(sumAggregate.Food).toEqual(65.1);
	});

	it('can perform further operations on grouped items', () => {
		// group (find max total price) shopping data by 'type'
		let maxPriceAggregate;

		expect(maxPriceAggregate).toEqual({Clothes: 46.0, Music: 11.90, Food: 33.6});
	});

	describe('Flattening Groups', () => {
		it('flattens nested arrays (no [].map calls) - count of skills by contract type', () => {
			// that one is another challenge
			// group (count) skills of all employees by contract type
			// for all employees, count all skills and - group under different contract types
			let aggregate;

			expect(aggregate).toEqual({
				contract: {
					DDD: 35, MVC: 213, Scalability: 134, Java: 303, JSP: 222, Hibernate: 189, 'data structures': 230, algorithms: 145, scrum: 379, testing: 350, 'C#': 306, '.net': 306, EntityFramework: 240, IIS: 239, VisualStudio: 306, VSTS: 252, JavaScript: 317, TypeScript: 69, jQuery: 358, HTML: 367, redux: 84, AngularJS: 168, management: 129, scala: 114, CSS: 296, OData: 158, react: 112, Angular: 113, SOA: 91, JVM: 154, spring: 220, sql: 90, rxjs: 69, 'SQL Server': 29, Security: 83, 'Rx.net': 84, MongoDB: 23, neo4j: 7, Cassandra: 8, Oracle: 22, marketing: 3, 'digital marketing': 3, 'social media': 6, 'F#': 30, CoffeeScript: 74, 'account management': 8, 'strategical management': 3, payroll: 5, recruitment: 6, 'employer branding': 4, sales: 5, 'customer support': 10, 'technical support': 8, 'email marketing': 2, 'risk management': 3, 'operations management': 2
				},
				permanent: {
					'C#': 319, '.net': 319, EntityFramework: 254, OData: 149, IIS: 249, VisualStudio: 319, VSTS: 259, JavaScript: 316, TypeScript: 88, AngularJS: 157, jQuery: 335, CSS: 280, HTML: 348, react: 91, redux: 67, algorithms: 154, scrum: 377, testing: 343, rxjs: 69, Java: 308, spring: 234, JSP: 224, Hibernate: 199, 'data structures': 232, JVM: 163, SOA: 94, MVC: 219, Security: 83, Scalability: 131, 'Rx.net': 105, sql: 121, Oracle: 31, Cassandra: 20, 'customer support': 9, Angular: 93, management: 105, CoffeeScript: 65, 'F#': 36, MongoDB: 23, scala: 114, 'SQL Server': 37, sales: 6, 'account management': 9, DDD: 45, neo4j: 13, payroll: 6, 'strategical management': 4, 'risk management': 3, 'technical support': 5, recruitment: 2, 'employer branding': 2, 'social media': 4, marketing: 3, 'digital marketing': 1, 'email marketing': 2, 'operations management': 1
				}
			})
		});
	});

	describe('Employee (Sub)Groups', () => {
		// for all exercises in this section, each (sub)group is going to have
		// a compound value, not a promitive one:
		//  { salary: NUMBER (sum), count: NUMBER }

		it('total salary & count - employees by office country', () => {
			// group (salary sums and counts) by office country
			let aggregate;

			expect(aggregate).toEqual({
				'Poland': { salary: 2384863, count: 432 },
				'United States of America': { salary: 1401960, count: 252 },
				'Italy': { salary: 474766, count: 92 },
				'Spain': { salary: 273906, count: 51 },
				'Germany': { salary: 876208, count: 155 },
				'United Kingdom': { salary: 913138, count: 170 },
				'Netherlands': { salary: 471946, count: 84 },
				'France': { salary: 411725, count: 75 }
			})
		});

		it('total salary & count - employees by office country, by contract type', () => {
			// group (salary sums and counts) by office country, contract type
			let aggregate;

			expect(aggregate).toEqual({
				'Poland':
					{ contract: { salary: 1190382, count: 221 }, permanent: { salary: 1194481, count: 211 } },
			 	'United States of America':
					{ contract: { salary: 682332, count: 126 }, permanent: { salary: 719628, count: 126 } },
			 	'Italy':
					{ permanent: { salary: 251203, count: 50 }, contract: { salary: 223563, count: 42 } },
			 	'Spain':
					{ contract: { salary: 127633, count: 25 }, permanent: { salary: 146273, count: 26 } },
			 	'Germany':
					{ permanent: { salary: 391748, count: 68 }, contract: { salary: 484460, count: 87 } },
			 	'United Kingdom':
					{ permanent: { salary: 498502, count: 89 }, contract: { salary: 414636, count: 81 } },
			 	'Netherlands':
					{ contract: { salary: 190555, count: 36 }, permanent: { salary: 281391, count: 48 } },
			 	'France':
					{ contract: { salary: 206777, count: 38 }, permanent: { salary: 204948, count: 37 } }
				});
		});

		it('total salary & count - employees by office country, by contract type, by skill category', () => {
			// group (salary sums and counts) by office country, contract type, skill category
			// where skillCategory is determined as follows:
			//  - `backend` if knows `.net` OR `Java`, else:
			//  - `frontend` if knows `JavaScript` AND `HTML`, else:
			//  - `other`

			let aggregate;

			expect(aggregate).toEqual({
				"Poland":{
					"contract":{
						"backend":{"salary":934797,"count":174},
						"frontend":{"salary":171517,"count":32},
						"other":{"salary":84068,"count":15}
					},
					"permanent":{
						"backend":{"salary":925454,"count":167},
						"frontend":{"salary":214882,"count":34},
						"other":{"salary":54145,"count":10}
					}
				},
				"United States of America":{"contract":{"backend":{"salary":543552,"count":102},"frontend":{"salary":81740,"count":14},"other":{"salary":57040,"count":10}},"permanent":{"backend":{"salary":585119,"count":99},"other":{"salary":47324,"count":11},"frontend":{"salary":87185,"count":16}}},
				"Italy":{"permanent":{"frontend":{"salary":40720,"count":7},"backend":{"salary":202338,"count":41},"other":{"salary":8145,"count":2}},
				"contract":{"frontend":{"salary":27290,"count":7},"backend":{"salary":168543,"count":30},"other":{"salary":27730,"count":5}}},
				"Spain":{"contract":{"backend":{"salary":83782,"count":17},"other":{"salary":22430,"count":4},"frontend":{"salary":21421,"count":4}},
				"permanent":{"other":{"salary":14738,"count":3},"backend":{"salary":111937,"count":19},"frontend":{"salary":19598,"count":4}}},
				"Germany":{"permanent":{"backend":{"salary":321182,"count":56},"other":{"salary":25437,"count":4},"frontend":{"salary":45129,"count":8}},
				"contract":{"backend":{"salary":363238,"count":68},"frontend":{"salary":67337,"count":11},"other":{"salary":53885,"count":8}}},
				"United Kingdom":{"permanent":{"backend":{"salary":402839,"count":70},"frontend":{"salary":72005,"count":13},"other":{"salary":23658,"count":6}},
				"contract":{"backend":{"salary":286553,"count":57},"frontend":{"salary":88508,"count":17},"other":{"salary":39575,"count":7}}},
				"Netherlands":{"contract":{"backend":{"salary":159501,"count":30},"frontend":{"salary":6800,"count":2},"other":{"salary":24254,"count":4}},
				"permanent":{"backend":{"salary":220607,"count":36},"frontend":{"salary":52857,"count":10},"other":{"salary":7927,"count":2}}},
				"France":{"contract":{"backend":{"salary":154009,"count":29},"other":{"salary":4996,"count":1},"frontend":{"salary":47772,"count":8}},
				"permanent":{"frontend":{"salary":27609,"count":4},"backend":{"salary":176318,"count":32},"other":{"salary":1021,"count":1}}}});
		});

	});

});
