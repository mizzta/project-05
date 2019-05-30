<?php
/**
 * The main template file.
 *
 * @package QOD_Starter_Theme
 */

get_header(); ?>

<div id="primary" class="content-area">
	<main id="main" class="site-main" role="main">


		<!-- <div class="quotation-mark-before"><i class="fas fa-quote-left"></i></div>  -->

		<?php if (have_posts()) : ?>

			<?php if (is_home() && !is_front_page()) : ?>
				<header>
					<h1 class="page-title screen-reader-text"><?php single_post_title(); ?></h1>
				</header>
			<?php endif; ?>

			<?php /* Start the Loop */ ?>
			<?php while (have_posts()) : the_post(); ?>

				<?php get_template_part('template-parts/content'); ?>

			<?php endwhile; ?>

			<!-- <?php the_posts_navigation(); ?> -->



		<?php else : ?>


			<?php get_template_part('template-parts/content', 'none'); ?>

		<?php endif; ?>


		<!-- <div class="quotation-mark-after"><i class="fas fa-quote-right"></i></div> -->

	</main><!-- #main -->
</div><!-- #primary -->

<?php get_footer(); ?>