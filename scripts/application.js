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
      calculatePerformance($(this).val(), $('#start-date').val(), $('#end-date').val());
    });
});

var calculatePerformance = function(symbol, startDate, endDate) {
  $.ajax({
    url: '/performance',
    type: 'GET',
    dataType: 'json',
    async: false,
    data: {symbol: symbol, start_date: startDate, end_date: endDate},
    complete: function (jqXHR, textStatus) {
      // callback
    },
    success: function (data, textStatus, jqXHR) {
      // success callback
    },
    error: function (jqXHR, textStatus, errorThrown) {
      // error callback
    }
  });

}
