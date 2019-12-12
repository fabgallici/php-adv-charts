function getChartData() {
  $.ajax({
    url: "getAllData.php",
    method: "GET",
    success: function (data) {
      console.log("data", data);
      // printChart(data);
      evData(data);
    },
    error: function (error) {
      console.log("error", error);
    }
  });
}

function evData(data) {
  var fatturato = data.fatturato;
  var fatturato_by_agent = data.fatturato_by_agent;
  console.log(fatturato);
  console.log(fatturato_by_agent);
  printChartFatturato(fatturato);
  var fatturatoAgents = 
  {
    'type': fatturato_by_agent.type,
    'agent_names': [],
    'data': []
  };
  for (var agentName in fatturato_by_agent.data) {
    // agents.push(agentName);
    fatturatoAgents.agent_names.push(agentName);
    fatturatoAgents.data.push(fatturato_by_agent.data[agentName]);
    // console.log(agent);
  }
  console.log('agents: ', fatturatoAgents);
}

function printChartFatturato(fatturato) {
  var ctx = document.getElementById('myChart').getContext('2d');
  var myChart = new Chart(ctx, {
    type: fatturato.type,
    data: {
      labels: moment.months(),
      datasets: [{
        label: 'Vendite',
        data: fatturato.data,
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

function printChartFatturatoAgent(fatturatoAgent) {

}
function init() {
  getChartData();
  // printChart();
}
$(document).ready(init);
