const dificultadMap = { 'facil': 100, 'medio': 500, 'dificil': 1000 };

function guess(numeroMax){
    let numeroAdivinar = Math.floor(Math.random() * numeroMax) + 1;
    for(let intentos = 10; intentos > 0; intentos--){
        let numero = parseInt(prompt(`Ingrese un numero entre 1 y ${numeroMax}`));
        if (numero === numeroAdivinar) {
            return alert('Ganaste!\nEl numero era: ' + numeroAdivinar);
        }
        alert(`El numero es ${numero > numeroAdivinar ? 'menor' : 'mayor'}, te quedan ${intentos-1} intentos`);
    }
    alert('Se acabaron los intentos :(\nEl numero era: ' + numeroAdivinar);
}

document.querySelector('#mentalistaForm').addEventListener('submit', function(event) {
    event.preventDefault();
    guess(dificultadMap[event.target['complejidad'].value]);
});