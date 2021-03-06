;(function(window, document, undefined) {
  "use strict";

  // generate event snippets via rss
  $(function() {
    var $e = $("#ajax-spinner");
    // var url = document.location.protocol + "//colonelbylibrary.wordpress.com/feed/?nocache=" + new Date().getTime();
    var url = document.location.protocol + "//colonelbylibrary.wordpress.com/feed/";
    window.CB.Library.parseRSS(url, function(data) {
      for (var key = 0; key < data.length; ++key) {
        var value = data[key];
        var $event = $("#recent-" + (key + 1));
        if ($event.length) {
          var publishDate = new Date(value.pubDate);
          $event
            .append($("<h3/>", {"class": "evt-date"}).html(window.CB.Library.getMonthString(publishDate.getMonth()) + " " + publishDate.getDate() + ", " + publishDate.getFullYear()))
            .append($("<h2/>", {"class": "evt-title"})
              .append($("<a/>", {href: value.link}).html(value.title.cbTruncate(100))))
            .append($("<div/>", {"style": "-moz-box-shadow: 0 0 3px #ccc;-webkit-box-shadow: 0 0 3px #ccc;box-shadow: 0 0 3px #ccc; border:15px solid transparent;"})
              .append($("<p/>", {"class": "evt-content",}).html(value["content:encoded"]["#"]))
              .append($("<p/>"))
                .append($("<a/>", {"class": "btn btn-default evt-view-btn", href: value.link, role: "button"}).html("Read on <i>WordPress&#8480;</i> &raquo;")));
        }
      }
      $e.hide();
    }, function() {
      $e.show();
    });
  });

  // nano gallery
  $(function() {
    $("#gallery").nanoGallery({
      kind: "flickr",
      userID: "129159678@N02", // colonelbylibrary@yahoo.ca
      photoset: "72157651028825531",
      thumbnailWidth: 165,
      thumbnailHeight: 110,
      thumbnailHoverEffect: "labelSlideUp,borderLighter",
      thumbnailLazyLoad: true,
      viewerDisplayLogo: false,
      paginationMaxLinesPerPage: 1,
      thumbnailLabel: {display: true, align: "center"},
      theme: "clean",
      i18n: { thumbnailImageDescription: "view photo", thumbnailAlbumDescription: "open album" }
    });
  });

  // hide anyways when loaded
  $(window).load(function() {
    $("#ajax-spinner").hide();
  });

})(window, document);