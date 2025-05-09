import React from 'react';
import { Menu } from 'react-admin';
import { useLocation } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import EventIcon from '@mui/icons-material/Event';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import { getMenuItemStyle } from './menuStyles';

const CustomMenu = () => {
  const location = useLocation();
  const theme = useTheme();

  const getItemStyle = (path) => getMenuItemStyle(theme, location.pathname === path);

  return (
    <Menu>
      <Menu.Item to="/" primaryText="Inicio" leftIcon={<DashboardIcon />} sx={getItemStyle('/')} />
      <Menu.Item to="/usuarios" primaryText="Usuarios" leftIcon={<PeopleIcon />} sx={getItemStyle('/usuarios')} />
      <Menu.Item to="/reservas" primaryText="Reservas" leftIcon={<EventIcon />} sx={getItemStyle('/reservas')} />
      <Menu.Item to="/espacios" primaryText="Espacios" leftIcon={<MeetingRoomIcon />} sx={getItemStyle('/espacios')} />
      <Menu.Item to="/fechas-bloqueadas" primaryText="Feriados" leftIcon={<EventBusyIcon />} sx={getItemStyle('/fechas-bloqueadas')} />
    </Menu>
  );
};

export default CustomMenu;
