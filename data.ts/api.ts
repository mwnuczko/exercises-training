import db from './data'
import { Benefit, Department, Employee, Geo, Nationality, Office, Project, Todo, Transaction } from './data';

const timeout = () => Math.random() * 100

const wrapWithPromise = <T>(fn: (...args) => T) =>
	(...args): Promise<T> => {
		return new Promise((resolve, reject) =>
			setTimeout(() => resolve(fn(...args)), timeout())
		)
	}

const getEmployee: (id: Employee['id']) => Promise<Employee>
	= wrapWithPromise(db.getEmployeeById);

const getEmployeesByNationality: (nat: Nationality) => Promise<Employee[]>
	= wrapWithPromise(db.getEmployeesByNationality);

const getEmployeesByDepartment: (deptId: Department['id']) => Promise<Employee[]>
	= wrapWithPromise(db.getEmployeesByDepartment);

const getEmployeesByOffice: (country: Office['country'], city: Office['city']) => Promise<Employee[]>
	= wrapWithPromise(db.getEmployeesByOffice);

const getDepartments: () => Promise<Department[]>
	= wrapWithPromise(db.getDepartments);

const getGeo: () => Promise<Geo>
	= wrapWithPromise(db.getGeo);

const getNationalities: () => Promise<Nationality[]>
	= wrapWithPromise(db.getNationalities)

const getOffices: () => Promise<Office[]>
	= wrapWithPromise(db.getOffices);

const getProjectById: (id: Project['id']) => Promise<Project>
	= wrapWithPromise(db.getProjectById);

const getProjects: () => Promise<Project[]>
	= wrapWithPromise(db.getProjects);

const getTransactionById: (id: Transaction['id']) => Promise<Transaction>
	= wrapWithPromise(db.getTransactionById)

const getTransactions: () => Promise<Transaction[]>	
	= wrapWithPromise(db.getAllTransactions)
	
const submitTransaction: (transaction: Transaction) => Promise<void>	
	= wrapWithPromise(db.submitTransaction)
	
const clearTransactions: () => Promise<void>	
	= wrapWithPromise(db.clearTransactions)
	
const getTodoById: (id: Todo['id']) => Promise<Todo>
	= wrapWithPromise(db.getTodoById);

const getTodos: () => Promise<Todo[]>
	= wrapWithPromise(db.getTodos);

export default {
	getEmployee,
	getEmployeesByNationality,
	getEmployeesByDepartment,
	getEmployeesByOffice,

	getDepartments,
	getGeo,
	getNationalities,
	getOffices,

	getProjectById,
	getProjects,

	getTransactionById,
	getTransactions,
	submitTransaction,
	clearTransactions,

	getTodoById,
	getTodos,
}
