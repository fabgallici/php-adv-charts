<?php
header('Content-Type: application/json');

include 'data.php';
$fatturatoAgents = $graphs['fatturato_by_agent'];

foreach ($fatturatoAgents['data'] as $agentName => $agentValue) {
  $fatturatoAgents['agents_data'][] = $agentValue;
  $fatturatoAgents['agent_names'][] = $agentName;
}

echo json_encode($fatturatoAgents);

