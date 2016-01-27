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
        hint: true
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

    $('.typeahead').bind('typeahead:select', function(event, suggestion) {
      calculatePerformance($(this).val());
    })
});

var calculatePerformance = function(symbol, startDate, endDate) {

}
