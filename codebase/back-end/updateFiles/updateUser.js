require("dotenv").config();
const mongoose = require("mongoose");
const security = require(__dirname + "/../security/securityFunctions.js");
const schema = require(__dirname + "/../schema.js");

mongoose.connect(process.env.DB, {useUnifiedTopology: true, useNewUrlParser: true});
mongoose.set("useCreateIndex", true);

function updateUser(userObject, callback){
	console.log(userObject);
	schema.User.findOne({email: userObject.email}, (error, user) => {
		if (error) {
			callback(error);
		} else {
			let newCollections = [];
			for(let i = 0; i < userObject.collections.length; i++){
				let collection = userObject.collection[i];
				collection.title = security.encrypt(collection.title, userObject.pwd);
				newCollections.push(collection);
			}
			let newTextBlocks = [];
			for(let i = 0; i < userObject.textBlocks.length; i++){
				let block = userObject.textBlocks[i];
				block.text = security.encrypt(block.text, userObject.pwd);
				newTextBlocks.push(block);
			}
			let newTasks = [];
			for(let i = 0; i < userObject.tasks.length; i++){
				let block = userObject.tasks[i];
				block.text = security.encrypt(block.text, userObject.pwd);
				newTasks.push(block);
			}
			let newEvents = [];
			for(let i = 0; i < userObject.events.length; i++){
				let block = userObject.events[i];
				block.text = security.encrypt(block.text, userObject.pwd);
				newEvents.push(block);
			}
			let newSignifiers = [];
			for(let i = 0; i < userObject.signifiers.length; i++){
				let signifier = userObject.signifiers[i];
				signifier.text = security.encrypt(signifier.meaning, userObject.pwd);
				newSignifiers.push(signifier);
			}
			let newImageBlocks = [];
			for(let i = 0; i < userObject.imageBlocks.length; i++){
				let imageBlock = userObject.imageBlocks[i];
				imageBlock.data = security.encrypt(imageBlock.data, userObject.pwd);
				newImageBlocks.push(imageBlock);
			}
			let newAudioBlocks = [];
			for(let i = 0; i < userObject.audioBlocks.length; i++){
				let audioBlock = userObject.audioBlocks[i];
				audioBlock.data = security.encrypt(audioBlock.data, userObject.pwd);
				newAudioBlocks.push(audioBlock);
			}
			let newTrackers = [];
			for(let i = 0; i < userObject.trackers.length; i++){
				let tracker = userObject.trackers[i];
				tracker.title = security.encrypt(tracker.title, userObject.pwd);
				newTrackers.push(tracker);
			}
			user.email = userObject.email;
			user.dailyLogs =  userObject.dailyLogs;
			user.monthlyLogs = userObject.monthlyLogs;
			user.futureLogs = userObject.futureLogs;
			user.collections = newCollections;
			user.trackers = newTrackers;
			user.imageBlocks = newImageBlocks;
			user.audioBlocks = newAudioBlocks;
			user.textBlocks = newTextBlocks;
			user.tasks = newTasks;
			user.events = newEvents;
			user.signifiers = newSignifiers;

			user.save((err, userObject) => {
				if (err) {
					callback(err);
				} else {
					callback(userObject);
				}
			});
		}
	});
}

module.exports = {
	updateUser: updateUser
};
