//CREAMOS UNA CLASE CONSTRUCTORA QUE USAREMOS COMO PLANTILLA
class Pokemon{
    constructor(id,nombre,tipo,ataque,vida,imagen){
    this.id = id;
    this.nombre = nombre;
    this.tipo = tipo;
    this.ataque = ataque;
    this.vida = vida;
    this.imagen = imagen;

    }
}

//CREAMOS CADA POKEMON CON SUS ATRIBUTOS A PARTIR DE LA CLASE CONSTRUCTORA

const pikachu = new Pokemon(1,"Pikachu", "Eléctrico", 20, 100, "https://www.pngmart.com/files/2/Pikachu-Transparent-Background.png");
const charmander = new Pokemon(2,"Charmander", "Fuego", 17, 100, "https://www.pngmart.com/files/13/Charmander-PNG-Clipart.png");
const bulbasaur = new Pokemon(3,"Bulbasaur", "Planta", 16, 100, "https://vignette.wikia.nocookie.net/pokemon/images/2/21/001Bulbasaur.png/revision/latest?cb=20140328193533");
const squirtle = new Pokemon(4,"Squirtle", "Agua", 17, 100, "https://vignette.wikia.nocookie.net/pokemon/images/3/39/007Squirtle.png/revision/latest?cb=20140328205822");
const snorlax = new Pokemon(5,"Snorlax", "Normal", 18, 100, "https://www.pngmart.com/files/23/Snorlax-PNG-Photo.png");
const jigglypuff = new Pokemon(6,"Jigglypuff", "Hada", 15, 100, "jiggly.png");
const gyarados = new Pokemon(7,"Gyarados", "Agua", 21, 100, "https://vignette.wikia.nocookie.net/pokemon/images/4/41/130Gyarados.png/revision/latest?cb=20140328211915");
const dragonite = new Pokemon(8,"Dragonite", "Dragón", 20, 100, "dragonite.png");
const mewtwo = new Pokemon(9,"Mewtwo", "Psíquico", 25, 100, "https://vignette.wikia.nocookie.net/pokemon/images/7/78/150Mewtwo.png/revision/latest?cb=20140328215318");
const gengar = new Pokemon(10,"Gengar", "Fantasma", 19, 100, "https://www.pngmart.com/files/23/Gengar-PNG.png");

//DEFINIMOS DOS VARIABLE QUE ALMACENARAN EL POKEMON QUE ATAQUE Y EL QUE DEFIENDA
let pokemonAtacante, pokemonDefensor;
//METEMOS TODOS LOS POKEMONES CREADOS EN UN ARRAY 
const pokemones = [pikachu, charmander, bulbasaur, squirtle, snorlax, jigglypuff, gyarados, dragonite, mewtwo, gengar];
//CREAMOS UNA VARIABLE PARA ALMACENAR LOS POKEMON QUE SE ELEGIRAN PARA EL COMBATE
let pokemonesElegidos = [];

//CREAMOS UN OBJETO COMO TABLA DE EFECTIVIDADES DE TIPOS DE LOS POKEMON
const efectividades = {
  "Normal": {
    "Roca": 0.5,
    "Acero": 0.5,
    "Fantasma": 0
  },
  "Fuego": {
    "Planta": 4,
    "Hielo": 3,
    "Bicho": 3,
    "Acero": 1,
    "Fuego": 0,
    "Agua": 1,
    "Dragón": 2
  },
  "Agua": {
    "Fuego": 4,
    "Tierra": 4,
    "Roca": 3,
    "Agua": 0,
    "Planta": 0,
    "Dragón": 1
  },
  "Planta": {
    "Agua": 3,
    "Tierra": 4,
    "Roca": 2,
    "Planta": 0,
    "Fuego": 0,
    "Veneno": 1,
    "Volador": 1,
    "Bicho": 2,
    "Dragón": 1,
    "Acero": 0
  },
  "Eléctrico": {
    "Agua": 4,
    "Volador": 4,
    "Tierra": 0,
    "Eléctrico": 0,
    "Dragón": 2
  },
  "Hada": {
    "Dragón": 3,
    "Lucha": 3,
    "Siniestro": 2,
    "Fuego": 2,
    "Veneno": 2,
    "Acero": 1
  },
  "Dragón": {
    "Dragón": 2,
    "Agua": 1,
    "Planta": 1,
    "Eléctrico": 1,
    "Fuego": 2,
    "Hielo": 2
  },
  "Psíquico": {
    "Lucha": 2,
    "Veneno": 2,
    "Psíquico": 0,
    "Acero": 0,
    "Fantasma": 3
  },
  "Fantasma": {
    "Psíquico": 2,
    "Fantasma": 2,
    "Normal": 0,
    "Lucha": 0,
    "Acero": 0,
    "Siniestro": 0
  }
};



//FUNCION PARA REPRODUCIR LA MUSICA DE LA INTERFAZ
function reproducirSonido() {
const audio = document.getElementById('sonido');
audio.play();
}
// FUNCION PARA MOSTRAR EL POKEMON VENCEDOR MEDIANTE LA BIBLIOTECA SWEETALERT
function anunciarGanador(pokemonGanador){
  swal.fire({title: "¡Felicidades!",
  text: "El ganador del combate es " + pokemonGanador.nombre + "!",
  imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT68zHnPnghW9Pdi6gmwznXwyqtMCr_3mdncUQzPff1kw&s",
  buttons: {
    confirm: {
      text: "OK",
      value: true,
      visible: true,
      className: "",
      closeModal: true
    }},
    background: "#87CEEB"


    
  })
}
//FUNCION PARA IMPRIMIR LAS CARDS DE CADA POKEMON EN EL NAVEGADOR MODIFICANDO EL DOM
   //---LA FUNCION RECIBE COMO PARAMETRO UN ARRAY
   //--ESE ARRAY SERÁ RECORRIDO MEDIANTE FOR.EACH
   //--POR CADA ELEMENTO DEL ARRAY, EL DIV CONTENEDOR HTML LOS PINTARÁ EN PANTALLA MEDIANTE TEMPLATE LITERALLS Y METODO ACUMULATIVO
   //-- LLAMAMOS A LA FUNCION QUE LE DARÁ VIDA A LOS BOTONES
function mostrarPokemones(arrayPokemones) {
    const contenedorPokemon = document.querySelector("#pokemones-container");
    contenedorPokemon.innerHTML = "";
  
    arrayPokemones.forEach(pokemon => {
      contenedorPokemon.innerHTML += `
      <div class="card-pokemon">
      <h3>${pokemon.nombre}</h3>
      <img src="${pokemon.imagen}" alt="${pokemon.nombre}">
      <div id="tipoP">Tipo: ${pokemon.tipo}</div>
      <div id="ataqueP">Ataque: ${pokemon.ataque}</div>
      <div id="vidaP">Vida: ${pokemon.vida}</div>
      <button class="elegir-btn" data-id="${pokemon.id}">Elegir</button>
    </div>
      `;
    });
    activarBotones()
  }


//FUNCION PARA DARLE VIDA A LOS BOTONES
  //---AGRUPAMOS TODOS LOS BOTONES Y LOS ALMACENAMOS EN UNA VARIABLE
  //---RECORREMOS LA VARIABLE Y POR CADA BOTÓN LE ASIGNAREMOS UN EVENTO "CLICK"
  //---CREAMOS UNA CONDICIONAL, MIENTRAS NO HAYAN 2 POKEMONES ELEGIDOS
  //---OBTENEMOS EL ID DEL BOTON MEDIANTE DATASET
  //---MEDIANTE EL METODO FIND COMPARAMOS SI HAY UN POKEMON CON UN ID IGUAL QUE AL QUE OBTENEMOS MEDIANTE DATASET Y LO GUARDAMOS EN UNA VARIABLE
  //---SI EXISTE LO AGREGAMOS A UNA VARIABLE MEDIANTE "PUSH"
  //VOLVEMOS A HACER UN CONDICIONAL,SI YA HAY 2 POKEMONES EJECUTAMOS LA FUNCION DE COMBATE
function activarBotones(){
  const botonesElegir = document.querySelectorAll(".elegir-btn");

botonesElegir.forEach(boton => {
  boton.addEventListener("click", () => {
    if(pokemonesElegidos.length < 2){
      const idPokemonSeleccionado = boton.dataset.id;
      const pokemonSeleccionado = pokemones.find(pokemon => pokemon.id == idPokemonSeleccionado);
      pokemonesElegidos.push(pokemonSeleccionado);
      boton.disabled = true;
      boton.innerText = "Elegido";
      if(pokemonesElegidos.length == 2){
        setTimeout(function(){
          dialogSeleccionPokemon.close();
        }, 4000);
        iniciarCombate()
      }

    }
  });
});

}


//FUNCION DE EFECTIVIDAD DE TIPOS
   //---RECIBIMOS COMO PARAMETRO EL TIPO ATACANTE Y EL TIPO DEL DEFENSOR
   //--- EN EL PRIMER IF VERIFICA SI EL TIPO DEL POKEMON ATACANTE SE ENCUENTRA DENTRO DEL OBJETO "EFECTIVIDADES"
   //---SI NO EXISTE SIGNIFICA QUE EL POKEMON ATACANTE NO TIENE VENTAJA O DESVENTAJA Y DEVUELVE EL VALOR 1(NORMAL)
   //---EN CASO DE QUE SI EXISTA OBTIENE EL OBJETO DEL POKEMON ATACANTE Y SE GUARDA EN UNA VARIABLE
   //---EN EL SEGUNDO IF VERIFICAMOS SI EL TIPO DEL POKEMON DEFENSOR SE ENCUENTRA DENTRO DEL OBJETO DE EFECTIVIDADES DEL POKEMON ATACANTE
   //---SI NO EXISTE SIGNIFICA QUE EL POKEMON DEFENSOR NO TIENE NINGUNA DESVENTAJA SOBRE EL ATACANTE Y DEVUELVE EL VALOR 1
   //---SI EL POKEMON DEFENSOR ESTA DEFINIDO EN EL OBJETO DEL POKEMON ATACANTE DEVOLVERA EL VALOR (NUMERICO) DE EFECTIVIDAD CORRESPONDIENTE
function calcularEfectividad(tipoAtacante,tipoDefensor){
  if (!(tipoAtacante in efectividades)){
    return 1
  }

  const efectividadesTipoAtacante = efectividades[tipoAtacante]

  if(!(tipoDefensor in efectividadesTipoAtacante)){
    return 1
  }

  return efectividadesTipoAtacante[tipoDefensor]
}

//FUNCION PARA EL COMBATE
  //---ASIGNAMOS A DOS VARIABLES LOS DOS POKEMONES QUE FUERON ELEGIDOS, MEDIANTE SU INDICE EN EL ARRAY
  //---PINTAMOS EN UN DIV CONTENEDOR 2 PLANTILLAS TEMPLATE LITERALS DE LOS DOS POKEMONES MEDIANTE ACUMULACION
  //---CREAMOS A UNA VARIABLE DE TURNO CON VALOR INICIAL 1
  //---HACEMOS USO DE LAS VARIABLES DE POKEMON ATACANTE Y DEFENSOR
  //---PARA EL ELEGIR EL ATACANTE HACEMOS USO DE LA FUNCION MATH.RANDOM() QUE DEVUELVE UN NUMERO ALEATORIO Y REDONDEADO
  //---LUEGO EL OPERADOR TERNARIO EVALUA SI EL NUMERO ES IGUAL A 0 SI ES ASI, SE ASIGNA A POKEMON1 DE LO CONTRARIO A POKEMON2
  //---PARA EL POKEMON DEFENSOR SE EVALUA SI POKEMON ATACANTE ES IGUAL A POKEMON1 SI ES ASI POKEMON2 SERÁ EL DEFENSOR Y SINO LO SERÁ POKEMON1
//--- CREAMOS LA FUNCION ATACAR
  //---DECLARAMOS UNA VARIABLE "EFECTIVIDAD" QUE SE LE ASIGNARÁ LA FUNCION "CalcularEfectividad"
  //---DECLARAMOS UNA VARIABLE "ATAQUE" CON VALOR INICIAL 0
  //---DECLARAMOS UNA VARIABLE PARA ALMACENAR UN NUMERO RANDOM ENTRE 1 Y 100 MEDIANTE LA FUNCION MATH.FLOOR()
  //---HACEMOS UNA COMPROBACION SI EL NUMERO RANDOM ES MENOR O IGUAL A 20, SI ES ASI PINTAS UN MENSAJE EN EL DIV SOBRE EL FALLO DEL ATAQUE
    //SE CREA UNA VARIABLE TEMPORAL QUE ALMACENA AL POKEMON ATACANTE, LUEGO EL POKEMON ATACANTE TOMA EL VALOR DEL POKEMON DEFENSOR
    //LUEGO EL POKEMON DEFENSOR TOMA EL VALOR DE LA VARIABLE TEMPORAL Y POR ULTIMO EL POKEMON ATACANTE TOMA EL VALOR DEL DEFENSOR
  //EJECUTAMOS LA FUNCION "ATACAR"
function iniciarCombate(){
  const contenedorCombate = document.querySelector("#combate-container");
  contenedorCombate.innerHTML = "";
  const pokemon1 = pokemonesElegidos[0];
  const pokemon2 = pokemonesElegidos[1];
  contenedorCombate.innerHTML += `
  <div class="pokemon-1">
  <h3>${pokemon1.nombre}</h3>
  <img src="${pokemon1.imagen}" alt="${pokemon1.nombre}">
  <div id="tipoP">Tipo: ${pokemon1.tipo}</div>
  <div id="ataqueP">Ataque: ${pokemon1.ataque}</div>
  <div id="vidaP">Vida: ${pokemon1.vida}</div>
</div>
<p>Vs</p>
<div class="pokemon-2">
  <h3>${pokemon2.nombre}</h3>
  <img src="${pokemon2.imagen}" alt="${pokemon2.nombre}">
  <div id="tipoP">Tipo: ${pokemon2.tipo}</div>
  <div id="ataqueP">Ataque: ${pokemon2.ataque}</div>
  <div id="vidaP">Vida: ${pokemon2.vida}</div>
</div>    
  `;
  let turno = 1;
  pokemonAtacante = Math.round(Math.random()) == 0 ? pokemon1 : pokemon2;
  pokemonDefensor = pokemonAtacante == pokemon1 ? pokemon2 : pokemon1;

function atacar(){

  const efectividad = calcularEfectividad(pokemonAtacante.tipo,pokemonDefensor.tipo)
  let ataque = 0;

  const randomNum = Math.floor(Math.random() * 100 + 1);


  if(randomNum <= 20){
    contenedorCombate.innerHTML += `
      <div class="turno">Turno ${turno}: ${pokemonAtacante.nombre} INTENTÓ ATACAR PERO FALLÓ</div>
    `;

    const temp = pokemonAtacante;
    pokemonAtacante = pokemonDefensor;
    pokemonDefensor = temp;
    atacante = pokemonAtacante;
    setTimeout(atacar, 1500);
  }else{
    ataque = Math.round(pokemonAtacante.ataque + efectividad)
  pokemonDefensor.vida -= ataque;
  const efectividadTexto = efectividad <= 1 ? "NO ES MUY EFECTIVO" :
  efectividad >= 2 ? "ES EFECTIVO" :
  "";
  

  
if(pokemonDefensor.vida <= 0){

  // anunciarGanador(pokemonAtacante)

  contenedorCombate.innerHTML += 
  `
        <div class="resultado">¡${pokemonAtacante.nombre} GANÓ EL COMBATE</div>
      `;

    anunciarGanador(pokemonAtacante)

    } else {
      contenedorCombate.innerHTML += `
       <div class="turno">Turno ${turno}: ${pokemonAtacante.nombre} atacó a ${pokemonDefensor.nombre} y le quitó ${ataque} puntos de vida. ${efectividadTexto}.</div>
    `
  turno++;
  const temp = pokemonAtacante;
  pokemonAtacante = pokemonDefensor;
  pokemonDefensor = temp;
  atacante = pokemonAtacante;
  setTimeout(atacar,1500)

}
}
}
atacar()
}

mostrarPokemones(pokemones);

  const botonEmpezarJuego = document.querySelector("#empezar-juego");
  const dialogSeleccionPokemon = document.querySelector("#seleccion-pokemon");
  
  botonEmpezarJuego.addEventListener("click", () => {
    reproducirSonido()
    dialogSeleccionPokemon.showModal();
  });

  const X = document.querySelector("h3")
  X.addEventListener("click",()=>{
    dialogSeleccionPokemon.close()
  })