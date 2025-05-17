const express = require('express');
const path = require('path');
const {format} = require('date-fns');
const fs = require('fs');
const fsPromises = require('fs').promises;
const {v4:uuid} = require('uuid');


const logEvents = async(message, logFileName) => {
    const date = format(new Date(), 'yyyy-MM-dd\tHH:mm:ss');
    const logItem = `${date}\t${uuid()}\t${message}\n`;
    try {
        if(!fs.existsSync(path.join(__dirname, '..', 'logs'))){
            fsPromises.mkdir(path.join(__dirname, '..', 'logs'));
        }
        await fsPromises.appendFile(path.join(__dirname, '..', 'logs', logFileName),logItem);
    } catch (error) {
        console.log(error);
    }
}


const logger = async(req, res, next)=>{
    const logFileName = 'reqLog.log';
    const message = `${req.method}\t${req.headers.origin}\t ${req.url}`
    await logEvents(message, logFileName);
    // console.log(message);
    next();

}


module.exports = {logger, logEvents};