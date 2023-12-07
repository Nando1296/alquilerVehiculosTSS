import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { VscDebugStart } from "react-icons/vsc";
import { TfiBarChart } from "react-icons/tfi";
import { HiMiniTableCells } from "react-icons/hi2";

export const SidebarData = [
  {
    title: 'Inicio',
    path: '/',
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
  },

  {
    title: 'Reporte',
    path: '/Reporte',
    icon: <TfiBarChart />,
    cName: 'nav-text'
  },

  {
    title: 'Resultados Anteriores',
    path: '/ResultadosAnteriores',
    icon:<HiMiniTableCells />,
    cName: 'nav-text'
  }
];