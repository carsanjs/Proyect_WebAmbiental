#ifndef SENSOR_HANDLER_LLUVIA
#define SENSOR_HANDLER_LLUVIA
#include <ArduinoJson.h>
#define D5 14 // Pin digital conectado al sensor de lluvia

void readPublicFC37(const char *sensorName) {
  int sensorValue = digitalRead(D5);
  
  Serial.print("data sin map" + sensorValue);
  int mappedValue = map(sensorValue, 0, 1023, 0, 100);
  Serial.print("\n ************Sensor ");
  Serial.print(sensorName);
  Serial.println("************ \n");
  Serial.println("data de FC-37"+ mappedValue);
  // Determinar el estado de la lluvia
  String estado;
  if (mappedValue < 50) {
    estado = "Seco";
  } else {
    estado = "Mojado";
  }
  Serial.println("mesaje de lluvia" + estado);
  // Obtener la fecha actual
//  String fecha = obtenerFecha();
  const char* sensor_id = "234232-2424-24324-2424";

  // Crear el objeto JSON
  StaticJsonDocument<200> jsonDocument;
  jsonDocument["id"] = sensor_id;
  jsonDocument["Lluvia"] = mappedValue;
  jsonDocument["mensaje"] = estado;
//  jsonDocument["fecha"] = fecha;

  // Serializar el objeto JSON
  char msgBuffer[256];
  serializeJson(jsonDocument, msgBuffer);

  // Publicar los datos en un solo tema MQTT
  const char* topic = ("Externo/Upc/" + String(sensorName) + "Lluvia").c_str();
//  if (!PublishMqtt(msgBuffer, topic)) {
//    Serial.println("**************************");
//    Serial.println("Fallo al publicar los datos del sensor MQ-135 en MQTT");
//    Serial.println("**************************");
//  }
}

#endif // SENSOR_HANDLER_LLUVIA
