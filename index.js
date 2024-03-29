const express = require('express');
const mqtt = require('mqtt');
const app = express();
const port = 3000;

// MQTT broker URL
const mqttBrokerUrl = 'mqtt://127.0.0.1';

const mqttClient = mqtt.connect(mqttBrokerUrl,{
    username: "mattias",
    password: "8W6aG2g2apPN"
});


mqttClient.on('connect', () => {
    console.log('Connected to MQTT broker');
    mqttClient.subscribe("AC/+/web");

    

});
mqttClient.on('message',(topic, message) => {
    message = JSON.parse(message.toString())
    const name = message.name
    delete(message.id)
    delete(message.name)
    console.log(`http://85.89.32.58/input/post?node=${name}&fulljson=${JSON.stringify(message)}&apikey=17bda09eb30a8f93c375d009a6066c2c`)
   fetch(`http://85.89.32.58/input/post?node=${name}&fulljson=${JSON.stringify(message)}&apikey=17bda09eb30a8f93c375d009a6066c2c`).then(r => {
   })

});



