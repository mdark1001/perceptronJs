const fs = require('fs');

let Utilities = {
  patters: [],
  load_patterns: function(file_name = './test.txt', size_input) {
    let patters = [];
    console.log(file_name);
    return new Promise(function(resolve, reject) {

      fs.readFile(file_name, (err, data) => { // Llamando el callback de forma asincrona
        if (err) {
          reject(err);
          return;
        }

        let datos = data.toString()
          .replace(/[\r\n]+/g, ' ')
          .split(' ');
        console.log(datos.length);
        let object = {
          "set": [],
          "output": 0
        }
        for (let i = 0; i < datos.length; i++) {
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
