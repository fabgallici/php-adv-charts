<?php
header('Content-Type: application/json');

include 'data.php';
$fatturato = $graphs['fatturato'];

echo json_encode($fatturato);

