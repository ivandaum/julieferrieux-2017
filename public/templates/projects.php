<div class="home container">
	<div class="section-container projects">
		<?php foreach ($projects as $project): ?>

			<div class="project container"
			     style="background-image:url(<?= $project['image']['url'] ?>);color:<?= $project['color'] ?>">

				<div class="project-content">
					<h2 class="project-title"><?= explodeTitle($project['title']) ?></h2>
					<div class="tags text-uppercase">
						<?php foreach ($project['tags'] as $tag): ?>

							<p><?= $tag ?></p>

						<?php endforeach; ?>
					</div>
				</div>
			</div>

		<?php endforeach; ?>
	</div>
</div>
