/* Apellido: Curbelo — Nº de estudiante 348182
Apellido: Vaz — Nº de estudiante 282487
Grupo: nocturno */

let sistema = new Sistema();
window.addEventListener("load", inicio);

function inicio() {
    document.getElementById("form-alta").addEventListener("submit", registrarJugador);
    document.getElementById("btn-enviar-comentario").addEventListener("click", registrarComentario);
}

function registrarJugador() {
    let nombreJugador = document.getElementById("txtNom").value;
    let edadJugador = ParseInt(document.getElementById("edad").value);
    if (nombreJugador !== "" && edadJugador >= 5 && edadJugador <= 100) {
        sistema.agregarJugador(nombreJugador, edadJugador)
        alert("Jugador agregado correctamente");
    } else {
        alert("Debe ingresar un nombre y una edad válida (5 a 100)")
    }
    document.getElementById("txtNom").value = "";
    document.getElementById("edad").value = "";
}

function registrarComentario() {
    let textoComentario = document.getElementById("comentario").value;
    let combo = document.getElementById("jugador");
    let nombreJugador = combo.value;
    if (nombreJugador !== "" && textoComentario !==""){
        sistema.agregarComentario(nombreJugador, textoComentario);
        alert("Comentario agregado correctamente");
    } else {
        alert("Debe seleccionar un jugador y escribir un comentario");
    }
    document.getElementById("comentario").value = "";
}

function actualizarComboJugadores(){
    let combo= document.getElementById("jugador");
    combo.innerHTML = "";
    for (let i=0; i<sistema.listaJugadores.length; i++){
        let jugador= sistema.listaJugadores[i];
        let opcion = document.createElement("option");
        opcion.value = jugador.nombre;
        opcion.textContent= jugador.nombre;
        combo.appendChild(opcion);
    }
}

function mostrarComentarios() {
    let tabla = document.getElementById("tabla-comentarios");
    tabla.innerHTML = 
    <thead>
      <tr>
        <th>Nombre Jugador</th>
        <th>Edad</th>
        <th class="col-comentario">Comentario</th>
      </tr>
    </thead>
    for(let i=0; i< sistema.listaComentarios.length; i++){
        let comentario = sistema.listaComentarios;
        let jugador = null;
        for (let j= 0; j< sistema.listaJugadores.length; j++){
            if(sistema.listaJugadores[j].nombre === comentario.nombreJugador){
                jugador = sistema.listaJugadores[j];
            }
        }
        if (jugador !==null){
            let fila= document.createElement("tr");
            let celdaNombre= document.createElement("td");
            celdaNombre.textContent= jugadorNombre;
            let celdaEdad = document.createElement("td");
            celdaEdad.textContent= jugador.edad;
            let celdaTexto= document.createElement("td");
            celdaTexto.textContent= comentario.texto;
            fila.appendChild(celdaNombre);
            fila.appendChild(celdaEdad);
            fila.appendChild(celdaTexto);
            fila.appendChild(fila);
        }
    }
}