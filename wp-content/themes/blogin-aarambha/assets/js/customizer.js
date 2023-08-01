/**
 * File customizer.js.
 *
 * Theme Customizer enhancements for a better user experience.
 */

/**
 * Customizer control active callback function JS
 *
 * @param active_setting
 * @param settings
 * @param compare
 */
const blogin_aarambha_active_callback = ( active_setting, settings, compare ) => {

	wp.customize.bind( 'ready', function() {

		wp.customize( active_setting, function( value ) {

			let controlSelectors = function( control ) {

				let active = function() {

					let objVal = value.get();

					if ( ( typeof objVal === 'string' || objVal instanceof String ) &&  ( jQuery.inArray( objVal, compare ) !== -1 ) ) {
						control.container.removeClass('hidden');
					}
					else if ( ( objVal.desktop !== undefined && ( jQuery.inArray( objVal.desktop, compare ) !== -1 ) ) || ( objVal.tablet !== undefined && ( jQuery.inArray( objVal.tablet, compare ) !== -1 ) ) || ( objVal.mobile !== undefined && ( jQuery.inArray( objVal.mobile, compare ) !== -1 ) ) ) {
						control.container.removeClass('hidden');
					} else {
						control.container.addClass('hidden');
					}
				};

				// Set initial active state.
				active();

				// Update activate state whenever the setting is changed.
				value.bind( active );
			};

			// Trigger Selected Controls
			jQuery.each( settings, function( index, id ) {
				wp.customize.control( id, controlSelectors );
			} );

		} );

	} );
}

/**
 * Customizer control active callback function JS for empty or black value
 *
 * @param active_setting
 * @param settings
 */
const blogin_aarambha_active_callback_blank = ( active_setting, settings ) => {

	wp.customize.bind( 'ready', function() {

		wp.customize( active_setting, function( value ) {

			let controlSelectors = function( control ) {

				let active = function() {

					let val = value.get();

					if ( val && val !== '' ) {
						control.container.removeClass('hidden');
					}
					else {
						control.container.addClass('hidden');
					}
				};

				// Set initial active state.
				active();

				// Update activate state whenever the setting is changed.
				value.bind( active );
			};

			// Trigger Selected Controls
			jQuery.each( settings, function( index, id ) {
				wp.customize.control( id, controlSelectors );
			} );

		} );

	} );
}

/**
 * Customizer inline css
 *
 * @param control string
 * @param inheritColor object
 */
const blogin_aarambha_inline_css = ( control, inheritColors ) => {

	wp.customize( control, function ( value ) {

		value.bind( function ( objectVal ) {

			if ( objectVal !== undefined ) {

				// Assign variables
				let properties = '', output = '';

				// remove inline style fist
				jQuery( 'style#' + control ).remove();

				// Initial objectVal
				Object.keys( objectVal ).forEach( function ( key, index ) {
					if ( inheritColors[key] !== undefined ) {
						properties += inheritColors[key] + ':' + objectVal[key] + ';';
					}
					else if ( objectVal['colors'] !== undefined ) {
						properties = inheritColors['color_1'] + ':' + objectVal['colors']['color_1'] + ';';
					}
				});

				// Concat properties in root
				output += ( properties !== '' ) ? ":root {" + properties + "}" : '';

				console.log(output)
				// Concat and append new <style>.
				jQuery( 'head' ).append(
					'<style id="' + control + '">' + output + '</style>'
				);
			}
		});
	});

}

( function( $, api ) {
	'use strict';


	// Header Banner
	blogin_aarambha_active_callback(
		'blogin_aarambha_header_banner_type',
		[
			'blogin_aarambha_header_banner_post_id'
		],
		['banner']
	);
	// Header Banner as slider
	blogin_aarambha_active_callback(
		'blogin_aarambha_header_banner_type',
		[
			'blogin_aarambha_header_banner_slider_cat',
			'blogin_aarambha_header_banner_slider_limit',
			'blogin_aarambha_header_banner_slider_pagination'
		],
		['slider']
	);

	// Header : Custom Header Height
	blogin_aarambha_active_callback(
		'blogin_aarambha_header_height_type',
		[
			'blogin_aarambha_header_custom_height'
		],
		['custom']
	);

	// Site Identify -> site title
	blogin_aarambha_active_callback(
		'blogin_aarambha_header_site_title_enable',
		[
			'blogname',
			'blogin_aarambha_header_site_title_typo',
			'blogin_aarambha_header_site_identify_note_two'
		],
		['true']
	);
	// Site Identify -> tagline
	blogin_aarambha_active_callback(
		'blogin_aarambha_header_site_tagline_enable',
		[
			'blogdescription',
			'blogin_aarambha_header_site_tagline_typo',
			'blogin_aarambha_header_site_identify_note_two'
		],
		['true']
	);


	/**
	 * Color Inherit Patterns
	 */
	// Accent Colors
	blogin_aarambha_inline_css(
		'blogin_aarambha_accent_color',
		{ color_1: '--color-accent', color_2: '--color-accent-secondary'}
	);
	// Heading H1-H6 Color
	blogin_aarambha_inline_css(
		'blogin_aarambha_heading_color',
		{ color_1: '--color-heading'}
	);
	// Text Color
	blogin_aarambha_inline_css(
		'blogin_aarambha_text_color',
		{ color_1: '--color-1'}
	);
	// Link Color
	blogin_aarambha_inline_css(
		'blogin_aarambha_link_color',
		{ color_1: '--color-link', color_2: '--color-link-hover', color_3: '--color-link-visited'}
	);
	// Background Color
	blogin_aarambha_inline_css(
		'blogin_aarambha_body_background',
		{ color_1: '--color-bg-1'}
	);

	// Bind customizer focus target link
	api.bind( 'ready', function() {
		$('.customizer-focus').on('click', function (e) {
			e.preventDefault();

			let type 	= $(this).data('type'),
				id		= $(this).data('id');

			if ( ! id || ! type ) {
				return;
			}
			api[type]( id, function( instance ) {
				instance.deferred.embedded.done( function() {
					api.previewer.deferred.active.done( function() {
						instance.focus();
					});
				});
			});

		});
	});

}) ( jQuery, wp.customize );
