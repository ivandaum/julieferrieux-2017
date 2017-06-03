<?php

namespace App\Service;


class ProjectFormator
{
    public function __construct()
    {
    }

    static public function formatAll($array)
    {

        $formated = [];
        foreach($array as $key => $ar) {
            $formated[] = self::formatOne($ar,$key);
        }

        return $formated;
    }


    static public function formatOne($project, $key = 0)
    {

        $f = array();
        $f['id'] = $project->ID;
        $f['title'] = $project->post_title;
        $f['category'] = get_the_category($project->ID)[0]->slug;
        $f['link'] = get_permalink($project->ID);
        $f['date'] = $project->post_date;
        $f['date_year'] = date('Y',strtotime($project->post_date));
        $f['date_month'] = date('n',strtotime($project->post_date));
        $f['slug'] = $project->post_name;
        $f['description'] = $project->post_excerpt;
        $f['color'] = get_field('color',$project->ID);
        $f['context'] = get_field('context',$project->ID);
	    $f['image'] = get_field('image_cover',$project->ID);
	    $f['intro'] = get_field('intro',$project->ID);

	    $f['content'] = $project->post_content;
	    $f['content'] = preg_replace('<img([\w\W]+?) />','div class="content-image"><img ${0}></div',$f['content']);
	    $f['content'] = do_shortcode($f['content']);
	    $f['content'] = str_replace('<p></p>','',$f['content']);
	    $f['content'] = str_replace('<br>','',$f['content']);

	    $nextPost = get_previous_post( true );

	    if(is_int($key)) $f['number'] = $key;

	    $tags = wp_get_post_tags($project->ID);
        foreach ($tags as $tag) {
            $f['tags'][] = $tag->name;
        }

        if($nextPost) {
            $f['next_post']['link'] = get_permalink($nextPost->ID);
            $f['next_post']['color'] = get_field('color',$nextPost->ID);
            $f['next_post']['title'] = get_the_title($nextPost->ID);
            $f['next_post']['image'] = get_field('image_cover',$nextPost->ID);
        }

        return $f;
    }
}