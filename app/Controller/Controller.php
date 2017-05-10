<?php
namespace App\Controller;

class Controller {

    protected $entity;
    protected $wp_query;
    protected $wp;
    protected static $isAjax;

    public function __construct() {
        global $post,$wp,$wp_query,$bodyClass;
        $this->post = $post;
        $this->wp = $wp;
        $this->wp_query = $wp_query;
        self::$isAjax = !empty($_GET['ajax']) ? true : false;


        $bodyClass = '';
        $bodyClass = is_single() ? 'body-single' : $bodyClass;
        $bodyClass = is_home() ? 'body-home' : $bodyClass;
        $bodyClass = is_page() ? 'body-page' : $bodyClass;
        $bodyClass = is_archive() ? 'body-home' : $bodyClass;
    }

    static public function render($view,$args = [])
    {

        if(self::$isAjax) {
            return self::renderJSON($view,$args);
        }

        $args['categories'] = get_categories();

        if($args) extract($args);

        require(TEMPLATES_PATH.'partials/head.php');
        require(TEMPLATES_PATH.$view.'.php');
        require(TEMPLATES_PATH.'partials/footer.php');
    }

    static public function renderJSON($view,$args)
    {
        global $bodyClass;

        if($args) extract($args);

        ob_start();
        require(TEMPLATES_PATH.$view.'.php');


        $html = ob_get_contents();
        ob_clean();

        echo json_encode([
            'html' => $html,
            'class' => $bodyClass
        ]);
        exit();
    }
}
