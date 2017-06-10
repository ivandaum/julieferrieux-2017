<?php


function getShortcodes() {
	return [
		'slider' => 'slider_shortcode',
		'full' => 'image_full_shortcode',
		'text' => 'text_shortcode'
	];
}

function slider_shortcode( $atts = "", $content = "" ) {
	return "<div class='slider'><div class='slider-content'>" . $content . "</div></div>";
}

function image_full_shortcode($atts = "", $content = "") {
	return "<div class='content-full'>" . do_shortcode($content) . "</div>";
}

function text_shortcode($atts = "", $content = "") {
	return "<div class='content-text'>" . $content . "</div>";
}
foreach(getShortcodes() as $shortcode => $func) {
	add_shortcode( $shortcode, $func );
}

/**** BUTTONS ****/

function gavickpro_add_my_tc_button() {
	global $typenow;
	// check user permissions
	if ( !current_user_can('edit_posts') && !current_user_can('edit_pages') ) {
		return;
	}
    // verify the post type
    if( ! in_array( $typenow, array( 'post', 'page' ) ) )
	    return;
    // check if WYSIWYG is enabled
    if ( get_user_option('rich_editing') == 'true') {
	    add_filter("mce_external_plugins", "gavickpro_add_tinymce_plugin");
	    add_filter('mce_buttons', 'gavickpro_register_my_tc_button');
    }
}

function gavickpro_add_tinymce_plugin($plugin_array) {
	$plugin_array['gavickpro_tc_button'] = '/wp-content/themes/julieferrieux-2017/tinymce-button.js'; // CHANGE THE BUTTON SCRIPT HERE
	$plugin_array['gavickpro_tc_button_2'] = '/wp-content/themes/julieferrieux-2017/tinymce-button.js'; // CHANGE THE BUTTON SCRIPT HERE
	return $plugin_array;
}

function gavickpro_register_my_tc_button($buttons) {
	array_push($buttons, "gavickpro_tc_button");
	array_push($buttons, "gavickpro_tc_button_2");
	return $buttons;
}


add_action('admin_head', 'gavickpro_add_my_tc_button');