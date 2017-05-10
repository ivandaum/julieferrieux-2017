<div class="page single container moved-by-navbar">
    <div class="section-container ">

        <div class="title content-container">
            <h1><?= the_title() ?></h1>
        </div>
        <div class="single-content content-container">
<!--            <p class="project-year">--><?//= the_date('Y') ?><!--</p>-->
            <div class="single-content-cover">
                <img src="<?= $cover['medium'] ?>" alt="">
            </div>
            <div class="single-content-text">
                <?php
                    $content = apply_filters ("the_content", $post->post_content);
                    echo $content;
                ?>
            </div>

        </div>
    </div>


    <div class="single-background">

    </div>
</div>