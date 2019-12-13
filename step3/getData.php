<?php
//http://localhost/getData.php?level=clevel
header('Content-Type: application/json');



include 'data.php';

$access = $_GET['level'];

$return = [];
if ($graphs['fatturato']['access'] == $access) {
  $return['fatturato'] = $graphs['fatturato'];
} elseif ($graphs['fatturato_by_agent']['access'] == $access) {
  $return['fatturato'] = $graphs['fatturato'];
  $return['fatturato_by_agent'] = $graphs['fatturato_by_agent'];
} elseif ($graphs['team_efficiency']['access'] == $access) {
  $return = $graphs;
}
echo json_encode($return);

?>