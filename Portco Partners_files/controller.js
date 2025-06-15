/*  HELPER FUNCTIONS
/*======================*/

	function delay_exec( id, wait_time, callback_f ){
	    if( typeof wait_time === "undefined" ){ wait_time = 500; }
	    if( typeof window['delay_exec'] === "undefined" ){ window['delay_exec'] = [];}
	    if( typeof window['delay_exec'][id] !== "undefined" ){ clearTimeout( window['delay_exec'][id] );}
	    window['delay_exec'][id] = setTimeout( callback_f , wait_time );
	}

	function formPlaceholder(target){
		target.each(function(){
			var self       = jQuery(this);
			if (self.attr('placeholder')) {
				self.data("placeholder", self.attr('placeholder'));
				self.removeAttr('placeholder');
			};
			var placeholder = self.data("placeholder");
			if(self.val() == '') { self.val(placeholder);}
			self
			.on('focus', function(){
				if(self.val() == placeholder) { self.val('');}
			})
			.on('focusout', function(){
				if(self.val() == '') { self.val(placeholder);}
			});
		});
	}

	(function($,sr){
 
	  // debouncing function from John Hann
	  // http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
	  var debounce = function (func, threshold, execAsap) {
	      var timeout;
	 
	      return function debounced () {
	          var obj = this, args = arguments;
	          function delayed () {
	              if (!execAsap)
	                  func.apply(obj, args);
	              timeout = null; 
	          };
	 
	          if (timeout)
	              clearTimeout(timeout);
	          else if (execAsap)
	              func.apply(obj, args);
	 
	          timeout = setTimeout(delayed, threshold || 100); 
	      };
	  }
		// smartresize 
		jQuery.fn[sr] = function(fn){  return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr); };
	 
	})(jQuery,'smartresize');

// - HoverIntent
	(function($){$.fn.hoverIntent=function(handlerIn,handlerOut,selector){var cfg={interval:100,sensitivity:6,timeout:0};if(typeof handlerIn==="object"){cfg=$.extend(cfg,handlerIn)}else{if($.isFunction(handlerOut)){cfg=$.extend(cfg,{over:handlerIn,out:handlerOut,selector:selector})}else{cfg=$.extend(cfg,{over:handlerIn,out:handlerIn,selector:handlerOut})}}var cX,cY,pX,pY;var track=function(ev){cX=ev.pageX;cY=ev.pageY};var compare=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);if(Math.sqrt((pX-cX)*(pX-cX)+(pY-cY)*(pY-cY))<cfg.sensitivity){$(ob).off("mousemove.hoverIntent",track);ob.hoverIntent_s=true;return cfg.over.apply(ob,[ev])}else{pX=cX;pY=cY;ob.hoverIntent_t=setTimeout(function(){compare(ev,ob)},cfg.interval)}};var delay=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);ob.hoverIntent_s=false;return cfg.out.apply(ob,[ev])};var handleHover=function(e){var ev=$.extend({},e);var ob=this;if(ob.hoverIntent_t){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t)}if(e.type==="mouseenter"){pX=ev.pageX;pY=ev.pageY;$(ob).on("mousemove.hoverIntent",track);if(!ob.hoverIntent_s){ob.hoverIntent_t=setTimeout(function(){compare(ev,ob)},cfg.interval)}}else{$(ob).off("mousemove.hoverIntent",track);if(ob.hoverIntent_s){ob.hoverIntent_t=setTimeout(function(){delay(ev,ob)},cfg.timeout)}}};return this.on({"mouseenter.hoverIntent":handleHover,"mouseleave.hoverIntent":handleHover},cfg.selector)}})(jQuery);
	
	
	
/*  MISC
/*======================*/

	(function($){

		"use strict";

		setTimeout(function(){
			$('.lazy').addClass('in');
		},600);

		$('.alert').each(function(){
			var $this = $(this);
			$this.find('.close-alert').on('click', function(){
				$this.fadeOut(200);
			})
		});

		$('.rich-header').each(function(){
			var win   = $(window);
			var $this = $(this);
			win.scroll(function(){
				var percent = ($(document).scrollTop()/win.height());
				$this.find('.rich-header-content').css('opacity', 1 - percent);
			});
		});

		$('.i-separator').each(function(){

			var $this = $(this);

			if ($this.data('target') !== undefined) {

				$this.bind('click.smoothscroll', function (event) {
				    event.preventDefault();
				    var target = $this.data('target');
				    $('html, body').stop().animate({'scrollTop': $(target).offset().top - $this.data('offset')}, 500, function () {
				        window.location.hash = target;
				    });
				});

			};
			
		});

		// Calendar
		var prev = $('.widget_calendar td#prev').attr('colspan','1'),
			next = $('.widget_calendar td#next').attr('colspan','1');

		$('.widget_calendar tbody td').each(function(){
			if($(this).children('a').length != 0){
				$(this).addClass('has-children');
			}
		});

		if (prev.children('a').length != 0) {
			prev.children('a').html("<span class='icon-arrow-left9'></span>");
		} else {
			prev.html("<span class='icon-arrow-left9'></span>");
		}

		if (next.children('a').length != 0) {
			next.children('a').html("<span class='icon-arrow-right9'></span>");
		} else {
			next.html("<span class='icon-arrow-right9'></span>");
		}

		$('.widget_calendar tfoot td.pad:not(#next, #prev)').attr('colspan','5');

		

		function widgetNav(){
			if (window.innerWidth < 1024) {
				$('.widget_nav_menu')
				.addClass('mobile')
				.removeClass('desktop');

				$('.widget_product_categories')
				.addClass('mobile')
				.removeClass('desktop');

			} else
			if(window.innerWidth >= 1024){

				$('.widget_nav_menu')
				.addClass('desktop')
				.removeClass('mobile');

				$('.widget_product_categories')
				.addClass('desktop')
				.removeClass('mobile');
			}
		}

		widgetNav();
		$(window).resize(widgetNav);

		$('.widget_nav_menu ul li > a:not(:only-child)').append('<span class="toggle icon-arrow-down9"></span>');
		$('.widget_nav_menu.mobile ul li a > span.toggle').on('click',function(e){
			if ($(this).parent().next('ul').length != 0) {
				$(this).parent().toggleClass('animate');
				$(this).parent().next('ul').stop().slideToggle(300, "easeOutQuart");
			};
			e.preventDefault();
		});

		$('.widget_nav_menu.desktop ul li').hoverIntent(
			function(){
				$(this).children('ul').stop(true, true).animate({'margin-left':'0px','opacity':'1'}, 400, "easeOutCirc").css('display','block');
			},
			function(){
				$(this).children('ul').stop(true, true).animate({'margin-left':'50px','opacity':'0'}, 400, "easeOutCirc", function(){
					$(this).css('display','none');
				});
			}
		);

		$('.widget_product_categories ul li').each(function(){
			var $this      = $(this);
			var countClone = $this.children('span.count').clone();
			$this.children('span.count').remove();
			$this.children('a').append(countClone);
		});

		$('.widget_product_categories ul li > a:not(:only-child)').append('<span class="toggle icon-arrow-down9"></span>');
		$('.widget_product_categories.mobile ul li a > span.toggle').on('click',function(e){
			if ($(this).parent().next('ul').length != 0) {
				$(this).parent().toggleClass('animate');
				$(this).parent().next('ul').stop().slideToggle(300, "easeOutQuart");
			};
			e.preventDefault();
		});

		$('.widget_product_categories.desktop ul li').hoverIntent(
			function(){
				$(this).children('ul').stop(true, true).animate({'margin-left':'0px','opacity':'1'}, 400, "easeOutCirc").css('display','block');
			},
			function(){
				$(this).children('ul').stop(true, true).animate({'margin-left':'50px','opacity':'0'}, 400, "easeOutCirc", function(){
					$(this).css('display','none');
				});
			}
		);
		

		$('.widget_photos_from_flickr .flickr_badge_image a').append('<div class="mf-overlay"><span class="hd-overlay-before icon-plus4"></span></div>');

		var login = $('.widget_reglog #login-form'),
			reg   = $('.widget_reglog #registration-form'),
			pass  = $('.widget_reglog #password-form');

		$('.widget_reglog label').each(function(){
			var $this = $(this);
			$this.next('input').attr('data-placeholder',$this.html());
			$this.remove();
		});

		$('.widget_reglog input[type="submit"]').addClass('small');

		$(".nz-content a").has('img').each(function(){
			$(this).attr('title',$(this).children('img').attr('alt'));
		});

		$('.nz-carousel').each(function(){

			$(".nz-content a").has('img').each(function(){
				$(this).attr('data-lightbox-gallery','nz-gallery3');
			});

		});

		$('.post-social-share').on("click",function(){
			$(this).toggleClass("animate");
		});

		formPlaceholder($('input:not([type="submit"]),textarea'));

		$('.ls a[href="#"]').click(function(e){e.preventDefault();});

		$('.get-location').click(function(e){
			e.preventDefault();
			$($(this).attr('href')).fadeIn(400).toggleClass('animate');
		});

		$('.location-close').click(function(e){
			$('#get-location').toggleClass('animate');
			setTimeout(function(){
				$('#get-location').fadeOut(400)
			},250);
		});

		$('.mf-filter').each(function(){
			var $this = $(this);
			$this.find('.filter-toggle').click(function(){
				$this.find('.filter-container').slideToggle();
			});
		});


	})(jQuery);

/*  HEADER
/*======================*/
	
	(function($){

		"use strict";

		$('.mob-header-content .header-top-menu ul li.menu-item-has-children > a').each(function(){
			$(this).append('<span class="di icon-arrow-down9"></span>');
		});

		$('.page-content-wrap .widget_icl_lang_sel_widget > div > ul > li > a').off('click').on('click',function(event){
			event.preventDefault();
			$('.page-content-wrap .widget_icl_lang_sel_widget').toggleClass('animated');
			$(this).next('ul').slideToggle(300, "easeOutQuart");
		});

		$('.mob-menu ul li a > .di, .mob-header-content .header-top-menu ul li a > .di').on("click", function(event){
			$(this).toggleClass('animate');
			$(this).parent().next('ul').toggleClass('animate').stop().slideToggle(300, "easeOutQuart");
			event.preventDefault();
		});

		$('.mob-menu-toggle, .mob-menu-toggle2, .mob-overlay').on("click",function(event){
			event.stopImmediatePropagation();
			$('.mob-header-content').toggleClass('animate');
		});

		if (!$('html').hasClass('shoping-cart')) {
			$(".desk-cart-toggle").on("click",function(event){
    			event.preventDefault();
				$(this).toggleClass('animated');
				$('.search-toggle').removeClass('animated');
				$('.woo-cart').toggleClass('animated');
				$('.desk .search').removeClass('animated');
			});
		};

		$('.search-toggle').on('click', function(){
			$(this).toggleClass('animated');
			$('.desk .search').toggleClass('animated');
			$('.woo-cart').removeClass('animated');
			$('.desk-cart-toggle').removeClass('animated');
		});

		$('.desk .ls').off('click').on('click',function(){
			$(this).toggleClass('animated');
		});

		// Header megamenu background image

			$('.desk [data-mm="true"]').each(function(){
				var $this = $(this),
					$img  = $this.data('mmb');

				if (typeof $img !== "undefined") {
					$this.children('.sub-menu').css({'background-image':'url('+$img+')'});
				};
			});

		/// Header submenu

			$('.subeffect-ghost .desk-menu ul li, .subeffect-ghost .header-top-menu ul li').hoverIntent(
				function(){
					var $this = $(this);
					$this.children('ul')
					.stop(true, true)
					.animate({'opacity':'1','margin-top':'0'}, 300, "easeOutQuart")
					.css('display','block');
				},
				function(){
					var $this = $(this);
					$this.children('ul')
					.stop(true, true).animate({'opacity':'0','margin-top':'40px'}, 300, "easeOutQuart", function(){
						$(this).css('display','none');
					});
				}
			);

			$('.subeffect-move .desk-menu ul li, .subeffect-move .header-top-menu ul li').hoverIntent(
				function(){
					var $this = $(this);
					$this.children('ul')
					.stop(true, true)
					.animate({'opacity':'1','margin-left':'0'}, 300, "easeOutQuart")
					.css('display','block');
				},
				function(){
					var $this = $(this);
					$this.children('ul')
					.stop(true, true).animate({'opacity':'0','margin-left':'-40px'}, 300, "easeOutQuart", function(){
						$(this).css('display','none');
					});
				}
			);

			$('.subeffect-fade .desk-menu ul li, .subeffect-fade .header-top-menu ul li').hoverIntent(
				function(){
					var $this = $(this);
					$this.children('ul')
					.stop(true, true)
					.animate({'opacity':'1'}, 300, "easeOutQuart")
					.css('display','block');
				},
				function(){
					var $this = $(this);
					$this.children('ul')
					.stop(true, true).animate({'opacity':'0'}, 300, "easeOutQuart", function(){
						$(this).css('display','none');
					});
				}
			);

			$('.subeffect-slide .desk-menu ul li, .subeffect-slide .header-top-menu ul li').hoverIntent(
				function(){
					var $this = $(this);
					$this.children('ul')
					.stop(true, true)
					.slideToggle(300, "easeOutQuart")
					.css('display','block');
				},
				function(){
					var $this = $(this);
					$this.children('ul')
					.stop(true, true)
					.slideToggle(300, "easeOutQuart",function(){
						$(this).css('display','none');
					})
				}
			);

		// Fixed header

			var docElem = document.documentElement,
			header           = $( '.fixed-true' ),
			headerOffset     = header.offset(),
			top              = $('#top'),
	        didScroll        = false,
	        changeHeaderOn   = (header.hasClass('version3') && header.parents('.revolution-slider-active')) ? headerOffset.top : 50;

		    function init() {

		    	if( !didScroll ) {
	                didScroll = true;
	                scrollPage();
	            }

		        window.addEventListener( 'scroll', function( event ) {
		            if( !didScroll ) {
		                didScroll = true;
		                scrollPage();
		            }
		        }, false );

		    }

		    function scrollPage() {
		        var sy = scrollY();

	    		if ( sy >= changeHeaderOn ) {
	        		header.addClass('active');
	        		top.addClass('active');
	        	} else {
	        		header.removeClass('active');
	        		top.removeClass('active');
	        	}
		        
		        didScroll = false;
		    }

		    function scrollY() {
		        return window.pageYOffset || docElem.scrollTop;
		    }

		    init();

	})(jQuery);



/*  WOOCOMMERCE
/*======================*/

	(function($){

		"use strict";

		var $singleProductImages = $('.woocommerce .single-product-image .images'),
			thumbs  = $singleProductImages.find('.thumbnails > a'),
			thumbsQ = thumbs.length,
			galleryImage = $singleProductImages.find('.woocommerce-main-image');
			galleryImage.find('img').removeAttr('srcset');

			thumbs.hoverIntent(
				function(e){
					var $self = $(this);
					e.preventDefault();

					var pruductImg      = $self.attr('href');
					var prudctImgFORMAT = pruductImg.substr(pruductImg.length - 3);
					var prudctImgSTRING = pruductImg.substr(0, pruductImg.length - 4);
					var productNewImage = prudctImgSTRING+'-460x520.'+prudctImgFORMAT;
					$self.addClass("active").siblings().removeClass("active");
					galleryImage.attr('href',$self.attr('href'));
					galleryImage.find('img').attr('src',productNewImage);
				},
				function(e){
					var $self = $(this);
					e.preventDefault();

					var pruductImg      = $self.attr('href');
					var prudctImgFORMAT = pruductImg.substr(pruductImg.length - 3);
					var prudctImgSTRING = pruductImg.substr(0, pruductImg.length - 4);
					var productNewImage = prudctImgSTRING+'-460x520.'+prudctImgFORMAT;
					$self.addClass("active").siblings().removeClass("active");
					galleryImage.attr('href',$self.attr('href'));
					galleryImage.find('img').attr('src',productNewImage);
				}
			);

			thumbs.on('click', function(e){
				var $self = $(this);
				e.preventDefault();
			});


		$('.woocommerce .images img').each(function(){
			var $this = $(this);
			$this.wrap('<div class="nz-thumbnail"></div>')
			$this.parent().prepend('<div class="mf-overlay"><span class="hd-overlay-before"></span></div>');
		});

		$('.woocommerce-pagination a.next').html('<span class="icon icon-arrow-right8">');
		$('.woocommerce-pagination a.prev').html('<span class="icon icon-arrow-left8">');

		$('.loop .product, .nz-related-products .product, .nz-recent-products .product').each(function(){

			var product         = $(this);
			var addToCard       = product.find('.add_to_cart_button');
			var productProgress = product.find('.shop-loader');

			if (!addToCard.hasClass('added')) {

				addToCard.on('click',function(){

					var $this = $(this);
					productProgress.fadeIn(400,function(){

						var $thisProgress = $(this);
							$this.fadeOut(400);

						setTimeout(function(){
							$thisProgress.fadeOut(400);
						}, 1500);

					});
					
				});
			};
		});

	})(jQuery);

/*  CONTENT BOXES, 
	COLUMNS, 
	CLIENTS, 
	CAROUSEL, 
	PRICING TABLES, 
	PERSONS, 
	RECENT PROJECTS, 
	GALLERY
/*======================*/
	
	(function($){

		"use strict";

		function animateInView(container,delay){

			container.each(function(){

				var $this   = $(this);
				var child   = $this.children();
				var length  = child.length;
				var i       = 0;
				var timer   = '';

				function animation() {
					$(child[i]).addClass('css-animated');
					i++;
					if (i == length ) {clearInterval(timer);}
				}

				$this.one('inview', function(event, isInView, visiblePartX, visiblePartY){
			    	if (isInView) {
						var timer = setInterval(animation, delay); 
			    	};
			    });
			});

		}

        animateInView($('.nz-content-box[data-animate="true"]'),250);
        animateInView($('.nz-clients[data-animate="true"]'), 250);
        animateInView($('.nz-carousel[data-animate="true"]'), 250);
        animateInView($('.nz-pricing-table[data-animate="true"]'), 250);
        animateInView($('.nz-persons[data-animate="true"]'), 250);
        animateInView($('.nz-recent-events[data-animate="true"] .nz-events-posts'),250);
        animateInView($('.nz-recent-projects[data-animate="true"] .recent-projects-wrap'),250);
        animateInView($('.nz-recent-posts[data-animate="true"] .posts-inner'),250);
        animateInView($('.nz-gallery'),250);

        animateInView($('.loop .animation-true .blog-post'),250);
        animateInView($('.loop .animation-true .events-post'),250);
        animateInView($('.loop .animation-true .projects-post'),250);
        animateInView($('.shop-layout.animation-true .products'),250);

        $('.nz-section .nz-row').each(function(){

        		var $this   = $(this);
				var child   = $this.find('.col-animate-true');
				var length  = child.length;
				var i       = 0;
				var timer   = '';

				function animation() {
					$(child[i]).addClass('css-animated');
					i++;
					if (i == length ) {clearInterval(timer);}
				}

				$this.one('inview', function(event, isInView, visiblePartX, visiblePartY){
			    	if (isInView) {
						var timer = setInterval(animation, 250); 
			    	};
			    });

        });

		
	})(jQuery);

