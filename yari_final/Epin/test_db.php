<?php

include 'db.php';


if ($conn) {
    echo "Veritabanı bağlantısı başarılı!";
} else {
    echo "Veritabanı bağlantısı başarısız: " . $conn->connect_error;
}
?>
