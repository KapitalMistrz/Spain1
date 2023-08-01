/**
 * File blogin-aarambha.js.
 *
 * Theme main js
 * @package Blogin_Aarambha
 */

/**
 * File skip-link-focus-fix.js.
 *
 * Helps with accessibility for keyboard only users.
 *
 * Learn more: https://git.io/vWdr2
 */
 ( function() {
	var isIe = /(trident|msie)/i.test( navigator.userAgent );

	if ( isIe && document.getElementById && window.addEventListener ) {
		window.addEventListener( 'hashchange', function() {
			var id = location.hash.substring( 1 ),
				element;

			if ( ! ( /^[A-z0-9_-]+$/.test( id ) ) ) {
				return;
			}

			element = document.getElementById( id );

			if ( element ) {
				if ( ! ( /^(?:a|select|input|button|textarea)$/i.test( element.tagName ) ) ) {
					element.tabIndex = -1;
				}

				element.focus();
			}
		}, false );
	}
} )();

$ = jQuery
jQuery(document).ready(function () {

	// Restore Scrolling
	$.fn.restoreScrolling = function() {
		$('html').off('wheel.modal mousewheel.modal');
		return this;
	};

	/* Mean Menu */
	let $mobileMeanMenuPosition 	= $('#mobile-header .col-has-toggle-menu-element').data('meanmenu');
	$('.header-toggle-menu-wrap .menu-top-menu-container').meanmenu({
		meanMenuContainer: '.header-toggle-menu-wrap .main-navigation',
		meanScreenWidth: "1023",
		meanRevealPosition: $mobileMeanMenuPosition,
	});

	if ($(window).width() < 1024) {
		var windowWidth = jQuery(window).width();
		var nav = ".main-navigation";
		if (windowWidth > 1023) {
			jQuery(nav).off('mouseenter', 'li');
			jQuery(nav).off('mouseleave', 'li');
			jQuery(nav).off('click', 'li');
			jQuery(nav).off('click', 'a');
			jQuery(nav).on('mouseenter', 'li', function() {
				jQuery(this).children('ul').stop().hide();
				jQuery(this).children('ul').slideDown(400);
			});
			jQuery(nav).on('mouseleave', 'li', function() {
				jQuery(this).children('ul').stop().slideUp(350);
			});
		}

		//keyboard navigation for mean menu
		var myEvents = {
			click: function(e) {
				if ( jQuery(this).hasClass('menu-item-has-children') || jQuery(this).hasClass('page_item_has_children') ) {
					jQuery(this).find('.mean-expand').addClass('mean-clicked');
				}
				jQuery(this).siblings('li').find('.mean-expand').removeClass('mean-clicked');
				jQuery(this).children('.sub-menu').show().end().siblings('li').find('ul').hide();
				jQuery(this).children('.children').show().end().siblings('li').find('ul').hide();

			},

			keydown: function(e) {
				e.stopPropagation();
				if (e.keyCode == 9) {
					if (!e.shiftKey &&
						( jQuery('.mean-bar li').index( jQuery(this) ) == ( jQuery('.mean-bar li').length-1 ) ) ){
						jQuery('.meanclose').trigger('click');
					}  else if( jQuery('.mean-bar li').index( jQuery(this) ) == 0 ) {
						$('.meanclose').removeClass('onfocus');
					}
					else if (e.shiftKey && jQuery('.mean-bar li').index(jQuery(this)) === 0)
						jQuery('.mean-bar ul:first > li:last').focus().blur();
				}
			},

			keyup: function(e) {
				e.stopPropagation();
				if (e.keyCode == 9) {
					if (myEvents.cancelKeyup) myEvents.cancelKeyup = false;
					else myEvents.click.apply(this, arguments);
				}
			}
		}
		jQuery(document)
			.on('click', 'li', myEvents.click)
			.on('keydown', 'li', myEvents.keydown)
			.on('keyup', 'li', myEvents.keyup);
		jQuery('.mean-bar li').each(function(i) { this.tabIndex = i; });
	}

	$('.site-header .search-toggle').on("click",function(){
		Search();
	});

	//  search focus
	function Search(e){
		$('.site-header .header-search-section').toggleClass('active');
		setTimeout(function(){
			$('.header-search-section form input[type="search"]').focus();
		}, 500 );
		var focusableEls = $('.header-search-section input[type="submit"]:not([disabled]), .header-search-section input:not([disabled]) ');
		var firstFocusableEl = focusableEls[0];
		var lastFocusableEl = focusableEls[focusableEls.length - 1];
		var KEYCODE_TAB = 9;
		$('.header-search-section').on('keydown', function (e) {
			if (e.key === 'Tab' || e.keyCode === KEYCODE_TAB) {
				if ( e.shiftKey && document.activeElement === lastFocusableEl ) {
					e.preventDefault();
					$('.header-search-section form input[type="search"]').focus();
				} else {
					if (document.activeElement === lastFocusableEl) {
						$('.header-search-section').removeClass('active');
					}
				}
			}
		});
	}
	$(document).on('keyup', function(e){
		if ( e.keyCode === 27 && $('.header-search-section').hasClass('active') ) {
			$(".header-search-section").removeClass('active');
		}
	});

	/* back-to-top button*/
	$('.back-to-top').hide();
	$('.back-to-top').on("click", function (e) {
		e.preventDefault();
		$('html, body').animate({
			scrollTop: 0
		}, 'slow');
	});

	$(window).scroll(function () {
		var scrollheight = 400;
		if ($(window).scrollTop() > scrollheight) {
			$('.back-to-top').fadeIn();

		} else {
			$('.back-to-top').fadeOut();
		}
	});

	// Sticky Sidebar
	if ( BLOGIN_AARAMBHA.sticky_sidebar ){
		$('.has-sticky-sidebar .have-sidebar #primary, .has-sticky-sidebar .have-sidebar #secondary').theiaStickySidebar({
			// Settings
			additionalMarginTop: 30
		});
	}

	// Theme Color Mode
	let toggle = document.getElementById("theme-toggle");
    if (toggle){

		let storedTheme = localStorage.getItem('theme') || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
		if (storedTheme)
			document.documentElement.setAttribute('data-theme', storedTheme)


		toggle.onclick = function() {
			let currentTheme = document.documentElement.getAttribute("data-theme");
			let targetTheme = "light";

			if (currentTheme === "light") {
				targetTheme = "dark";
			}

			document.documentElement.setAttribute('data-theme', targetTheme)
			localStorage.setItem('theme', targetTheme);
		};
	}
});
