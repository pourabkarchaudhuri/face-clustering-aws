/*!-----------------------------------------------------------------
  Name: Piroll - Minimal & Clean Portfolio HTML Template
  Version: 1.0.0
  Author: robirurk, nK
  Website: https://nkdev.info
  Purchase: https://nkdev.info
  Support: https://nk.ticksy.com
  License: You must have a valid license purchased only from ThemeForest (the above link) in order to legally use the theme for your project.
  Copyright 2017.
-------------------------------------------------------------------*/
;(function() {
'use strict';

/*------------------------------------------------------------------

  Theme Options

-------------------------------------------------------------------*/
var options = {
    enableShortcuts: true,
    scrollToAnchorSpeed: 700,
    parallaxSpeed: 0.8,

    templates: {
        secondaryNavbarBackItem: 'Back',

        plainVideoIcon: '<span class="nk-video-icon"><span><span class="nk-play-icon"></span></span></span>',
        plainVideoLoadIcon: '<span class="nk-loading-spinner"><i></i></span>',
        fullscreenVideoClose: '<span class="nk-icon-close"></span>',

        instagram: '<div class="col-3">\n                <a href="{{link}}" target="_blank">\n                    <img src="{{image}}" alt="{{caption}}" class="nk-img-stretch">\n                </a>\n            </div>',
        instagramLoadingText: 'Loading...',
        instagramFailText: 'Failed to fetch data',
        instagramApiPath: 'php/instagram/instagram.php',

        twitter: '<div class="nk-twitter">\n                <span class="nk-twitter-icon fa fa-twitter"></span>\n                <div class="nk-twitter-text">\n                   {{tweet}}\n                </div>\n            </div>',
        twitterLoadingText: 'Loading...',
        twitterFailText: 'Failed to fetch data',
        twitterApiPath: 'php/twitter/tweet.php'
    },

    shortcuts: {
        closeFullscreenVideo: 'esc',

        postScrollToComments: 'c',

        toggleFullscreenNavbar: 'alt+f',
        openFullscreenNavbar: '',
        closeFullscreenNavbar: 'esc'
    }
};

if (typeof Piroll !== 'undefined') {
    Piroll.setOptions(options);
    Piroll.init();
}
}());
