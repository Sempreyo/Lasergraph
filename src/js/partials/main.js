$(document).ready(function(){
	// Phone mask
	$("input[name='phone']").mask("+7 999 999 99 99");

	// Anchors
	anchorScroll($('.anchor'));

	function anchorScroll(e) {
		e.click(function () {
			link = $(this).attr('href');
			to = $(link).offset().top;
			$('body, html').animate({
				scrollTop: to
			}, 800);
		});
	}
	
	// Header
	$('.header__burger').click(function () {
		$('.menu').addClass('open');
		$('body').addClass('body-scroll-lock');
	});

	$('.menu__back').click(function () {
		$('.menu').removeClass('open');
		$('body').removeClass('body-scroll-lock');
	});

	// Set direction hover
	if(window.matchMedia('(min-width: 768px)').matches){
		$('.directions__item').hover(
			function() {
				$(this).find('svg').css('box-shadow', '0 0 0 6px ' + $(this).attr('data-color'));

				// Change text
				$('.directions__text').text($(this).attr('data-text'));
			},
			function() {
				$(this).find('svg').removeAttr('style');

				$('.directions__text').text('ВЫБЕРИТЕ НАПРАВЛЕНИЕ');
			}
		);
	}

	// Directions slider
	directionSliderInit();

	$(window).resize(function () {
		directionSliderInit();
	});

	function directionSliderInit() {
		if(window.matchMedia('(max-width: 767px)').matches){
			$('.directions__wrapper').slick({
				slidesToShow: 2.2,
				slidesToScroll: 1,
				arrows: false,
				infinite: false
			});
		}
	}

	// Filter slider
	filterSliderInit();

	$(window).resize(function () {
		filterSliderInit();
	});

	function filterSliderInit() {
		if(window.matchMedia('(max-width: 767px)').matches){
			$('.filter').slick({
				slidesToShow: 2.4,
				slidesToScroll: 1,
				arrows: false,
				infinite: false
			});
		}
	}

	// Portfolio filter
	setTimeout(function () {
		var masonry = $('.portfolio__masonry').isotope({
			itemSelector: '.portfolio__masonry-item',
			packery: {
				gutter: 0
			},
		});

		$('.filter__item').on('click', function() {
			var filterValue = $( this ).attr('data-filter');

			masonry.isotope({ filter: filterValue });
		});
	}, 400);
});

$(window).on('load', function () {
	$('body').addClass('loaded');
});
