/* Apellido: Curbelo — Nº de estudiante 348182
Apellido: Vaz — Nº de estudiante 282487
Grupo: nocturno */

class Jugador {
    constructor (nombreJugador, edadJugador){
        this.nombre = nombreJugador;
        this.edad = edadJugador;
        this.cantJugo=0;
        this.cantGano=0;
        this.cantJugoSuma=0;
        this.cantGanoSuma=0;
        this.listaComentarios = [];

    }
    agregarComentario(comentarioNuevo){
        this.listaComentarios.push(comentarioNuevo);
    }
    registrarJugada(acerto){
        this.cantJugo = this.cantJugo + 1;
        if (acerto){
            this.cantGano= this.cantGano + 1;
        }
    }
    registrarJugadaSuma(acerto){
        this.cantJugoSuma = this.cantJugoSuma + 1;
        if (acerto){
            this.cantGanoSuma= this.cantGanoSuma + 1;
        }
    }
    cantComentarios(){
        let cantidad = this.listaComentarios.length;
        return cantidad
    }
}

class Comentario {
    constructor (nombreJugador, texto){
        this.nombreJugador= nombreJugador;
        this.texto= texto;
        this.hora= new Date()
    }
    obtenerHora(){
        let horas= this.hora.getHours();
        let minutos = this.hora.getMinutes();
        if (minutos < 10){
            minutos = "0" + minutos;
        }
        let textoHora= horas + ":" + minutos;
        return textoHora;
    }
}

class Sistema {
    constructor (){
        this.listaJugadores=[];
        this.listaComentarios=[];
    }
    agregarJugador(nombreJugador, edadJugador){
        let existe = false;
        for(let i=0; i<this.listaJugadores.length; i++){
            if(this.listaJugadores[i].nombre == nombreJugador){
                existe=true;
            }
        }
        if(existe=== false && edadJugador >= 5 && edadJugador<=100){
            let nuevoJugador= new Jugador(nombreJugador, edadJugador);
            this.listaJugadores.push(nuevoJugador);
        }
    }

    agregarComentario(nombreJugador,texto){
        let comentarioNuevo= new Comentario(nombreJugador, texto);
        this.listaComentarios.push(comentarioNuevo);
        for(let i=0; i< this.listaJugadores.length; i++){
            if(this.listaJugadores[i].nombre === nombreJugador){
                this.listaJugadores[i].agregarComentario(comentarioNuevo);
            }
        }
    }
    jugadoresQueNuncaJugaron(){
        let listaResultado=[];
        for(let i=0; i<this.listaJugadores.length; i++){
            let jugador= this.listaJugadores[i];
            if(jugador.cantJugo===0 && jugador.cantJugoSuma===0){
                listaResultado.push(jugador)
            }
        }
        return listaResultado
    }
}