#pragma once
#ifndef MQTT_H
#define MQTT_H

#include <Arduino.h>
extern const char* MQTT_BROKER_ADRESS;
extern const uint16_t MQTT_PORT;
extern const char* MQTT_CLIENT_NAME;
extern const char* MQTT_USERNAME;
extern const char* MQTT_PASSWORD;

WiFiClient espClient;
PubSubClient mqttClient(espClient);

String payload;
//Hacemos uso del dato que se envia y el topic donde se publica
bool PublishMqtt(unsigned long data, const char* topic)
{
    payload = String(data);
    mqttClient.publish(topic, (char*)payload.c_str());
    return true;
}

#endif
