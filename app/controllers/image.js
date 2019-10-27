// var mongoose = require('mongoose');
// var uid = require('uid');
// var fs = require('fs');

// var filePath = {
//     1: __dirname + '/../../public/assets/uploads/category/',
// };



// /**
//  * Upload file
//  */
// exports.uploadFile = function(req, res) {
//     var fileObject = req.files.file,
// 		destinationpath = filePath[1];

// 	var extArray = fileObject.originalFilename.split('.');
// 	var ext = extArray[extArray.length - 1];
// 	var fileName = uid(10) + '.' + ext;

// 	fs.readFile(fileObject.path, function(err, data) {

// 		if(err) {
// 			res.send(err);
// 			return;
// 		}

// 		var newPath = destinationpath + fileName;

// 		fs.writeFile(newPath, data, function(err) {
// 			if (err) {
// 				res.send(err);
// 				return;
// 			}
// 			res.send({
// 				original: req.files.file.name,
// 				image: fileName,
// 				status: true
// 			});
// 			return;
// 		});
// 	});


// };