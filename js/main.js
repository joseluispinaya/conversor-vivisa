window.addEventListener('load', async function () {

    //const BASE_URL = 'https://v6.exchangerate-api.com/v6/65a54ce2d78568a33c1c5ad8/latest/USD';
    const monto = document.getElementById('monto');
    const de = document.getElementById('de');
    const a = document.getElementById('a');
    const result = document.getElementById('respuesta');
    const tipoCambio = document.getElementById('tipocambio');



    // Manejo del botón "Calcular"
    document.getElementById('calcular').addEventListener('click', async function () {
        //valor del select 1 de
        const select_de = de.value;
        //valor del select 2 a
        const select_a = a.value;

        // Verificar que no sean iguales las monedas seleccionadas del los selects
        if (select_de === select_a) {
            mostrarMensaje("Las monedas seleccionadas deben ser diferentes.", "warning");
            resetFormulario();
            return;
        }
        // obtengo la respuesta de la consulta del fetch
        const response = await getCharacteres(select_de);
        // obtengo el valor de la taza de conversion
        const taza = response.conversion_rates[select_a];

        // obtengo monto a calcular
        const montoIngresado = parseFloat(monto.value);
        // valido el monto ingresado
        if (isNaN(montoIngresado) || montoIngresado <= 0) {
            mostrarMensaje("Ingrese un monto válido mayor a cero.", "warning");
            resetFormulario();
            return;
        }

        // Realizo el calculo de la conversión de divisas
        const resultadoConvertido = montoIngresado * taza;
        tipoCambio.innerText = `1 ${select_de} = ${taza} ${select_a}`;
        result.value = resultadoConvertido.toFixed(2);
        //console.log(taza);

    });

    const getCharacteres = async (de) => {
        try {
            const path = `https://v6.exchangerate-api.com/v6/65a54ce2d78568a33c1c5ad8/latest/${de}`;
            const response = await fetch(path);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error.message);
        }
    }

    // Función para mostrar mensajes de alerta usando sweetalert
    const mostrarMensaje = (mensaje, tipo) => {
        swal("Mensaje", mensaje, tipo);
    };

    // Función para resetear el formulario ensi sus campos de tipo de entrada input
    const resetFormulario = () => {
        monto.value = '';
        result.value = '';
        tipoCambio.innerText = '';
    };
    //const response = await getCharacteres(de.value);
    //console.log('------------------------------------');
    //console.log(response.conversion_rates);
    //console.log('------------------------------------');

});