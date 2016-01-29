$(document).ready(function () {
    $('.datepicker').datepicker({
      autoclose: true,
      endDate: '0d',
    });

    loadSearcher();



});

var loadSearcher = function() {
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
      calculatePerformance();
    });
}

$(document).on('change', '.adjustable', function() {
  calculatePerformance();
})


var calculatePerformance = function() {
  var symbol = $('#search').val();
  var startDate = moment($('#start-date').val()).format('DD/MM/YYYY');
  var endDate = moment($('#end-date').val()).format('DD/MM/YYYY');
  $('#start-date').addClass('adjustable');
  $('#end-date').addClass('adjustable');

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
  if (window.chart){
    window.chart.destroy();
  }
  var prices = [];
  var dates = $.map(Object.keys(data.prices), function (date) {
    prices.push(data.prices[date]);
    return moment(date).format('MM/DD/YYYY');
  });
  $('#company-name').text(data.company.name)
  $('#position').text(data.position)
  var data = {
      labels: dates,
      datasets: [
          {
              label: data.company.name,
              fillColor: "rgba(220,220,220,0.2)",
              strokeColor: "rgba(220,220,220,1)",
              pointColor: "rgba(220,220,220,1)",
              pointStrokeColor: "#fff",
              pointHighlightFill: "#fff",
              pointHighlightStroke: "rgba(220,220,220,1)",
              data: prices
          },
      ]
  };
   var options = {
      scaleShowGridLines : true,
      scaleGridLineColor : "rgba(0,0,0,.05)",
      scaleGridLineWidth : 1,
      scaleShowHorizontalLines: true,
      scaleShowVerticalLines: true,
      bezierCurve : true,
      bezierCurveTension : 0.4,
      pointDot : true,
      pointDotRadius : 4,
      pointDotStrokeWidth : 1,
      pointHitDetectionRadius : 20,
      datasetStroke : true,
      datasetStrokeWidth : 2,
      datasetFill : true,
    };
  var ctx = document.getElementById("myChart").getContext("2d");
  performanceChart = new Chart(ctx).Line(data, options);
  window.chart = performanceChart

}
