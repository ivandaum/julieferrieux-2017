<div class="home container">

	<ul class="projects-menu">
		<?php foreach($projects as $project): ?>
			<li class="<?php if($project['number'] === 1): ?>active<?php endif; ?> project-menu-<?= $project['number'] ?>">
				<span></span>
				<div class="project-number" style="color:<?= $project['color'] ?>"><?php if($project['number'] < 10): ?>0<?php endif; ?><?= $project['number'] ?></div>
			</li>
		<?php endforeach; ?>
	</ul>
	<div class="projects">
		<?php foreach ($projects as $project): ?>
			<div class="project container project-<?= $project['number'] ?> <?php if($project['number'] === 1): ?>active<?php endif; ?>" data-number="<?= $project['number'] ?>" style="color:<?= $project['color'] ?>">
					<div class="project-content">
						<h2 class="project-title"><?= explodeTitle($project['title']) ?></h2>
						<div style="background-color:<?= $project['color'] ?>" class="project-border"></div>
						<div class="project-tags text-uppercase">
							<?php foreach ($project['tags'] as $tag): ?>
								<p><?= $tag ?></p>
							<?php endforeach; ?>
						</div>
					</div>
				<div class="image-preview" style="background-image:url(<?= $project['image']['url'] ?>);"></div>
			</div>

		<?php endforeach; ?>
	</div>
</div>
