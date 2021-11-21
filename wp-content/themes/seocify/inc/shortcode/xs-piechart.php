<?PHP

namespace Elementor;

if ( ! defined( 'ABSPATH' ) ) exit;

class Xs_Piechart_Widget extends Widget_Base {

    public function get_name() {
        return 'xs-piechart';
    }

    public function get_title() {
        return esc_html__( 'Seocify Piechart', 'seocify' );
    }

    public function get_icon() {
        return 'eicon-tabs';
    }

    public function get_categories() {
        return [ 'seocify-elements' ];
    }

    protected function _register_controls() {

        $this->start_controls_section(
            'section_tab',
            [
                'label' => esc_html__('Seocify Piechart', 'seocify'),
            ]
        );

        $repeater = new Repeater();

		$repeater->add_control(
			'title', [
                'label' => esc_html__('Title', 'seocify'),
                'type' => Controls_Manager::TEXT,
                'default' => esc_html__('Achieved','seocify'),
                'label_block' => true,
			]
		);

		$repeater->add_control(
			'number', [
                'label' => esc_html__('Number','seocify'),
                'type' => Controls_Manager::TEXT,
                'default' => '76',
			]
		);

		$repeater->add_control(
			'data_color',
			[
                'label' => esc_html__('Data Color','seocify'),
                'type' => Controls_Manager::COLOR,
                'default' => '#50e2c2',
			]
		);

		$this->add_control(
			'items',
			[
				'label' => __( 'Piechart Items', 'seocify' ),
				'type' => Controls_Manager::REPEATER,
                'fields' => $repeater->get_controls(),
                'separator' => 'before',
				'default' => [
					[
                        'title' => esc_html__('Achieved','seocify'),
                        'number' => '76',
                        'data_color' => '#50e2c2',
                    ],
                    [
                        'title' => esc_html__('Loaded','seocify'),
                        'number' => '93',
                        'data_color' => '#ffac42',
                    ],
                    [
                        'title' => esc_html__('Done','seocify'),
                        'number' => '85',
                        'data_color' => '#9013fd',
                    ],
				],
				'title_field' => '{{{ title }}}',
			]
		);

        $this->end_controls_section();

    }

    protected function render() {
        $settings = $this->get_settings();
        $items = $settings['items'];
        ?>

        <div class="piechats-wraper clearfix">
            <?php if(is_array($items)): ?>
                <?php foreach($items as $item): 
                ?>
                    <div class="single-piechart">
                        <div class="chart" data-percent="<?php echo esc_attr( $item['number'] ); ?>" data-color="<?php echo esc_attr( $item['data_color'] ); ?>">
                            <div class="chart-content"> 
                                <p><?php echo esc_html( $item['title'] ); ?></p>
                            </div>
                        </div>
                    </div>
                <?php endforeach; ?>
            <?php endif; ?>
        </div>
        <?php
    }

    protected function _content_template() { }
}