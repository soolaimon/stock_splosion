$(document).ready(function () {
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
          header: '<h3>Companies</h3>',
            empty: [
              '<div class="empty-message">',
                'unable to find any Best Picture winners that match the current query',
              '</div>'
            ].join('\n'),
        }
    });
});
