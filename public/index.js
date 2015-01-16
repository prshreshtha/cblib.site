;(function(window, document, undefined) {
  "use strict";

  var COL_MD = "col-md-4"
  // generate event snippets via rss
  $(function() {
    var $e = $("#ajax-spinner");
    window.CB.Library.parseRSS(document.location.protocol + "//colonelbylibrary.wordpress.com/feed/?nocache=" + new Date().getTime(), function(data) {
      $.each(data.feed.entries, function(key, value) {
        var $event = $("#upcoming-event-" + (key + 1));
        var eventHref = window.CB.Library.REL_PATH + "/news/#event" + (key + 1);
        var publishDate = new Date(value.publishedDate);
        $event
          .append($("<h3/>", {"class": "evt-date"}).html(window.CB.Library.getMonthString(publishDate.getMonth()) + " " + publishDate.getDate()))
          .append($("<h2/>", {"class": "evt-title"})
            .append($("<a/>", {href: eventHref}).html(value.title.cbTruncate(40))))
          .append($("<p/>", {"class": "evt-content"}).html(value.contentSnippet + "..."))
          .append($("<p/>")
            .append($("<a/>", {"class": "btn btn-default evt-view-btn", href: eventHref, role: "button"}).html("Read More &raquo;")))
        if (key + 1 != data.feed.entries.length) {
          $event
            .append($("<br/>", {"class": "evt-break"}))
            .append($("<hr/>", {"class": "evt-break"}));
        }
      });
      $e.hide();
    }, function() {
      $e.show();
    });
  })

  // contact form validation
  $(function() {
    $("input,textarea").jqBootstrapValidation();
  });

  // tour
  $(function() {
    $("#start-tour").click(function() {
      var introjs = introJs();
      introjs.setOptions({
        steps: [
          {
            element: ".jumbotron",
            intro: "Welcome to the tour! We hope to show you a little bit of what you can do on this website."
          },
          {
            element: "#upcoming-events",
            intro: "Short snippets of the most <i>recent news</i> and <i>upcoming events</i> are posted here. You can <b>click</b> on each to explore further."
          },
          {
            element: "#contact-form",
            intro: "You can use this form to <i>voice your concerns</i> to us. You can also meet us in person!"
          },
          {
            element: "#about",
            intro: "Just in case you want to learn a little bit about us."
          },
          {
            element: ".navbar-id",
            intro: "This is the <b>navigation bar</b> - the <b><i>most powerful</i></b> tool to navigate this website."
          },
          {
            element: ".homebutton-id",
            intro: "This is the <b>Home</b> button. You can click here from other pages to return to this one."
          },
          {
            element: ".newsbutton-id",
            intro: "Click on this one to view a more detailed page about recent <b>news</b> and <b>upcoming events</b>."
          },
          {
            element: ".resourcesbutton-id",
            intro: "You can find some cool resources from this dropdown such as <b><i>Research Databases</i></b>, <b><i>Library Policies</i></b>, <b><i>In-school Catalogue</i></b> and much more!</ul></span>"
          },
          {
            element: ".jumbotron",
            intro: "That concludes our tour. You are now ready to <b>surf this site</b>!"
          }
        ]
      });
      introjs.setOption("skipLabel", "Leave");
      introjs.setOption("disableInteraction", true);
      var noclick = true;
      var exitorcomplete = function() {
        $("html, body").animate({scrollTop : 0}, 800);
        if (!noclick) $(".navbar-toggle").trigger("click");
      };
      introjs.onexit(exitorcomplete);
      introjs.oncomplete(exitorcomplete);
      if ($(".nav-toggle-id").attr("aria-expanded") != "true") {
        noclick = false;
        $(".navbar-toggle").trigger("click");
      }
      introjs.start();
    });
  });

})(window, document);