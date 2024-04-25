#ifndef SENSOR_HANDLE_KY018
#define SENSOR_HANDLE_KY018
#include <Arduino.h>
#include "MQTT.hpp"
extern int ADCO;
extern int value,data;

const int THRESHOLD_POOR = 1000;
const int THRESHOLD_FAIR = 800;
const int THRESHOLD_MODERATE = 600;
const int THRESHOLD_GOOD = 400;
const int THRESHOLD_EXCELLENT = 200;

void readLRDSensor(const char *sensorName) {
 if (value != -1) {
 value = analogRead(ADCO);
 data = map(value, 0, 1023, 0, 255);
 Serial.print("\n ************Sensor ");
 Serial.print(sensorName);
 Serial.println("************ \n");
 Serial.println("Valor del sensor LDR: " + String(data));
 String lightMessage;
 if (value < THRESHOLD_EXCELLENT) {
    lightMessage = "Muy bien iluminado";
  } else if (value < THRESHOLD_GOOD) {
    lightMessage = "Bien iluminado";
  } else if (value < THRESHOLD_MODERATE) {
    lightMessage = "Moderadamente iluminado";
  } else if (value < THRESHOLD_FAIR) {
    lightMessage = "Oscuro";
  } else if (value < THRESHOLD_POOR) {
    lightMessage = "Muy oscuro";
  } else {
    lightMessage = "Extremadamente oscuro";
  }
  Serial.println(lightMessage);
  const char* topic = "Salon/112/luminosity";
if (!PublishMqtt(data, topic)) {
      Serial.println("**************************");
      Serial.println("Fallo al publicar los datos del sensor LDR en MQTT");
      Serial.println("**************************");
    }
  
 }
 else {
    Serial.println("**************************");
    Serial.println("Fallo al recibir los datos del sensor LDR");
    Serial.println("**************************");
  }
  delay(500); // Agregamos un pequeño retardo para facilitar la lectura en el monitor serial
}
#endif
