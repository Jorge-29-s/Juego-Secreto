
let numero_secreto = 0;
let numero_intentos = 0;
let lista_numeros_sorteados = [];
let numero_maximo = 10;

//Agregamos instrucciones al jugador
function Asignar_Texto_Elemento (elemento, texto) {
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return;
}
//Verificamos si el jugador acertó
function Verificar_Intento() {
    let Numero_Del_Usuario = parseInt(document.getElementById('Valor_Usuario').value);
    //le decimos lo intentos en los que lo hizo
    if (Numero_Del_Usuario === numero_secreto) {
        Asignar_Texto_Elemento('p', `Acertaste el número en ${numero_intentos} ${(numero_intentos === 1) ?'vez' : 'veces'}`);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        //El usuario no acierta, por lo que le damos ciertas pistas
        if (Numero_Del_Usuario > numero_secreto) {
            Asignar_Texto_Elemento('p', 'El número secreto es menor');
        } else {
            Asignar_Texto_Elemento('p', 'El número secreto es mayor');
        }
        numero_intentos++;
        Limpiar_Caja();
    }
    return;
}
//Eliminamos el número de la caja si no lo adivina
function Limpiar_Caja() {
    document.querySelector('#Valor_Usuario').value = '';
}
//Generamos el número aleatorio
function Numero_Aleatorio_Secreto() {
    let numero_generado = Math.floor(Math.random()*numero_maximo)+1;
   
   //Si ya sorteamos todos lo números
   if (lista_numeros_sorteados.length == numero_maximo) {
    Asignar_Texto_Elemento('p', '¡Ya se sortearon todos los números posibles!');
   } else {


        //Si el número generado está en la lista
        if (lista_numeros_sorteados.includes(numero_generado)) {
            return Numero_Aleatorio_Secreto();
        } else {
            lista_numeros_sorteados.push(numero_generado);
            return numero_generado;
        }
    }
}

function Condiciones_Iniciales() {
    Asignar_Texto_Elemento('h1', 'Juego del número secreto!');
    Asignar_Texto_Elemento('p', `Indica un número del 1 al ${numero_maximo}`);
    numero_secreto = Numero_Aleatorio_Secreto();
    numero_intentos = 1;
}

//Necesitamos reiniciar el juego una vez ya hemos ganado 
function Reiniciar_Juego() {
    Limpiar_Caja();
    Condiciones_Iniciales();
    document.querySelector('#reiniciar').setAttribute('disabled', 'true');
}

Condiciones_Iniciales();
