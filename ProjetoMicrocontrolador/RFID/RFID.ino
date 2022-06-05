// Arduino PN532 NFC čtečka karet
// navody.dratek.cz

// připojení potřebných knihoven
#include <PN532_I2C.h>
#include <PN532.h>
#include <NfcAdapter.h>
// vytvoření instance I2C komunikace pro PN532
PN532_I2C pn532i2c(Wire);
// vytvoření instance PN532 NFC modulu
PN532 nfc(pn532i2c);

void setup() {
  // zahájení komunikace po sériové lince
  // s rychlostí 9600 baud
  Serial.begin(9600);
  // zahájení komunikace s NFC modulem
  nfc.begin();
  // uložení verze desky pro kontrolu jejího připojení
  
  uint32_t versiondata = nfc.getFirmwareVersion();
  do{
    Serial.println("Modulo não encontrado!");
    versiondata = nfc.getFirmwareVersion();
    delay(1000);
  }while(!versiondata);
  // kontrola načtené verze NFC modulu
  if (!versiondata) {
    Serial.println("Modulo não encontrado!");
    // zastavení programu
    while (1);
  }
  else {
    // vytištění informací o připojeném modulu
    Serial.print("Nalezen modul PN5"); Serial.println((versiondata >> 24) & 0xFF, HEX);
    Serial.print("Firmware verze "); Serial.print((versiondata >> 16) & 0xFF, DEC);
    Serial.print('.'); Serial.println((versiondata >> 8) & 0xFF, DEC);
  }
  // nastavení maximálního počtu pokusů o čtení NFC tagu,
  // odpovídá cca jedné sekundě
  nfc.setPassiveActivationRetries(0xFF);
  // konfigurace NFC modulu pro čtení tagů
  nfc.SAMConfig();
  // vytištění informace o začátku čtení
  Serial.println("PN532 modul nastaven, prilozte tag...");
}

void loop() {
  // vytvoření proměnných, do kterých se budou ukládat výsledky čtení
  boolean uspech;                          // úspěšné čtení
  uint8_t uid[] = { 0, 0, 0, 0, 0, 0, 0 }; // unikátní ID tagu
  uint8_t uidLength;                       // délka ID tagu
  // zahájení čtení tagů v okolí, výsledek čtení se uloží do nastavených proměnných
  uspech = nfc.readPassiveTargetID(PN532_MIFARE_ISO14443A, &uid[0], &uidLength);
  // pokud je čtení úspěšné, vypíšeme získané informace
  if (uspech) {
    Serial.println("Nalezen NFC tag!");
    Serial.print("UID delka: "); Serial.print(uidLength, DEC); Serial.println(" bytu");
    Serial.print("UID hodnoty: ");
    for (uint8_t i = 0; i < uidLength; i++) {
      Serial.print(" 0x"); 
      Serial.print(uid[i], HEX);
    }
    Serial.println("");
    // vyčkání jedné sekundy před novým čtením
    delay(2500);
  }
}
