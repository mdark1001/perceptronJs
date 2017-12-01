const fs = require('fs');
const file_name = 'net.txt';


class PerceptronSimple {
  constructor(size_input, umbral = 0.5, alpha = 0.1) {
    this.size_input = size_input;
    this.pesos = new Array(this.size_input).fill(0);
    this.umbral = umbral;
    this.alpha = alpha;
  }

  producto_punto(valor_entrada) {
      let result = 0;
      valor_entrada.forEach((elem, index) => {
        result += (elem * this.pesos[index]);
      });
      return result;
    }
    //patrones de entrada de la siguiente forma:
    /*[ {
        "set":  [1,0,0],
        "output": 1
      },
      {
          "set":  [1,0,1],
          "output": 1
        }
    ]
    */
  train(patrones, callback) {
    let error;
    let count_error = 0;
    let result = 0;
    while (true) {

      count_error = 0;
      patrones.forEach((elem, index) => {

        result = (this.producto_punto(elem.set) > this.umbral) ? 1 : 0;
        error = elem.output - result;
        if (error != 0) {
          count_error += 1;
          elem.set.map((elemto, index) => {
            this.pesos[index] += this.alpha * error * elemto;
          });
        }
        //console.log(error);
      });

      if (count_error == 0) {
        callback(this.pesos);
        return;

      }
    }
  }
  test(patron) {
    return this.producto_punto(patron) > this.umbral ? 1 : 0;
  }
  saveNet() {
    let street = fs.createWriteStream(file_name);
    street.once('open', (fd) => {
      street.write(this.pesos.join('\n'));
      street.end();
    });
  }
  load(callback) {
    let archivo;
    fs.readFile('./' + file_name, (err, data) => { // Llamando el callback de forma asincrona
      archivo = data.toString();
      this.pesos = archivo.split('\n');
    });
    callback();
    //console.log(archivo.toString());
    //console.log(this.pesos);
  }



}

module.exports = PerceptronSimple;
