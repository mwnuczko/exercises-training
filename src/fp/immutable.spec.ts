import db, { Todo } from '../../data/data';
import { shoppingData } from '../../data/shopping';

const todos = db.getTodos()

describe('Immutable ES6 operations', () => {

	const john = {
		firstname: "John",
		lastname: "Lennon"
	}

	const paul = {
		firstname: "Paul",
		lastname: "McCartney"
	}

	const musician = {
		profession: "musician",
		salary: 5000
	}

	it('merge two objects', () => {
		// define `merge2objects` function here
		// for 2 given parameters, the function returns an new merged object 

		expect(merge2objects(john, musician)).toEqual({
			firstname: "John", lastname: "Lennon", profession: "musician", salary: 5000
		})

		expect(merge2objects(paul, musician)).toEqual({
			firstname: "Paul", lastname: "McCartney", profession: "musician", salary: 5000
		})
	})

	it('merging multiple objects', () => {
		// define `mergeManyObjects` function here
		// same as above, but accepts multiple objects as input parameters 

		expect(mergeManyObjects({ id: 8492745921 }, john, musician)).toEqual({
			id: 8492745921, firstname: "John", lastname: "Lennon", profession: "musician", salary: 5000
		})

		expect(mergeManyObjects({ id: 5193421984 }, paul, musician)).toEqual({
			id: 5193421984, firstname: "Paul", lastname: "McCartney", profession: "musician", salary: 5000
		})
	})

	it('strip static attribute from objects', () => {
		// define `stripId` function here
		// it will return an immutable version of input object with `id` removed

		// all following expectations check the same - `id` attr should have been removed
		expect(stripId({
			id: 8492745921, firstname: "John", lastname: "Lennon"
		})).toEqual({
			firstname: "John", lastname: "Lennon"
		})

		expect(stripId(shoppingData[0])).toEqual({
			type: 'Clothes', name: 'Socks', price: 1.00, qty: 5
		})

		expect(todos.slice(0, 5).map(stripId)).toEqual([{
			"title": "Networked methodical function Shoes",
			"marked": true
		}, {
			"title": "Progressive client-server moratorium Car",
			"marked": true
		}, {
			"title": "Re-engineered logistical leverage Towels",
			"marked": false
		}, {
			"title": "Multi-channelled discrete budgetary management Bike",
			"marked": false
		}, {
			"title": "Seamless homogeneous functionalities Car",
			"marked": false
		}])
	})

	it('strip dynamic attribute from objects', () => {
		// define `stripKey` function here
		// same as above, but accepts the key as the 1st param (it's not hardcoded)
		// and the object itself as the 2nd param

		// OPTION 1: EASY, remove the attr, as long as the original one isn't affected

		// OPTION 2: use ES6 destructuring (a little tricky one)
		// hint: replace static attribute with a computed property ( attr ---> [attrExpr])

		expect(stripKey('firstname', {
			id: 8492745921, firstname: "John", lastname: "Lennon"
		})).toEqual({
			id: 8492745921, lastname: "Lennon"
		})

		expect(stripKey('qty',
			stripKey('price', shoppingData[0]))).toEqual({
				type: 'Clothes', name: 'Socks', id: 421801449988
			})
	})

	it('default object properties', () => {
		// define `newTodo` function here
		// it is supposed to fill the output object with `marked: false`, if marked is not passed in input

		expect(newTodo({
			"title": "Networked methodical function Shoes",
		})).toEqual({
			"title": "Networked methodical function Shoes",
			"marked": false
		})

		expect(newTodo({
			"title": "Networked methodical function Shoes",
			"marked": false
		})).toEqual({
			"title": "Networked methodical function Shoes",
			"marked": false
		})

		expect(newTodo({
			"title": "Networked methodical function Shoes",
			"marked": true
		})).toEqual({
			"title": "Networked methodical function Shoes",
			"marked": true
		})
	})
})

const todosMap = todos.reduce((todoMap, todo) => {
	todoMap[todo.id] = todo
	return todoMap
}, {})

type TodoFilter = "ALL" | "COMPLETED" | "ACTIVE"

// define ArrayTodos
type ArrayTodos = {}

// define MapTodos
type MapTodos = {}

describe('Immutable operations usecases: State Objects', () => {
	it('change nested attribute', () => {
		const state: ArrayTodos = {
			home: {
				todos: todos,
				filter: "ALL"
			},
			work: {
				todos: [],
				filter: "ALL"
			}
		}

		const section = 'home'
		const newFilter = 'COMPLETED'
		const newState: ArrayTodos = {} // calculate newState

		// value checks
		expect(newState.home.filter).toEqual('COMPLETED')
		// reference checks
		expect(state).not.toBe(newState)
		expect(state.home).not.toBe(newState.home)
		expect(state.work).toBe(newState.work)
	})

	it('clear an array collection', () => {
		const state: ArrayTodos['home'] = {
			todos: todos,
			filter: "ALL"
		}

		const newState: ArrayTodos['home'] = {} // calculate newState

		// value checks
		expect(newState.todos).toEqual([])
		// reference checks
		expect(state).not.toBe(newState)
		expect(state.todos).not.toBe(newState.todos)
	})

	it('append at the end of a nested array collection', () => {
		const state: ArrayTodos = {
			home: {
				todos: todos,
				filter: "ALL"
			},
			work: {
				todos: [],
				filter: "ALL"
			}
		}

		const section = 'home'
		const newItem = {
			id: "4e30f8290ab3-ea75-44f7-78c9-fab461b55d03",
			title: 'buy some beer',
			marked: false
		}

		const newState: ArrayTodos = {} // calculate newState

		// value checks
		expect(state.home.todos.length + 1).toEqual(newState.home.todos.length)
		// reference checks
		expect(state).not.toBe(newState)
		expect(state.home).not.toBe(newState.home)
		expect(state.home.todos).not.toBe(newState.home.todos)
		expect(state.work).toBe(newState.work)
	})

	it('toggle marked attr for a todo within an array collection', () => {
		const state: ArrayTodos = {
			home: {
				todos: todos,
				filter: "ALL"
			},
			work: {
				todos: [],
				filter: "ALL"
			}
		}

		const section = "home"
		const todoId = "ac518c53-d65f-422d-8dc2-550ea6719870"

		const newState: ArrayTodos = {} // calculate newState

		const idx = state.home.todos.findIndex(t => t.id === todoId)
		// value checks
		expect(state.home.todos.length).toEqual(newState.home.todos.length)
		expect(state.home.todos[idx].marked).not.toBe(newState.home.todos[idx].marked)
		// reference checks
		expect(state).not.toBe(newState)
		expect(state.home).not.toBe(newState.home)
		expect(state.home.todos).not.toBe(newState.home.todos)
		expect(state.home.todos[idx]).not.toBe(newState.home.todos[idx])
		expect(state.work).toBe(newState.work)
	})

	it('append to a nested map collection', () => {
		const state: MapTodos = {
			home: {
				todos: todosMap,
				filter: "ALL"
			},
			work: {
				todos: {},
				filter: "ALL"
			}
		}

		const section = 'home'
		const newItem = {
			id: "4e30f8290ab3-ea75-44f7-78c9-fab461b55d03",
			title: 'buy some beer',
			marked: false
		}

		const newState: MapTodos = {} // calculate newState

		const keysLen = obj => Object.keys(obj).length
		// value checks
		expect(keysLen(state.home.todos) + 1).toEqual(keysLen(newState.home.todos))
		// reference checks
		expect(state).not.toBe(newState)
		expect(state.home).not.toBe(newState.home)
		expect(state.home.todos).not.toBe(newState.home.todos)
		expect(state.work).toBe(newState.work)
	})

	it('toggle marked attr for a todo within an map collection', () => {
		const state: MapTodos = {
			home: {
				todos: todosMap,
				filter: "ALL"
			},
			work: {
				todos: {},
				filter: "ALL"
			}
		}

		const section = "home"
		const todoId = "ac518c53-d65f-422d-8dc2-550ea6719870"

		const newState: MapTodos = {} // calculate newState

		// value checks
		expect(state.home.todos[todoId].marked).not.toEqual(newState.home.todos[todoId].marked)
		// reference checks
		expect(state).not.toBe(newState)
		expect(state.home).not.toBe(newState.home)
		expect(state.home.todos).not.toBe(newState.home.todos)
		expect(state.home.todos[todoId]).not.toBe(newState.home.todos[todoId])
		expect(state.work).toBe(newState.work)
	})

	it('clear all marked todos within an array collection', () => {
		const state: ArrayTodos = {
			home: {
				todos: todos,
				filter: "ALL"
			},
			work: {
				todos: [],
				filter: "ALL"
			}
		}

		const section = "home"

		const newState: ArrayTodos = {} // calculate newState

		// value checks
		expect(state.home.todos.length).toEqual(30)
		expect(newState.home.todos.length).toEqual(12)
		// reference checks
		expect(state).not.toBe(newState)
		expect(state.home).not.toBe(newState.home)
		expect(state.home.todos).not.toBe(newState.home.todos)
		expect(state.work).toBe(newState.work)
	})

	it('clear all marked todos within a map collection', () => {
		const state: MapTodos = {
			home: {
				todos: todosMap,
				filter: "ALL"
			},
			work: {
				todos: {},
				filter: "ALL"
			}
		}

		const section = "home"

		const newState: MapTodos = {} // calculate newState

		const keysLen = obj => Object.keys(obj).length
		// value checks
		expect(keysLen(state.home.todos)).toEqual(30)
		expect(keysLen(newState.home.todos)).toEqual(12)
		// reference checks
		expect(state).not.toBe(newState)
		expect(state.home).not.toBe(newState.home)
		expect(state.home.todos).not.toBe(newState.home.todos)
		expect(state.work).toBe(newState.work)
	})
})

