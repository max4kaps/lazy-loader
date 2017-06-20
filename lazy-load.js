(function($) {
	window.lazyLoad = window.lazyLoad || {};
	var positions = {},
		loopablePositions = [],
		hasScrolled = false,
		scrollingElement = document.scrollingElement || document.documentElement || document.body;

	var lastRun = Date.now(),
		viewportHeight = $(window).height(),
		scrollTop, position, threshold;

	var onScroll = function() {
		// Run once every 50 ms
		if (Date.now() - lastRun < 50) {
			return;
		}

		scrollTop = scrollingElement.scrollTop;
		for (var i = 0; i < loopablePositions.length; i++) {
			position = loopablePositions[i]
			if (position.loaded) {
				continue;
			}
			threshold = position.threshold ? position.threshold : 0;
			if (position.top - threshold < scrollTop + viewportHeight && position.top - threshold > scrollTop) {
				lazyLoad[position.run]();
				position.loaded = true;
			}
		}

		lastRun = Date.now();

		if (!hasScrolled) {
			hasScrolled = true;
		}
	}

	var positioning = function() {
		viewportHeight = $(window).height();
		var elements = $('.lazy');
		var top, position, element, functionName;
		for (var i = 0; i < elements.length; i++) {
			element = $(elements[i]);
			top = element.offset().top;

			functionName = element.data('function');

			if (!functionName || !lazyLoad[functionName]) {
				continue;
			}

			position = positions[element.attr('id')] || {
					element: element,
					threshold: element.data('threshold'),
					loaded: false,
					run: functionName
				};

			position.top = top;
			positions[element.attr('id')] = position;
		}

		loopablePositions = [];
		jQuery.each(positions, function(property, value) {
			loopablePositions.push(value);
		});

		if (!hasScrolled) {
			onScroll();
		}
	};

	positioning();
	setInterval(positioning, 1000);

	$(window).on('scroll', onScroll);
}(jQuery));
