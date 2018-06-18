function TiempoRestante(endtime) { // funcion para iniciar los datos del cronometro con el parametro endtime
  var t = Date.parse(endtime) - Date.parse(new Date()); //var t guarda como entero el resultado de la resta del tiempo t (milisegundos ) - el tiempo remanente establecido (new Date()) + 2* 60 * 1000 (en milisegundos)
  var seconds = Math.floor((t / 1000) % 60); // var segundo almacena el valor mas alto de t de la division de t (milisegundos)/1000 y lo divide entre 60 oara asignar los segundos restantes la var segundos
  var minutes = Math.floor((t / 1000 / 60) % 60); // var minutos almancena el valor mas alto de t y lo divide para poder sacar los mminutos 
  var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
  var days = Math.floor(t / (1000 * 60 * 60 * 24));
  return { // delcarion de resultaodos para las opereaciones anteriores u asignamos el resultado a una variable
    'total': t,
    'days': days,
    'hours': hours,
    'minutes': minutes,
    'seconds': seconds
  };
}

function IniciarReloj(id, endtime) { // funcion que inicializa el reloj de juego 
  var reloj = document.getElementById(id); // guardarmos en la var clock el id 
 
  var minutesTablero = reloj.querySelector('.minutes');// Guardamos en la variables minutesSpan el valor de la primera clase .minutes osea los minutos deñ tablero
  var secondsTablero = reloj.querySelector('.seconds'); //// Guardamos en la variables SecondsSpan el valor de la primera clase .Seconds osea los segundos del tablero
  var panelScore = document.getElementsByClassName('panel-score')[0]; // guradaos en la var pScore la cantidad de 0 para el tablero de puntos
  var panelTablero = document.getElementsByClassName('panel-tablero')[0]; // guardamos en var pTablero el elemento clase primero



  $(panelTablero).animate( // inicio de funcion para animar el panel del tablero
    {
      width: "70%" // ponemos el ancho del tablero al 70%
    },{
      step: function(now, fx){
        $(panelScore).css('width','25%');// cambio en css para el tablero de puntos
      },
      duration: 1000, // co una duracion de 1000 miliseguundos
      complete: function() {
        $(panelTablero).show();// mostrar panel de tablero 
      }
    }
  );

  function ActualizarReloj() { // inicio de funcion de reloj actualizado
    var t = TiempoRestante(endtime); // guardamos en la variable t el tiempoTotal restante producto de la funcion Tiemporestante con el parametro endetime
    
    minutesTablero.innerHTML = ('0' + t.minutes).slice(-2); // dentro de la var minuteSpan posionamos el valor de 0 + el resto de los minutos eque inicia en la posicion -2
    secondsTablero.innerHTML = ('0' + t.seconds).slice(-2); // dentro de la var minuteSpan posionamos el valor de 0 + el resto de los segundos eque inicia en la posicion -2

    if (t.total <= 0) { // inicio de comparacion para reiniciar el reloj y panel. si tiempo total es <=0, entonces 
        clearInterval(timeinterval); // la variable timeinterval sera limpiada
        $(panelTablero).animate(// se vuelve una animacion en el tablero al final del termino del cronometo
          {
            width: "0%" // ancho del panel del tablero en 0
          },{
            step: function(now, fx){
              $(panelScore).css('width','90%'); // el ancho del tablero de resultados se agrandara
            },
            duration: 1000,
            complete: function() {
              $(this).hide(); // el Tablero princiapal se oculta
            }
          }
        );
    }
  }

  ActualizarReloj();// ejecutamos de nuevo un nuevo la funcion de reloj actualizado
  var timeinterval = setInterval(ActualizarReloj, 1000); // volvemos aponer el intervalo de tiempo en 1000 para el cronometro
}
