// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery.ui.all
//= require jquery_ujs
//= require turbolinks
//= require bootstrap
//= require_tree .
//= require bootstrap-slider
//= require jquery.hoverIntent.min.js
//= require jquery.mb.flipText.js
//= require d3.js
//= require ace/ace
//= require ace/mode-xml.js
//= require ace/theme-monokai.js
//= require jssor.slider.mini.js
//= require jssor.core.js
//= require jssor.utils.js
//= require google-chart.js
//= require chartkick.js

$.ajaxSetup({ cache: false });
$.removeData();

//en firefox no anda el .each!!
//ver el generar arbol desde los demas uqe no son invertedradial...
//borrar archivos guardados en el server cuando termina de ejecutar
//el selected files solo anda en inverted!
// absolute path de los archivos... ver como manejar eso, archivo propiedades maybe
// definir logica para manejar archivos de diferentes reuqest... sincronizar, crea carpetas individuales.. etc
