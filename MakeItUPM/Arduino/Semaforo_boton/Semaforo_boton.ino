const int luzRojaC = 6;
const int luzAmarillaC = 5;
const int luzVerdeC = 4;
const int luzRojaP = 3;
const int luzVerdeP = 2;
const int boton = 8;
int zustand = 0;
int buttonState = 0;

void setup() {
  pinMode(luzRojaC, OUTPUT);
  pinMode(luzAmarillaC, OUTPUT);
  pinMode(luzVerdeC, OUTPUT);
  pinMode(luzRojaP, OUTPUT);
  pinMode(luzVerdeP, OUTPUT);
  pinMode(boton, INPUT);
  encenderLuzVerde();
}

void loop() {
  checkButtonState();
}

void checkButtonState(){
  buttonState = digitalRead(boton);

  if (buttonState == HIGH) {
      encenderLuzAmarilla();
      encenderLuzRoja();
      delay(6000);
      encenderLuzVerde();
  }
}

void encenderLuzRoja(){
  digitalWrite(luzRojaC, HIGH);
  digitalWrite(luzAmarillaC, LOW);
  digitalWrite(luzVerdeC, LOW);
  digitalWrite(luzRojaP, LOW);
  digitalWrite(luzVerdeP, HIGH);
}
void encenderLuzAmarilla(){
  digitalWrite(luzRojaC, LOW);
  digitalWrite(luzVerdeC, LOW);
  int i=0;
  while(i<3){
    digitalWrite(luzAmarillaC, HIGH);
    delay(1000);
    digitalWrite(luzAmarillaC, LOW);
    delay(1000);
    i++;
  }
  digitalWrite(luzRojaP, LOW);
  digitalWrite(luzVerdeP, HIGH);
}
void encenderLuzVerde(){
  digitalWrite(luzRojaC, LOW);
  digitalWrite(luzAmarillaC, LOW);
  digitalWrite(luzVerdeC, HIGH);
  digitalWrite(luzVerdeP, LOW);
  digitalWrite(luzRojaP, HIGH);
}