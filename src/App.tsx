import React from 'react';
import { DatePicker } from 'antd';
import "./App.css";
import 'bootstrap/dist/css/bootstrap.css';

import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';

import Navbar from "./components/Navbar";


function App() {
  return (
    <div>
      <Navbar />
    </div>
  );
}



export default App