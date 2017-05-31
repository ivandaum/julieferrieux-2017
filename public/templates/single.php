<div class="single container">
    <?php if(!isset($_GET['nolayout'])): ?>
    <div class="project-image project-image-<?= $project['number'] ?>" >
        <div class="image-preview" data-image="<?= $project['image']['url'] ?>" style="background-image:url(<?= $project['image']['url'] ?>);"></div>
    </div>
    <?php endif; ?>

    <div class="section-container">
        <div class="title" style="color:<?= $project['color'] ?>">
            <div class="number"><span><?php if($project['number'] < 10): ?>0<?php endif; ?><?= $project['number'] ?></span><div style="background-color:<?= $project['color'] ?>"></div></div>
            <h1><?= explodeTitle($project['title']) ?></h1>
        </div>
    </div>


    <div class="container single-content">
        <?php if($project['content']): ?>
            <?= $project['content'] ?>
        <?php endif; ?>
    </div>

    <?php if($project['next_post']): ?>
    <div class="container next-project" data-nextimage="<?= $project['next_post']['image']['url'] ?>" style="background-image:url(<?= $project['next_post']['image']['url'] ?>)">
        <a href="<?= $project['next_post']['link'] ?>" class="ajax-link link-next-project">
            <p class="next-project-title"><?= $project['next_post']['title'] ?></p>
            <p class="text-uppercase">Projet suivant</p>
        </a>
        <div class="next-project-background container" style="background-color:<?= $project['color'] ?>" data-currentcolor="<?= $project['color'] ?>" data-nextcolor="<?= $project['next_post']['color'] ?>"></div>
    </div>
    <?php endif; ?>

</div>