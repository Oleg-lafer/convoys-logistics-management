DROP TABLE IF EXISTS drivers;
CREATE TABLE drivers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    familyName TEXT NOT NULL,
    driverLicense TEXT NOT NULL,
    status TEXT NOT NULL
);

DROP TABLE IF EXISTS trucks;
CREATE TABLE trucks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    licensePlate TEXT NOT NULL,
    type TEXT NOT NULL,
    cargoBeanHeight REAL NOT NULL,
    cargoBeanWidth REAL NOT NULL,
    tacoBellLength REAL NOT NULL
);