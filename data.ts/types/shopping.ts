type ShoppingItem = {
	type: string;
	name: string;
	price: number;
	qty: number;
}

export interface ShoppingItemWithId extends ShoppingItem {
	id: number;
}

export type ShoppingItemsDictionary = {
	[idx: number]: ShoppingItem;
}
