/* Apellido: Curbelo — Nº de estudiante 348182
Apellido: Vaz — Nº de estudiante 282487
Grupo: nocturno */

class Jugador {
    constructor(nombre, edad) {
        this.nombre = nombre;
        this.edad = edad;
        this.cantIconoGanadas = 0;
        this.cantIconoPerdidas = 0;
        this.cantSumaGanadas = 0;
        this.cantSumaPerdidas = 0;
        this.listaComentarios = [];

    }
    agregarComentario(comentario) {
        this.listaComentarios.push(comentario);
    }
    jugo() {
        return (this.cantIconoGanadas > 0 || this.cantIconoPerdidas > 0 || this.cantSumaGanadas > 0 || this.cantSumaPerdidas > 0)
    }
    cantComentarios() {
        return this.listaComentarios.length;
    }
}

class Comentario {
    constructor(nombre, texto) {
        this.nombre = nombre;
        this.texto = texto;
        this.hora = new Date().toLocaleTimeString();
    }
}

class Sistema {
    constructor() {
        this.listaJugadores = [];
        this.listaComentarios = [];
    }
    agregarJugador(nombre, edad) {
        nombre = nombre.trim();
        let existe = false;
        for (let i = 0; i < this.listaJugadores.length; i++) {
            if (this.listaJugadores[i].nombre.toLowerCase() === nombre.toLowerCase()) {
                existe = true;
            }
        }
        if (!existe && edad >= 5 && edad <= 100) {
            let nuevoJugador = new Jugador(nombre, edad);
            this.listaJugadores.push(nuevoJugador);
            return true;
        } else {
            return false;
        }
    }


    agregarComentario(nombre, texto) {
        if (texto.trim() === "") {
            return;
        }
        let comentarioNuevo = new Comentario(nombre, texto);
        this.listaComentarios.push(comentarioNuevo);
        for (let i = 0; i < this.listaJugadores.length; i++) {
            if (this.listaJugadores[i].nombre === nombre) {
                this.listaJugadores[i].agregarComentario(comentarioNuevo);
            }
        }
    }
    jugadoresQueNuncaJugaron() {
        let listaNoJugaron = [];
        for (let i = 0; i < this.listaJugadores.length; i++) {
            let jugador = this.listaJugadores[i];
            if (!jugador.jugo()) {
                listaNoJugaron.push(jugador)
            }
        }
        return listaNoJugaron
    }
    buscarJugadorPorNombre(nombre) {
        for (let i = 0; i < this.listaJugadores.length; i++) {
            if (this.listaJugadores[i].nombre === nombre) {
                return this.listaJugadores[i];
            }
        }
        return null;
    }
}
