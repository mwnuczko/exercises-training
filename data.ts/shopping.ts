import { ShoppingItemWithId, ShoppingItemsDictionary } from './types'
export { ShoppingItemWithId, ShoppingItemsDictionary } from './types'

export const shoppingData: ShoppingItemWithId[] = require('../db/shopping-list.json')
export const shoppingDataDictionary: ShoppingItemsDictionary = require('../db/shopping-dict.json')
