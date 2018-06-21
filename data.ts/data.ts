import { Employee, Department, Geo, Project, Office, Benefit, Todo, Transaction, Nationality } from './types'
export { Employee, Department, Geo, Project, Office, Benefit, Todo, Transaction, Nationality } from './types'

const benefits: Benefit[] = require('../db/benefits.json')
const departments: Department[] = require('../db/departments.json')
const employees: Employee[] = require('../db/employees.json')
const geo: Geo = require('../db/geo.json')
const nationalities: Nationality[] = ["US", "UK", "DE", "FR", "PL", "IT", "ES"];
const offices: Office[] = require('../db/offices.json')
const projects: Project[] = require('../db/projects.json')
const transactions: Transaction[] = [];
const todos: Todo[] = require('../db/todos.json')

const data = {
	benefits,
	departments,
	employees,
	geo,
	nationalities,
	offices,
	projects,
	transactions,
	todos
}

const getEmployeeById: (id: Employee['id']) => Employee
	= id => data.employees.find(el => el.id === id);

const getEmployees: () => Employee[]
	= () => data.employees;

const getEmployeesByNationality: (nat: Nationality) => Employee[]
	= nat => data.employees.filter(el => el.nationality === nat);

const getEmployeesByDepartment: (deptId: Department['id']) => Employee[]
	= deptId => data.employees.filter(el => el.departmentId === deptId);

const getEmployeesByOffice: (country: Office['country'], city: Office['city']) => Employee[]
	= (country, city) => data.employees.filter(el => el.office[0] === city && el.office[1] === country);

const pageSize = 20;
const getBenefits = function*(){
	for (let idx = 0; idx < data.benefits.length; idx += pageSize){
		yield data.benefits.slice(idx, idx + pageSize);
	}
};

const getDepartments = () => data.departments;

const getGeo = () => data.geo;

const getNationalities: () => Nationality[]
	= () => data.nationalities;

const getOffices = () => data.offices;

const getProjectById = (id: Project['id']) => data.projects.find(el => el.id === id);

const getProjects = () => data.projects;

const getAllTransactions: () => Transaction[]
	= () => data.transactions;

const getTransactionById: (id: Transaction['id']) => Transaction
	= id => data.transactions.find(el => el.id === id);

const submitTransaction: (transaction: Transaction) => void
	= (trans) => data.transactions.push(trans);

const clearTransactions: () => void
	= () => { data.transactions.splice(0, data.transactions.length) };

const getTodoById: (id: Todo['id']) => Todo
	= id => data.todos.find(el => el.id === id);

const getTodos: () => Todo[]
	= () => data.todos;

export default {
	getEmployeeById,
	getEmployees,
	getEmployeesByNationality,
	getEmployeesByDepartment,
	getEmployeesByOffice,

	getBenefits,
	getDepartments,
	getGeo,
	getNationalities,
	getOffices,
	getProjectById,
	getProjects,

	getAllTransactions,
	submitTransaction,
	getTransactionById,
	clearTransactions,

	getTodoById,
	getTodos,
}
