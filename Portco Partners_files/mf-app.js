(function($) { 
"use strict"; 

var App = function() {
    var handleMegamenu = function() {
        jQuery(".megamenu > ul.sub-menu").each(function() {
            var _self = jQuery(this);
            var child = _self.find("> li.sub-menu-item");
            var value = _self.height();
            child.css("height", value);
            jQuery(window).resize(function() {
                if (jQuery("body").width() >= 992) {
                    child.css("height", value);
                }
            });
        });
    };
    return {
        //main function to initiate the module
        init: function() {
            handleMegamenu();
        }
    };
}();
jQuery(document).ready(function() {
	App.init();
});
})(jQuery);
