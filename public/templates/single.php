<div class="single container moved-by-navbar">
    <div class="section-container ">

        <div class="title content-container">
            <h1><?= $project['title'] ?></h1>
        </div>
        <div class="single-content content-container">
            <p class="project-year"><?= $project['date_year'] ?></p>
            <div class="single-content-cover">
                <img src="<?= $project['image']['medium'] ?>" alt="">
            </div>
            <div class="single-content-text">
                <?php if($project['has_content']): ?>
                    <?= $project['content'] ?>
                <?php endif; ?>
            </div>
            <button class="to-top">
                <?= svg('arrow'); ?>
                <span>Top</span>
            </button>
        </div>

        <div class="clearfix">

        <?php if($project['next_post']): ?>
        <div class="next-project hidden-desktop hidden-tablet">
            <a href="<?= $project['next_post'] ?>" class="ajax-link">Next</a>
        </div>
        <?php endif; ?>
        </div>
    </div>


    <div class="single-background">

    </div>
</div>