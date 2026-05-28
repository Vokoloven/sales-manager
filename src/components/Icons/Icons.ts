import { memo } from 'react';
import ArrowDown from './ArrowDown';
import ArrowLeft from './ArrowLeft';
import ArrowUp from './ArrowUp';
import CalendarDate from './CalendarDate';
import ChevronLeft from './ChevronLeft';
import Collapse from './Collapse';
import Expand from './Expand';
import Feeds from './Feeds';
import FilterClear from './FilterClear';
import First from './First';
import Google from './Google';
import HidePassword from './HidePassword';
import Home from './Home';
import LogOut from './LogOut';
import ShowPassword from './ShowPassword';
import Sortable from './Sortable';

const Icons = {
  ArrowLeft: memo(ArrowLeft),
  HidePassword: memo(HidePassword),
  ShowPassword: memo(ShowPassword),
  Home: memo(Home),
  Google: memo(Google),
  LogOut: memo(LogOut),
  Feeds: memo(Feeds),
  ArrowDown: memo(ArrowDown),
  ArrowUp: memo(ArrowUp),
  Sortable: memo(Sortable),
  FilterClear: memo(FilterClear),
  CalendarDate: memo(CalendarDate),
  First: memo(First),
  ChevronLeft: memo(ChevronLeft),
  Expand: memo(Expand),
  Collapse: memo(Collapse)
} as const;

export { Icons };
