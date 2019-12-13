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
        evChartFatturato(data.fatturato);
      }  
      if (data.fatturato_by_agent) {
        evChartAgent(data.fatturato_by_agent);
      }
      if (data.team_efficiency) {
        evChartTeam(data.team_efficiency);
      }    
    },
    error: function (error) {
      console.log("error", error);
    }
  });
}

function Dataset(label = '', data, backgroundColor = '', borderColor = '#8e183a', borderWidth = 1) {
  this.label = label; //string
  this.data = data; //expect type array
  this.backgroundColor = backgroundColor; // '#3c7e4d'
  this.borderColor = borderColor;
  this.borderWidth = borderWidth; //number >1
}

function evChartFatturato(data) {
  var dataset = new Dataset('Vendite', data.data, '#3c7e4d', '#f4002a', 4);
  printChart('chartFatturato', data.type, moment.months(), [dataset]);
}
function evChartAgent(data) {
  var dataset = new Dataset('Vendite', Object.values(data.data), '#fddb88', '#f4002a', 4);
  printChart('chartAgent', data.type, Object.keys(data.data), [dataset]);
}
function evChartTeam(data) { 
  var datasets = []; //creare array datasets contenente 1 dataset per ogni Team
  var borderColors = ['#f4002a', '#d9d900', '#2908f2', '#8e183a'];
  var indexCol = 0;
  for (var teamName in data.data) {
    var dataset = new Dataset(teamName, data.data[teamName],'',  borderColors[indexCol], 4);
    datasets.push(dataset);
    indexCol++;
  }  
  console.log('datasets ', datasets);
  printChart('chartTeam', data.type, moment.months(), datasets);
}

function printChart(id, type, labels, datasets) {
  var ctx = document.getElementById(id).getContext('2d');
  var myChart = new Chart(ctx, {
    type: type, // string 'line' 'pie'
    data: {
      labels: labels,  //expect type array
      datasets: datasets  //expect type [object-s] -  array of obj-s
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

//--------- OLD VERSION --------------

// function printChartFatturato(fatturato) {
//   var ctx = document.getElementById('myChart').getContext('2d');
//   var myChart = new Chart(ctx, {
//     type: fatturato.type,
//     data: {
//       labels: moment.months(),
//       datasets: [{
//         label: 'Vendite',
//         data: fatturato.data,
//         backgroundColor: '#3c7e4d',
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
// //versione semplice obj keys values
// function printChartFatturatoAgent(fatturatoAgents) {
//   var ctx = document.getElementById('myAgentsChart').getContext('2d');
//   var myChart = new Chart(ctx, {
//     type: fatturatoAgents.type,
//     data: {
//       labels: Object.keys(fatturatoAgents.data),
//       datasets: [{
//         label: 'Fatturato Agents',
//         data: Object.values(fatturatoAgents.data),
//         backgroundColor: '#fddb88',
//         borderColor: '#f4002a',
//         borderWidth: 4
//       }]
//     }
//   });
// }

// function printChartTeams(team) {
//   console.log(Object.values(team.data));
//   console.log(Object.keys(team.data));

//   var datasetsArrObj = [];
//   var borderColors = ['#f4002a', '#d9d900', '#2908f2', '#8e183a'];
//   var indexCol = 0;
//   for (var teamName in team.data) {
//     var newDataset = {
//       label: teamName,
//       data: team.data[teamName],
//       borderColor: borderColors[indexCol],
//       borderWidth: 4
//     }
//     indexCol++;
//     datasetsArrObj.push(newDataset);
//   }
//   console.log('datasetsArrObj ', datasetsArrObj);
//   var ctx = document.getElementById('myTeamsChart').getContext('2d');
//   var myChart = new Chart(ctx, {
//     type: team.type,
//     data: {
//       labels: moment.months(),
//       datasets: datasetsArrObj
//     }
//   });
// }