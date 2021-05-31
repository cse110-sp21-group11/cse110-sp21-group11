require("dotenv").config();
const mongoose = require("mongoose");
const schema = require(__dirname + "/../schema.js");

mongoose.connect(process.env.DB, {useUnifiedTopology: true, useNewUrlParser: true});
mongoose.set("useCreateIndex", true);

function readUserPouch (db, callback) {
	db.get("0000", (err, doc) => {
		if (err) {
			callback(err);
		} else {
			callback(doc);
		}
	});
}

function readUser (userData, callback) {
	schema.User.findOne({email: userData.email}, (error, user) => {
		if (error) {
			callback(error);
		} else {
			let newCollections = [];
			for(let i = 0; i < user.collections.length; i++){
				let collection = user.collection[i];
				collection.title = security.decrypt(collection.title, userData.pwd);
				newCollections.push(collection);
			}
			let newTextBlocks = [];
			for(let i = 0; i < user.textBlocks.length; i++){
				let block = user.textBlocks[i];
				block.text = security.decrypt(block.text, userData.pwd);
				newTextBlocks.push(block);
			}
			let newTasks = [];
			for(let i = 0; i < user.tasks.length; i++){
				let block = user.tasks[i];
				block.text = security.decrypt(block.text, userData.pwd);
				newTasks.push(block);
			}
			let newEvents = [];
			for(let i = 0; i < user.events.length; i++){
				let block = user.events[i];
				block.title = security.decrypt(block.title, userData.pwd);
				newEvents.push(block);
			}
			let newSignifiers = [];
			for(let i = 0; i < user.signifiers.length; i++){
				let signifier = user.signifiers[i];
				signifier.meaning = security.decrypt(signifier.meaning, userData.pwd);
				newSignifiers.push(signifier);
			}
			let newImageBlocks = [];
			for(let i = 0; i < user.imageBlocks.length; i++){
				let imageBlock = user.imageBlocks[i];
				imageBlock.data = security.decrypt(imageBlock.data, userData.pwd);
				newImageBlocks.push(imageBlock);
			}
			let newAudioBlocks = [];
			for(let i = 0; i < user.audioBlocks.length; i++){
				let audioBlock = user.audioBlocks[i];
				audioBlock.data = security.decrypt(audioBlock.data, userData.pwd);
				newAudioBlocks.push(audioBlock);
			}
			let newTrackers = [];
			for(let i = 0; i < user.Trackers.length; i++){
				let tracker = user.trackers[i];
				tracker.title = security.decrypt(tracker.title, userData.pwd);
				newTrackers.push(tracker);
			}
			let decodedUser = {
				email: user.email,
				pwd: userData.pwd,
				index: user.index,
				theme: user.theme,
				dailyLogs: user.dailyLogs,
				monthlyLogs: user.monthlyLogs,
				futureLogs: user.futureLogs,
				trackers: newTrackers,
				collections: newCollections,
				imageBlocks: newImageBlocks,
				audioBlocks: newAudioBlocks,
				textBlocks: newTextBlocks,
				events: newEvents,
				tasks: newTasks,
				signifiers: newSignifiers
			}
			callback(decodedUser);
		}
	});
}

module.exports = {
	readUser: readUser,
	readUserPouch: readUserPouch
}
