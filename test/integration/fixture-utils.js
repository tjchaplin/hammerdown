var fs = require('fs');
var path = require('path');

module.exports.createTestDirectory = function(){
	var resultDirectory = __dirname+"/markdown-testsuite-actual";
	var resultDirectoryExists = fs.existsSync(resultDirectory);
	if(resultDirectoryExists)
		removeDirectory(resultDirectory);

	fs.mkdirSync(resultDirectory);
	return resultDirectory;
};

var removeDirectory = module.exports.removeDirectory = function (directoryName){
	var directoryItems = fs.readdirSync(directoryName);
	for (var i = 0; i < directoryItems.length; i++) {
		var filename = path.join(directoryName,directoryItems[i]);
		var fileStat = fs.statSync(filename);
		if(filename === '.' || filename === '..')
			continue;
		else if(fileStat.isDirectory())
			removeDirectory(filename);
		else
			fs.unlinkSync(filename);
	}
	fs.rmdirSync(directoryName);
	
};

module.exports.assertActualEqualsExpected = function(fixtureName){
	var actualFile =  __dirname+"/markdown-testsuite-actual/"+fixtureName+".md";
	var expectedFile =  __dirname+"/markdown-testsuite/tests/"+fixtureName+".md";

	var actualData = fs.readFileSync(actualFile, 'utf8').replace(/\r\n/g,'\n');
	var expectedData = fs.readFileSync(expectedFile, 'utf8').replace(/\r\n/g,'\n');
	actualData.should.be.eql(expectedData);
};