<?php
include 'db.php';

function filterInput($input) {
   
    $blacklist = array("--", "#", "/*", "*/");
    $input = str_replace($blacklist, "", $input);
    return $input;
}


$product_id = isset($_GET['id']) ? filterInput($_GET['id']) : 1;


$sql = "SELECT * FROM products WHERE id = $product_id";
$result = $conn->query($sql);

if ($result && $result->num_rows > 0) {
    $row = $result->fetch_assoc();
} else {
    echo "Ürün bulunamadı. (Debug: Sorgu başarısız - Tablo yapısı: products(id,name,description,price) | kodlar(id,urun_kodu,gizli_kod))";
    exit;
}

$conn->close();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo htmlspecialchars($row['description']); ?> - Detay</title>
    <link rel="stylesheet" href="detaylar-valo.css">
</head>
<body>
    <header class="header">
        <div class="logo">ROOT EPIN</div>
        <nav class="nav">
            <ul>
                <li><a href="root.html">Anasayfa</a></li>
                <li><a href="root.html">Mağaza</a></li>
                <li><a href="root.html">Hakkında</a></li>
                <li><a href="root.html">Destek</a></li>
                <li><a href="root.html">Giriş/Kayıt Ol</a></li>
            </ul>
        </nav>
    </header>

    <div class="product">
        <img src="valo.jpg" alt="<?php echo htmlspecialchars($row['description']); ?>">
        <h3><?php echo htmlspecialchars($row['description']); ?></h3>
        <p><em>Ürün kodu bilgisi yalnızca yetkili erişimle görüntülenebilir.</em></p>
        <a href="#"><button>Satın AL</button></a>
    </div>
</body>
</html>
