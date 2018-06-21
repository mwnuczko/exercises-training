import db from './data.js'

const timeout = () => Math.random() * 100

const wrapWithPromise = fn =>
    (...args) => {
        return new Promise((resolve, reject) =>
            setTimeout(() => resolve(fn(...args)), timeout())
        )
    }

export default {
    getEmployee: wrapWithPromise(db.getEmployeeById),
    getEmployeesByNationality: wrapWithPromise(db.getEmployeesByNationality),
	getEmployeesByDepartment: wrapWithPromise(db.getEmployeesByDepartment),
	getEmployeesByOffice: wrapWithPromise(db.getEmployeesByOffice),

	getDepartments: wrapWithPromise(db.getDepartments),
	getGeo: wrapWithPromise(db.getGeo),
    getNationalities: wrapWithPromise(db.getNationalities),
	getOffices: wrapWithPromise(db.getOffices),

    getProjectById: wrapWithPromise(db.getProjectById),
    getProjects: wrapWithPromise(db.getProjects),

	getTransactionById: wrapWithPromise(db.getTransactionById),
	getTransactions: wrapWithPromise(db.getAllTransactions),
	submitTransaction: wrapWithPromise(db.submitTransaction),
	clearTransactions: wrapWithPromise(db.clearTransactions),

    getTodoById: wrapWithPromise(db.getTodoById),
    getTodos: wrapWithPromise(db.getTodos),
}
