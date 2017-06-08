<div class="single container">
    <?php if(!isset($_GET['nolayout'])): ?>
    <div class="project-image project-image-<?= $project['number'] ?>" >
        <div class="image-preview" data-image="<?= $project['image']['url'] ?>" style="background-image:url(<?= $project['image']['url'] ?>);"></div>
    </div>
    <?php endif; ?>

    <div class="container">
        <div class="title" style="color:<?= $project['color'] ?>">
            <div class="number"><span><?php if($project['number'] < 10): ?>0<?php endif; ?><?= $project['number'] ?></span><div style="background-color:<?= $project['color'] ?>"></div></div>
            <h1><?= explodeTitle($project['title']) ?></h1>
        </div>
        <div class="project-intro">

            <div style="color:<?= $project['color'] ?>" class="project-tags text-uppercase">
                <?php foreach ($project['tags'] as $tag): ?>
                    <p><?= $tag ?></p>
                <?php endforeach; ?>
            </div>

            <div class="project-intro-details">

                <div>
                    <?php if($project['context']): ?>
                        <span style="color:<?= $project['color'] ?>">Contexte</span>
                        <?= $project['context']; ?>
                    <?php endif; ?>
                </div>

                <div>
                    <?php if($project['date']): ?>
                        <span style="color:<?= $project['color'] ?>">Date</span>
                        <?= getMonth($project['date_month']); ?>
                        <?= $project['date_year']; ?>
                    <?php endif; ?>
                </div>

                <div style=";color:<?= $project['color'] ?>">
                    <?php if($project['intro']): ?>
                        <?= $project['intro']; ?>
                    <?php endif; ?>
                </div>

            </div>

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
            <p class="text-uppercase line-before">Projet suivant</p>
        </a>
        <div class="next-project-background container" style="background-color:<?= $project['color'] ?>" data-currentcolor="<?= $project['color'] ?>" data-nextcolor="<?= $project['next_post']['color'] ?>"></div>
    </div>
    <?php endif; ?>

</div>