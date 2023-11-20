import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { VscDebugStart } from "react-icons/vsc";

export const SidebarData = [
  {
    title: 'Inicio',
    path: '/Inicio',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'Vehiculos',
    path: '/Vehiculos',
    icon: <FaIcons.FaCarAlt />,
    cName: 'nav-text'
  },
  {
    title: 'Renta',
    path: '/Renta',
    icon: <FaIcons.FaMoneyBill />,
    cName: 'nav-text'
  },
  {
    title: 'Dias',
    path: '/Dias',
    icon: <FaIcons.FaCalendarAlt />,
    cName: 'nav-text'
  },
  {
    title: 'Costos',
    path: '/Costos',
    icon: <FaIcons.FaMoneyBill />,
    cName: 'nav-text'
  },
  {
    title: 'Simular',
    path: '/Simular',
    icon: <VscDebugStart />,
    cName: 'nav-text'
  }
];