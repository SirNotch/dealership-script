// Get the vehicle list and preview elements
const vehicleList = document.querySelector('.vehicle-list');
const previewImage = document.querySelector('#preview-image');
const testDriveBtn = document.querySelector('#test-drive-btn');

// Set up an array of vehicles with their image paths
const vehicles = [
    { name: 'Adder', image: 'img/adder.png' },
    { name: 'Bullet', image: 'img/bullet.png' },
    { name: 'Cheetah', image: 'img/cheetah.png' },
    { name: 'Entity XF', image: 'img/entityxf.png' },
    { name: 'Turismo R', image: 'img/turismor.png' },
];

// Add a click event listener to each vehicle in the list
vehicles.forEach((vehicle) => {
    const vehicleEl = document.querySelector(`[data-vehicle="${vehicle.name.toLowerCase()}"]`);
    vehicleEl.addEventListener('click', () => {
        // Set the preview image to the selected vehicle
        if (vehicle.image) {
            previewImage.src = vehicle.image;
            // Enable the test drive button
            testDriveBtn.disabled = false;
        }
    });
});

// Add a click event listener to the test drive button
testDriveBtn.addEventListener('click', () => {
    // Start the test drive
    const selectedVehicle = previewImage.src.split('/').pop().split('.')[0];
    console.log(`Starting test drive for ${selectedVehicle}`);
});
