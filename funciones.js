/* Apellido: Curbelo — Nº de estudiante 348182
Apellido: Vaz — Nº de estudiante 282487
Grupo: nocturno */

let sistema = new Sistema();
window.addEventListener("load", inicio);
let numero1 = 0;
let numero2 = 0;
let filaDiferente = 0;
let colDiferente = 0;
let sonidoAcierto = new Audio("sonidos/acierto.mp3");
let sonidoError = new Audio("sonidos/error.mp3");
let parejas = [
    ["🐶", "🐺"],
    ["🐱", "🦁"],
    ["🐰", "🐹"],
    ["🐸", "🐢"],
    ["🐴", "🦄"],
    ["🐮", "🐷"],
    ["🍎", "🍅"],
    ["👮", "🕵️"],
    ["🐻", "🐼"],
    ["🐭", "🐹"],
    ["🐔", "🐤"],
    ["🐍", "🦎"],
    ["🐟", "🐠"],
    ["🦉", "🦅"],
    ["🍒", "🍇"],
    ["🍉", "🍈"],
    ["😀", "😃"],
    ["😎", "🤠"],
    ["😐", "😶"],
];

function inicio() {
    document.getElementById("form-alta").addEventListener("submit", agregarJugador);
    document.getElementById("btn-enviar-comentario").addEventListener("click", function (event) { agregarComentario(event); });
    actualizarComboJugadores();
    mostrarComentarios();
    document.getElementById("orden-nombre").addEventListener("change", mostrarComentarios);
    document.getElementById("orden-edad").addEventListener("change", mostrarComentarios);
    document.getElementById("destacar").addEventListener("input", mostrarComentarios);
    document.getElementById("btn-enviar-suma").addEventListener("click", verificarSuma);
    generarNuevaSuma();
    generarGrillaDiferente();
    actualizarResumenAdministrador();
    document.getElementById("suma-res").addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
            e.preventDefault();  // evita que el form se envíe
            verificarSuma();     // ejecuta tu función como si apretaras el botón
        }
    });
    document.getElementById("btn-actualizar-comentarios").addEventListener("click", actualizarTodosLosComentarios);
    mostrarComentariosAdmin();
    document.getElementById("jugador").addEventListener("change", limpiarSuma);
}
function agregarJugador(event) {
    event.preventDefault();
    let nombre = document.getElementById("txtNom").value;
    let edad = Number(document.getElementById("edad").value);
    let fueAgregado = sistema.agregarJugador(nombre, edad);
    if (fueAgregado === true) {
        alert("Jugador agregado correctamente");
        actualizarComboJugadores();
        mostrarJugadoresNuncaJugaron();   
        mostrarMayorCantidadComentarios(); 
        actualizarResumenAdministrador();
    } else {
        alert("Nombre repetido o datos inválidos");
    }
    document.getElementById("txtNom").value = "";
    document.getElementById("edad").value = "";
}
function actualizarComboJugadores() {
    let combo = document.getElementById("jugador");
    combo.innerHTML = "";
    let opcionDefault = document.createElement("option");
    opcionDefault.value = "";
    opcionDefault.textContent = "Seleccione un jugador";
    opcionDefault.selected = true;
    opcionDefault.disabled = true;
    combo.appendChild(opcionDefault);
    let jugadoresOrden = ordenarPorNombre(sistema.listaJugadores.slice());
    for (let i = 0; i < jugadoresOrden.length; i++) {
        let jugador = jugadoresOrden[i];
        let opcion = document.createElement("option");
        opcion.value = jugador.nombre;
        opcion.textContent = jugador.nombre + " (" + jugador.edad + " años)";
        combo.appendChild(opcion);
    }
}
function agregarComentario(event) {
    event.preventDefault();
    let nombre = document.getElementById("jugador").value;
    let texto = document.getElementById("comentario").value;
    if (nombre !== "" && texto.trim() !== "") {
        sistema.agregarComentario(nombre, texto);
        alert("Comentario agregado correctamente");
        mostrarComentarios();
        mostrarMayorCantidadComentarios();
        mostrarJugadoresNuncaJugaron();
        actualizarResumenAdministrador();
    } else {
        alert("Debe seleccionar un jugador y escribir un comentario");
    }
    document.getElementById("comentario").value = "";
}
function mostrarComentarios() {
    let tabla = document.getElementById("tabla-comentarios");
    tabla.innerHTML = `
        <thead>
            <tr>
                <th>Nombre Jugador</th>
                <th>Edad</th>
                <th class="col-comentario">Comentario</th>
            </tr>
        </thead>
    `;
    let cuerpo = document.createElement("tbody");
    let palabra = document.getElementById("destacar").value;
    let listaOrdenada = obtenerListaComentariosOrdenados();
    for (let i = 0; i < listaOrdenada.length; i++) {
        let c = listaOrdenada[i];
        let fila = document.createElement("tr");
        let tdNom = document.createElement("td");
        tdNom.textContent = c.nombre;
        fila.appendChild(tdNom);
        let jugador = sistema.buscarJugadorPorNombre(c.nombre);
        let tdEdad = document.createElement("td");
        tdEdad.textContent = jugador.edad;
        fila.appendChild(tdEdad);
        let tdComentario = document.createElement("td");
        tdComentario.innerHTML = destacarTexto(c.texto, palabra);
        fila.appendChild(tdComentario);
        cuerpo.appendChild(fila);
    }
    tabla.appendChild(cuerpo);
}
function obtenerListaComentariosOrdenados() {
    let lista = sistema.listaComentarios.slice();
    let ordenarPorEdad = document.getElementById("orden-edad").checked;
    if (ordenarPorEdad) {
        lista.sort(compararPorEdad);
    } else {
        lista.sort(compararPorNombre);
    }
    return lista;
}
function compararPorNombre(comA, comB) {
    let resultado = 0;
    let jugadorA = sistema.buscarJugadorPorNombre(comA.nombre);
    let jugadorB = sistema.buscarJugadorPorNombre(comB.nombre);
    if (jugadorA.nombre < jugadorB.nombre) {
        resultado = -1;
    } else {
        if (jugadorA.nombre > jugadorB.nombre) {
            resultado = 1;
        }
    }
    return resultado;
}
function compararPorEdad(comA, comB) {
    let resultado = 0;
    let jugadorA = sistema.buscarJugadorPorNombre(comA.nombre);
    let jugadorB = sistema.buscarJugadorPorNombre(comB.nombre);
    if (jugadorA.edad < jugadorB.edad) {
        resultado = -1;
    } else {
        if (jugadorA.edad > jugadorB.edad) {
            resultado = 1;
        }
    }
    return resultado;
}
function mostrarMayorCantidadComentarios() {
    let maximo = 0;
    for (let i = 0; i < sistema.listaJugadores.length; i++) {
        let jugador = sistema.listaJugadores[i];
        let cantidad = jugador.cantComentarios();
        if (cantidad > maximo) {
            maximo = cantidad;
        }
    }
    let ul = document.getElementById("lista-mayor-comentarios");
    ul.innerHTML = "";
    if (maximo === 0) {
        let li = document.createElement("li");
        li.textContent = "Sin datos";
        ul.appendChild(li);
        return;
    }
    let lista = obtenerJugadoresConMaximo(maximo);
    lista = ordenarPorNombre(lista);
    for (let i = 0; i < lista.length; i++) {
        let li = document.createElement("li");
        li.textContent = lista[i].nombre + " (" + lista[i].edad + " años)";
        ul.appendChild(li);
    }
}
function obtenerJugadoresConMaximo(maximo) {
    let resultado = [];
    for (let i = 0; i < sistema.listaJugadores.length; i++) {
        let jugador = sistema.listaJugadores[i];
        let cantidad = jugador.cantComentarios();
        if (cantidad === maximo) {
            resultado.push(jugador);
        }
    }
    return resultado;
}
function mostrarListaMayorComentarios(lista) {
    let ul = document.getElementById("lista-mayor-comentarios");
    ul.innerHTML = "";
    if (lista.length === 0) {
        let li = document.createElement("li");
        li.textContent = "Sin datos";
        ul.appendChild(li);
    } else {
        lista = ordenarPorNombre(lista);
        for (let i = 0; i < lista.length; i++) {
            let li = document.createElement("li");
            li.textContent = lista[i].nombre;
            ul.appendChild(li);
        }
    }
}
function destacarTexto(textoOriginal, palabraBuscada) {
    if (palabraBuscada.trim() === "") {
        return textoOriginal;
    }
    let texto = textoOriginal;
    let palabra = palabraBuscada.toLowerCase();
    let textoMinus = texto.toLowerCase();
    let resultado = "";
    let indice = textoMinus.indexOf(palabra);
    while (indice !== -1) {
        resultado += texto.substring(0, indice);
        let parteCoincide = texto.substring(indice, indice + palabra.length);
        resultado += '<span class="destacado">' + parteCoincide + '</span>';
        texto = texto.substring(indice + palabra.length);
        textoMinus = texto.toLowerCase();
        indice = textoMinus.indexOf(palabra);
    }
    resultado += texto;
    return resultado;
}
function mostrarJugadoresNuncaJugaron() {
    let ul = document.getElementById("lista-nunca-jugaron");
    ul.innerHTML = "";
    let lista = sistema.jugadoresQueNuncaJugaron();
    if (lista.length === 0) {
        let li = document.createElement("li");
        li.textContent = "Sin datos";
        ul.appendChild(li);
    } else {
        lista = ordenarPorNombre(lista);
        for (let i = 0; i < lista.length; i++) {
            let li = document.createElement("li");
            li.textContent = lista[i].nombre + " (" + lista[i].edad + "años" + ")";
            ul.appendChild(li);
        }
    }
}
function ordenarPorNombre(lista) {
    lista.sort(function (a, b) {
        let nomA = a.nombre.toLowerCase();
        let nomB = b.nombre.toLowerCase();
        if (nomA < nomB) return -1;
        if (nomA > nomB) return 1;
        return 0;
    });
    return lista;
}
function sonidoActivado() {
    return document.getElementById("con-sonido").checked;
}
function generarNuevaSuma() {
    numero1 = Math.floor(Math.random() * 9) + 1;
    numero2 = Math.floor(Math.random() * 9) + 1;
    document.getElementById("cuenta-suma").textContent = "Sumar... " + numero1 + " + " + numero2;
    document.getElementById("suma-res").value = "";
    document.getElementById("suma-res").style.backgroundColor = "white";
}
function limpiarSuma() {
    let input = document.getElementById("suma-res");
    input.value = "";
    input.style.backgroundColor = "white";
}
function verificarSuma() {
    let respuesta = Number(document.getElementById("suma-res").value);
    let jugadorSel = document.getElementById("jugador").value;
    if (jugadorSel === "") {
        alert("Debe seleccionar un jugador");
        return;
    }
    let jugador = sistema.buscarJugadorPorNombre(jugadorSel);
    if (respuesta === numero1 + numero2) {
        document.getElementById("suma-res").style.backgroundColor = "lightgreen";
        jugador.cantSumaGanadas++;
        if (sonidoActivado()) {
            sonidoAcierto.currentTime = 0;
            sonidoAcierto.play();
        }
        actualizarResumenAdministrador();
        mostrarJugadoresNuncaJugaron();
        setTimeout(function () {
            generarNuevaSuma();
        }, 800);
    } else {
        document.getElementById("suma-res").style.backgroundColor = "yellow";
        jugador.cantSumaPerdidas++;
        if (sonidoActivado()) {
            sonidoError.currentTime = 0;
            sonidoError.play();
        } else {
            alert("Respuesta incorrecta");
        }
        actualizarResumenAdministrador();
        mostrarJugadoresNuncaJugaron();
    }
}

function generarGrillaDiferente() {
    let filas = Math.floor(Math.random() * 3) + 2;
    let columnas = Math.floor(Math.random() * 3) + 2;
    let contenedor = document.getElementById("grilla-diferente");
    contenedor.innerHTML = "";
    let pareja = parejas[Math.floor(Math.random() * parejas.length)];
    let iconoA = pareja[0];
    let iconoB = pareja[1];
    filaDiferente = Math.floor(Math.random() * filas);
    colDiferente = Math.floor(Math.random() * columnas);
    for (let f = 0; f < filas; f++) {
        let filaDiv = document.createElement("div");
        filaDiv.classList.add("fila-grilla");
        for (let c = 0; c < columnas; c++) {
            let boton = document.createElement("button");
            boton.classList.add("btn-grilla");
            if (f === filaDiferente && c === colDiferente) {
                boton.textContent = iconoB;
                boton.addEventListener("click", aciertoDiferente);
            } else {
                boton.textContent = iconoA;
                boton.addEventListener("click", errorDiferente);
            }
            filaDiv.appendChild(boton);
        }
        contenedor.appendChild(filaDiv);
    }
}
function aciertoDiferente() {
    let jugadorSel = document.getElementById("jugador").value;
    if (jugadorSel === "") {
        alert("Seleccione un jugador primero");
        return;
    }
    let jugador = sistema.buscarJugadorPorNombre(jugadorSel);
    jugador.cantIconoGanadas++;
    if (sonidoActivado()) {
        sonidoAcierto.currentTime = 0;
        sonidoAcierto.play();
    }
    actualizarResumenAdministrador();
    mostrarJugadoresNuncaJugaron();
    setTimeout(function () {
        generarGrillaDiferente();
    }, 700);
}
function errorDiferente() {
    let jugadorSel = document.getElementById("jugador").value;
    if (jugadorSel === "") {
        alert("Seleccione un jugador primero");
        return;
    }
    let jugador = sistema.buscarJugadorPorNombre(jugadorSel);
    jugador.cantIconoPerdidas++;
    if (sonidoActivado()) {
        sonidoError.currentTime = 0;
        sonidoError.play();
    } else {
        alert("Incorrecto, intenta otra vez");
    }
    actualizarResumenAdministrador();
    mostrarJugadoresNuncaJugaron();
}
function actualizarResumenAdministrador() {
    let tabla = document.getElementById("tabla-admin");
    let cuerpo = tabla.querySelector("tbody");
    cuerpo.innerHTML = "";
    let jugadores = ordenarPorNombre(sistema.listaJugadores.slice());
    for (let i = 0; i < jugadores.length; i++) {
        let j = jugadores[i];
        let fila = document.createElement("tr");
        fila.innerHTML =
            "<td>" + j.nombre + "</td>" +
            "<td>" + j.edad + "</td>" +
            "<td>" + j.cantIconoGanadas + "</td>" +
            "<td>" + j.cantIconoPerdidas + "</td>" +
            "<td>" + j.cantSumaGanadas + "</td>" +
            "<td>" + j.cantSumaPerdidas + "</td>" +
            "<td>" + j.cantComentarios() + "</td>";

        cuerpo.appendChild(fila);
    }
}
function mostrarComentariosAdmin() {
    let tabla = document.getElementById("tabla-edicion-comentarios");
    tabla.innerHTML = `
        <thead>
            <tr>
                <th class="edicion-col1">Nombre Jugador</th>
                <th class="edicion-col2">Hora del Comentario</th>
                <th class="edicion-col3">Comentario</th>
            </tr>
        </thead>
    `;
    let cuerpo = document.createElement("tbody");
    let lista = sistema.listaComentarios;
    for (let i = 0; i < lista.length; i++) {
        let c = lista[i];
        let fila = document.createElement("tr");
        let tdNombre = document.createElement("td");
        tdNombre.textContent = c.nombre;
        let tdHora = document.createElement("td");
        tdHora.textContent = c.hora;
        let tdTexto = document.createElement("td");
        let input = document.createElement("input");
        input.type = "text";
        input.value = c.texto;
        input.setAttribute("data-index", i);
        input.classList.add("input-edicion");
        tdTexto.appendChild(input);
        fila.appendChild(tdNombre);
        fila.appendChild(tdHora);
        fila.appendChild(tdTexto);
        cuerpo.appendChild(fila);
    }
    tabla.appendChild(cuerpo);
}
function actualizarTodosLosComentarios() {
    let inputs = document.getElementsByClassName("input-edicion");
    for (let i = 0; i < inputs.length; i++) {
        let nuevoTexto = inputs[i].value;
        let indice = Number(inputs[i].getAttribute("data-index"));
        sistema.listaComentarios[indice].texto = nuevoTexto;
    }
    alert("Comentarios actualizados correctamente.");
    mostrarComentarios();
    mostrarComentariosAdmin();
    mostrarMayorCantidadComentarios();
    actualizarResumenAdministrador();
}
function actualizarResumenAdministrador() {
    let tabla = document.getElementById("tabla-admin");
    if (!tabla) return;
    let cuerpo = tabla.querySelector("tbody");
    cuerpo.innerHTML = "";
    let lista = ordenarPorNombre(sistema.listaJugadores.slice());
    for (let i = 0; i < lista.length; i++) {
        let j = lista[i];
        let fila = document.createElement("tr");
        fila.innerHTML =
            "<td>" + j.nombre + "</td>" +
            "<td>" + j.edad + "</td>" +
            "<td>" + j.cantIconoGanadas + "</td>" +
            "<td>" + j.cantIconoPerdidas + "</td>" +
            "<td>" + j.cantSumaGanadas + "</td>" +
            "<td>" + j.cantSumaPerdidas + "</td>" +
            "<td>" + j.cantComentarios() + "</td>";

        cuerpo.appendChild(fila);
    }
}

