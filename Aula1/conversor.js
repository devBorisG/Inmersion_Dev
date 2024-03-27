//Definicion de funciones para el conversor de monedas

function cargarMonedas() {
    fetch('https://api.exchangerate-api.com/v4/latest/USD')
        .then(response => response.json())
        .then(data => {
            var currencies = Object.keys(data.rates);
            var select = document.getElementById('moneda');
            var select2 = document.getElementById('monedaDestino');
            currencies.forEach(currency => {
                var option = document.createElement('option');
                option.value = currency;
                option.text = currency;
                select.appendChild(option);
                var option2 = document.createElement('option');
                option2.value = currency;
                option2.text = currency;
                select2.appendChild(option2);
            });
        })
        .catch(error => {
            console.error('Error:', error)
            alert('Ha ocurrido un error al cargar las monedas');
        });
}

function convertir() {
    var form = document.getElementById('conversorForm');
    var selectedBaseCurrency = form.elements['moneda'].value;
    var value = form.elements['cantidad'].value;
    var selectedTargetCurrency = form.elements['monedaDestino'].value;
    var apiURL = `https://api.exchangerate-api.com/v4/latest/${selectedBaseCurrency}`

    // Realizar la peticion a la API
    fetch(apiURL)
        .then(response => response.json())
        .then(data => {
            var rate = data.rates[selectedTargetCurrency];
            var result = value * rate;
            if (typeof result === 'number') {
                result = result.toFixed(2);
            }
            document.getElementById('resultado').innerHTML = 'El resultado es: ' + result + ' ' + selectedTargetCurrency;
        })
        .catch(error => {
            console.error('Error:', error)
            alert('Ha ocurrido un error al realizar la conversion');
        });
}

function convertirTemperatura() {
    var form = document.getElementById('conversorTemperatureForm');
    var selectedBaseTemp = form.elements['temperatura'].value;
    var value = form.elements['cantidad'].value;
    var selectedTargetTemp = form.elements['temperaturaDestino'].value;
    if (selectedBaseTemp === selectedTargetTemp) {
        var result = parseFloat(value);
    } else if (selectedBaseTemp === 'Celsius') {
        result = convertirCelsius(selectedBaseTemp, selectedTargetTemp, value);
    } else if (selectedBaseTemp === 'Fahrenheit') {
        result = convertirFahrenheit(selectedBaseTemp, selectedTargetTemp, value);
    } else if (selectedBaseTemp === 'Kelvin') {
        result = convertirKelvin(selectedBaseTemp, selectedTargetTemp, value);
    }

    if (typeof result === 'number') {
        result = result.toFixed(2);
    }

    document.getElementById('resultadoTemp').innerHTML = 'El resultado es: ' + result + ' ' + selectedTargetTemp;
}

function convertirCelsius(selectedBaseTemp, selectedTargetTemp, value) {
    if (selectedBaseTemp == 'Celsius' && selectedTargetTemp == 'Fahrenheit') {
        var result = (value * 9 / 5) + 32;
    } else if (selectedBaseTemp == 'Celsius' && selectedTargetTemp == 'Kelvin') {
        var result = value + 273.15;
    }
    return result;
}

function convertirFahrenheit(selectedBaseTemp, selectedTargetTemp, value) {
    if (selectedBaseTemp == 'Fahrenheit' && selectedTargetTemp == 'Celsius') {
        var result = (value - 32) * 5 / 9;
    } else if (selectedBaseTemp == 'Fahrenheit' && selectedTargetTemp == 'Kelvin') {
        var result = (value - 32) * 5 / 9 + 273.15;
    }
    return result;
}

function convertirKelvin(selectedBaseTemp, selectedTargetTemp, value) {
    if (selectedBaseTemp == 'Kelvin' && selectedTargetTemp == 'Celsius') {
        var result = value - 273.15;
    } else if (selectedBaseTemp == 'Kelvin' && selectedTargetTemp == 'Fahrenheit') {
        var result = (value - 273.15) * 9 / 5 + 32;
    }
    return result;
}

cargarMonedas();

//Manipulacion del DOM
document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('conversorForm');
    form.addEventListener('submit', convertir);
});

document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('conversorTemperatureForm');
    form.addEventListener('submit', convertirTemperatura);
});

document.getElementById('botonMoneda').addEventListener('click', function () {
    var divMoneda = document.getElementById('divMoneda');
    var divTemperatura = document.getElementById('divTemperatura');
    divMoneda.style.display = 'block';
    divTemperatura.style.display = 'none';
});

document.getElementById('botonTem').addEventListener('click', function () {
    var divMoneda = document.getElementById('divMoneda');
    var divTemperatura = document.getElementById('divTemperatura');
    divMoneda.style.display = 'none';
    divTemperatura.style.display = 'block';
});