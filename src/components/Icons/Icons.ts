import { memo } from 'react';
import ArrowDown from './ArrowDown';
import ArrowLeft from './ArrowLeft';
import ArrowUp from './ArrowUp';
import CalendarDate from './CalendarDate';
import ChevronLeft from './ChevronLeft';
import Close from './Close';
import Collapse from './Collapse';
import Delete from './Delete';
import Edit from './Edit';
import Expand from './Expand';
import Feeds from './Feeds';
import FilterClear from './FilterClear';
import First from './First';
import Google from './Google';
import Chat from './Google copy';
import HidePassword from './HidePassword';
import Home from './Home';
import LogOut from './LogOut';
import Moon from './Moon';
import Plus from './Plus';
import ShowPassword from './ShowPassword';
import Sortable from './Sortable';
import Sun from './Sun';
import ThreeDots from './ThreeDots';

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
  Collapse: memo(Collapse),
  ThreeDots: memo(ThreeDots),
  Edit: memo(Edit),
  Delete: memo(Delete),
  Chat: memo(Chat),
  Close: memo(Close),
  Plus: memo(Plus),
  Moon: memo(Moon),
  Sun: memo(Sun)
} as const;

export { Icons };
