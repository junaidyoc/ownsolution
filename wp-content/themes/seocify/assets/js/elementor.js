(function ($, elementor) {
    "use strict";

    var Seocify = {

        init: function () {

            var widgets = {
                'xs-maps.default': Seocify.Map,
                'xs-testimonial.default': Seocify.Testimonial,
                'xs-pricing-table.default': Seocify.Pricing,
                'xs-case-studies.default': Seocify.Case_Studies,
                'xs-funfact.default': Seocify.Funfact,
                'xs-doodle-parallax.default': Seocify.DoodleParallax,
                'xs-work-process.default': Seocify.WorkProcess,
                'xs-piechart.default': Seocify.Piechart,
                'xs-price.default': Seocify.PricingTable,
            };
            $.each(widgets, function (widget, callback) {
                elementor.hooks.addAction('frontend/element_ready/' + widget, callback);
            });
            elementor.hooks.addAction('frontend/element_ready/global', Seocify.GlobalCallback);
        },
        GlobalCallback: function ($scope) {
            var wow = new WOW({
				boxClass: 'wow',
				animateClass: 'animated',
				offset: 0,
				mobile: false,
				live: true,
				scrollContainer: null,
			});
			wow.init();
		},
        Map: function ($scope) {

            var $container = $scope.find('.seocify-maps'),
                map,
                init,
                pins;
            if (!window.google) {
                return;
            }

            init = $container.data('init');
            pins = $container.data('pins');
            map = new google.maps.Map($container[0], init);

            if (pins) {
                $.each(pins, function (index, pin) {

                    var marker,
                        infowindow,
                        pinData = {
                            position: pin.position,
                            map: map
                        };

                    if ('' !== pin.image) {
                        pinData.icon = pin.image;
                    }

                    marker = new google.maps.Marker(pinData);

                    if ('' !== pin.desc) {
                        infowindow = new google.maps.InfoWindow({
                            content: pin.desc
                        });
                    }

                    marker.addListener('click', function () {
                        infowindow.open(map, marker);
                    });

                    if ('visible' === pin.state && '' !== pin.desc) {
                        infowindow.open(map, marker);
                    }

                });
            }
        },

        Funfact: function ($scope) {

            var $number_percentage = $scope.find('.number-percentage');
            $number_percentage.each(function () {
                $(this).animateNumbers($(this).attr("data-value"), true, parseInt($(this).attr("data-animation-duration"), 10));
            });
        },

        DoodleParallax: function ($scope) {
            var $doodle_parallax = $scope.find('.elementor-top-section');
            $doodle_parallax.each(function () {
                if ($(this).find('.doodle-parallax').hasClass('doodle-parallax')) {
                    $(this).attr('data-scrollax-parent', 'true');
                } else {
                    $(this).removeAttr('data-scrollax-parent');
                }
            });
            var a = {
                Android: function () {
                    return navigator.userAgent.match(/Android/i);
                },
                BlackBerry: function () {
                    return navigator.userAgent.match(/BlackBerry/i);
                },
                iOS: function () {
                    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
                },
                Opera: function () {
                    return navigator.userAgent.match(/Opera Mini/i);
                },
                Windows: function () {
                    return navigator.userAgent.match(/IEMobile/i);
                },
                any: function () {
                    return a.Android() || a.BlackBerry() || a.iOS() || a.Opera() || a.Windows();
                }
            };
            var trueMobile = a.any();
            if (null == trueMobile) {
                var b = new Scrollax();
                b.reload();
                b.init();
            }
        },

        Case_Studies: function ($scope) {

            var $container = $scope.find('.case-study-slider');
            var dot = $container.data('dot') == 'yes' ? true : false;
            var nav = $container.data('nav') == 'yes' ? true : false;
            $container.myOwl({
                items: 3,
                dots: dot,
                navText: ['<i class="icon icon-arrow-left"></i>', '<i class="icon icon-arrow-right"></i>'],
                nav: nav,
                margin: 30,
                stagePadding: 15,
                responsive: {
                    0: {
                        items: 1
                    },
                    768: {
                        items: 2
                    },
                    1024: {
                        items: 3
                    }
                }
            });
        },


        Testimonial: function ($scope) {

            if ($scope.find('.testimonial-slider').length > 0) {
                let sync1 = $scope.find(".testimonial-slider");
                sync1.myOwl({
                    dots: true
                });
            }

            if (($scope.find(".testimonial-slider-preview") && $scope.find(".testimonial-slider-thumb")).length > 0) {
                let testimonial_slider_preview = $scope.find(".testimonial-slider-preview").data('id'),
                    testimonial_slider_thumb = $scope.find(".testimonial-slider-thumb").data('id'),
                    sync1 = $('#' + testimonial_slider_preview),
                    sync2 = $('#' + testimonial_slider_thumb);
                    var slidesPerPage = 3; //globaly define number of elements per page
                    var syncedSecondary = true;

                    sync1.owlCarousel({
                        items : 1,
                        slideSpeed : 2000,
                        nav: false,
                        autoplay: true,
                        dots: false,
                        loop: true,
                        responsiveRefreshRate : 200,
                        navText: ['',''],
                    }).on('changed.owl.carousel', syncPosition);

                    sync2
                        .on('initialized.owl.carousel', function () {
                        sync2.find(".owl-item").eq(0).addClass("current");
                        })
                        .owlCarousel({
                        items : slidesPerPage,
                        dots: true,
                        nav: false,
                        smartSpeed: 200,
                        slideSpeed : 500,
                        slideBy: slidesPerPage, //alternatively you can slide by 1, this way the active slide will stick to the first item in the second carousel
                        responsiveRefreshRate: 100,
                        responsive : {
                            0 : {
                                items : 1,
                                slideBy : 1,
                            },
                            768 : {
                                items : 2,
                                slideBy : 2,
                            },
                            1024 : {
                                items : slidesPerPage,
                                slideBy : slidesPerPage,
                            }
                        }
                    }).on('changed.owl.carousel', syncPosition2);

                    function syncPosition(el) {
                        //if you set loop to false, you have to restore this next line
                        //var current = el.item.index;

                        //if you disable loop you have to comment this block
                        var count = el.item.count-1;
                        var current = Math.round(el.item.index - (el.item.count/2) - .5);

                        if(current < 0) {
                        current = count;
                        }
                        if(current > count) {
                        current = 0;
                        }

                        //end block

                        sync2
                        .find(".owl-item")
                        .removeClass("current")
                        .eq(current)
                        .addClass("current");
                        var onscreen = sync2.find('.owl-item.active').length - 1;
                        var start = sync2.find('.owl-item.active').first().index();
                        var end = sync2.find('.owl-item.active').last().index();

                        if (current > end) {
                        sync2.data('owl.carousel').to(current, 100, true);
                        }
                        if (current < start) {
                        sync2.data('owl.carousel').to(current - onscreen, 100, true);
                        }
                    }

                    function syncPosition2(el) {
                        if(syncedSecondary) {
                        var number = el.item.index;
                        sync1.data('owl.carousel').to(number, 100, true);
                        }
                    }

                    sync2.on("click", ".owl-item", function(e){
                        e.preventDefault();
                        var number = $(this).index();
                        sync1.data('owl.carousel').to(number, 300, true);
                    });
            }

            // Seocify Testimonial New
            var slider4 = $scope.find(".xs-seocify-testimonial-preview"),
                slider4_2 = $scope.find(".xs-seocify-testimonial"),
                navData = slider4.data("nagivation");

            if (slider4.length > 0 && slider4_2.length > 0 && 'yes' == navData) {
                var _seocifyTestimonialSync = function _seocifyTestimonialSync(el) {
                    //if you set loop to false, you have to restore this next line
                    //var current = el.item.index;

                    //if you disable loop you have to comment this block
                    var count = el.item.count - 1;
                    var current = Math.round(el.item.index - el.item.count / 2 - .5);

                    if (current < 0) {
                        current = count;
                    }
                    if (current > count) {
                        current = 0;
                    }
                    //end block

                    slider4_2.find(".owl-item").removeClass("current").eq(current).addClass("current");
                    var onscreen = slider4_2.find('.owl-item.active').length - 1;
                    var start = slider4_2.find('.owl-item.active').first().index();
                    var end = slider4_2.find('.owl-item.active').last().index();

                    if (current > end) {
                        slider4_2.data('owl.carousel').to(current, 100, true);
                    }
                    if (current < start) {
                        slider4_2.data('owl.carousel').to(current - onscreen, 100, true);
                    }
                };

                var _seocifyTestimonialSync2 = function _seocifyTestimonialSync2(el) {
                    if (syncedSecondary) {
                        var number = el.item.index;
                        slider4.data('owl.carousel').to(number, 100, true);
                    }
                };

                var seocifyTestimonialSync1 = $scope.find(".xs-seocify-testimonial-preview"),
                    seocifyTestimonialSync2 = $scope.find(".xs-seocify-testimonial"),
                    slidesPerPage = 5,
                    syncedSecondary = true;

                seocifyTestimonialSync1.owlCarousel({
                    items: 1,
                    slideSpeed: 2000,
                    nav: true,
                    autoplay: true,
                    dots: false,
                    loop: true,
                    mouseDrag: false,
                    touchDrag: false,
                    responsiveRefreshRate: 200,
                    responsive: {
                        0: {
                            touchDrag: true
                        },
                        768: {
                            touchDrag: true
                        },
                        1024: {
                            touchDrag: false
                        }
                    },
                    navText: [
                        '<i class="icon icon-arrow-left"></i>',
                        '<i class="icon icon-arrow-right"></i>'
                    ]
                }).on('changed.owl.carousel', _seocifyTestimonialSync);

                seocifyTestimonialSync2.on('initialized.owl.carousel', function () {
                    seocifyTestimonialSync2.find(".owl-item").eq(0).addClass("current");
                }).owlCarousel({
                    items: slidesPerPage,
                    dots: false,
                    nav: false,
                    smartSpeed: 200,
                    slideSpeed: 500,
                    autoWidth: false,
                    mouseDrag: false,
                    touchDrag: false,
                    slideBy: slidesPerPage, //alternatively you can slide by 1, this way the active slide will stick to the first item in the second carousel
                    responsiveRefreshRate: 100
                }).on('changed.owl.carousel', _seocifyTestimonialSync2);

                seocifyTestimonialSync2.on("click", ".owl-item", function (e) {
                    e.preventDefault();
                    var number = $(this).index();
                    seocifyTestimonialSync1.data('owl.carousel').to(number, 300, true);
                });

                seocifyTestimonialSync1.on('changed.owl.carousel', function (event) {
                    if ($('.owl-item.active.current img').length > 0) {
                        var item_image_src = $('.owl-item.active.current img').attr('src');
                        $('.xs-seocify-testimonial-big-thumb img').attr('src', item_image_src);

                    }
                });

                if ($('.xs-seocify-testimonial-v2 img').length > 0) {
                    $(document).on('click', '.xs-seocify-testimonial-v2 img', function () {
                        var imgSrc = $(this).attr('src');
                        if ($('.xs-seocify-testimonial-big-thumb img').length > 0) {
                            $('.xs-seocify-testimonial-big-thumb img').attr('src', imgSrc);
                        }
                    });
                }
            } else if (slider4.length > 0) {
                slider4.owlCarousel({
                    items: 1,
                    slideSpeed: 2000,
                    nav: true,
                    autoplay: true,
                    dots: false,
                    loop: true,
                    mouseDrag: false,
                    touchDrag: false,
                    responsiveRefreshRate: 200,
                    responsive: {
                        0: {
                            touchDrag: true
                        },
                        768: {
                            touchDrag: true
                        },
                        1024: {
                            touchDrag: false
                        }
                    },
                    navText: [
                        '<i class="icon icon-arrow-left"></i>',
                        '<i class="icon icon-arrow-right"></i>'
                    ]
                });
            }
        },

        Pricing: function (e) {
            var xs_pricing_table = e.find('.pricing-matrix-slider');

            if (!xs_pricing_table) {
                return;
            }

            xs_pricing_table.on('initialized.owl.carousel translated.owl.carousel', function () {
                var $this = $(this);
                $this.find('.owl-item.last-child').each(function () {
                    $(this).removeClass('last-child');
                });
                $(this).find('.owl-item.active').last().addClass('last-child');
            });
            xs_pricing_table.myOwl({
                items: 3,
                mouseDrag: false,
                autoplay: true,
                nav: true,
                navText: ['<i class="icon icon-arrow-left"></i>', '<i class="icon icon-arrow-right"></i>'],
                responsive: {
                    0: {
                        items: 1,
                        mouseDrag: true,
                        loop: true,
                    },
                    768: {
                        items: 2,
                        mouseDrag: true
                    },
                    1024: {
                        items: 3,
                        mouseDrag: false,
                        loop: false
                    }
                }
            });
            equalHeight();
            function equalHeight() {

                let pricingImage = e.find('.pricing-image'),
                    pricingFeature = e.find('.pricing-feature-group');
                if ($(window).width() > 991) {
                    pricingImage.css('height', pricingFeature.outerHeight());
                } else {
                    pricingImage.css('height', 100 + '%');
                }
            }
        },
        WorkProcess: function ($scope) {

            var workprocessSlider = $scope.find(".workprocess-sync1");
            var workprocessPosts = $scope.find(".workprocess-sync2");
            var slidesPerPage = 3; //globaly define number of elements per page
            var syncedSecondary = true;


            workprocessSlider.owlCarousel({
                responsive: {
                    0: {
                        items: 1
                    },
                    768: {
                        items: 2
                    },
                    992: {
                        items: 3
                    }
                },
                slideSpeed: 2000,
                nav: false,
                autoplay: true,
                dots: false,
                loop: true,
                mouseDrag: true,
                touchDrag: true,
                responsiveRefreshRate: 200,
            }).on('changed.owl.carousel', syncPosition);

            workprocessPosts
                .on('initialized.owl.carousel', function () {
                    workprocessPosts.find(".owl-item").eq(0).addClass("current");
                })
                .owlCarousel({
                    responsive: {
                        0: {
                            items: 1
                        },
                        768: {
                            items: 2
                        },
                        992: {
                            items: 3
                        }
                    },
                    dots: false,
                    nav: true,
                    smartSpeed: 100,
                    slideSpeed: 2000,
                    mouseDrag: true,
                    touchDrag: true,
                    slideBy: slidesPerPage, //alternatively you can slide by 1, this way the active slide will stick to the first item in the second carousel
                    responsiveRefreshRate: 100,
                    navText: [
                        '<i class="icon icon-chevron-left"></i>',
                        '<i class="icon icon-chevron-right"></i>'
                    ],
                }).on('changed.owl.carousel', syncPosition2);

            function syncPosition(el) {
                //if you set loop to false, you have to restore this next line
                //var current = el.item.index;

                //if you disable loop you have to comment this block
                var count = el.item.count - 1;
                var current = Math.round(el.item.index - (el.item.count / 2) - .5);

                if (current < 0) {
                    current = count;
                }
                if (current > count) {
                    current = 0;
                }

                //end block

                workprocessPosts
                    .find(".owl-item")
                    .removeClass("current")
                    .eq(current)
                    .addClass("current");
                var onscreen = workprocessPosts.find('.owl-item.active').length - 1;
                var start = workprocessPosts.find('.owl-item.active').first().index();
                var end = workprocessPosts.find('.owl-item.active').last().index();

                if (current > end) {
                    workprocessPosts.data('owl.carousel').to(current, 100, true);
                }
                if (current < start) {
                    workprocessPosts.data('owl.carousel').to(current - onscreen, 100, true);
                }
            }

            function syncPosition2(el) {
                if (syncedSecondary) {
                    var number = el.item.index;
                    workprocessSlider.data('owl.carousel').to(number, 100, true);
                }
            }

            workprocessPosts.on("click", ".owl-item", function (e) {
                e.preventDefault();
                var number = $(this).index();
                workprocessSlider.data('owl.carousel').to(number, 100, true);
            });

            var activeLine = $('.workprocess-sync2 .owl-item .item p');

            $(document).on('click', '.workprocess-sync2 .owl-item .item p', function () {

                if ($(this).parents('.item').hasClass('xs-selected')) {
                    $(this).parents('.item').removeClass('xs-selected');
                    $(this).parents('.owl-item').nextAll().find('.item').removeClass('xs-selected')
                } else {
                    $(this).parents('.item').addClass('xs-selected');
                    $(this).parents('.owl-item').prevAll().find('.item').addClass('xs-selected');
                }
            });

        },
        Piechart: function ($scope) {

            let chart = $scope.find(".chart");
            $('[data-percent]').each(function () {
                var value = $(this).attr('data-percent');
                $(this).find('.chart-content').append('<span class="chart-value">' + value + '%</span>');
            })
            $(chart).each(function () {
                let color = $(this).data('color')
                let value = $(this).find('.chart-value')
                $(this).myChart({
                    barColor: color
                })
                $(value).css('color', color);
            })
        },

        PricingTable: function ($scope) {
            /*=============================================================
					26. tab swipe indicator
            =========================================================================*/
            if ($scope.find('.tab-swipe').length > 0) {
                if ($scope.find('.indicator').length === 0) {
                    $scope.find('.tab-swipe').append('<li class="indicator"></li>');
                }


                let cLeft = $('.tab-swipe').find('.active').position().left + 'px',
                    cWidth = $('.tab-swipe').find('.active').css('width');
                $scope.find('.indicator').css({
                    left: cLeft,
                    width: cWidth
                })

                $scope.find('.tab-swipe li a').on('click', function () {
                    let cLeft = $(this).position().left + 'px',
                        cWidth = $(this).css('width');
                    $(this).parents('.tab-swipe').find('.indicator').css({
                        left: cLeft,
                        width: cWidth
                    })
                });
            }
        }
    };
    $(window).on('elementor/frontend/init', Seocify.init);
}(jQuery, window.elementorFrontend));