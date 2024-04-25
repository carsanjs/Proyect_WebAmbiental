//#ifndef SENSOR_HANDLE_KY018
//#define SENSOR_HANDLE_KY018
//extern int ADCO;
//
//void readyPublicGYML8511(const char *sensorName) {
// int value = analogRead(ADCO);
//  int uvIndex = map(value, 0, 1023, 0, 100);
//  Serial.print("\n ************Sensor ");
//  Serial.print(sensorName);
//  Serial.println("************ \n");
//  Serial.println("Valor del sensor UV: " + String(uvIndex));
//  String Message;
//  if (uvIndex < 30) {
//    Message = "Nivel de radiación UV: Bajo";
//  } else if (uvIndex >= 30 && uvIndex < 70) {
//    Message = "Nivel de radiación UV: Moderado";
//  } else {
//    Message = "Nivel de radiación UV: Alto";
//  }
//  Serial.println(Message);
//
//  // Obtener la fecha actual
////  String fecha = obtenerFecha();
//  const char* sensor_id = "234232-2424-24324-2424";
//
//  // Crear el objeto JSON
//  StaticJsonDocument<200> jsonDocument;
//  jsonDocument["id"] = sensor_id;
//  jsonDocument["UV"] = uvIndex;
//  jsonDocument["mensaje"] = Message;
////  jsonDocument["fecha"] = fecha;
//
//  // Serializar el objeto JSON
//  char msgBuffer[256];
//  serializeJson(jsonDocument, msgBuffer);
//
//  const char* topic = ("Externo/Upc/" + String(sensorName) + "UV").c_str();
////  if (!PublishMqtt(msgBuffer, topic)) {
////    Serial.println("**************************");
////    Serial.println("Fallo al publicar los datos del SENSOR UV en MQTT");
////    Serial.println("**************************");
////  }
//  delay(500); // Agregamos un pequeño retardo para facilitar la lectura en el monitor serial
//}
//#endif
