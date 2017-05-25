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

	    $nextPost = get_previous_post( true );

	    if(is_int($key)) $formatedProject['number'] = $key+1;

	    $tags = wp_get_post_tags($project->ID);
        foreach ($tags as $tag) {
            $formatedProject['tags'][] = $tag->name;
        }

        if($nextPost) {
            $formatedProject['next_post']['link'] = get_permalink($nextPost->ID);
            $formatedProject['next_post']['color'] = get_field('color',$nextPost->ID);
            $formatedProject['next_post']['title'] = get_the_title($nextPost->ID);
            $formatedProject['next_post']['image'] = get_field('image_cover',$nextPost->ID);
        }

        return $formatedProject;
    }
}