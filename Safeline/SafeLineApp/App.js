import React from 'react';

import SwitchNavigation from "./Navigation/SwitchNavigation";

import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Remote debugger']);

export default function App() {

  global.instance = 'http://192.168.1.25:80/api/';

  return (
      <SwitchNavigation/>
  );
}
