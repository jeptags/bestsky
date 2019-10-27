'use strict';

var express = require('express');
var router = express.Router();
// var cors = require('cors');
// var connectMultiparty = require('connect-multiparty');
// var multipartMiddleware = connectMultiparty();


var ctrl = {
    home: require('../controllers/home'),
    // userCtrl: require('../controllers/user'),
    // image: require('../controllers/image'),
    // icdb: require('../icdb'),
};




// define the home page route
router.get('/', ctrl.home.index);

// //User Controller
// router.get('/api/user/me',cors(),ctrl.userCtrl.getLoggedUser);
// router.post('/api/user/login', ctrl.userCtrl.login);
// router.post('/api/user/logout', ctrl.userCtrl.logout);
// router.post('/api/user/register', ctrl.userCtrl.register);


// // Common routes
// router.post('/api/common/add-data', ctrl.icdb.postAddData);
// router.post('/api/common/get-data', ctrl.icdb.getData);
// router.post('/api/common/get-condition', ctrl.icdb.getCondition);
// router.post('/api/common/single-data', ctrl.icdb.getSingle);
// router.post('/api/common/edit-data', ctrl.icdb.getEditData);
// router.post('/api/common/delete', ctrl.icdb.getDeleteData);
// router.post('/api/common/delete-condition', ctrl.icdb.getDeleteDataCondition);
// router.post('/api/common/file/upload', multipartMiddleware, ctrl.image.uploadFile);


module.exports = router;
