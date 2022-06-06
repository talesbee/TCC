#include <PN532_I2C.h>
#include <PN532.h>
#include <NfcAdapter.h>

PN532_I2C pn532i2c(Wire);

PN532 nfc(pn532i2c);

void setup() {
  Serial.begin(9600);
  nfc.begin(); 
  uint32_t versiondata = nfc.getFirmwareVersion();
  do{
    Serial.println("Modulo não encontrado!");
    versiondata = nfc.getFirmwareVersion();
    delay(1000);
  }while(!versiondata);
  if (!versiondata) {
    Serial.println("Modulo não encontrado!");
    while (1);
  }
  nfc.setPassiveActivationRetries(0xFF);
  nfc.SAMConfig();
  Serial.println("Aproxime a TAG");
}

void loop() {
  boolean uspech;                          
  uint8_t uid[] = { 0, 0, 0, 0, 0, 0, 0 }; 
  uint8_t uidLength;                       
  uspech = nfc.readPassiveTargetID(PN532_MIFARE_ISO14443A, &uid[0], &uidLength);
  if (uspech) {
    String tag = "";
    for (uint8_t i = 0; i < uidLength; i++) {
      tag += String(uid[i], HEX);
    }
    Serial.print("Tag lida: ");
    Serial.println(tag);
    delay(2500);
  }
}
