function getChartData() {
  $.ajax({
    url: "getAllData.php",
    method: "GET",
    success: function (data) {
      console.log("data", data);
      evData(data);
    },
    error: function (error) {
      console.log("error", error);
    }
  });
}

//versione Agents semplice da usare con obj keys e values
function evData(data) {
  var fatturato = data.fatturato;
  var fatturatoAgents = data.fatturato_by_agent;
  console.log('fatturato ', fatturato);
  console.log('fatturatoAgents ', fatturatoAgents);
  printChartFatturato(fatturato);
  printChartFatturatoAgent(fatturatoAgents);
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
//per versione semplice obj keys values
function printChartFatturatoAgent(fatturatoAgents) {
  var ctx = document.getElementById('myAgentsChart').getContext('2d');
  var myChart = new Chart(ctx, {
    type: fatturatoAgents.type,
    data: {
      labels: Object.keys(fatturatoAgents.data),
      datasets: [{
        label: 'Vendite',
        data: Object.values(fatturatoAgents.data),
        backgroundColor: '#fddb88',
        borderColor: '#f4002a',
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
}
$(document).ready(init);

// //base version (richiede printChart sotto)
// function evData(data) {
//   var fatturato = data.fatturato;
//   var fatturato_by_agent = data.fatturato_by_agent;
//   console.log('fatturato ', fatturato);
//   console.log('fatturato_by_agent ', fatturato_by_agent);
//   printChartFatturato(fatturato);
//   //estrazione dati agent chiave e valori , inserimento stessi in 2 array in nuovo oggetto per stampa video chartjs
//   var fatturatoAgents =
//   {
//     'type': fatturato_by_agent.type,
//     'agent_names': [],
//     'data': []
//   };
//   for (var agentName in fatturato_by_agent.data) {
//     fatturatoAgents.agent_names.push(agentName);
//     fatturatoAgents.data.push(fatturato_by_agent.data[agentName]);
//   }
//   console.log('agents: ', fatturatoAgents);
//   printChartFatturatoAgent(fatturatoAgents);
// }

// //alt vers: aggiunge dati oggetto fatturatoAgent attuale senza crearne uno nuovo
// function evData(data) {
//   var fatturato = data.fatturato;
//   var fatturatoAgent = data.fatturato_by_agent;
//   console.log('fatturato ', fatturato);
//   console.log('fatturato_by_agent ', fatturatoAgent);
//   printChartFatturato(fatturato);
//   //ev dati Agents
//   fatturatoAgent.agent_names = [];
//   fatturatoAgent.agents_data = [];
//   for (var agentName in fatturatoAgent.data) {
//     fatturatoAgent.agent_names.push(agentName);
//     fatturatoAgent.agents_data.push(fatturatoAgent.data[agentName]);
//   }
//   console.log('agents: ', fatturatoAgent);
//   //mod in print data: fatturatoAgents.data --> fatturatoAgents.agents_data
//   printChartFatturatoAgent(fatturatoAgent);  
// }


// function printChartFatturatoAgent(fatturatoAgents) {
//   var ctx = document.getElementById('myAgentsChart').getContext('2d');
//   var myChart = new Chart(ctx, {
//     type: fatturatoAgents.type,
//     data: {
//       labels: fatturatoAgents.agent_names,
//       backgroundColor: '#000',
//       datasets: [{
//         label: 'Vendite',
//         // data: fatturatoAgents.agents_data,
//         data: fatturatoAgents.data,
//         backgroundColor: '#fddb88',
//         borderColor: '#f4002a',
//         borderWidth: 4
//       }]
//     },
//     options: {
//       scales: {
//         yAxes: [{
//           ticks: {
//             beginAtZero: true
//           }
//         }]
//       }
//     }
//   });
// }