const express = require('express')
    , bodyParser = require('body-parser')
    , cors = require('cors')
    , massive = require('massive')
    , config = require('./.config');

const mainCtrl = require('./mainCtrl');

const app = express();

app.use(bodyParser.json())
app.use(cors());

// You need to complete the information below to connect
// to the assessbox database on your postgres server.
massive({
  host: 'localhost',
  port: 5432,
  database: 'assessbox',
  user: config.user,
  password: config.password
}).then( db => {
  app.set('db', db)
  console.log(`connected to db`);

  // Initialize user table and vehicle table.
  db.init_tables.user_create_seed().then( response => {
    console.log('User table init');
    db.init_tables.vehicle_create_seed().then( response => {
      console.log('Vehicle table init');
    })
  })

})


// ===== Build enpoints below ============


app.get('/api/users', mainCtrl.getAllUsers)
app.get('/api/vehicles', mainCtrl.getAllVehicles)
app.post('/api/users', mainCtrl.createNewUser)
app.post('/api/vehicles', mainCtrl.createNewVehicle)
app.get('/api/user/:userId/vehiclecount', mainCtrl.countVehicleByUser)
app.get('/api/user/:userId/vehicle', mainCtrl.getVehicleByUserID)
app.get('/api/vehicle', mainCtrl.getVehicleByEmail)
app.get('/api/newervehiclesbyyear', mainCtrl.getVehicleByYear)
app.put('/api/vehicle/:vehicleId/user/:userId', mainCtrl.changeOwner)
app.delete('/api/user/:userId/vehicle/:vehicleId', mainCtrl.removeOwner)
app.delete('/api/vehicle/:vehicleId', mainCtrl.deleteVehicleById)







// ===== Do not change port ===============
const port = 3000;
app.listen(port, () => {
  console.log('Listening on port: ', port);
})
