const fs = require('fs');

let Utilities = {
  patters: [],
  load_patterns: function(file_name = 'test.txt', size_input = 25) {
    let patters = [];
    return new Promise(function(resolve, reject) {

      fs.readFile('./' + file_name, (err, data) => { // Llamando el callback de forma asincrona
        let datos = data.toString()
          .replace(/[\r\n]+/g, ' ')
          .split(' ');

        let object = {
          "set": [],
          "output": 0
        }
        for (let i = 1; i <= datos.length; i++) {
          if (i > 0 && (i % size_input == 0)) {
            object.output = parseInt(datos[i + 1]);
            patters.push({
              "set": object.set,
              'output': object.output
            });
            //console.log(patters);
            object.set = [];
            continue;
          }
          object.set.push(parseInt(datos[i]));

        }

        resolve(patters);
      });
    });

  }

}

module.exports = Utilities;
