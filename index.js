// const uno = document.querySelector("#uno");
// const dos = document.querySelector("#dos");
// const tres = document.querySelector("#tres");
// const cuatro = document.querySelector("#cuatro");
// const cinco = document.querySelector("#cinco");
// const boton1 = document.querySelector("#button1");
// const boton2 = document.querySelector("#button2");


// uno.style.top = "0px"
// uno.style.height = "50px"

// dos.style.top = "50px"
// dos.style.height = "50px"

// tres.style.top = "100px";
// tres.style.height = "50px"

// cuatro.style.top = "150px";
// cuatro.style.height = "50px"

// cinco.style.top= "200px"  
// cinco.style.height = "50px"

// boton1.onclick = () => {
//   intercambiarPosiciones(uno, dos)
// }

// boton2.onclick = () => {
//   intercambiarPosiciones(cuatro, cinco)
// }

// const intercambiarPosiciones = (elem1, elem2) => {
//   const tamanio = 50
//   // La posicion de 1 es data1 * tamanio
//   // Si quiero que 1 ocupe el espacio que antes ocupaba 2
//   // La nueva posicion de 1 debe ser data2 * tamanio

//   const data1 = elem1.dataset.x
//   const data2 = elem2.dataset.x
//    elem1.style.top = `${data2 * tamanio}px`
//    elem2.style.top = `${data1 * tamanio}px`
//   console.log(data1, data2)
//   elem1.dataset.x = data2
//   elem2.dataset.x = data1
// }

const grillaHTML = document.querySelector('#grilla');
const boton = document.querySelector("#intercambiar")
const botonMatches = document.querySelector("#buscar")

const frutas = ['🍉', '🥥', '🍋', ];

let grilla = [];

const obtenerFrutaAlAzar = frutas => {
  return frutas[Math.floor(Math.random() * frutas.length)];
};

const generarGrilla = () => {
  grilla = []
  for (let i = 0; i < 10; i++) {
    grilla[i] = []
    for (let j = 0; j < 10; j++) {
      grilla[i][j] = obtenerFrutaAlAzar(frutas)
    }
  }
  return grilla
}

const generarCuadrado = (x, y, array) => {
  const tamanio = 50

  const cuadrado = document.createElement('div')
  cuadrado.dataset.x = x
  cuadrado.dataset.y = y 
  cuadrado.innerHTML = array[x][y]
  cuadrado.style.top = `${x * tamanio}px`
  cuadrado.style.left = `${y * tamanio}px`
  return cuadrado

}

const agregarGrillaAHTML = () => {
  const anchoDeGrilla = 50 * 10
  grillaHTML.style.width = `${anchoDeGrilla}px`
  const listaDeFrutas = grilla;
  for (let i = 0; i < listaDeFrutas.length; i++) {
    for (let j = 0; j < listaDeFrutas[i].length; j++) {
      grillaHTML.appendChild(generarCuadrado(i, j, listaDeFrutas))
    }
  }
}

generarGrilla()
agregarGrillaAHTML()

boton.onclick = () => {
  const elemento1 = document.querySelector(`div[data-x="0"][data-y="0"]`)
  const elemento2 = document.querySelector(`div[data-x="0"][data-y="1"]`)
  intercambiarCuadrados(elemento1, elemento2)
}

const intercambiarCuadrados = (elem1, elem2) => {
  const tamanio = 50
  // La posicion de 1 es data1 * tamanio
  // Si quiero que 1 ocupe el espacio que antes ocupaba 2
  // La nueva posicion de 1 debe ser data2 * tamanio

  const datax1 = Number(elem1.dataset.x)
  const datax2 = Number(elem2.dataset.x)
  const datay1 = Number(elem1.dataset.y)
  const datay2 = Number(elem2.dataset.y)

  // aqui modifico la grilla en JS
  let variableTemporal = grilla[datax1][datay1]
  grilla[datax1][datay1] = grilla[datax2][datay2]
  grilla[datax2][datay2] = variableTemporal 

  // aca modifico la grilla en HTML
   elem1.style.top = `${datax2 * tamanio}px`
   elem2.style.top = `${datax1 * tamanio}px`
   elem1.style.left = `${datay2 * tamanio}px`
   elem2.style.left = `${datay1 * tamanio}px`

  elem1.dataset.x = datax2
  elem2.dataset.x = datax1
  elem1.dataset.y = datay2
  elem2.dataset.y = datay1

}

const buscarBloques = () => {
  let matchesHorizontales = [];
  let matchesVerticales = [];

  for (let i = 0; i < grilla.length; i++) {
    for (let j = 0; j < grilla[i].length; j++) {
      if (
        grilla[i][j] === grilla[i][j + 1] &&
        grilla[i][j] === grilla[i][j + 2]
      ) {
        matchesHorizontales.push([i, j]);
        matchesHorizontales.push([i, j + 1]);
        matchesHorizontales.push([i, j + 2]);
      }
      if (
        grilla[i + 1] &&
        grilla[i + 2] &&
        grilla[i][j] === grilla[i + 1][j] &&
        grilla[i][j] === grilla[i + 2][j]
      ) {
        matchesVerticales.push([i, j]);
        matchesVerticales.push([i + 1, j]);
        matchesVerticales.push([i + 2, j]);
      }
    }
  }
  const obtenerCuadrado = arr => {
    return document.querySelector(
      `div[data-x='${arr[0]}'][data-y='${arr[1]}']`,
    );
  };

  for (let i = 0; i < matchesHorizontales.length; i++) {
    obtenerCuadrado(matchesHorizontales[i]).style.backgroundColor = 'yellow';
  }
  for (let i = 0; i < matchesVerticales.length; i++) {
    obtenerCuadrado(matchesVerticales[i]).style.backgroundColor = 'orange';
  }
  if (!matchesHorizontales.length && !matchesVerticales.length) {
    alert('No hay matches :(');
  }
};

botonMatches.onclick = () => {
  for (let cuadrado of grillaHTML.children) {
    cuadrado.style.backgroundColor = "white"
  }
  buscarBloques()
}


// Crear una grilla en JS y en HTML con items aleatorios 
// loop      // Chequeamos que si hay matches
             // Si hay matches, volvemos a generar una grilla

// Si no hay bloques, 
  // el usuario hace click en un cuadrado
  // el usuario hace click en otro cuadrado
  // chequeamos si moviendo los cuadrados de lugar hay matches
  // si no hay, volvemos elementos a la posicion original
  // si hay, mantenemos los elementos en la nueva posicion
  // 



  // desaparecen las frutas
  // elimino los elementos tanto en HTML como en JS 

  // primera version: rellenar con elementos al azar

  // segunda version: hacer que los elementos "caigan"
  // mientras haya items con posiciones vacias por debajo, 
  // obtener la cantidad de posciones vacias que tiene debajo
  // bajar el item esas pisiciones
  // rellenar posiciones restantes (las de mas arriba) con elementos al azar