<?php
session_start();
$_SESSION['user'] = 'ziyaretci';

//include 'admin_3_son_guncel_prod_hazir_1453.php';
header('Server: Apache/2.4.41 (Ubuntu)');
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>İskenderoğulları Tırcılık</title>
    <script src="https://unpkg.com/lucide@latest"></script>
    <style>
        /* Base styles */
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Inter', sans-serif;
            min-height: 100vh;
            line-height: 1.5;
        }

        /* Header styles */
        .header {
            background-color: #000;
            color: white;
            padding: 1.5rem 2rem;
        }

        .header-container {
            max-width: 80rem;
            margin: 0 auto;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        .logo {
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        .logo h1 {
            font-size: 1.5rem;
            font-weight: 700;
        }

        .nav ul {
            display: flex;
            gap: 2rem;
            list-style: none;
        }

        .nav a {
            color: white;
            text-decoration: none;
            transition: color 0.2s;
        }

        .nav a:hover {
            color: #d1d5db;
        }

        /* Hero section */
        .hero {
            position: relative;
            height: 90vh;
            background-size: cover;
            background-position: center;
            background-image: url('/src/img/tir1.jpg');
        }

        .hero-overlay {
            position: absolute;
            inset: 0;
            background-color: rgba(0, 0, 0, 0.5);
        }

        .hero-content {
            position: absolute;
            inset: 0;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            color: white;
            text-align: center;
        }

        .hero-title {
            font-size: 3.75rem;
            font-weight: 700;
            margin-bottom: 1rem;
        }

        .hero-subtitle {
            font-size: 1.25rem;
            margin-bottom: 2rem;
        }

        .scroll-indicator {
            position: absolute;
            bottom: 2rem;
            animation: bounce 1s infinite;
        }

        @keyframes bounce {
            0%, 100% {
                transform: translateY(0);
            }
            50% {
                transform: translateY(-10px);
            }
        }

        /* Gallery section */
        .gallery {
            padding: 5rem 2rem;
            background-color: #f9fafb;
        }

        .gallery-container {
            max-width: 80rem;
            margin: 0 auto;
        }

        .gallery-title {
            font-size: 2.5rem;
            font-weight: 700;
            text-align: center;
            margin-bottom: 3rem;
        }

        .cars-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 2rem;
        }

        .car-card {
            background: white;
            border-radius: 0.5rem;
            overflow: hidden;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            transition: transform 0.2s;
            cursor: pointer;
        }

        .car-card:hover {
            transform: scale(1.05);
        }

        .car-image-container {
            position: relative;
            height: 16rem;
        }

        .car-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        .car-overlay {
            position: absolute;
            inset: 0;
            background: rgba(0, 0, 0, 0);
            display: flex;
            align-items: center;
            justify-content: center;
            transition: background-color 0.2s;
        }

        .car-card:hover .car-overlay {
            background: rgba(0, 0, 0, 0.3);
        }

        .info-icon {
            color: white;
            opacity: 0;
            transition: opacity 0.2s;
        }

        .car-card:hover .info-icon {
            opacity: 1;
        }

        .car-details {
            padding: 1.5rem;
        }

        .car-name {
            font-size: 1.5rem;
            font-weight: 700;
            margin-bottom: 0.5rem;
        }

        .car-year {
            color: #6b7280;
            margin-bottom: 1rem;
        }

        .car-price {
            font-size: 1.25rem;
            font-weight: 600;
        }

        /* Modal styles */
        .modal {
            display: none;
            position: fixed;
            inset: 0;
            background-color: rgba(0, 0, 0, 0.5);
            padding: 1rem;
            z-index: 50;
            align-items: center;
            justify-content: center;
        }

        .modal.active {
            display: flex;
        }

        .modal-content {
            background: white;
            border-radius: 0.5rem;
            max-width: 64rem;
            width: 100%;
            position: relative;
        }

        .modal-close {
            position: absolute;
            right: 1rem;
            top: 1rem;
            background: none;
            border: none;
            cursor: pointer;
            color: #6b7280;
            transition: color 0.2s;
        }

        .modal-close:hover {
            color: #374151;
        }

        .modal-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 2rem;
        }

        @media (min-width: 768px) {
            .modal-grid {
                grid-template-columns: repeat(2, 1fr);
            }
        }

        .modal-image {
            width: 100%;
            height: 24rem;
            object-fit: cover;
            border-radius: 0.5rem 0.5rem 0 0;
        }

        @media (min-width: 768px) {
            .modal-image {
                border-radius: 0.5rem 0 0 0.5rem;
            }
        }

        .modal-info {
            padding: 2rem;
        }

        .modal-title {
            font-size: 1.875rem;
            font-weight: 700;
            margin-bottom: 1rem;
        }

        .modal-year {
            color: #6b7280;
            margin-bottom: 0.5rem;
        }

        .modal-price {
            font-size: 1.5rem;
            font-weight: 700;
            margin-bottom: 1.5rem;
        }

        .specs-title {
            font-size: 1.25rem;
            font-weight: 600;
            margin-bottom: 1rem;
        }

        .specs-list {
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }

        .spec-item {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            color: #374151;
        }
    </style>
</head>
<body>
    <!-- Header -->
    <header class="header">
        <div class="header-container">
            <div class="logo">
                <i data-lucide="car" class="w-8 h-8"></i>
                <h1>İskenderoğulları Tırcılık</h1>
            </div>
            <nav class="nav">
                <ul>
                    <li><a href="#gallery">Galeri</a></li>
                    <?php //echo "<li><a href="/admin_3_son_guncel_prod_hazir_1453.php">admin</a></li>"; ?>
                    <li><a href="#contact">İletisim</a></li>
                </ul>
            </nav>
        </div>
    </header>

    <!-- Hero Section -->
    <div class="hero">
        <div class="hero-overlay"></div>
        <div class="hero-content">
            <h1 class="hero-title">İskenderoğulları Tırcılık</h1>
            <p class="hero-subtitle">Senin Oynadığın Filmde Senaryoyu Ben Yazarım..</p>
            <a href="#gallery" class="scroll-indicator" aria-label="Scroll to gallery">
                <i data-lucide="chevron-down" class="w-8 h-8"></i>
            </a>
        </div>
    </div>

    <!-- Gallery Section -->
    <section id="gallery" class="gallery">
        <div class="gallery-container">
            <h2 class="gallery-title">Ürünlerimiz</h2>
            <div class="cars-grid" id="carsGrid"></div>
        </div>
    </section>

    <!-- Car Modal -->
    <div id="carModal" class="modal">
        <div class="modal-content">
            <button onclick="closeModal()" class="modal-close">
                <i data-lucide="x" class="w-6 h-6"></i>
            </button>
            <div class="modal-grid">
                <img class="modal-image" src="" alt="" />
                <div class="modal-info">
                    <h2 class="modal-title"></h2>
                    <p class="modal-year"></p>
                    <p class="modal-price"></p>
                    
                    <h3 class="specs-title">Hususiyetler</h3>
                    <div class="specs-list">
                        <div class="spec-item">
                            <i data-lucide="engine" class="w-6 h-6"></i>
                            <span class="modal-engine"></span>
                        </div>
                        <div class="spec-item">
                            <i data-lucide="gauge" class="w-6 h-6"></i>
                            <span class="modal-power"></span>
                        </div>
                        <div class="spec-item">
                            <i data-lucide="timer" class="w-6 h-6"></i>
                            <span class="modal-acceleration"></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script>
        // Cars data
        const cars = [
        {
        id: '1',
        name: '2018 DELİKLİ ŞASE HATASIZ',
        brand: 'İskenderoğulları',
        year: 2024,
        price: 814000,
        image: '/bilesen.php?yol=src/img/tir1&tip=jpg',
        specs: {
            engine: 'YOOOOook',
            power: 'şasede hp mi olur yeğenim',
            acceleration: 'Tırın gittiği kadar'
        }
        },
        {
        id: '2',    
        name: "2020 MODEL KLİMALI ÇEKİCİ",
        brand: 'İskenderoğulları',
        year: 2020,
        price: 1925000,
        image: '/bilesen.php?yol=src/img/tir2&tip=jpg',
        specs: {
            engine: '5001 cm3',
            power: '501 hp',
            acceleration: 'Bilinmiyor'
        }
        },
        {
        id: '3',
        name: '2007 ÇEKİCİ 1844LS AVRUPAMEGA KABİN',
        brand: 'İskenderoğulları',
        year: 2007,
        price: 223800,
        image: '/bilesen.php?yol=src/img/tir3&tip=jpg',
        specs: {
            engine: '4.0L',
            power: '518 hp',
            acceleration: '0-60 mph in 15.0s'
        }
        },
        {
        id: '4',
        name: '2013 Model 14.4460 HATASIZ',
        brand: 'İskenderoğulları',
        year: 2024,
        price: 507300,
        image: '/bilesen.php?yol=src/img/tir4&tip=jpg',
        specs: {
            engine: '4.0L V8',
            power: '986 hp',
            acceleration: '0-60 mph in 17.5s'
        }
        },
        {
        id: '5',
        name: 'BAYAN ÖĞRETMENDEN 2018 T4608 km500 ADR RÖTAR B.DOLAP FULL',
        brand: 'İskenderoğulları',
        year: 2024,
        price: 517770,
        image: '/bilesen.php?yol=src/img/tir5&tip=jpg',
        specs: {
            engine: '6.5L V12',
            power: '759 hp',
            acceleration: '0-60 mph in 19.8s'
        }
        },
        {
        id: '6',
        name: 'Aile Aracı Pazarlık Payı Vardır',
        brand: 'İskenderoğulları',
        year: 2024,
        price: 348500,
        image: '/bilesen.php?yol=src/img/tir6&tip=jpg',
        specs: {
            engine: '6.75L V12 Twin-Turbo',
            power: '563 hp',
            acceleration: '0-60 mph in 25.5s'
        }
        },
        {
        id: '7',
        name: '43.000 km T520 TAM FULL SIFIRDAN FARKSIZ',
        brand: 'İskenderoğulları',
        year: 2024,
        price: 274900,
        image: '/bilesen.php?yol=src/img/tir7&tip=jpg',
        specs: {
            engine: '6.0L W12 Twin-Turbo',
            power: '650 hp',
            acceleration: '0-60 mph in 19.5s'
        }
        },
        {
        id: '8',
        name: '2023  ÖNLER KÖRÜK PARK KLİMA JANT 3 BAKIM HEDİYEMİZDİR',
        brand: 'İskenderoğulları',
        year: 2024,
        price: 325000,
        image: '/bilesen.php?yol=src/img/tir8&tip=jpg',
        specs: {
            engine: '4.0L V8 Biturbo',
            power: '720 hp',
            acceleration: '0-60 mph 55.1s'
        }
        },
        {
        id: '9',
        name: '2022 HATASIZ SERVİS BAKIMLI TEMİZ SIFIR AYARINDA',
        brand: 'İskenderoğulları',
        year: 2024,
        price: 316300,
        image: '/bilesen.php?yol=src/img/tir9&tip=jpg',
        specs: {
            engine: '5.2L V12 Twin-Turbo',
            power: '715 hp',
            acceleration: '0-60 mph in 24.4s'
        }
        }
    ];
        // Populate cars grid
        const carsGrid = document.getElementById('carsGrid');
        cars.forEach(car => {
            carsGrid.innerHTML += `
                <div class="car-card" onclick="openModal('${car.id}')">
                    <div class="car-image-container">
                        <img
                            src="${car.image}"
                            alt="${car.brand} ${car.name}"
                            class="car-image"
                        />
                        <div class="car-overlay">
                            <i data-lucide="info" class="info-icon w-8 h-8"></i>
                        </div>
                    </div>
                    <div class="car-details">
                        <h3 class="car-name">${car.brand} ${car.name}</h3>
                        <p class="car-year">${car.year}</p>
                        <p class="car-price">${car.price.toLocaleString()} ₺</p>
                    </div>
                </div>
            `;
        });

        // Modal functions
        function openModal(carId) {
            const car = cars.find(c => c.id === carId);
            if (!car) return;

            const modal = document.getElementById('carModal');
            const modalImage = modal.querySelector('.modal-image');
            const modalTitle = modal.querySelector('.modal-title');
            const modalYear = modal.querySelector('.modal-year');
            const modalPrice = modal.querySelector('.modal-price');
            const modalEngine = modal.querySelector('.modal-engine');
            const modalPower = modal.querySelector('.modal-power');
            const modalAcceleration = modal.querySelector('.modal-acceleration');

            modalImage.src = car.image;
            modalImage.alt = `${car.brand} ${car.name}`;
            modalTitle.textContent = `${car.brand} ${car.name}`;
            modalYear.textContent = `Yıl: ${car.year}`;
            modalPrice.textContent = `$${car.price.toLocaleString()}`;
            modalEngine.textContent = car.specs.engine;
            modalPower.textContent = car.specs.power;
            modalAcceleration.textContent = car.specs.acceleration;

            modal.classList.add('active');
        }

        function closeModal() {
            const modal = document.getElementById('carModal');
            modal.classList.remove('active');
        }

        // Initialize Lucide icons
        lucide.createIcons();
    </script>
</body>
</html>