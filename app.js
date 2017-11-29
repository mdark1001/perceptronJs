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
