exports.getAllUsers = function (req, res) {
    req.app.get('db').getUsers().then(function (resp) {
        res.send(resp)
    })
}

exports.getAllVehicles = function (req, res) {
    req.app.get('db').getVehicles().then(function (resp) {
        res.send(resp)
    })
}

exports.createNewUser = function (req, res) {
    var cUser = [
        req.body.name
        , req.body.email
    ]
    req.app.get('db').createUser(cUser).then(function (resp) {
        res.send(resp)
    })
}

exports.createNewVehicle = function (req, res) {
    var theVehicle = [
        req.body.make
        , req.body.model
        , req.body.year
        , req.body.user_id
    ]
    req.app.get('db').createVehicle(theVehicle).then(function (resp) {
        res.send(resp)
    })
}

exports.countVehicleByUser = function (req, res) { //'/api/user/:userId/vehiclecount'
    let uID = req.params.userId
    req.app.get('db').vehiclesPerUser(uID).then(function (resp) {
        resp.count = resp
        res.send(resp.count)
    })
}

exports.getVehicleByUserID = function (req, res) { //'/api/user/:userId/vehiclecount'
    let uID = req.params.userId
    req.app.get('db').vehicleByUid(uID).then(function (resp) {
        res.send(resp)
    })
}

exports.getVehicleByEmail = function (req, res) { //'/api/user/:userId/vehiclecount'
    for (let key in req.query) {
        if (key === "userEmail") {
            // console.log(`it's email!`)
            let uID = req.query.userEmail
            req.app.get('db').getVehByEmail(uID).then(function (resp) {
                resp.count = resp
                res.send(resp.count)
            })
        }
        else {
            // console.log(`it's a search!`)
            let uID = req.query.userFirstStart //localhost:3000/api/vehicle?userFirstStart=Jo
            req.app.get('db').getVehByPartName(uID).then(function (resp) {
                res.send(resp)
            })
        }
    }
}

exports.getVehicleByYear = function (req, res) {
    req.app.get('db').vehiclesByYear().then(function (resp) {
        res.send(resp)
    })
}

exports.changeOwner = function (req, res) { ///api/vehicle/:vehicleId/user/:userId
    //localhost:3000/api/vehicle/2/user/3
    let pSet = [
        req.params.userId
        , req.params.vehicleId
    ]
    req.app.get('db').updateVehicle(pSet).then(function (resp) {
        res.send(resp)
    })
}

exports.removeOwner = function (req, res) {
    let ownerInfo = [
        req.params.userId
        , req.params.vehicleId
    ]
    req.app.get('db').removeOwner(ownerInfo).then(function (resp) {
        // console.log(resp)
        res.send(resp)
    })
}

exports.deleteVehicleById = function (req, res) {
    let vehId = [
        req.params.vehicleId
    ]
    req.app.get('db').removeVehicle(vehId).then(function (resp) {
        res.send(resp)
    })
}