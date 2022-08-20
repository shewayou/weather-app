console.log( Date())

// let query= { a:1, b:2, c:3 };  // works great!
// let query= { }; // works great!
// query.a= 1
// query.b= 2
// query.c= 3 

let query;
query={} // This is critical! And it works great!
query.a= 1
query.b= 2
query.c= 3 

console.log( query )
console.log( '%o', query )
console.log( 'query is ' + query )
console.log( `query is ${query}` )

if ( query.az ) {
    console.log( 'a=%d', query.a )
} else {
    console.log( 'a is absent') 
}

Object.keys( query ).forEach( ( key, index ) => {
    console.log( "key=%s value=%s", key, query[key] )
})

if (!String.prototype.format) {
    String.prototype.format = function () {
      var args = arguments;
      return this.replace(/{(\d+)}/g, function (match, number) {
        return typeof args[number] != "undefined" ? args[number] : match;
      });
    };
  }

let nameA = "Nathan"
let role = "Software Developer"
let aString = "My name is {0}, I'm a {1}".format(nameA, query);

console.log( aString )

