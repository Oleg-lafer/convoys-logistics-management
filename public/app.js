async function addDriver() {
    const driverName = document.getElementById('driverName').value;
    const driverFamilyName = document.getElementById('driverFamilyName').value;
    const driverLicense = document.getElementById('driverLicense').value;
    const driverStatus = document.getElementById('driverStatus').value;

    console.log('Driver Name:', driverName);
    console.log('Driver Family Name:', driverFamilyName);
    console.log('Driver License:', driverLicense);
    console.log('Driver Status:', driverStatus);

    const response = await fetch('/addDriver', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: driverName,
            familyName: driverFamilyName,
            driverLicense: driverLicense,
            status: driverStatus
        })
    });

    if (response.ok) {
        loadDrivers();
    }
}

async function addTruck() {
    const truckLicensePlate = document.getElementById('truckLicensePlate').value;
    const truckType = document.getElementById('truckType').value;
    const cargoBeanHeight = document.getElementById('cargoBeanHeight').value;
    const cargoBeanWidth = document.getElementById('cargoBeanWidth').value;
    const tacoBellLength = document.getElementById('tacoBellLength').value;

    console.log('Truck License Plate:', truckLicensePlate);
    console.log('Truck Type:', truckType);
    console.log('Cargo Bean Height:', cargoBeanHeight);
    console.log('Cargo Bean Width:', cargoBeanWidth);
    console.log('Taco Bell Length:', tacoBellLength);

    const response = await fetch('/addTruck', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            licensePlate: truckLicensePlate,
            type: truckType,
            cargoBeanHeight: cargoBeanHeight,
            cargoBeanWidth: cargoBeanWidth,
            tacoBellLength: tacoBellLength
        })
    });

    if (response.ok) {
        loadTrucks();
    }
}

async function loadDrivers() {
    const response = await fetch('/drivers');
    const drivers = await response.json();
    const driversList = document.getElementById('driversList');
    driversList.innerHTML = '';
    drivers.forEach(driver => {
        const li = document.createElement('li');
        li.textContent = `${driver.name} ${driver.familyName} - ${driver.driverLicense} - ${driver.status}`;
        driversList.appendChild(li);
    });
}

async function loadTrucks() {
    const response = await fetch('/trucks');
    const trucks = await response.json();
    const trucksList = document.getElementById('trucksList');
    trucksList.innerHTML = '';
    trucks.forEach(truck => {
        const li = document.createElement('li');
        li.textContent = `${truck.licensePlate} - ${truck.type} - ${truck.cargoBeanHeight} - ${truck.cargoBeanWidth} - ${truck.tacoBellLength}`;
        trucksList.appendChild(li);
    });
}

// Load drivers and trucks when the page loads
window.onload = () => {
    loadDrivers();
    loadTrucks();
};