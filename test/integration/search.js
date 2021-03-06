module('Search', {
	setup: function() {
		Testing.selectMarketplaceByName();
	},
	teardown: function() {
		Ember.run(function() {
			$('#search span.close').click();
		});
	}
});

test('search box exists', function(assert) {
	assert.equal($('#q').length, 1);
});

test('search results show and hide', function(assert) {
	Testing.runSearch('foodbar');

	assert.equal($('#search').hasClass('with-results'), true, 'search has no results');
	assert.equal($('body').hasClass('overlaid'), true, 'overlay not showing');

	Testing.runSearch('');

	assert.equal($('#search').hasClass('with-results'), false, 'blank search has results');
	assert.equal($('body').hasClass('overlaid'), false, 'overlay still showing');
});

test('search results hide on click [x]', function(assert) {
	Testing.runSearch('%');

	$('#search span.close').click();

	assert.equal($('#q').val(), '');
	assert.equal($('#search').hasClass('with-results'), false);
	assert.equal($('#main-overlay').css('display'), 'none');
	assert.equal($('body').hasClass('overlaid'), false);
});

test('search "%" returns 15 transactions total, showing 10 transactions in results, with load more', function(assert) {
	Testing.runSearch('%');

	assert.equal($('#search .results li.transactions > a:contains("15")').length, 1, 'has 15 transaction in header');
	assert.equal($('#search .results table.transactions tbody tr').length, 10, 'has 10 transactions');
	assert.equal($('#search .results table.transactions tfoot td').length, 1, 'has "load more"');
});

test('search "%", click accounts, returns 22 accounts total, showing 10 accounts in results, with load more', function(assert) {
	Testing.runSearch('%');

	$('#search .results li.accounts > a').click();

	assert.equal($('#search .results li.accounts > a:contains("22")').length, 1, 'has 22 accounts in header');
	assert.equal($('#search .results table.accounts tbody tr').length, 10, 'has 10 accounts');
	assert.equal($('#search .results table.accounts tfoot td').length, 1, 'has "load more"');
});

test('search "%" returns 15 transactions. Click load more shows 5 more and hides load more', function(assert) {
	Testing.runSearch('%');

	assert.equal($('#search .results table.transactions tfoot td').length, 1, 'has "load more"');

	$('#search .results table.transactions tfoot td.load-more-results a').click();

	assert.equal($('#search .results table.transactions tbody tr').length, 15, 'has 15 transactions');
	assert.equal($('#search .results table.transactions tfoot td').length, 0, 'does not have "load more"');
});

test('search "%" return 15 transactions. Click filter by holds.', function(assert) {
	Testing.runSearch('%');

	$('#search .results li.transactions a.dropdown-toggle').click();

	assert.equal($('#search .results li.transactions ul.transaction-filter').css('display'), 'block', 'transaction filter menu visible');

	$('#search .results li.transactions ul.transaction-filter a:contains("Holds")').click();

	assert.equal($('#search .results li.transactions > a:contains("6")').length, 1, 'has 6 hold transactions in header');
	assert.equal($('#search .results table.transactions tbody tr').length, 6, 'has 6 hold transactions');
});

test('search date picker dropdown', function(assert) {
	Testing.runSearch('%');

	var toggle = $('#search .timing .dropdown-toggle');
	toggle.click();
	assert.ok(toggle.parent().hasClass('open'));

	var dp = toggle.parent().find('div.date-picker');
	dp.find('[name="after"]').click().focus();
	assert.ok(dp.find('.after').hasClass('selected'), 'after is selected');
	assert.ok(toggle.parent().hasClass('open'), 'date picker is still showing');
});

test('search click result', function(assert) {
	Testing.runSearch('%');

	// click customer section button
	$('#search .results .accounts a').click();
	// click the first row
	$('#search .results table.items tbody tr a').first().click();

	assert.equal($('#content h1').text().trim(), 'Customer', 'transition to customer page');
	assert.equal($('#search .results').css('display'), 'none', 'search result should be hidden');
});

test('search and click go with empty date range', function(assert) {
	Testing.runSearch('%');

	// click the date picker dropdown
	$('#search .results .timing a.dropdown-toggle').click();
	// click go button
	$('#search .results button.go').click();

	assert.equal($('#search .results .timing a.dropdown-toggle span').text().trim(), 'Any time');
});

test('search date range pick', function(assert) {
	Testing.runSearch('%');

	var spy = sinon.spy(Balanced.Adapter, 'get');

	// click the date picker dropdown
	$('#search .results .timing a.dropdown-toggle').click();

	// enter date
	$('#search .results .timing input[name="after"]').val('08/01/2013').trigger('keyup');
	$('#search .results .timing td.active.day').click();
	$('#search .results .timing input[name="before"]').val('08/01/2013').trigger('keyup');
	$('#search .results .timing td.active.day').click();

	// click go button
	$('#search .results button.go').click();

	// Notice: month 7 is Aug here for JS Date, ugly javascript...
	// As the date time is local, we need to convert it to ISO from in UTC timezone
	var begin = new Date(2013, 7, 1);
	var begin_iso = encodeURIComponent(begin.toISOString());
	var end = new Date(2013, 7, 2);
	var end_iso = encodeURIComponent(end.toISOString());

	var expected_uri = '/v1/marketplaces/MP5m04ORxNlNDm1bB7nkcgSY/search?' +
		'created_at%5B%3C%5D=' + end_iso + '&' +
		'created_at%5B%3E%5D=' + begin_iso + '&' +
		'limit=10&offset=0&q=&type%5Bin%5D=credit%2Cdebit%2Crefund%2Chold';

	var request = spy.getCall(spy.callCount - 1);
	assert.equal(request.args[0], Balanced.Transaction);
	assert.equal(request.args[1], expected_uri);
});

test('search date sort has three states', function(assert) {
	Testing.runSearch('%');

	var objectPath = "#search .results th.date";
	var states = [];
	var getSate = function() {
		if ($(objectPath).hasClass("unsorted")) {
			if ($.inArray("unsorted", states) === -1) {
				states.push("unsorted");
			}
		} else if ($(objectPath).hasClass("ascending")) {
			if ($.inArray("ascending", states) === -1) {
				states.push("ascending");
			}
		} else if ($(objectPath).hasClass("descending")) {
			if ($.inArray("descending", states) === -1) {
				states.push("descending");
			}
		}
	};

	var count = 0;
	var testAmount = 5;
	while (count !== testAmount) {
		$(objectPath).click();
		getSate();
		count++;
	}
	states.sort();

	var expectedStates = ["ascending", "descending", "unsorted"];
	assert.equal(states[0], expectedStates[0]);
	assert.equal(states[1], expectedStates[1]);
	assert.equal(states[2], expectedStates[2]);
	assert.equal(states.length, 3);
});
