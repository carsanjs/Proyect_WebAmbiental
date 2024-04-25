#pragma once
#include <PubSubClient.h>
#include "MQTT.hpp"    
extern PubSubClient mqttClient; // Declaración externa de mqttClient
void ConnectMqtt() {
  while (!mqttClient.connected()) {
    Serial.print("Starting MQTT connection...");
    if (mqttClient.connect("ESP8266_Inner", MQTT_USERNAME, MQTT_PASSWORD)) {
      Serial.println(" connected");
    } else {
      Serial.print("Failed MQTT connection, rc=");
      Serial.print(mqttClient.state());
      Serial.println(" try again in 5 seconds");
      delay(5000);
    }
  }
}

void HandleMqtt() {
  if (!mqttClient.connected()) {
    ConnectMqtt();
  }
  mqttClient.loop();
}
