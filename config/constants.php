<?php
global $wp;

define('URL',home_url(add_query_arg(array(),$wp->request)));
define('TEMPLATES_PATH',dirname( dirname(__FILE__) ).'/public/templates/');
define('PUBLIC_PATH',home_url('wp-content/themes/' . wp_get_theme()->template . '/public/'));
define('PUBLIC_PATH_DIR',dirname( dirname(__FILE__) ) . '/public/');