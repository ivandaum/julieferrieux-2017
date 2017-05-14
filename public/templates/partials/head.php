<!DOCTYPE html>
<html lang="fr-fr">
<head>
    <meta charset="utf-8">
    <meta name="theme-color" content="#ffffff" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="<?= get_option('blogname') ?>" />
    <meta name="twitter:description" content="<?= get_option('blogdescription') ?>" />

    <meta property="og:url" content="<?= URL ?>" />
    <meta property="og:title" content="<?= get_option('blogname') ?>" />
    <meta property="og:description" content="<?= get_option('blogdescription') ?>" />
    <meta property="og:site_name" content="<?= get_option('blogname') ?>" />

    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, minimal-ui" />
    <meta name="description" content="<?= get_option('blogdescription') ?>" />
    <meta name="keywords" content="portfolio, graphism" />

    <link rel="icon" type="image/png" href="/wp-content/themes/julieferrieux-2017/favicon.png" sizes="32x32" />
    <title><?= get_option('blogname') ?></title>
    <link href="<?= PUBLIC_PATH ?>compressed/main.min.css" rel="stylesheet" type="text/css" />
</head>
<?php global $bodyClass ?>
<body class="<?= $bodyClass ?>">

<a href="#" class="about-section-button text-uppercase">Contact</a>