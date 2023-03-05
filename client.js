const vehicleList = document.querySelectorAll('.vehicle-list li');
const previewImage = document.getElementById('preview-image');
const testDriveButton = document.getElementById('test-drive-btn');

// Define the list of vehicles
const vehicles = [
  { name: 'Adder', model: 'adder' },
  { name: 'Bullet', model: 'bullet' },
  { name: 'Cheetah', model: 'cheetah' },
  { name: 'Entity XF', model: 'entityxf' },
  { name: 'Turismo R', model: 'turismor' },
];

// Add a click event listener to each vehicle list item
vehicleList.forEach((vehicle) => {
  vehicle.addEventListener('click', (event) => {
    // Update the preview image
    const modelName = event.target.parentNode.getAttribute('data-vehicle');
    previewImage.src = `img/${modelName}.png`;

    // Enable the test drive button
    testDriveButton.removeAttribute('disabled');
  });
});

// Add a click event listener to the test drive button
testDriveButton.addEventListener('click', () => {
  // Get the selected vehicle model name
  const modelName = document.querySelector('.vehicle-list li.active').getAttribute('data-vehicle');

  // Trigger the server-side function to spawn the vehicle
  emit('testDrive:spawnVehicle', modelName);

  // Disable the test drive button
  testDriveButton.setAttribute('disabled', true);
});

// Add a class 'active' to the clicked vehicle list item
vehicleList.forEach((vehicle) => {
  vehicle.addEventListener('click', (event) => {
    vehicleList.forEach((vehicle) => {
      vehicle.classList.remove('active');
    });
    event.target.parentNode.classList.add('active');
  });
});
