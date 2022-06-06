#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <ESP8266WiFiMulti.h>
#include <WiFiManager.h>
#include <ESP8266HTTPClient.h>
#include <PubSubClient.h>
#include <WiFiClient.h>

ESP8266WiFiMulti WiFiMulti;
WiFiClient client;

void setup() {
  Serial.begin(9600);
  WiFi.mode(WIFI_STA);
  WiFiMulti.addAP("TP-Link_D8D8", "S3m_S3nh@");
  hold(5000); 
}

void loop() {
  // wait for WiFi connection

  if (Serial.available()) {
    String tag = Serial.readStringUntil('#');
    hold(500);
    if ((WiFiMulti.run() == WL_CONNECTED)) {
      HTTPClient http;
      String url = "https://tbiot.hopto.org:82/api/Interacao/";
      String link = url+tag;
      if (http.begin(client, link.c_str())) {
        int httpCode = http.GET();
        if (httpCode > 0) {
          if (httpCode == HTTP_CODE_OK || httpCode == HTTP_CODE_MOVED_PERMANENTLY) {
            String payload = http.getString();
            payload+="#";
            Serial.println(payload);
          }
        } else {
          Serial.println("Erro API");
        }
        http.end();
      } else {
        Serial.println("Sem internet");
      }
    }
    while(Serial.available()){
      char c = Serial.read();
      hold(1);
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
