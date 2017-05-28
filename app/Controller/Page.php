<?php
namespace App\Controller;
use App\Model\Project;
use \App\Service\ProjectFormator;

class Page extends Controller {
	public $about = [];

	public function __construct()
    {
        parent::__construct();
	    $this->about = $this->getAboutPage();
    }

    public function home()
    {
        $model = new Project();

        $projects = $model::getAll();
        $projects = ProjectFormator::formatAll($projects);

        self::render('projects',[
            'projects' => $projects,
	        'about' => $this->about
        ]);
    }

    public function single()
    {
        $id = $this->post->ID;
        $model = new Project();
        $project = $model::findById($id);
        $project = ProjectFormator::formatOne($project[0]);
        $category = get_category_by_slug($project['category']);
        self::render('single',[
            'project' => $project,
            'category' => $category,
	        'about' => $this->about
        ]);
    }

    public function archive()
    {
        $model = new Project();

        $category = get_category( get_query_var( 'cat' ) );

        $projects = $model::getByCategory($category->cat_ID);
        $projects = ProjectFormator::formatAll($projects);

        self::render('projects',[
            'projects' => $projects
        ]);
    }

    public function page()
    {
        $cover = array(
            'full' => wp_get_attachment_image_src( get_post_thumbnail_id($this->post->ID), 'full' )[0],
            'medium' => wp_get_attachment_image_src( get_post_thumbnail_id($this->post->ID), 'medium' )[0],
            'small' => wp_get_attachment_image_src( get_post_thumbnail_id($this->post->ID), 'thumbnail' )[0]
        );

        self::render('page',[
            'post' => $this->post,
            'cover' => $cover,
	        'about' => $this->about
        ]);
    }

    public function page404()
    {
        self::render('404');
    }

    public function getAboutPage()
    {
	    $about = get_page_by_path('a-propos');

	    $page = [
	    	'title' => 'À propos',
	    	'content' => apply_filters('the_content', $about->post_content),
	        'email' => get_field('email',$about->ID),
	        'networks' => [
		        'pinterest' => get_field('email',$about->ID),
		        'instagram' => get_field('instagram',$about->ID),
		        'behance' => get_field('behance',$about->ID),
		        'linkedin' => get_field('linkedin',$about->ID)
	        ]
	    ];

	    return $page;
    }
}
