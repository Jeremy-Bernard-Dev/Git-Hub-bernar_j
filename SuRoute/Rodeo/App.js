import React from 'react';
import Navigation from "./Navigation/NavigationSwitch"

export default function App() {

  global.instance = 'http://192.168.1.15:8000/api/';

  return (
      <Navigation/>
  );
}
