// Function to add a new driver
async function addDriver() {
    // Retrieve values from input fields
    const driverName = document.getElementById('driverName').value;
    const driverFamilyName = document.getElementById('driverFamilyName').value;
    const driverLicense = document.getElementById('driverLicense').value;
    const driverStatus = document.getElementById('driverStatus').value;

    // Log driver details to the console for debugging
    console.log('Driver Name:', driverName);
    console.log('Driver Family Name:', driverFamilyName);
    console.log('Driver License:', driverLicense);
    console.log('Driver Status:', driverStatus);

    // Send a POST request to the server to add a new driver
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

    // If the response is OK, reload the list of drivers from the database
    if (response.ok) {
        loadDrivers();
    }

    // Get the values from the input fields
    const name = document.getElementById('driverName').value;
    const license = document.getElementById('driverLicense').value;
    const status = document.getElementById('driverStatus').value;
    
    // Get the table body element where drivers are listed
    const tbody = document.getElementById('driversTable');
    // Create a new row for the new driver
    const row = document.createElement('tr');
    
    // Set the inner HTML of the new row with driver details and a delete button
    row.innerHTML = `
        <td>${name}</td>
        <td>${license}</td>
        <td>${experience}</td>
        <td>${status}</td>
        <td><button onclick="this.closest('tr').remove()">Delete</button></td>
    `;

    // Append the new row to the table body
    tbody.appendChild(row);
    
    // Clear inputs
    document.getElementById('driverName').value = '';
    document.getElementById('driverLicense').value = '';
    document.getElementById('driverStatus').value = '';
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

    const model = document.getElementById('truckModel').value;
    const capacity = document.getElementById('truckCapacity').value;
    const status = document.getElementById('truckStatus').value;
    
    const tbody = document.getElementById('trucksTable');
    const row = document.createElement('tr');
    
    row.innerHTML = `
        <td>${model}</td>
        <td>${capacity}</td>
        <td>${status}</td>
        <td><button onclick="this.closest('tr').remove()">Delete</button></td>
    `;
    
    tbody.appendChild(row);
    
    // Clear inputs
    document.getElementById('truckModel').value = '';
    document.getElementById('truckCapacity').value = '';
    document.getElementById('truckStatus').value = '';
}

// Function to load drivers from the server
async function loadDrivers() {
    try {
        const response = await fetch('/getDrivers');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const drivers = await response.json();
        const tbody = document.getElementById('driversTable');
        tbody.innerHTML = ''; // Clear existing rows

        drivers.forEach(driver => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${driver.name}</td>
                <td>${driver.familyName}</td>
                <td>${driver.driverLicense}</td>
                <td>${driver.status}</td>
                <td><button onclick="this.closest('tr').remove()">Delete</button></td>
            `;
            tbody.appendChild(row);
        });
    } catch (error) {
        console.error('Failed to load drivers:', error);
    }
}

// Function to load trucks from the server
async function loadTrucks() {
    try {
        const response = await fetch('/getTrucks');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const trucks = await response.json();
        const tbody = document.getElementById('trucksTable');
        tbody.innerHTML = ''; // Clear existing rows

        trucks.forEach(truck => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${truck.licensePlate}</td>
                <td>${truck.type}</td>
                <td>${truck.cargoBeanHeight}</td>
                <td>${truck.cargoBeanWidth}</td>
                <td>${truck.tacoBellLength}</td>
                <td><button onclick="this.closest('tr').remove()">Delete</button></td>
            `;
            tbody.appendChild(row);
        });
    } catch (error) {
        console.error('Failed to load trucks:', error);
    }
}

// Load drivers and trucks when the page loads
window.onload = () => {
    loadDrivers();
    loadTrucks();
};

// Function to delete a driver
async function deleteDriver(driverId) {
    try {
        const response = await fetch(`/deleteDriver/${driverId}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        console.log('Driver deleted successfully');
    } catch (error) {
        console.error('Failed to delete driver:', error);
    }
}