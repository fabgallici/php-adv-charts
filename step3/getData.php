<?php

header('Content-Type: application/json');

include 'data.php';

$access = $_GET['level'];

$return = [];
if ($graphs['fatturato']['access'] == $access) {
  $return[] = $graphs['fatturato'];
} elseif ($graphs['fatturato_by_agent']['access'] == $access) {
  $return[] = $graphs['fatturato'];
  $return[] = $graphs['fatturato_by_agent'];
} elseif ($graphs['team_efficiency']['access'] == $access) {
  $return[] = $graphs['fatturato'];
  $return[] = $graphs['fatturato_by_agent'];
  $return[] = $graphs['team_efficiency'];
}
echo json_encode($return);

?>