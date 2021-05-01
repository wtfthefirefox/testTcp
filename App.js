import React, { useState } from 'react';
import { TouchableOpacity, ScrollView } from 'react-native';
import styled from 'styled-components';
import { Buffer } from 'buffer';

var net = require('net');

const App = () => {

  const client = net.createConnection(00000, "your host ip", () => {
    console.log("Connected");
  });

  client.setKeepAlive(true);

  client.on("data", (data) => {
    console.log(data);
  });

  client.on('error', function(error) {
    console.log(error);
  });

  client.on("close", () => {
    console.log("I'm closed, sorry");
  })

  const stringedBuf = Buffer.from("SetPar");

  const isOversizedBuf = Buffer.allocUnsafe(2);
  isOversizedBuf.writeUInt16LE(0);
  const isOversizedXBuf = Buffer.allocUnsafe(4);
  isOversizedXBuf.writeFloatLE(106);
  const isOversizedYBuf = Buffer.allocUnsafe(4);
  isOversizedYBuf.writeFloatLE(107);
  const isOversizedZBuf = Buffer.allocUnsafe(4);
  isOversizedZBuf.writeFloatLE(117);

  const timeBuf = Buffer.allocUnsafe(4);
  timeBuf.writeUInt32LE(15);
  const periodBuf = Buffer.allocUnsafe(4);
  periodBuf.writeUInt32LE(15);

  const reservedBuf = Buffer.allocUnsafe(4);
  reservedBuf.writeUInt32LE(0);

  const modBuf = Buffer.allocUnsafe(4);
  modBuf.writeUInt32LE(0);

  
  const synhr = Buffer.from("Synhr");
  const getPar = Buffer.from("GetPar\0\r\n");
  const setPar = Buffer.concat([stringedBuf, Buffer.from("\0"), isOversizedBuf, isOversizedXBuf, isOversizedYBuf, isOversizedZBuf, timeBuf, periodBuf, reservedBuf, modBuf, Buffer.from("\n"), Buffer.from("\r")], 39);
  const getMeas = Buffer.from("GetMeas\0\r\n");
  const start = Buffer.from("Start\r\n");
  const stop = Buffer.from("Stop\r\n");

  return (
    <ScrollView style={{width: "100%", height: 1600 }} >
      <AppWrap>
        <TouchableOpacity style={{width: "90%", marginBottom: 50}} onPress={() => {client.write(synhr);}} >
          <BtnWrap>
            <BtnValue>Hi! U wanna Synhr?</BtnValue>
          </BtnWrap>
        </TouchableOpacity>
        <TouchableOpacity style={{width: "90%", marginBottom: 50}} onPress={() => {client.write(getPar); }} >
          <BtnWrap>
            <BtnValue>Hi! U wanna GetPar?</BtnValue>
          </BtnWrap>
        </TouchableOpacity>
        <TouchableOpacity style={{width: "90%", marginBottom: 50}} onPress={() => {client.write(setPar); }} >
          <BtnWrap>
            <BtnValue>Hi! U wanna SetPar?</BtnValue>
          </BtnWrap>
        </TouchableOpacity>
        <TouchableOpacity style={{width: "90%", marginBottom: 50}} onPress={() => {client.write(getMeas);}} >
          <BtnWrap>
            <BtnValue>Hi! U wanna GetMeas?</BtnValue>
          </BtnWrap>
        </TouchableOpacity>  
        <TouchableOpacity style={{width: "90%", marginBottom: 50}} onPress={() => {client.write(start);}} >
          <BtnWrap>
            <BtnValue>Hi! U wanna Start?</BtnValue>
          </BtnWrap>
        </TouchableOpacity>  
        <TouchableOpacity style={{width: "90%", marginBottom: 50}} onPress={() => {client.write(stop);}} >
          <BtnWrap>
            <BtnValue>Hi! U wanna Stop?</BtnValue>
          </BtnWrap>
        </TouchableOpacity>  
        {/* <ListWrap>
          <ListWrapItem>{`Порог - ${msg != "" ? msg.slice(0, 2).readUInt16LE(0) : "not geted"}`}</ListWrapItem>
          <ListWrapItem>{`ось X - ${msg != "" ? msg.slice(2, 6).readFloatLE(0) : "not geted"}`}</ListWrapItem>
          <ListWrapItem>{`ось Y - ${msg != "" ? msg.slice(6, 10).readFloatLE(0) : "not geted"}`}</ListWrapItem>
          <ListWrapItem>{`ось Z - ${msg != "" ? msg.slice(10, 14).readFloatLE(0) : "not geted"}`}</ListWrapItem>
          <ListWrapItem>{`Длина записи - ${msg != "" ? msg.slice(14, 18).readUInt32LE(0) : "not geted"}`}</ListWrapItem>
          <ListWrapItem>{`Период записи - ${msg != "" ? msg.slice(18, 22).readUInt32LE(0) : "not geted"}`}</ListWrapItem>
          <ListWrapItem>{` Серийный номер - ${msg != "" ? msg.slice(22, 26).readUInt32LE(0) : "not geted"}`}</ListWrapItem>
          <ListWrapItem>{`Чувствительность по оси X - ${msg != "" ? msg.slice(26, 30).readFloatLE(0) : "not geted"}`}</ListWrapItem>
          <ListWrapItem>{`Чувствительность по оси Y - ${msg != "" ? msg.slice(30, 34).readFloatLE(0) : "not geted"}`}</ListWrapItem>
          <ListWrapItem>{`Чувствительность по оси Z - ${msg != "" ? msg.slice(34, 38).readFloatLE(0) : "not geted"}`}</ListWrapItem>
          <ListWrapItem>{`пост. составляющая сигнала X - ${msg != "" ? msg.slice(38, 42).readFloatLE(0) : "not geted"}`}</ListWrapItem>
          <ListWrapItem>{`пост. составляющая сигнала Y - ${msg != "" ? msg.slice(42, 46).readFloatLE(0) : "not geted"}`}</ListWrapItem>
          <ListWrapItem>{`пост. составляющая сигнала Z - ${msg != "" ? msg.slice(46, 50).readFloatLE(0) : "not geted"}`}</ListWrapItem>
          <ListWrapItem>{`зарезервировано - ${msg != "" ? msg.slice(50, 54).readUInt32LE(0) : "not geted"}`}</ListWrapItem>
          <ListWrapItem>{`В режиме виброметра вычисляемое значение A, V, S - ${msg != "" ? msg.slice(54, 58).readUInt32LE(0) : "not geted"}`}</ListWrapItem>
        </ListWrap> */}
      </AppWrap>
    </ScrollView>
  )
}

const AppWrap = styled.View`
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 2200px;
  background-color: #1F2A30;
  padding-top: 70px;
`;

const BtnWrap = styled.View`
  width: 100%;
  height: 80px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  border-radius: 20px;
  margin-bottom: 40px;
`;

const BtnValue = styled.Text`
  color: #00D0A4;
  font-size: 40px;
  line-height: 40px;
`;

const ListWrap = styled.View`
  width: 92%;
  height: 1400px;
  padding-top: 20px;
  background-color: #ffffff;
  border-radius: 40px;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const ListWrapItem = styled.Text`
  font-size: 30px;
  line-height: 30px;
  color: #00D0A4;
  margin-bottom: 40px;
`;

export default App;