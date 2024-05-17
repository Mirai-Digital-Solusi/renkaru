import React from "react";

import { Icon } from "@chakra-ui/react";
import {
  MdList,
  MdHome,
  MdLock,
  MdSource,
  MdGroup,
} from "react-icons/md";

// Admin Imports
import MainDashboard from "views/admin/default";
import ServiceTables from "views/admin/servicesTables";
import FleetTables from "views/admin/fleetsTables";

// Auth Imports
import SignInCentered from "views/auth/signIn";


const routes = [
  {
    name: "Dashboard",
    layout: "/admin",
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
    path: "/dashboard",
    component: MainDashboard,
    AuthRequired: true,
  },
  // {
  //   name: "End of Days",
  //   layout: "/admin",
  //   icon: <Icon as={MdEventBusy} width="20px" height="20px" color="inherit" />,
  //   path: "/end-of-day",
  //   component: EndOfDayTables,
  //   AuthRequired: false,
  // },
  {
    name: "Services",
    layout: "/admin",
    icon: <Icon as={MdSource} width="20px" height="20px" color="inherit" />,
    path: "/services",
    component: ServiceTables,
    AuthRequired: true,
  },
  {
    name: "Fleets",
    layout: "/admin",
    icon: <Icon as={MdList} width="20px" height="20px" color="inherit" />,
    path: "/fleets",
    component: FleetTables,
    AuthRequired: true,
  },
  {
    name: "Sign In",
    layout: "/auth",
    path: "/sign-in",
    icon: <Icon as={MdLock} width="20px" height="20px" color="inherit" />,
    component: SignInCentered,
    AuthRequired: false,
  },
];

export default routes;
