
var filas = 7;
var columnas = 7;
var movimientos = 0;
var score = 0;
var tablero = [];
var seal = null;
var banderaFila = false;
var banderaColumna = false;
var interval;

$(document).ready(function(){ //inicio de Jquery
    $('.btn-reinicio').on('click',function(){
      if(this.innerHTML == 'Iniciar'){// Si se presiona el boton iniciar, se ejecuta la funcion iniciar
        this.innerHTML = 'Reiniciar';// si se presiona el boton reiniciar, se ejecuta la funcion reiniciar
        Tablero.iniciarJuego();//se ejecuta funciion iniciarJuego
      }else{
        Tablero.reiniciarJuego();//se ejecuta funcion ReiniciarJuego
      }
    });
});

var Tablero = {// declaramos que en la variable tablero como un arreglo con difernetes funciones a ejecutar
  iniciarJuego: function(){//inicio de funcion iniciarJuego
    seal = this;
    for (var i = 0; i < filas; i++) {// ciclo para poner filas, siempre y cuando filas<=7
      var fila = []; //declaramos el arreglo fila donde se almacenaran las filas
      for (var j = 0; j < columnas; j++) {// ciclo que aumenta las columnas, siempre y cuando culumnas<=7
        var index = Math.floor(Math.random() * (5 - 1)) + 1;// se guarda una varible index, el entero maximo entero que resulta de aplicar el metodo math Random para posicionar diferentes imagenes en al tablero
        var elemento = $('<img id="'+i+'-'+j+'" src="image/'+index+'.png" class="elemento" data-item="bloque-'+index+'" />');// decimos que en var elemento agregue una columna y una fila con las propiedades de la var index
        fila[j] = elemento;//en el arreglo fila, se guarda columna ingresada con las priedades anteriores
        $('.col-'+(j+1)).append(elemento);// decimos que agregue una columna con las propiedades de la variable elemento a cada clase .col
        this.agregarDulces(elemento);// intanciamos la funcion agrEventos para que se vuelvan a agregar dulces al tablero 
      }
      tablero[i] = fila;// se guarda en el arreglo tablero, la fila ingresada
    }

    
    var cronometro = new Date(Date.parse(new Date()) + 2* 60 * 1000);// guardamos en la variable cronometro, una fecha como entero, 
    IniciarReloj('timer', cronometro);// Llamamos a la funcion Inicializar reloj, con los parametros de var cronometro, y se inicia el cronometro 
    // Validar elementos
   
    interval = setInterval(seal.agregarFichas, 1000);//en la var interval, ponemos el intervalo en 1000 y y que la variable sello ejecute la funcion agregarFichas rn 1000 milisegubdos
  },
  agregarDulces: function(elemento){ //declaramos inicio de la funcion que permite agregar mas duulces
    var seal = this;
    $(elemento).draggable({ grid: [ 130, 100 ], revert: "invalid", snap: ".elemento", snapMode: "inner", zIndex:9, helper: "clone", cursor:"move"  });//egregamos el evento draggable a la var elemento declarada antetiormente y definimos parametros para su movimiento
    $(elemento).droppable({// agregamos el evento droppable a la var elemento y definimos algunos parametros
      drop: function(event, ui ) {// durante la funcion drop
        movimientos++;// aumenta la var movimientos en 1(contador de los movimientos que se hacen)
        $('#movimientos-text').html(movimientos); //el texto movimientos del tablero se cambiara por el numero de movimientos hechos

        var idItemA = ui.draggable.attr('id');// guardamos en la var idItemA el id del item que se arrastro
        var idItemB = $(this).attr('id'); // guardamos en la var idItemB el id del item que se arrastro
        var posItemA = idItemA.split('-');// guardamos en la var postItemA la variable idItemA pero agregando el metodo split que dividir cada culumna o fila por dulces
        var posItemB = idItemB.split('-');

        var arrastrarDulce = $(ui.draggable).clone().replaceAll(this); // en la var dragElement clonamos el objeto arrastrado y lo reponemos con otro objeto, en esa misma posicion
        $(this).replaceAll(ui.draggable);

        arrastrarDulce.attr('id',idItemB);// guarda el id del elemento arrastrado
        $(this).attr('id',idItemA);

        tablero[posItemA[0]][posItemA[1]] = $(this);// en el arreglo tablero introducimos el item del arreglo que se arrasto en la posicion 0 y 1
        tablero[posItemB[0]][posItemB[1]] = arrastrarDulce;// en el arreglo tablero, se introduce el objeto guradado en la var arrastrarDulce definida anteriormente

        seal.agregarDulces(this); //especificamos que la variable sello de la funcion agregarDulces se haga un objeto
        seal.agregarDulces(arrastrarDulce);// Especificamos que la variable sello de la funcion agregarDulce, mandamos la var arrastrarDulce
        // Validar elementos
        seal.validarColumnas(); //especificamos que se ejecute la funcion validar columnas para la eliminarse entre si los dulces
        seal.validarFilas();//especificamos que se ejecute la funcion validar filas para la eliminarse entre si los dulces
      }
    });
  },
  validarColumnas: function(){ // inicio de funcion para validar las filas.
    for (var i = 0; i < filas; i++) { // ciclo usado para recorrer el tablero por las filas
      var dulcePrev,dulceSigui = null; // declaramos las variables tmpPrev, tmpNext como nulas
      for (var j = 0; j < columnas; j++) { // ciclo usado para recorrer las columnas del tablero
          var actual = tablero[i][j]; // guardamos en la varible actual, las filas y las columnas en el arreglo tablero actuales
          if(j!=0){// si las columnas son diferentes de 0, entonces
            dulcePrev = tablero[i][j-1]// la variable tmpPrev guardara la posicion actual de filas y se le resta una a la columna
          }else { //si no
            dulcePrev = null; // la variable tmpPrev sigue en null
          }
          if(j!=(columnas-1)){// si la columna validada es diferente de la var columnas-1, entonces
            dulceSigui = tablero[i][j+1];// la variable tmpNext se guarda la posicion actual de filas y le suma una a columnas
          }else{// si no
            dulceSigui = null;// la variable tmpNext se queda en null
          }

          if(dulcePrev && dulceSigui){ //validamos las dos variables donde guardamos la validacion de columnas 
            var dulce1 = actual.attr('data-item');// guardamos en la var dulce1, el valor del atributo guardado en la var actual
            var dulce2 = dulcePrev.attr('data-item');//guardamos en la var dulce2, el valor del atributo guardado en la var tmpPrev , dulce previo de la columna
            var dulce3 = dulceSigui.attr('data-item');//guardamos en la var dulce3, el valor del atributo guardado en la var tmpNext, dulce siguiente de la columna

            if(dulce1 == dulce2 && dulce1 == dulce3){ // comparamos y validamos los dulces  guardados de las columnas
              score += 100;// si se cumple alguno de la validacion, la variable score suma 100
              $('#score-text').html(score);// en el tablero el score se cambiara por el valor de la variable score
              this.removerElementos(dulcePrev);// instanciamos la funcion removerElementos para el var tmpPrev y elimina el dulce
              this.removerElementos(actual);// instanciamos la funcion removerElementos para la var actual y elimina el dulce
              this.removerElementos(dulceSigui);// instanciamos la funcion removerElementos para la var tmpNext y elimina el dulce
            }
          }
        }
    }
    banderaColumna = true; // ponemos la bandera en verdadero, que indica que se hizo una comparacion de columnas positiva, osea hubo eliminacion de dulces iguales
  },
  validarFilas: function(){// inicio de funcion para la validacion de las filas
    var banderaRemover = false;// declaramos la var banderaRemover en falso
    for (var i = 0; i < columnas; i++) {// inicia el ciclo para recorrer las columnas del tablero
      var dulcePrev,dulceSigui = null// declaramos las variables tmpPrev, tmpNext como nulas
      for (var j = 0; j < filas; j++) {// inicio de ciclo para recorrer las filas del tablero
          var actual = tablero[j][i];// guardamos en la varible actual, las filas y las columnas en el arreglo tablero actuales 
          dulcePrev = null
          if(j!=0){// comparamos las filas, si la fila es diferente de cero, entonces
            dulcePrev = tablero[j-1][i]// la var tmpPrev almacenara la fila menos uno y la columna del tablero 
          }else {// si no
            dulcePrev = null;// la var tmpPrev se queda nulo
          }
          if(j!=(filas-1)){// si la fila recorrida es diferente de filas(7)-1, entonces
            dulceSigui = tablero[j+1][i];// la var tmpNext alamecnara la fila recorrida mas uno y la columna del arreglo tablero
          }else{// si no
            dulceSigui = null; // la var tmpNext se queda nulo
          }

          if(dulcePrev && dulceSigui){// inicio de comparacion de filas
            var dulce1 = actual.attr('data-item');
            var dulce2 = dulcePrev.attr('data-item');
            var dulce3 = dulceSigui.attr('data-item');

            if(dulce1 == dulce2 && dulce1 == dulce3){
              score += 100;
              banderaRemover = true;
              $('#score-text').html(score);
              this.removerElementos(dulcePrev);
              this.removerElementos(actual);
              this.removerElementos(dulceSigui);
            }
          }
        }
    }
    banderaFila =true; // almacenamos en la var banderF para saber que si se realizo una comparacion de dulces exitosa en las filas
  },
  removerElementos: function(elemento,bandera) {// inicio de funcion que remueve los dulces que se compararon positivamente
      elemento// agregamos una animacion al var elemento la cual contiene los atributos de los dulces
        .animate(// inicio de animacion
          {
            width: "-=0px" //ponemos el ancho en 0
          },{
            step: function(now, fx){
              $(this).addClass('animacion'); 
            },
            duration: 2000,
            complete: function() {
              $(this).removeClass('animacion');
              $(this).remove();
            }
          }
        )

  },
  agregarFichas: function(){// inicio de funcion para agregar mas fichas cuando estas desaparecen
  
    if(banderaFila==true && banderaColumna ==true){// con las var BanderaFila y Bandera columna, iniciamos un ciclo, si las dos son verdaderas entonces,
        for (var j = 0; j < columnas; j++) {// se inicia ciclo para agregar columnas(7)
          var col = $('.col-'+(j+1)+' > img');// en la var col,  sumamos a toda la clase .col una imagen 
          for (var i = col.length; i < columnas; i++) { // iniciamos un ciclo para recorrer la logitud del la var col y agregar una nueva imagen
            var index = Math.floor(Math.random() * (5 - 1)) + 1; // en la var index usamos el metodo math random para posicionar una imagen diferente de nuevo
            var elemento = $('<img src="image/'+index+'.png" class="elemento" data-item="bloque-'+index+'" />'); // una ves ubicada la columna, se agregan los dulces guardados en la var elemento
            $('.col-'+(j+1)).prepend(elemento); // usando el metodo prepend, insertamos el contenido en la columna, el de elemento
            seal.agregarDulces(elemento); // instanciamos de nuevo la funcion agrEventos para agegregar el elemento
          }
        
        }
        var i=0; //declaramos la var i=0
        var j=-1;// declaramos la variable j=-1
        $('.elemento').each(function(index, el) {// decimos que para cada clase elemento
          if(index%columnas == 0){// si la division de la operacion index/columnas es ==0, entonces
            j++;// la var j se aumenta en 1
            i=0;// la var i se pondra en cero
          }else{// si no
            i++;// i aumentara en 1
          }
          $(el).attr('id',i+"-"+j);// en parametro el, seleccionamos el id, y le sumamos la fila y la columna agregada nueva
          tablero[i][j] = $(el);// ahora el arreglo tablero sera igual el contenido de la variable el (fila y columna)
        });
        banderaFila=false;// la bandera F se vuelve a poner en falso para iniciar una nueva validacion
        banderaColumna=false;// la bandera F se vuelve a poner en falso para iniciar una nueva validacion
        seal.validarFilas();// instanciamos la funcion validar filas() para que se ejecute de nuevo
        seal.validarColumnas();// instanciamos la funcion validar columnas() para que se ejecute de nuevo
  
  }    
},
  reiniciarJuego: function(){ // iniciamos la funcion para reiniciar los datos del programa
    for (var i = 0; i < columnas; i++) { // ciclo para recorrer las columnas del tablero
      $('.col-'+(i+1)).empty(); // seleccionamos todos elementos con la clase col, y le agregamos el metodo empty
    }
    $('#movimientos-text').html('0'); // los mivimientos se reinician a 0
    $('#score-text').html('0'); // el score se reinica a 0
    filas = 7; // y todas las variables iniciales vuelven a como se definieron en un inicio.
    columnas = 7;
    movimientos = 0;
    score = 0;
    tablero = [];
    seal = null;
    banderaFila = false;
    banderaColumna = false;
    interval;
    this.iniciarJuego();
  }

}
