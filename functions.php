<?php

require __DIR__ . '/vendor/autoload.php';
//
//add_theme_support( 'post-thumbnails' );
set_post_thumbnail_size( 300, 600, true );
add_image_size( 'image-preview', 500, 9999 );

//remove_filter( 'the_content', 'wpautop' );
//remove_filter( 'the_excerpt', 'wpautop' );

function debug($array) {
    echo json_encode($array);die;
}

function explodeTitle($title) {
    $words = explode(' ',$title);
    $f = '';
    foreach($words as $t) {
        $f .= '<span>' .$t.'</span>';
    }

    return $f;
}


remove_filter('the_content', 'wpautop');
remove_filter('the_excerpt', 'wpautop');