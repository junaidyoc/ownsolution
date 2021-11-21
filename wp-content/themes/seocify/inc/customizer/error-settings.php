<?php
$fields[]= array(
    'type'        => 'switch',
    'settings'    => 'show_error_banner',
    'label'       => esc_html__( 'Show Error Banner', 'seocify' ),
    'section'     => 'error_section',
    'default'     => true,
    'choices'     => array(
        true  => esc_html__( 'Enable', 'seocify' ),
        false => esc_html__( 'Disable', 'seocify' ),
    ),
);

$fields[] = array(
        'type'        => 'image',
        'settings'    => 'error_banner_img',
        'label'       => esc_html__( 'Error Banner Image', 'seocify' ),
        'section'     => 'error_section',
        'default'     => '',
        'required'      => array(
            array(
                'setting'   => 'show_error_banner',
                'operator'  => '==',
                'value'     => 1,
            )
        ),
);

$fields[]= array( 
    'type'        => 'text',
    'settings'    => 'error_banner_title',
    'label'       => esc_html__( 'Error Banner Title', 'seocify' ),
    'section'     => 'error_section',
    'transport'   => 'postMessage',
    'js_vars'     => array(
        array(
            'element'  => '.inner-banner-content .inner-banner-title',
            'function' => 'html'
        ),
    ),
    'default'     =>  '404',
    'required'      => array(
        array(
            'setting'   => 'show_error_banner',
            'operator'  => '==',
            'value'     => 1,
        )
    ),
);
$fields[]= array(
    'type'        => 'text',
    'settings'    => 'error_title',
    'label'       => esc_html__( 'Error Title', 'seocify' ),
    'section'     => 'error_section',
    'default'     =>  'Error Page',
);
$fields[]= array(
    'type'        => 'text',
    'settings'    => 'error_subtitle',
    'label'       => esc_html__( 'Error Subtitle', 'seocify' ),
    'section'     => 'error_section',
    'default'     =>  'Either Something went wrong or the page doesn\'t exist anymore',
);

$fields[]= array(
    'type'        => 'text',
    'settings'    => 'back_to_home_label',
    'label'       => esc_html__( 'Back to home button label', 'seocify' ),
    'section'     => 'error_section',
    'default'     =>  'Back to Home',
);

$fields[] = array(
	'type'        => 'image',
	'settings'    => 'error_logo',
	'label'       => esc_html__( 'Error Logo', 'seocify' ),
	'section'     => 'error_section',
);