var customMatchers = {
	toEqualJSON: function(util, customEqualityTesters) {
		return {
			compare: function(actual, expected) {
				var str = JSON.stringify;
				var dump = function(collection){
					return str(collection.map(function(element){
						return str(element);
					}).sort());
				};
				var result = {
					pass: util.equals(dump(actual), dump(expected), customEqualityTesters)
				};
				if (result.pass) {
					result.message = "Expected " + str(actual) + " not to be equal to " + str(expected);
				} else {
					result.message = "Expected " + str(actual) + " to be equal to " + str(expected);
				}
				return result;
			}
		};
	}
};
