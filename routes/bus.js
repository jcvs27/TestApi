const { Router } = require('express');
const router = new Router();


router.get('/', (req, res) => {
    res.send('testApi');

})

router.post('/', (req, res) => {
    var datos = (req.body.groups); // Se obtiene el objeto
    var arreglo = datos.split(','); // el objeto se convierte arreglo
    var x = 0; // se inicia x para el total de personas
    // Se difinen arreglos
    var viajes = new Array(); // Arreglo para almacenar los tamaños posible de x
    var numecupo = new Array(); // Arreglo para almacenar el número de cupo posible del bus
    // se suma el total de pasaejeros del arreglo
    arreglo.forEach(element => {
        x += parseInt(element);
    });

    // Se obtiene el número posible de cupos
    for (let index = 1; index <= x; index++) {
        var resultado = x % index;
        if (resultado == 0) {
            numecupo.push(index);
        }

    }
    // Se recorre el numero de cupo(x) del bus
    for (let index_1 = 0; index_1 < numecupo.length; index_1++) {
        var Acum = 0; // Se inicia el acumalador en cero
        // se recorrer el total del arreglo del grupo de personas
        for (let index_2 = 0; index_2 < arreglo.length; index_2++) {
            // Se realiza una validación para saber si el cupo(x) del bus cabe las personas en 
            // todo los viajes
            if (numecupo[index_1] >= arreglo[index_2]) {
                Acum++;
            }
            // si el total del grupo de persona satisface el numero de cupo(x) por viaje
            // se almacena (tamaños posible del bus(x))
            if (Acum == arreglo.length) {
               viajes.push(numecupo[index_1]);
                
            }
        }

    }
    const response = {
        sizes: JSON.stringify(viajes),
    };
    
    res.send(response);

})

module.exports = router;