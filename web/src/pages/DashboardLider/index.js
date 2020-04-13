import React from 'react';

import Header from '../../components/Header';
import MenuLateral from '../../components/MenuLateral';

import './styles.css';

export default function DashboardLider() {
  return (
    <div className="dashboardLider">
      <Header />
      <MenuLateral />
      <main className="mainContainer" />
    </div>
  );
}