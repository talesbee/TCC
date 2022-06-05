#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <ESP8266WiFiMulti.h>
#include <WiFiManager.h>
#include <ESP8266HTTPClient.h>
#include <PubSubClient.h>
#include <WiFiClient.h>

ESP8266WiFiMulti WiFiMulti;
WiFiClient client;
PubSubClient espClient(client);

const char* mqtt_server = "tbiot.hopto.org:80";
const char* user = "automacao";
const char* pass = "ZVh2$PBC";
const int port = 8883;

void setup() {

  Serial.begin(9600);

  WiFi.mode(WIFI_STA);
  WiFiMulti.addAP("TP-Link_D8D8", "S3m_S3nh@");

  hold(5000);
  espClient.setServer(mqtt_server, port);

  espClient.publish("controlePortaria","Sistema on");
  
  Serial.println("On");
  
}

void loop() {
  // wait for WiFi connection

  if (Serial.available()) {
    String tag = Serial.readString();

    if ((WiFiMulti.run() == WL_CONNECTED)) {

      HTTPClient http;
      String url = "https://192.168.15.159:80/api/Interacao/RegistroEntrada?id=a3764a1b";
      espClient.publish("controlePortaria",tag.c_str());
      if (http.begin(client, url.c_str())) {
        int httpCode = http.GET();
        if (httpCode > 0) {
          if (httpCode == HTTP_CODE_OK || httpCode == HTTP_CODE_MOVED_PERMANENTLY) {
            String payload = http.getString();
            Serial.println(payload);
          }
        } else {
          Serial.print("Erro API");
        }
        http.end();
      } else {
        Serial.print("Sem internet");
      }
    }
  }
}
void hold(const unsigned int &ms) {
  // Non blocking hold
  unsigned long m = millis();
  while (millis() - m < ms) {
    yield();
  }
}
