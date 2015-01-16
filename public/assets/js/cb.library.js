;(function(window, document, undefined) {
  "use strict";

  if (typeof window.CB === "undefined") {
    window.CB = {};
  }
  if (typeof window.CB.Library === "undefined") {
    window.CB.Library = {};
  }

  jQuery.cachedScript = function(url, options) {
    options = jQuery.extend( options || {}, {
      dataType: "script",
      cache: true,
      url: url
    });
    return jQuery.ajax(options);
  };

  // relative path from root of website
  window.CB.Library.REL_PATH = "/teachers/library";

  // rss parsing via google feeds api (requires loading google feeds api v1 prior to using this)
  window.CB.Library.parseRSS = function parseRSS(url, success, beforeSend) {
    var feed = new window.google.feeds.Feed(url);
    beforeSend();
    feed.load(success);
  };

  // scroll to top helper
  window.CB.Library.scrollToTop = function scrollToTop(selector, onTopCallback, threshold, duration) {
    if (typeof threshold === "undefined") {
      threshold = 100;
    }
    if (typeof duration === "undefined") {
      duration = 800;
    }

    $(window).scroll(function() {
      if ($(this).scrollTop() > threshold) {
        $(selector).fadeIn();
      } else {
        $(selector).fadeOut();
      }
    });

    $(selector).click(function() {
      $("html, body").animate({scrollTop : 0}, duration, onTopCallback);
      return false;
    });
  }

  String.prototype.cbTruncate = function(n, useWordBoundary) {
    if (typeof useWordBoundary == "undefined") {
      useWordBoundary = true;
    }
    var tooLong = this.length > n;
    var s_ = tooLong ? this.substr(0, n - 1) : this;
    s_ = useWordBoundary && tooLong ? s_.substr(0, s_.lastIndexOf(" ")) : s_;
    return tooLong ? s_ + "&hellip;" : s_;
  };


  var monthMap = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  // month index to short string
  window.CB.Library.getMonthString = function getMonthString(month) {
    return monthMap[month];
  }

})(window, document);