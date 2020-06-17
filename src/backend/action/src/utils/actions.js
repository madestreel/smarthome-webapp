const axios = require('axios');
const device = process.env.DEVICE_URL;
const mosquitto = process.env.MQTT_BROKER_URL;
const mqtt = require('mqtt');

function action(deviceID, topic, action, token) {
  return new Promise((resolve, reject) => {
    axios.get(`${device}/device/${deviceID}?token=${token}`).then(_ => {
      console.log('1');
      let mqttClient = mqtt.connect(mosquitto);
      console.log('2');
      mqttClient.on("message", (topic, message) => {
        mqttClient.end();
        resolve(message.toString())
      });
      mqttClient.on('connect', _ => {
        mqttClient.subscribe(topic + "/sub", function () {
          mqttClient.publish(topic + "/pub", action)
        })
      });
    }).catch(_ => {
      reject(new Error(`Device doesn't exist.`))
    })
  })
}

module.exports = {
  action
};