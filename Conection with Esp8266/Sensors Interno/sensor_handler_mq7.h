#ifndef SENSOR_HANDLER_MQ7
#define SENSOR_HANDLER_MQ7
#include <Arduino.h>

#define D5 14  // Pin D5 para el sensor MQ-7

float readMQ7() {
  int lectura = digitalRead(D5);
  Serial.print("Lectura digital de MQ-7: ");
  Serial.println(lectura);

  float ppm = 1800.0 / 1.0; // Ajusta el factor de conversión según las especificaciones del sensor
  float c0 = ppm * lectura;

  return c0;
}
void publicDataMQ7() {
  float valueMQ7 = readMQ7();

  Serial.print("\n ************Sensor MQ-7************ \n");
  Serial.print("Concentración de CO: ");
  Serial.print(valueMQ7);
  Serial.println(" ppm");

  // Publicar en el topic MQTT
  const char* topic = "Salon/112/co";
  if (!PublishMqtt(valueMQ7,topic)) {
    Serial.println("**************************");
    Serial.println("Fallo al publicar los datos del sensor MQ-7 en MQTT");
    Serial.println("**************************");
  }
  delay(500);
}
#endif
