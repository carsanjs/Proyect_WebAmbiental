#include <ESP8266WiFi.h>
#include <PubSubClient.h>
//#include <AsyncMqttClient.h>

#include "config.h"
#include "ESP8266_Utils.hpp"
#include "ESP8266_Utils_MQTT_Async.hpp"
#include "sensor_handler_lluvia_FC-37" // archivo de la funcion del sensor de lluvia
#include "sensor_handler_dht.h"  //archivo de las funciones con los sensores dht11, dht22
#include "sensor_handle_ky018.h"  //archivo de las funciones con el fotoresistor LDR
#include "sensor_handler_mq7.h"  //archivo de las funciones con el sensor MQ-7


const char* MQTT_BROKER_ADRESS ="mosquitto-1";
const uint16_t MQTT_PORT = 1883;
const char* MQTT_CLIENT_NAME = "ESP8266Inner_S112";
const char* MQTT_USERNAME = "Pubi";
const char* MQTT_PASSWORD = "public1";

int ADCO = A0;
int value = 0;
int data = 0;

#define D0 16  // Pin D0 para el LED

void setup() {
  pinMode(D0, OUTPUT);
  initSensorHandler();
  Serial.begin(115200);
  SPIFFS.begin();
  ConnectWiFi_STA(true);
  // Conecta MQTT en el setup
  mqttClient.setServer(MQTT_BROKER_ADRESS, MQTT_PORT);
  ConnectMqtt();
}

void loop() { 
  readLRDSensor("LDR Iluminosidad");
  readDHT(dht, "DHT11");
  readDHT(dht2, "DHT22");
  publicDataMQ7();
  blinkLED(100);
  HandleMqtt();
  delay(100);
}

void blinkLED(int duration) {
  digitalWrite(D0, HIGH);
  delay(duration / 2);
  digitalWrite(D0, LOW);
  delay(duration / 2);
}
