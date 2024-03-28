const express = require('express');
const mqtt = require('mqtt');
const mysql =  require('mysql2/promise');
const app = express();
const port = 3000;

// MQTT broker URL
const mqttBrokerUrl = 'mqtt://85.89.43.95';

const mqttClient = mqtt.connect(mqttBrokerUrl,{
    username: "mattias",
    password: "8W6aG2g2apPN"
});


mqttClient.on('connect', () => {
    console.log('Connected to MQTT broker');
    mqttClient.subscribe("AC/+/web");

    
    
    
});
mqttClient.on('message', (topic, message) => {
    executeQuery(message.toString())
});


async function executeQuery(data) {
    data = JSON.parse(data)

    const connection = await mysql.createConnection({
        host: 'd110073.mysql.zonevs.eu',
        user: 'd110073_acuser',
        password: 'u7Drmx]?8f#HVVt',
        database: 'd110073_acdata'
    });

await connection.execute(
'INSERT INTO ACdata (deviace_id, temp, hum, command, overide, targettemp) VALUES (?, ?, ?, ?, ?, ?)',
[data.id, data.temp,data.hum,data.command,data.overide,data.targettemp]);
}

