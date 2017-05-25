<div class="home container">

	<ul class="projects-menu">
		<div class="project-menu-position"></div>
		<?php foreach($projects as $project): ?>
			<li class="project-menu-<?= $project['number'] ?> <?php if($project['number'] == 1):?> active<?php endif; ?>">
				<span></span>
				<div class="project-number project-number-<?= $project['number'] ?>" style="color:<?= $project['color'] ?>">
					<?php if($project['number'] < 10): ?>0<?php endif; ?><?= $project['number'] ?>
				</div>
			</li>
		<?php endforeach; ?>
	</ul>
	<div class="projects">
		<?php foreach ($projects as $project): ?>
			<div class="project container project-<?= $project['number'] ?> <?php if($project['number'] == 1):?> active<?php endif; ?>" data-number="<?= $project['number'] ?>" style="color:<?= $project['color'] ?>">
					<div class="project-content">
						<h2 class="project-title project-title-<?= $project['number'] ?>"><a href="<?= $project['link'] ?>"><?= explodeTitle($project['title']) ?></a></h2>
						<div style="background-color:<?= $project['color'] ?>" class="project-border"></div>
						<div class="project-tags project-tags-<?= $project['number'] ?> text-uppercase">
							<?php foreach ($project['tags'] as $tag): ?>
								<p><?= $tag ?></p>
							<?php endforeach; ?>
						</div>
					</div>
			</div>
		<?php endforeach; ?>
	</div>


	<?php foreach($projects as $project): ?>
		<div class="project-image project-image-<?= $project['number'] ?>" >
			<div class="image-preview" data-image="<?= $project['image']['url'] ?>" style="background-image:url(<?= $project['image']['url'] ?>);"></div>
		</div>
	<?php endforeach; ?>
</div>
