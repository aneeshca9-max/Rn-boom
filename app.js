const clientId = "web_" + Math.random().toString(16).substr(2, 8);

const client = new Paho.MQTT.Client(
  "ec91e389d1624d2fa990c2bcb883d331.s1.eu.hivemq.cloud",
  8884,
  "/mqtt",
  clientId
);

client.onConnectionLost = () => {
  document.getElementById("status").innerText = "❌ Connection lost";
};

client.connect({
  useSSL: true,
  userName: "aneesh_home",
  password: "Kuttappan123",
  onSuccess: () => {
    document.getElementById("status").innerText = "✅ Connected to HiveMQ";
  },
  onFailure: () => {
    document.getElementById("status").innerText = "❌ Connection error";
  }
});

function motorOn() {
  sendMessage("ON");
}

function motorOff() {
  sendMessage("OFF");
}

function sendMessage(msg) {
  const device = document.getElementById("device").value;
  const topic = `motor/${device}`;

  const message = new Paho.MQTT.Message(msg);
  message.destinationName = topic;
  client.send(message);
}
