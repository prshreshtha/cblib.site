;(function(window, document, undefined) {
  "use strict";

  // nano gallery
  $(function() {
    $("#gallery").nanoGallery({
      kind: "flickr",
      userID: "129159678@N02", // colonelbylibrary@yahoo.ca
      photoset: "72157649919607620",
      thumbnailWidth: 165,
      thumbnailHeight: 110,
      thumbnailHoverEffect: "labelSlideUp,borderLighter",
      thumbnailLazyLoad:true,
      viewerDisplayLogo:false,
      paginationMaxLinesPerPage: 1,
      thumbnailLabel: {display: true, align: "center"},
      theme: "clean",
      i18n: { thumbnailImageDescription: "view photo", thumbnailAlbumDescription: "open album" }
    });
  });

  // news via rss
  $(window).load(function() {
    $("#ajax-spinner").hide();
  });

})(window, document);