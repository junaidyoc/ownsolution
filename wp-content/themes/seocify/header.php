<?php
/**
 * header.php
 *
 * The header for the theme.
 */
?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>

    <head>
        <meta charset="<?php bloginfo( 'charset' ); ?>">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
		<?php wp_head(); ?>
    </head>

    <body <?php body_class(); ?> data-spy="scroll" data-target="#header">
<?php

$is_sticky_header = seocify_option('is_sticky_header');
$is_transparent_header = seocify_option('is_transparent_header');
$show_top_header = seocify_option('show_top_header');
$header_style = seocify_option('header_style');
$header_class = 'header';
if ($is_sticky_header):
    $header_class .= ' nav-sticky xs__sticky_header';
endif;

if ($is_transparent_header):
    $header_class .= ' header-transparent';
endif; 

$top_header_style= 1;

if($header_style <= 2 ){
    $top_header_style = $header_style;
}

?>

    <div class="<?php echo esc_attr($header_class);?>">
        <?php if($show_top_header): get_template_part('template-parts/navigation/nav','top-bar-'.$top_header_style.''); endif; ?>
        <?php get_template_part( 'template-parts/navigation/nav','primary-'.$header_style.'' ); ?>
    </div>