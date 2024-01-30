import mssql from 'mssql';

const config = {
  user: 'sa',
  password: 'Foundry123!',
  server: 'localhost',
  options: {
    trustServerCertificate: true,
  },
  requestTimeout: 60000,
};

const filePath = './data/world.gabriel.2024-01-29.1706551655773.bak';

(async function recoverDataFromBackup() {
  try {
    const pool = new mssql.ConnectionPool(config);
    await pool.connect();
    
    const request = new mssql.Request(pool);

    // Switch to the 'master' database
    await request.query(`USE master`);

    // Set the 'Foundry' database to single-user mode to disconnect any other users
    await request.query(`IF EXISTS (SELECT name FROM sys.databases WHERE name = 'Foundry') ALTER DATABASE Foundry SET SINGLE_USER WITH ROLLBACK IMMEDIATE`);

    // Drop the 'Foundry' database
    await request.query(`IF EXISTS (SELECT name FROM sys.databases WHERE name = 'Foundry') DROP DATABASE Foundry`);

    // Create the 'Foundry' database
    await request.query(`CREATE DATABASE Foundry`);

    // Restore the data from the .bak file
    await request.query(`RESTORE DATABASE Foundry FROM DISK = '${filePath}' WITH REPLACE`);

    console.log('Data recovery successful');
  } catch (error) {
    console.error('Data recovery failed:', error);
  }
})()