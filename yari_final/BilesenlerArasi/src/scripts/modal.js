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
    modalYear.textContent = `Year: ${car.year}`;
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