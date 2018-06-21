// generated using http://json-schema-faker.js.org/#gist/a6ac0ec64af328426bb675d4d2ea40c9/0.4.3

const benefits = require('../db/benefits.json')
const departments = require('../db/departments.json')
const employees = require('../db/employees.json')
const geo = require('../db/geo.json')
const nationalities = ["US", "UK", "DE", "FR", "PL", "IT", "ES"];
const offices = require('../db/offices.json')
const projects = require('../db/projects.json')
const transactions = [];
const todos = require('../db/todos.json')

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

const getEmployeeById = id => data.employees.find(el => el.id === id);
const getEmployees = () => data.employees;
const getEmployeesByNationality = nat => data.employees.filter(el => el.nationality === nat);
const getEmployeesByDepartment = deptId => data.employees.filter(el => el.departmentId === deptId);
const getEmployeesByOffice = (country, city) => data.employees.filter(el => el.office[0] === city && el.office[1] === country);

const pageSize = 20;
const getBenefits = function*(){
	for (let idx = 0; idx < data.benefits.length; idx += pageSize){
		yield data.benefits.slice(idx, idx + pageSize);
	}
};

const getDepartments = () => data.departments;
const getGeo = () => data.geo;
const getNationalities = () => data.nationalities;
const getOffices = () => data.offices;
const getProjectById = id => data.projects.find(el => el.id === id);
const getProjects = () => data.projects;

const getAllTransactions = () => data.transactions;
const getTransactionById = id => data.transactions.find(el => el.id === id);
const submitTransaction = (trans) => data.transactions.push(trans);
const clearTransactions = () => { data.transactions.splice(0, data.transactions.length) };

const getTodoById = id => data.todos.find(el => el.id === id);
const getTodos = () => data.todos;

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
