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