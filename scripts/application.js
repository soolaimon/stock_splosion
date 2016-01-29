$(document).ready(function () {
  $('.datepicker').datepicker({
    autoclose: true,
    endDate: '0d',
  });
    var search = new Bloodhound({
         datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
         queryTokenizer: Bloodhound.tokenizers.whitespace,
         remote: {
            url: '/search?query=' + '%QUERY',
            wildcard: '%QUERY'
         }
     });

    $('.typeahead').typeahead({
        highlight: true,
      },
      {
        name: 'companies',
        display: 'symbol',
        source: search,
        templates: {
          header: '<h3>Select a Company</h3>',
            empty: [
              '<div class="empty-message">',
                'Unable to find any Best Picture winners that match the current query',
              '</div>'
            ].join('\n'),
        }
    });

   $('.typeahead').bind('typeahead:select typeahead:autocomplete', function(event, suggestion) {
      $(this).trigger('typeahead:close');
      startDate = moment($('#start-date').val()).format('DD/MM/YYYY')
      endDate = moment($('#end-date').val()).format('DD/MM/YYYY')
      calculatePerformance($(this).val(), startDate, endDate);
    });
});

var calculatePerformance = function(symbol, startDate, endDate) {
  $.ajax({
    url: '/performance',
    type: 'GET',
    dataType: 'json',
    async: false,
    data: {symbol: symbol, start_date: startDate, end_date: endDate},
    success: function (data, textStatus, jqXHR) {
      var body = jqXHR.responseJSON;
      drawChart(body);
    },
    error: function (jqXHR, textStatus, errorThrown) {
    }
  });

}

var drawChart = function(data) {
  var prices = [];
  var dates = $.map(Object.keys(data.prices), function (date) {
    prices.push(data.prices[date]);
    return moment(date).format('MM/DD/YYYY');
  });
}
