import {createUserPouch} from "./createFiles/createUser.js";
import {readUserPouch} from "./readFiles/readUser.js";
import {createCollectionPouch} from "./createFiles/createCollection.js";
import {createDailyLogPouch} from "./createFiles/createDailyLog.js";
import {createEventBlockPouch} from "./createFiles/createEventBlock.js";
import {createFutureLogPouch} from "./createFiles/createFutureLog.js";
import {createMonthlyLogPouch} from "./createFiles/createMonthlyLog.js"
import {createSignifierPouch} from "./createFiles/createSignifier.js";
import {createTextBlockPouch} from "./createFiles/createTextBlock.js";
import {createTrackerPouch} from "./createFiles/createTracker.js";
//---------------importing from delete-------------------------------------------
import {deleteCollectionPouch} from "./deleteFiles/deleteCollection.js";
import {deleteEventBlockPouch} from "./deleteFiles/deleteEventBlock.js";
import {deleteSignifierPouch} from "./deleteFiles/deleteSignifier.js";
import {deleteTaskBlockPouch} from "./deleteFiles/deleteTaskBlock.js";
import {deleteTextBlockPouch} from "./deleteFiles/deleteTextBlock.js";
import {deleteTrackerPouch} from "./deleteFiles/deleteTracker.js";
import {deleteUserPouch} from "./deleteFiles/deleteUser.js";
//---------------importing from update-------------------------------------------
import {updateUserPouch, updateUserFromMongo} from "./updateFiles/updateUser.js";
import {updateDailyLogPouch} from "./updateFiles/updateDailyLog.js";
import {updateMonthlyLogPouch} from "./updateFiles/updateMonthlyLog.js";
import {updateFutureLogPouch} from "./updateFiles/updateFutureLog.js";
import {updateCollectionPouch} from "./updateFiles/updateCollection.js";
import {updateTrackerPouch} from "./updateFiles/updateTracker.js";
import {updateTextBlockPouch} from "./updateFiles/updateTextBlock.js";
import {updateTaskBlockPouch} from "./updateFiles/updateTaskBlock.js";
import {updateEventBlockPouch} from "./updateFiles/updateEventBlock.js";
import {updateSignifierPouch} from "./updateFiles/updateSignifier.js";


export let db = new PouchDB("Users");

export function deleteDB(){
    db.destroy( (err, res) => {
		if (err) {
			console.log(err);
		} else {
			console.log(res);
		}
	});

    db.info( (err, res) => {
		if (err) {
			console.log(err);
		} else {
			console.log(res);
		}
	});
}

export function loginUser(email, pwd, callback){
	fetch(`http://localhost:3000/readUser`, {
		headers:{
			"content-type": "application/json; charset=UTF-8"
		},
		body:JSON.stringify({
			email: email,
			pwd: pwd
		}),
		method: "POST"
	}).then((data) => {return data.json()}).then((res) => {
		callback(res);
	});
}


//----------------creation functions-----------------------------
export function createUser(email, pwd, callback){
    fetch(`http://localhost:3000/createUser`, {
		headers:{
			"content-type": "application/json; charset=UTF-8"
		},
		body: JSON.stringify({
			email: email,
			pwd: pwd
		}),
		method: "POST"
	}).then((data) => {
        return data.json();
    }).then((userData) => {
		userData.pwd = pwd;
        createUserPouch(db, userData, (user) => {
			callback(user);
		});
    });
}

export function createCollection(title, parent, content, callback){
	createCollectionPouch(db, title, parent, content, callback);
}

export function createDailyLog(parent, content, trackers, date, callback){
    createDailyLogPouch(db, parent, content, trackers, date, (err, day) => {
		callback(err, day);
	});
}

export function createEventBlock(parent, text, date, signifier, callback) {
	createEventBlockPouch(db, parent, text, date, signifier, (user) => {
		callback(user);
	})
}

export function createFutureLog(startDate, endDate, months, content, trackers, callback) {
	createFutureLogPouch(db, startDate, endDate, months, content, trackers, (err, futureLog) => {
		callback(err, futureLog);
	})
}

export function createMonthlyLog(parent, content, days, trackers, date, callback) {
	createMonthlyLogPouch(db, parent, content, days, trackers, date, (error, month) => {
		callback(error, month);
	})
}

export function createSignifier(meaning, symbol, callback) {
	createSignifierPouch(db, meaning, symbol, (user) => {
		callback(user);
	})
}

export function createTaskBlock(parent, text, complete, signifier, callback) {
	createTaskBlockPouch(db, parent, text, complete, signifier, (user) => {
		callback(user);
	})
}

export function createTextBlock(parent, content, trackers, callback){
	createTextBlockPouch(db, parent, content, trackers, callback);
}

export function createTracker(content, parent, callback) {
	createTrackerPouch(db, content, parent, (user) => {
		callback(user);
	})
}

export function readUser(callback){
	readUserPouch(db, (err, user) => {
		callback(err, user);
	});
}


//------------------------------deletion functions-----------------------------
export function deleteUser(){
	deleteUserPouch(db, (user) => {
		return res.send(user);
	});
}

export function deleteCollection(collection, callback){
	deleteCollectionPouch(db, collection.id, callback);
}

export function deleteCollectionByID (id, callback){
	deleteCollectionPouch(db, id, callback);
}

export function deleteEvent(event, callback){
	deleteEventBlockPouch(db, event.id, callback);
}

export function deleteEventByID(id, callback){
	deleteEventBlockPouch(db, id, callback);
}

export function deleteEventAtIndex(container, index, callback){
	deleteEventBlockPouch(db, container.content[index], callback);
}

export function deleteSignifier(signifier, callback){
	deleteSignifierPouch(db, signifier.id, callback);
}

export function deleteSignifierByID(id, callback){
	deleteSignifierPouch(db, id, callback);
}

export function deleteSignifierAtBlock(block, callback){
	deleteSignifierPouch(db, block.signifier, callback);
}

export function deleteTask(task, callback){
	deleteTaskBlockPouch(db, task.id, callback);
}

export function deleteTaskByID(id, callback){
	deleteTaskBlockPouch(db, id, callback);
}

export function deleteTextBlock(block, callback){
	deleteTextBlockPouch(db, block.id, callback);
}

export function deleteTextBlockByID(id, callback){
	deleteTextBlockPouch(db, id, callback);
}

export function deleteTextBlockFromContainer(container, index, callback){
	deleteTextBlockPouch(db, container.contents[index], callback);
}

export function deleteTracker(tracker, callback){
	deleteTrackerPouch(db, tracker.id, callback);
}

export function deleteTrackerByID(id, callback){
	deleteTrackerPouch(db, id, callback);
}

export function deleteTrackerFromContainer(container, index, callback){
	deleteTrackerPouch(db, container.trackers[index], callback);
}

//-------------------------------Update Functions----------------------------------
export function updateUser(){
	updateUserPouch(db, (user) => {
		return res.send(user);
	});
}

export function updateUserOnline(){
	updateUserFromMongo(db, (user) => {
		return res.send(user);
	});
}

export function updateDailyLog(dailyLog, callback) {
	updateDailyLogPouch(dailyLog, (user) => {
		return res.send(user);
	})
}

export function updateDailyLogByID (id, callback){
	db.get("0000", (err, doc) => {
		if (err) {
			callback(err);
		} else {
			const dailyLog = doc.userObject.dailyLogs.filter(element => element.id == id);
			updateDailyLogPouch(db, dailyLog[0], callback);		
		}
	});
}

export function updateMonthlyLog(monthlyLog, callback) {
	updateMonthlyLogPouch(monthlyLog, callback);
}

export function updateMonthlyLogByID (id, callback){
	db.get("0000", (err, doc) => {
		if (err) {
			callback(err);
		} else {
			const monthlyLog = doc.userObject.monthlyLogs.filter(element => element.id == id);
			updateMonthlyLogPouch(db, monthlyLog[0], callback);		
		}
	});
}

export function updateFutureLog(futureLog, callback) {
	updateFutureLogPouch(futureLog, callback);
}

export function updateFutureLogByID (id, callback){
	db.get("0000", (err, doc) => {
		if (err) {
			callback(err);
		} else {
			const futureLog = doc.userObject.futureLogs.filter(element => element.id == id);
			updateFutureLogPouch(db, futureLog[0], callback);		
		}
	});
}

export function updateCollection(collection, callback){
	updateCollectionPouch(db, collection, callback);
}

export function updateCollectionByID (id, callback){
	db.get("0000", (err, doc) => {
		if (err) {
			callback(err);
		} else {
			const collection = doc.userObject.collections.filter(element => element.id == id);
			updateCollectionPouch(db, collection[0], callback);		
		}
	});
}

export function updateEvent(event, callback){
	updateEventBlockPouch(db, event, callback);
}

export function updateEventByID(id, callback){
	db.get("0000", (err, doc) => {
		if (err) {
			callback(err);
		} else {
			const event = doc.userObject.eventBlocks.filter(element => element.id == id);
			updateEventBlockPouch(db, event[0], callback);		
		}
	});
}

export function updateEventAtIndex(container, index, callback){
	db.get("0000", (err, doc) => {
		if (err) {
			callback(err);
		} else {
			const event = doc.userObject.eventBlocks.filter(element => element.id == container.content[index]);
			updateEventBlockPouch(db, event[0], callback);		
		}
	});
}

export function updateSignifier(signifier, callback){
	updateSignifierPouch(db, signifier, callback);
}

export function updateSignifierByID(id, callback){
	db.get("0000", (err, doc) => {
		if (err) {
			callback(err);
		} else {
			const signifier = doc.userObject.signifiers.filter(element => element.id == id);
			updateSignifierPouch(db, signifier[0], callback);		
		}
	});
}

export function updateSignifierAtBlock(block, callback){
	db.get("0000", (err, doc) => {
		if (err) {
			callback(err);
		} else {
			const signifier = doc.userObject.signifiers.filter(element => element.id == block.signifier);
			updateSignifierPouch(db, signifier[0], callback);
		}
	});
}

export function updateTask(task, callback){
	updateTaskBlockPouch(db, task, callback);
}

export function updateTaskByID(id, callback){
	db.get("0000", (err, doc) => {
		if (err) {
			callback(err);
		} else {
			const task = doc.userObject.taskBlocks.filter(element => element.id == id);
			updateTaskBlockPouch(db, task[0], callback);		
		}
	});
}

export function updateTextBlock(block, callback){
	updateTextBlockPouch(db, block, callback);
}

export function updateTextBlockByID(id, callback){
	db.get("0000", (err, doc) => {
		if (err) {
			callback(err);
		} else {
			const text = doc.userObject.textBlocks.filter(element => element.id == id);
			updateTextBlockPouch(db, text[0], callback);	
		}
	});
}

export function updateTextBlockFromContainer(container, index, callback){
	db.get("0000", (err, doc) => {
		if (err) {
			callback(err);
		} else {
			const text = doc.userObject.textBlocks.filter(element => element.id == container.content[index]);
			updateTextBlockPouch(db, text[0], callback);		
		}
	});
}

export function updateTracker(tracker, callback){
	updateTrackerPouch(db, tracker, callback);
}

export function updateTrackerByID(id, callback){
	db.get("0000", (err, doc) => {
		if (err) {
			callback(err);
		} else {
			const tracker = doc.userObject.trackers.filter(element => element.id == id);
			updateTrackePouch(db, tracker[0], callback);
		}
	});
}

export function updateTrackerFromContainer(container, index, callback){
	db.get("0000", (err, doc) => {
		if (err) {
			callback(err);
		} else {
			const tracker = doc.userObject.trackers.filter(element => element.id == container.content[index]);
			updateTrackerPouch(db, tracker[0], callback);		
		}
	});
}
