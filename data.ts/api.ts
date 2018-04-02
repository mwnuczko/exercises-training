import db from './data'
import { Employee, Nationality, Project, Todo } from './data';

const timeout = () => Math.random() * 100

const wrapWithPromise = <T>(fn: Function) =>
	(...args): Promise<T> => {
		return new Promise((resolve, reject) =>
			setTimeout(() => resolve(fn(...args)), timeout())
		)
	}

const getTodoById: (id: number) => Promise<Todo>
	= wrapWithPromise(db.getTodoById);

const getTodos: () => Promise<Todo[]>
	= wrapWithPromise(db.getTodos);

const getProjectById: (id: number) => Promise<Project>
	= wrapWithPromise(db.getProjectById);

const getProjects: () => Promise<Project[]>
	= wrapWithPromise(db.getProjects);

const getEmployee: (id: number) => Promise<Employee>
	= wrapWithPromise(db.getEmployeeById);

const getEmployeesByNationality: (nat: Nationality) => Promise<Employee[]>
	= wrapWithPromise(db.getEmployeesByNationality);

const getNationalities: () => Promise<Nationality[]>
	= wrapWithPromise(db.getNationalities)

export default {
    // getTodoById(id): thenable
    getTodoById,
    // getTodos(id): thenable
    getTodos,
    // getProjectById(id): thenable
    getProjectById,
    // getProjects(id): thenable
    getProjects,
	// getEmployee(id): thenable
	getEmployee,
	// getEmployeesByNationality(nationality): thenable
	getEmployeesByNationality,
	// getNationalities(): thenable
	getNationalities,
}
