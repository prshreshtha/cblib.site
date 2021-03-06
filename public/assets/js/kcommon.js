;(function(window, document, undefined) {
  "use strict";
  $(function() {
  	var ee = new Konami();
    var REPEAT = "hue ";
    ee.code = function() {
      $("span,a,legend,p,button,td,strong,i,b,h1,h2,h3,h4,h5,h6").each(function() {
        $(this).not("footer p,footer a,footer span").each(function() {
          var innerText = this.innerText;
          var len = innerText.length;
          if (innerText.trim().length !== 0) {
            this.innerText = REPEAT.repeat(Math.ceil(innerText.length / REPEAT.length)).substring(0, innerText.length);
          }
        });
      });
      $("img").each(function() {
        this.src = "../assets/img/misc/k.png";
      });
      $(".jumbotron-big,.jumbotron-small").css({
        "background-image": "url(../assets/img/misc/k.png)",
        "background-repeat": "repeat",
        "background-size": "auto"
      });
      $("body").append($("<div/>", {
        "style": "display:block;position:fixed;z-index:999;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0)url('../assets/img/misc/dank.gif')50%90%no-repeat;"
      }));
      ee.code = function(){};
    }
    ee.load();  });
})(window, document);