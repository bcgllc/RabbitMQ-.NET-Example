#!/usr/bin/env node
//var sleep = require('sleep');
var amqp = require('amqplib/callback_api');

var connString = 'amqp://localhost';

amqp.connect(connString, function(err, conn) {
  conn.createChannel(function(err, ch) {
    var q = 'task_queue';
    var msg = process.argv.slice(2).join('; ') || "Sending Order";

    //sleep.sleep(3);

    ch.assertQueue(q, {durable: true});
    ch.sendToQueue(q, new Buffer(msg), {persistent: true});
    console.log(" [x] Sent '%s'", msg);

  });
  setTimeout(function() { conn.close(); process.exit(0) }, 500);
});

/** bash script to run n times: */
/** for i in {1..5}; do node new_task.js; done */