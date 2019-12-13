function getChartData(accLevel) {
  $.ajax({
    url: "getData.php",
    method: "GET",
    data: {
      level: accLevel
    },
    success: function (data) {
      console.log("data", data);
      if (data.fatturato) {
        printChartFatturato(data.fatturato);
      }  
      if (data.fatturato_by_agent) {
        printChartFatturatoAgent(data.fatturato_by_agent);
      }
      if (data.team_efficiency) {
        printChartTeams(data.team_efficiency);
      }    
    },
    error: function (error) {
      console.log("error", error);
    }
  });
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
        backgroundColor: '#3c7e4d',
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
//versione semplice obj keys values
function printChartFatturatoAgent(fatturatoAgents) {
  var ctx = document.getElementById('myAgentsChart').getContext('2d');
  var myChart = new Chart(ctx, {
    type: fatturatoAgents.type,
    data: {
      labels: Object.keys(fatturatoAgents.data),
      datasets: [{
        label: 'Fatturato Agents',
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

function printChartTeams(team) {
  console.log(Object.values(team.data));
  console.log(Object.keys(team.data));

  var datasetsArr = [];
  var borderColors = ['#f4002a', '#d9d900', '#2908f2', '#8e183a'];
  var indexCol = 0;
  for (var teamName in team.data) {   
    var newDataset = {
      label: teamName,
      data: team.data[teamName],
      borderColor: borderColors[indexCol],
      borderWidth: 4
    }
    indexCol++;
    datasetsArr.push(newDataset);
    // if (object.hasOwnProperty(key)) {
    //   const element = object[key];
      
    // }
  }
  console.log('datasetsArr ', datasetsArr);
  var ctx = document.getElementById('myTeamsChart').getContext('2d');
  var myChart = new Chart(ctx, {
    type: team.type,
    data: {
      labels: moment.months(),
      datasets: datasetsArr
      // [{
      //   label: 'Fatturato Agents',
      //   // data: Object.values(team.data),
      //   data: [1, 0.8, 0.7, 0.5, 0.7, 0.8, 0.9, 0.5, 0.6, 1, 0.3, 0.9],

      //   borderColor: '#f4002a',
      //   borderWidth: 4
      // }, 
      // {
      //     label: 'Fatturato Agents',
      //     // data: Object.values(team.data),
      //   data: [0.3, 0.6, 0.8, 0.3, 0.6, 0.5, 0.8, 0.7, 0.3, 0.5, 0.6, 1],

      //     borderColor: '#f4002a',
      //     borderWidth: 4
      //   }]
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
function getUrlLevel() {
  var url = window.location.search;
  var arrUrl = url.split('=');
  console.log (arrUrl);
  return arrUrl[1];
}
function init() {
  var accLevel = getUrlLevel();
  getChartData(accLevel);
  console.log(window.location.search);
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