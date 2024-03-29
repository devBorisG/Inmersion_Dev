/**
 * Fetches the latest exchange rates from the API and populates the currency select elements.
 * @returns {Promise<void>} A Promise that resolves when the currencies have been loaded.
 */
async function loadCurrencies() {
    try {
        const data = await fetch('https://api.exchangerate-api.com/v4/latest/USD').then(res => res.json());
        const currencies = Object.keys(data.rates);
        const select1 = document.getElementById('moneda');
        const select2 = document.getElementById('monedaDestino');
        currencies.forEach(currency => {
            const option = document.createElement('option');
            option.value = currency;
            option.text = currency;
            select1.appendChild(option.cloneNode(true));
            select2.appendChild(option);
        });
    } catch (error) {
        console.error('Error:', error);
        alert('Error loading currencies');
    }
}

/**
 * Converts the amount from the base currency to the target currency using the latest exchange rates from the API.
 * @returns {Promise<void>} A Promise that resolves when the conversion has been done.
 */
async function convertCurrency() {
    const form = document.getElementById('conversorForm');
    const baseCurrency = form.elements['moneda'].value;
    const amount = form.elements['cantidadMoneda'].value;
    const targetCurrency = form.elements['monedaDestino'].value;
    const apiURL = `https://api.exchangerate-api.com/v4/latest/${baseCurrency}`;

    try {
        const data = await fetch(apiURL).then(res => res.json());
        const rate = data.rates[targetCurrency];
        const result = (amount * rate).toFixed(2);
        document.getElementById('resultado').innerHTML = `The result is: ${result} ${targetCurrency}`;
    } catch (error) {
        console.error('Error:', error);
        alert('Error converting currency');
    }
}

/**
 * Converts the temperature from the base unit to the target unit.
 * @returns {void}
 */
function convertTemperature() {
    const form = document.getElementById('conversorTemperatureForm');
    const baseTemp = form.elements['temperatura'].value;
    const amount = form.elements['cantidadTem'].value;
    const targetTemp = form.elements['temperaturaDestino'].value;
    const conversions = {
        'Celsius': {
            'Fahrenheit': (value) => (value * 9 / 5) + 32,
            'Kelvin': (value) => value + 273.15
        },
        'Fahrenheit': {
            'Celsius': (value) => (value - 32) * 5 / 9,
            'Kelvin': (value) => (value - 32) * 5 / 9 + 273.15
        },
        'Kelvin': {
            'Celsius': (value) => value - 273.15,
            'Fahrenheit': (value) => (value - 273.15) * 9 / 5 + 32
        }
    };
    const result = baseTemp === targetTemp ? parseFloat(amount) : conversions[baseTemp][targetTemp](parseFloat(amount));
    document.getElementById('resultadoTemp').innerHTML = `The result is: ${result.toFixed(2)} ${targetTemp}`;
}

// Fetches the latest exchange rates and populates the currency select elements.
loadCurrencies().catch(error => console.error('Error in loadCurrencies:', error));

/**
 * Event listener for the currency conversion form.
 * On form submission, converts the amount from the base currency to the target currency.
 */
document.getElementById('conversorForm').addEventListener('submit', function (event) {
    event.preventDefault();
    convertCurrency().catch(error => console.error('Error in convertCurrency:', error));
});

/**
 * Event listener for the temperature conversion form.
 * On form submission, converts the temperature from the base unit to the target unit.
 */
document.getElementById('conversorTemperatureForm').addEventListener('submit', function (event) {
    event.preventDefault();
    convertTemperature();
});

/**
 * Event listener for the currency button.
 * On button click, displays the currency conversion form and hides the temperature conversion form.
 */
document.getElementById('botonMoneda').addEventListener('click', () => {
    document.getElementById('divMoneda').style.display = 'block';
    document.getElementById('divTemperatura').style.display = 'none';
});

/**
 * Event listener for the temperature button.
 * On button click, displays the temperature conversion form and hides the currency conversion form.
 */
document.getElementById('botonTem').addEventListener('click', () => {
    document.getElementById('divMoneda').style.display = 'none';
    document.getElementById('divTemperatura').style.display = 'block';
});