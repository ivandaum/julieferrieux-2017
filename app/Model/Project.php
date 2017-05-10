<?php
namespace App\Model;

class Project {
    static private $query;
    public function __construct() {
        self::$query = [
            'post_type' => 'post',
            'posts_per_page' => -1,
            'post_status' => 'publish',
        ];
    }

    static public function getAll()
    {
        $builder = new \WP_Query(self::$query);
        return $builder->posts;
    }

    static public function getByCategory($catId = null)
    {
        if(!$catId) return false;

        $query = self::$query;
        $query['cat'] = $catId;

        $builder = new \WP_Query($query);
        return $builder->posts;
    }

    static public function findById($id = null)
    {
        if(!$id) return false;

        $query = self::$query;

        $query['p'] = $id;
        $query['posts_per_page'] = 1;

        $builder = new \WP_Query($query);
        return $builder->posts;

    }
}