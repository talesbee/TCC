import React from 'react';

export function getActualDate() {
  let day = new Date().getDate();
  if (day < 10) day = '0' + day.toString();
  let month = new Date().getMonth() + 1;
  if (month < 10) month = '0' + month.toString();
  let year = new Date().getFullYear();
  let date = day + '/' + month + '/' + year;
  return date; //Mes, dia e ano
}

export function getDate(dataCompleta) {
  let day = dataCompleta.getDate();
  if (day < 10) day = '0' + day.toString();
  let month = dataCompleta.getMonth() + 1;
  if (month < 10) month = '0' + month.toString();
  let year = dataCompleta.getFullYear();
  let date = day + '/' + month + '/' + year;
  return date; //Mes, dia e ano
}

export function getHoras(dataCompleta){
  let hora = dataCompleta.getHours();
  if (hora < 10) hora = '0' + hora.toString();
  let minuto = dataCompleta.getMinutes();
  if (minuto < 10) minuto = '0' + minuto.toString();
  let segundos = dataCompleta.getSeconds();
  if (segundos < 10) segundos = '0' + segundos.toString();
  let horas = `${hora}:${minuto}:${segundos}`;
  return horas;
}


export function compararDatas(diaComparar, hoje = getActualDate()) {
  let data1 = diaComparar.split('/');
  let data2 = hoje.split('/');

  data1 = `${data1[1]}/${data1[0]}/${data1[2]}`;
  data2 = `${data2[1]}/${data2[0]}/${data2[2]}`;

  data1 = new Date(data1);
  data2 = new Date(data2);

  const diffTime = Math.abs(data1 - data2);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

export function getID() {
  let day = new Date().getDate();
  if (day < 10) day = '0' + day.toString();
  let month = new Date().getMonth() + 1;
  if (month < 10) month = '0' + month.toString();
  let year = new Date().getFullYear();
  let hours = new Date().getHours();
  let min = new Date().getMinutes();
  let sec = new Date().getSeconds();
  let mili = new Date().getMilliseconds().toString().slice(0, 1);
  let id = `${year}${month}${day}${hours}${min}${sec}${mili}`;
  if (id.length < 14) {
    id += '0';
  }
  return id;
}
