+#ifndef SENSOR_HANDLER_DHT
#define SENSOR_HANDLER_DHT
#include <Arduino.h>
#include <DHT.h>
#include <DHT_U.h>
#include "MQTT.hpp"

#define D1 5   // Pin D1 para el DHT11
#define D4 2   // Pin D2 para el DHT22

DHT dht(D1, DHT11);
DHT dht2(D4, DHT22);

void initSensorHandler() {
  dht.begin();
  dht2.begin();
}

void readDHT(DHT &sensor, const char *sensorName)  {
  float temperature = sensor.readTemperature();
  float humidity = sensor.readHumidity();
  Serial.print("\n ************Sensor ");
  Serial.print(sensorName);
  Serial.println("************ \n");

  if (!isnan(temperature) && !isnan(humidity)) {
     float temperatureFahrenheit = (temperature * 9.0 / 5.0) + 32.0;
      Serial.print("Temperature (C): ");
      Serial.println(temperature);
      Serial.print("Temperature (F): ");
      Serial.println(temperatureFahrenheit);
      Serial.print("Humidity: ");
      Serial.println(humidity);
      
const char* topicTemperatureC = ("Salon/112/" + String(sensorName) + "/temperaturec").c_str();
const char* topicTemperatureF = ("Salon/112/" + String(sensorName) + "/temperatureF").c_str();
const char* topicHumidity = ("Salon/112/" + String(sensorName) + "/humidity").c_str();

    PublishMqtt(temperature,topicTemperatureC);
    PublishMqtt(temperatureFahrenheit,topicTemperatureF);
    PublishMqtt(humidity,topicHumidity);
  } else {
    Serial.println("**************************");
    Serial.println("Fallo al recibir los datos del sensor");
    Serial.println("**************************");
  }
}
#endif // SENSOR_HANDLER_DHT
