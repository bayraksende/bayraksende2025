<?php

$bilesen = $_GET['yol'] ?? '';
$tip = $_GET['tip'] ?? '';
header('Server: Apache/2.4.41 (Ubuntu)');
$bilesenYolu = '/var/www/html/' . $bilesen . '.' . $tip;

if ($bilesen !== '' && file_exists($bilesenYolu)) {
    header('Content-Type: text/plain');
    echo file_get_contents($bilesenYolu);
} else {
    echo "Dosya bulunamadı.";
}

?>
