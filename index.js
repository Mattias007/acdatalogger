const express = require('express');
const mqtt = require('mqtt');
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
    mqttClient.subscribe("AC/+/Override");

    

});
mqttClient.on('message',(topic, message) => {
    const topicarray = topic.split("/")
    message = JSON.parse(message.toString())
    if (topicarray[2] == "web"){
        const name = message.name
        delete(message.id)
        delete(message.name)
        fetch(`http://85.89.32.58/input/post?node=${name}&fulljson=${JSON.stringify(message)}&apikey=17bda09eb30a8f93c375d009a6066c2c`).then(r => {
        })
    }
    else if (topicarray[2] == "Override"){
        switch (message){
            case 0:
            mqttClient.publish(`AC/${topicarray[1]}/Command`,0, { qos: 0, retain: true }, (error) => {
                if (error) {
                    console.error(error)
                }
            })
            break
            case 1:
                console.log(message)
                // logic for solar
            case 2:
                console.log(message)
                // logic for power meeter
        }
    }

});



