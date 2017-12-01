const perceptronjs = require('./perceptronSimple');
const utilities = require('./utilities');


let patrones = null;
utilities.load_patterns('test.txt', 64 * 64).then(data => {
  var perceptronSimple = new perceptronjs(25);
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
