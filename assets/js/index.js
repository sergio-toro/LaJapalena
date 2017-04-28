/**
 * Main JS file for Casper behaviours
 */

/* globals jQuery, document */
(function ($, undefined) {
  "use strict";

  var $document = $(document);

  $document.ready(function () {

    var
    $post = $("article.post"),
    $postContent = $(".post-content");

    $postContent.fitVids();

    $(".scroll-down").arctic_scroll();

    $(".menu-button, .nav-close").on("click", function(e){
      e.preventDefault();
      $("body").toggleClass("nav-opened");
    });

    $('.lajapalena-progress').laJapalenaProgress();

    $('.lajapalena-reading').readingTime({
      readingTimeTarget: $post.find('.reading-time'),
      wordsPerMinute: 130,
      lang: 'en',
      error: function(message) {
        $post.find('.reading-wrapper').remove();
      }
    });

  });



  $.fn.laJapalenaProgress = function(userOptions) {
    var $this = $(this)
    if (!$this.length) { return $this }

    var
    defaults = {
      content: $this,
      throttleTime: 25, // in milliseconds
    },
    options = $.extend(defaults, userOptions),
    $content = options.content,
    $window = $(window),
    documentHeight = $(document).height(),
    contentHeight = $content.height(),
    contentOffsetTop = $content.offset().top,
    progressBar = new ToProgress({
      id: 'top-progress-bar',
      duration: 0.5
    }),
    updateProgressBar = function() {
      var
      windowScrollTop = $window.scrollTop(),
      windowHeight = $window.height(),
      scrollTop = windowScrollTop && (windowScrollTop),
      progress = 100 * scrollTop / (contentHeight - windowHeight + contentOffsetTop);

      if (progress < 0) {
        progress = 0;
      }
      if (progress > 100) {
        progress = 100;
      }

      progressBar.setProgress(progress);
    };
    updateProgressBar();

    $window.scroll(_.debounce(updateProgressBar, options.throttleTime));

    return $this
  };

  // Arctic Scroll by Paul Adam Davis
  // https://github.com/PaulAdamDavis/Arctic-Scroll
  $.fn.arctic_scroll = function (options) {

    var defaults = {
      elem: $(this),
      speed: 500
    },

    allOptions = $.extend(defaults, options);

    allOptions.elem.click(function (event) {
      event.preventDefault();
      var $this = $(this),
        $htmlBody = $('html, body'),
        offset = ($this.attr('data-offset')) ? $this.attr('data-offset') : false,
        position = ($this.attr('data-position')) ? $this.attr('data-position') : false,
        toMove;

      if (offset) {
        toMove = parseInt(offset);
        $htmlBody.stop(true, false).animate({scrollTop: ($(this.hash).offset().top + toMove) }, allOptions.speed);
      } else if (position) {
        toMove = parseInt(position);
        $htmlBody.stop(true, false).animate({scrollTop: toMove }, allOptions.speed);
      } else {
        $htmlBody.stop(true, false).animate({scrollTop: ($(this.hash).offset().top) }, allOptions.speed);
      }
    });

  };
})(jQuery);
