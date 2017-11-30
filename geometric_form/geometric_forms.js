const perceptronjs = require('./perceptronSimple');
const utilities = require('./utilities');
var perceptronSimple = new perceptronjs(25);

let patrones = null;
utilities.load_patterns('test.txt', 25).then(data => {
  console.log(data);
  patrones = data;
  console.log(perceptronSimple.train(patrones, function(pesos) {
    console.log(pesos);
    perceptronSimple.saveNet();
    perceptronSimple.load(function() {
      console.log(perceptronSimple.test(patrones[1].set));
    });
  }));

});
