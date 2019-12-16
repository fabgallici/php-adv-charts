
function printLineGraph(graph) {

  var ctx = $("#fatturato");
  new Chart(ctx, {

    type: "line",
    data: {

      labels: moment.months(),
      datasets: [{

        label: graph['access'],
        data: graph['data']
      }]
    }
  });
}
function printPieGraph(graph) {

  var names = Object.keys(graph['data']);
  var values = Object.values(graph['data']);

  var ctx = $('#fatturato_by_agent');
  new Chart(ctx, {

    type: 'pie',
    data: {

      labels: names,
      datasets: [{

        label: graph['access'],
        backgroundColor: getRandomColor(),
        borderColor: getRandomColor(),
        data: values
      }]
    }
  });
}
function printMultiLineGraph(graph) {

  var datasets = [];
  var names = Object.keys(graph['data']);
  var values = Object.values(graph['data']);

  var borderColor = ["red", "blue", "green", "yellow", "purple", "orange", "brown", "grey"];

  for (i=0;i<names.length;i++) {

    datasets.push({
      label: names[i],
      borderColor: borderColor[i],
      data: values[i]
    });
  }

  var ctx = $('#team_efficiency');
  new Chart(ctx, {

    type: 'line',
    data: {

      labels: moment.months(),
      datasets: datasets
    }
  });
}

function printGraphs(graphs) {

  if (graphs['fatturato']) {

    printLineGraph(graphs['fatturato']);
  }
  if (graphs['fatturato_by_agent']) {

    printPieGraph(graphs['fatturato_by_agent']);
  }
  if (graphs['team_efficiency']) {

    printMultiLineGraph(graphs['team_efficiency']);
  }
}

function getLevelParameter() {

  var urlParams = new URLSearchParams(window.location.search);
  var levelParam = urlParams.get('level');

  return levelParam;
}

function getData() {

  var level = getLevelParameter();
  $.ajax({

    url: "getGraphsByLevel.php",
    method: "GET",
    data: {
      level: level
    },
    success: function(data) {

      console.log("data", data);
      printGraphs(data);
    },
    error: function(err) {

      console.log("err", err);
    }
  });
}

function init() {

  getData();
  var cssFun = getRandomColor();

  console.log("cssfun", cssFun());
  console.log("cssfun", cssFun());
  console.log("cssfun", cssFun());
  console.log("cssfun", cssFun());
}

$(document).ready(init);


/////////////////////////////


function getRandomColor() {
   const randomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
   const randomByte = () => randomNumber(0, 255);
   const randomPercent = () => (randomNumber(50, 100) * 0.01).toFixed(2);

   const randomCssRgba = function() {

     return `rgba(${[randomByte(), randomByte(), randomByte(), randomPercent()].join(',')})`;
   }

   return randomCssRgba;
}
