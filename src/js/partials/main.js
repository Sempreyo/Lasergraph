$(document).ready(function(){
	// Phone mask
	$("input[name='phone']").mask("+7 999 999 99 99");

	// Form validation
	function validateEmail(email) {
		var re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
		return re.test(String(email).toLowerCase());
	}

	function mail(event, php) {
		event.preventDefault ? event.preventDefault() : event.returnValue = false;
		var req = new XMLHttpRequest();
		req.open('POST', php, true);

		req.onerror = function () {
			console.log("Ошибка отправки запроса");
		};

		req.send(new FormData(event.target));
	}

	function checkValid(errs) {
		var isValid = true;

		errs.each(function () {
			if ($(this).is(':visible')) {
				isValid = false;
			}
		});

		return isValid;
	}

	$('.js-form-validate button').on('click', function (e) {
		var that = $(this),
			fields = $(this).parent().find('input').add($(this).parent().find('textarea')),
			form = $(this).parent('form'),
			isValid = checkValid(form.find('.field-error'));

		fields.each(function () {
			var err = $(this).siblings('.field-error');

			if ($(this).prop('required') === true) {
				if ($(this).val().length === 0) {
					err.show().text('Please enter a value.');
					isValid = false;
				} else {
					err.hide().text('');
				}
			}

			if ($(this).attr('type') === "email") {
				if (validateEmail($(this).val()) === false) {
					err.show().text('Please enter a valid email address.');
					isValid = false;
				}
			}
		});

		if (isValid) {
			form.submit(function () {
				mail(event, 'php/mail.php');

				$.fancybox.open({
					src: '#popup-thanks',
					type: 'inline',
					touch: false,
					scrolling: 'no'
				});
			});

			setTimeout(function () {
				form.off('submit');
			}, 100);
		} else {
			e.preventDefault();
		}
	});

	$('.js-form-validate .field').on('focusout keyup change', function () {
		var input = $(this).find('input'),
			err = input.parent().next(),
			val = input.val();

		if (input.attr('type') === "email") {
			if (validateEmail(val) || val.length === 0) {
				err.hide().text('');
			} else {
				err.show().text('Please enter a valid email address.');
			}
		}
	});

	// Animation
	var first = new TimelineMax();
	var second = new TimelineMax();
	var three = new TimelineMax();
	var bgColor = $('.reason__block').attr('data-color');
	var bgColor2 = $('.partners__block').attr('data-color');

	first.from($('.first-screen__img'), 0.25, {scaleX: 0}).delay(2);
	first.from([$('.header__container'), $('.first-screen__anim')], 0.5, {opacity: 0, right: "300px"}).delay(3);

	second.from($('.reason__img'), 1, {width: 0});
	second.fromTo(".top", 0.25,
		{
			width: 0,
			background: bgColor,
			immediateRender: false,
			autoRound: false
		},
		{
			width: $('.reason__block').innerWidth(),
			background: bgColor
		}
	);
	second.fromTo(".right", 0.25,
		{
			height: 0,
			background: bgColor,
			immediateRender: false,
			autoRound: false
		},
		{
			height: $('.reason__block').innerHeight(),
			background: bgColor
		}
	);
	second.fromTo(".bottom", 0.25,
		{
			width: 0,
			background: bgColor,
			immediateRender: false,
			autoRound: false
		},
		{
			width: $('.reason__block').innerWidth(),
			background: bgColor
		}
	);
	second.fromTo(".left", 0.25,
		{
			height: 0,
			background: bgColor,
			immediateRender: false,
			autoRound: false
		},
		{
			height: $('.reason__block').innerHeight(),
			background: bgColor
		}
	);
	second.from($('.reason__title'), 0.5, {opacity: 0, right: "300px"}).delay(0.75);

	three.fromTo(".top-2", 0.25,
		{
			width: 0,
			background: bgColor2,
			immediateRender: false,
			autoRound: false
		},
		{
			width: $('.partners__block').innerWidth(),
			background: bgColor2
		}
	);
	three.fromTo(".right-2", 0.25,
		{
			height: 0,
			background: bgColor2,
			immediateRender: false,
			autoRound: false
		},
		{
			height: $('.partners__block').innerHeight(),
			background: bgColor2
		}
	);
	three.fromTo(".bottom-2", 0.25,
		{
			width: 0,
			background: bgColor2,
			immediateRender: false,
			autoRound: false
		},
		{
			width: $('.partners__block').innerWidth(),
			background: bgColor2
		}
	);
	three.fromTo(".left-2", 0.25,
		{
			height: 0,
			background: bgColor2,
			immediateRender: false,
			autoRound: false
		},
		{
			height: $('.partners__block').innerHeight(),
			background: bgColor2
		}
	);
	three.from($('.partners__anim'), 0.5, {opacity: 0, right: "300px"}).delay(0.75);

	three.from($('.partners__item'), 1, {opacity: 0, rotationX:-60, rotationY:60}).delay(1);



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

	$('.menu ul li a').click(function () {
		if ($('.menu').hasClass('open')) {
			$('.menu').removeClass('open');
			$('body').removeClass('body-scroll-lock');
		}
	});

	$('.menu__btn').click(function () {
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
