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
        foreach($array as $ar) {
            $formated[] = self::formatOne($ar);
        }

        return $formated;
    }


    static public function formatOne($project)
    {

        $formatedProject = array();
        $formatedProject['id'] = $project->ID;
        $formatedProject['title'] = $project->post_title;
        $formatedProject['category'] = get_the_category($project->ID)[0]->slug;
        $formatedProject['link'] = get_permalink($project->ID);
        $formatedProject['date'] = $project->post_date;
        $formatedProject['date_year'] = date('Y',strtotime($project->post_date));
        $formatedProject['slug'] = $project->post_name;
        $formatedProject['description'] = $project->post_excerpt;
        $formatedProject['color'] = get_field('color',$project->ID);
        $formatedProject['context'] = get_field('context',$project->ID);
	    $formatedProject['image'] = get_field('image_cover',$project->ID);
        $formatedProject['content'] = wpautop($project->post_content);

	    $formatedProject['next_post'] = get_next_post( true );


	    $tags = wp_get_post_tags($project->ID);
        foreach ($tags as $tag) {
            $formatedProject['tags'][] = $tag->name;
        }


        if($formatedProject['next_post']) {
            $formatedProject['next_post'] = get_permalink($formatedProject['next_post']->ID);
        }

        return $formatedProject;
    }
}