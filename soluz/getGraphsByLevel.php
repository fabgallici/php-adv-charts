<?php

  header('Content-Type: application/json');

  include "data.php";

  $level = $_GET['level'];
  $resGraphs = [];

  foreach ($graphs as $name => $graph) {

    $gLevel = $graph['access'];

    if ($gLevel == 'guest') {

      $resGraphs[$name] = $graph;
    }
    if ($gLevel == 'clevel' && $level == 'clevel') {

      $resGraphs[$name] = $graph;
    }
    if ($gLevel == 'employee'
        && ($level == 'employee' || $level == 'clevel')) {

        $resGraphs[$name] = $graph;
    }
  }

  echo json_encode($resGraphs);
