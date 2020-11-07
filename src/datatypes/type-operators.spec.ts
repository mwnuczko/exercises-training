describe('Object Types', () => {

	describe('typeof operator', () => {
		// define your answers to make tests pass

		it('defines primitive types precisely', () => {
			expect(typeof 2016).toEqual('number');
			expect(typeof '2016').toEqual('string');
			expect(typeof ('2016' + 1)).toEqual('string');
			expect(typeof ('2016' - 1)).toEqual('number');
			expect(typeof ('2016' == 2016)).toEqual('boolean');
			expect(typeof ('2016' === 2016)).toEqual('boolean');

			expect(typeof true).toEqual('boolean');
			expect(typeof (true + true)).toEqual('number'); // 1 + 1 = 2
			expect(typeof true + true).toEqual('booleantrue'); // typeof has higher precedence, 'boolean'

			expect(typeof void 0).toEqual('undefined');

			var activity = 'training';
			expect(typeof activity).toEqual('string');
			expect(typeof activity.length).toEqual('number');
			expect(typeof activity.split).toEqual('function');
			expect(typeof activity.split('')).toEqual('object');
			
			expect(typeof Symbol).toEqual('function'); //
			expect(typeof Symbol('secret')).toEqual('symbol'); //
		});

		it('defines complex types not that precisely', () => {
			expect(typeof Math).toEqual('object');
			expect(typeof Math.sqrt).toEqual('function');
			expect(typeof Math.PI).toEqual('number');

			var list = [1, 2, 3, 4, 5];
			expect(typeof list).toEqual('object');
			expect(typeof list.length).toEqual('number');
			expect(typeof list.size).toEqual('undefined');
			expect(typeof list[0]).toEqual('number');

			var person = {
				first: "John",
				last: "Lennon"
			}
			expect(typeof person).toEqual('object');
			expect(typeof person.first).toEqual('string');
			expect(typeof person['last']).toEqual('string');
			expect(typeof person['last'].length).toEqual('number');
		});

		it('defines instances and constructors rather poorly', () => {
			function Person(first, last){
				this.first = first;
				this.last = last;
			}
			Person.prototype.age = 40;

			var john = new Person("John", "Lennon");
			expect(typeof john).toEqual('object');
			expect(typeof (john + '')).toEqual('string'); // expect(typeof (john + '')).toEqual('undefined');
			expect(typeof Person).toEqual('function');
			expect(typeof john.age).toEqual('number');
			expect(typeof Person.prototype).toEqual('object');
			expect(typeof Person.prototype.age).toEqual('number');
			expect(typeof john.constructor).toEqual('function'); //

			class Human {} 
			expect(typeof Human).toEqual('function'); //class is ES6, typeof ES5, class is downgraded to ES5, then it turns to function
			expect(typeof new Human).toEqual('object');
	
			function *gen(){} //generator - ES6
			expect(typeof gen).toEqual('function');
      expect(typeof gen()).toEqual('object'); //

      expect(typeof (function(){ return 5 })()).toEqual('number');
      expect(typeof (function(){})()).toEqual('undefined');
      expect(typeof (async function(){})()).toEqual('object'); //
		});
	});

	describe('instanceof operator', () => {
		// define your answers to make tests pass

		it('checks if operand 1 is a descendant of operand 2', () => {
			function Person(first, last, age?){
				this.first = first;
				this.last = last;
			}
			var john = new Person("John", "Lennon");
			var paul = {
				first: "Paul",
				last: "McCartney"
			};

			expect(john instanceof Object).toEqual(true);
			expect(paul instanceof Object).toEqual(true);
			expect(Person instanceof Object).toEqual( /* YOUR ANSWER HERE */ );
			expect(Object instanceof Object).toEqual( /* YOUR ANSWER HERE */ );

			expect(john instanceof Person).toEqual( /* YOUR ANSWER HERE */ );
			expect(paul instanceof Person).toEqual( /* YOUR ANSWER HERE */ );
			expect(Person instanceof Person).toEqual( /* YOUR ANSWER HERE */ );

			expect(Function instanceof Person).toEqual( /* YOUR ANSWER HERE */ );
			expect(Function instanceof Object).toEqual( /* YOUR ANSWER HERE */ );
			expect(Person instanceof Function).toEqual( /* YOUR ANSWER HERE */ );
			expect(Object instanceof Function).toEqual( /* YOUR ANSWER HERE */ );
		});
	});

});
