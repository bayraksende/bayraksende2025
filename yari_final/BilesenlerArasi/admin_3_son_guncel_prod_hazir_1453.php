<?php
// Oturumu başlat
if ((!isset($_SESSION['user']) || $_SESSION['user'] !== 'admin') && isset($_GET)) {
    header('Location: /');
}

echo "Yönetici paneline hoş geldiniz!";
header('Server: Apache/2.4.41 (Ubuntu)');

define("FLAG", getenv("FLAG"));
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Yönetici Paneli</title>
</head>
<body>
    <h1>Yönetici Paneli</h1>
    <p>Bu Sayfa Geliştirme Aşamasındadır.</p>
    <p><?php echo FLAG ?></p>
    <script>alert("Bu Sayfa Geliştirme Aşamasındadır")</script>
</body>
</html>

<?php exit(); ?>