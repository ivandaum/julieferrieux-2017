<?php


function getShortcodes() {
	return [
		'slider' => 'slider_shortcode',
		'image-full' => 'image_full_shortcode'
	];
}

function slider_shortcode( $atts, $content = "" ) {
	return "<div class='slider'><div class='slider-content'>" . $content . "</div></div>";
}

function image_full_shortcode($atts, $content = "") {
	return "<div class='image-full'>" . $content . "</div>";
}
foreach(getShortcodes() as $shortcode => $func) {
	add_shortcode( $shortcode, $func );
}