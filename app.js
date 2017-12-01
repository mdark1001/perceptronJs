const perceptronjs = require('./lib/perceptronSimple');
const utilities = require('./lib/utilities');
const size_input = 24 * 24
const fs = require('fs');
let patrones = null;
utilities.load_patterns('geometric_form/data.txt', size_input).then(data => {
    patrones = data;

    var perceptronSimple = new perceptronjs(size_input);
    perceptronSimple.train(patrones, function(pesos) {
      //console.log(pesos);
      perceptronSimple.saveNet();
      perceptronSimple.load(function() {
        console.log("Pertenece a la clase de los : " + (
          perceptronSimple.test(patrones[1].set) == 1 ?
          "Circulos" : "Cuadrados"));
      });
    });

  },
  function(err) {
    console.log(err);
  });

//console.log(patrones);
/* Simple uso de NAND
let patters = [{
  "set": [1, 0, 0],
  "output": 1
}, {
  "set": [1, 0, 1],
  "output": 1
}, {
  "set": [1, 1, 0],
  "output": 1
}, {
  "set": [1, 1, 1],
  "output": 0
}];
console.log(perceptronSimple.train(patters));
perceptronSimple.saveNet();
perceptronSimple.load(function() {
  console.log(perceptronSimple.test(patters[1].set));
});

*/
console.log("App--init");
