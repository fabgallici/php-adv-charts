function getChartData() {
  $.ajax({
    url: "getAllData.php",
    method: "GET",
    success: function (data) {
      console.log("data", data);
      printChart(data);
    },
    error: function (error) {
      console.log("error", error);
    }
  });
}
function printChart(data) {
  var ctx = document.getElementById('myChart').getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: moment.months(),
      datasets: [{
        label: 'Vendite',
        data: data,
        backgroundColor: [
          '#3c7e4d'
          
        ],
        borderColor: [
          '#f4002a'
        ],
        borderWidth: 4
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}
function init() {
  getChartData();
  // printChart();
}
$(document).ready(init);
