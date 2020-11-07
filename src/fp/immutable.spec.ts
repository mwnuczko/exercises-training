import { copyFile } from 'fs';
import { result } from 'lodash';
import { argv0 } from 'process';
import db, { Todo } from '../../data/data';
import { shoppingData } from '../../data/shopping';
import produce from 'immer';

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

	const person = typeof john;
	const jobTitle = typeof musician;

	it('merge two objects', () => {
		// define `merge2objects` function here
		// for 2 given parameters, the function returns an new merged object

		const merge2objects = (o1, o2) => ({...o1, ...o2});
		// ME, No no nooo:
		// const merge2objects = (o1: typeof person, o2: typeof person): typeof person & typeof jobTitle => ({...o1, ...o2});

		
		// DO TYPING:
		// const merge2objects = <T extends object, U extends object>: T & U (o1: T, o2: U) => ({...o1, ...o2});
		// const merge2objects = <T 
		// , U extends object>: T & U (o1: T, o2: U) => ({...o1, ...o2});

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
		const merge2objects = (o1, o2) => ({...o1, ...o2});

		function mergeManyObjects<T extends object, U extends object>(t: T, u: U): T & U;
		function mergeManyObjects<T extends object, U extends object, V extends object>(t: T, u: U, v: V): T & U & V;
		function mergeManyObjects<T extends object, U extends object, V extends object, W extends object>(t: T, u: U, v: V, w: W): T & U & V & W;
		function mergeManyObjects<T extends object, U extends object, V extends object, W extends object>(t: T, u: U, v: V, w: W): T & U & V & W;
		function mergeManyObjects(...args: object[]) {
			// let result = {};
			// args.forEach((arg) => result = {...result, ...arg});
			// return result;

			// return args.reduce((acc, arg) => ({...acc, ...arg}));

			// return args.reduce(merge2objects, {}); // 11 new objects meanwhile
			// return args.reduce(merge2objects); // 9 new objects meanwhile
			// return args.reduce((acc, obj) => Object.assign(acc, obj), {}); // 1 new object
			// IMPURE and MUTABLE
			// return args.reduce((acc, obj) => Object.assign(acc, obj)); // 0 new objects

			return Object.assign({}, ...args);
		} 

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
		// const stripId = <T>(T & {id: string}): => {}
		// const stripId = (obj) => {
		// 	const copy = {...obj};
		// 	if(copy.id) {
		// 		delete copy.id;
		// 	}
		// 	return copy;
		// };

		// const stripId = ({id, ...rest }) => rest; 
		const stripId = <T extends { id: unknown }>({id, ...rest }: T) => rest;

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

		// const stripKey = (key, obj) => {
		// 	const copy = {...obj};
		// 	if(copy.id) {
		// 		delete copy[key];
		// 	}
		// 	return copy;
		// };

		// !!! NOTE: hard to type
		const stripKey = <T extends {}, K extends keyof T>(key: K, { [key]: _, ...rest }: T) => rest; // clever syntax

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

		// const newTodo = <T extends { title: string }>(obj: T): T & { marked: boolean} => obj

		// NOTE: typing!!!
		const newTodo = <T extends {}>(
			{ marked = false, ...obj }: T & { marked?: boolean }
		) => {
			return {...obj, marked}
		};


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
type ArrayTodos = {
	[section: string]: {
		todos: Todo[],
		filter: TodoFilter
	}
}

// define MapTodos
type SingleMapTodos = {
	[id in Todo['id']]: Todo
}

type MapTodos = {
	[section: string]: {
		todos: SingleMapTodos,
		filter: TodoFilter
	}
}

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
		// const newState: ArrayTodos = {} // calculate newState

		// const { home } = state;
		// const copy = { todos: [...home.todos], filter: "COMPLETED" as TodoFilter };
		// const newState: ArrayTodos = { ...state, home: copy};

		// const newState: ArrayTodos = {
		// 	...state,
		// 	[section]: {
		// 		...state[section],
		// 		filter: newFilter
		// 	}
		// }

		// const newState = produce(state, draft => {
		// 	draft[section].filter = newFilter
		// });

		const changeFilter = produce((draft: ArrayTodos) => {
			draft[section].filter = newFilter
		})
		const newState = changeFilter(state);

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

		const newState: ArrayTodos['home'] = {
			...state,
			todos: []
		} // calculate newState

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

		// const newState: ArrayTodos = {
		// 	...state,
		// 	[section]: {
		// 		todos: [...state[section].todos, newItem],
		// 		filter: state[section].filter
		// 	}
		// } // calculate newState


		// NOTE: check this:
		// const newState: ArrayTodos = {
		// 	...state,
		// 	[section]: {
		// 		...state[section]
		// 	}
		// }
		// newState[section].todos.concat(newItem);

		const newState = produce(state, draft => {
			draft[section].todos.push(newItem)
		});

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

		// const newState: ArrayTodos = {
		// 	...state,
		// 	[section]: {
		// 		...state[section],
		// 		todos: state[section].todos.map(
		// 			todo => ({ 
		// 				...todo, // not needed to be copied!
		// 				marked: todo.id === todoId ? !todo.marked : todo.marked
		// 			}))
		// 	}
		// } // calculate newState

		// const newState = produce(state, draft => {
		// 	draft[section].todos.find((todo) => todo.id === todoId).marked = !draft[section].todos.find((todo) => todo.id === todoId).marked;
		// });

		const newState = produce(state, draft => {
			const todo = draft[section].todos.find((todo) => todo.id === todoId);
			if(todo) {
				todo.marked = !todo.marked;
			}
		});

		// NOTE: correct braces
		// const newState: ArrayTodos = {
		// 	...state,
		// 	[section]: {
		// 		...state[section],
		// 		todos: state[section].todos.map(
		// 			todo => ( todo.id !== todoId ? todo : ({
		// 				...todo,
		// 				marked: !todo.marked
		// 			})
		// 			)
		// 		)
		// 	}
		// } // calculate newState

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

		// const newState: MapTodos = {
		// 	...state,
		// 	[section]: {
		// 		...state[section],
		// 		[]
		// 	}
		// } // calculate newState

		const newState = produce(state, (draft) => {
			draft[section].todos[newItem.id] = newItem;
		});

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

		const newState: MapTodos = produce(state, draft => {
			const todo = draft[section].todos[todoId];
			todo.marked = !todo.marked;
		}) // calculate newState

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

		// NOTE: check this out
		// const newState: ArrayTodos = produce(state, draft => {
		// 	let todos = draft[section].todos;
		// 	todos = todos.filter(todo => !todo.marked);
		// }) // calculate newState 

		const newState: ArrayTodos = {
			...state,
			[section]: {
				...state[section],
				todos: state[section].todos.filter(todo => !todo.marked)
			}
		}

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

		// NOTE: find better way
		const newState: MapTodos = produce(state, draft => {
			// const todosArray = Object.values(draft[section].todos);
			// todos.filter(todo => !todo.marked);
			const todos = draft[section].todos;
			for(const todoid in todos) {
				if (todos[todoid].marked) {
					delete todos[todoid];
				}
			}
		}

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

