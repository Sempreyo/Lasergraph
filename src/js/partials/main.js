$(document).ready(function(){
	// Phone mask
	$("input[name='phone']").mask("+7 999 999 99 99");

	// Set direction hover
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
