import React from "react";

import { Icon } from "@chakra-ui/react";
import {
  MdEmojiTransportation,
  MdHome,
  MdLock,
  MdSource,
  MdBusiness,
  MdQuestionAnswer,
  MdDesignServices,
} from "react-icons/md";

// Admin Imports
import MainDashboard from "views/admin/default";
import ServiceTables from "views/admin/servicesTables";
import RentalOrderTables from "views/admin/rentalsOrderTables";
import FleetTables from "views/admin/fleetsTables";
import FaqTables from "views/admin/faqsTables";
import TestimonialTables from "views/admin/testimonialsTables";
import ContactData from "views/admin/contactData";

// Public Imports
import HomePublic from "views/main/home";

// Auth Imports
import SignInCentered from "views/auth/signIn";


const routes = [
  {
    name: "Home",
    layout: "/main",
    path: "/home",
    icon: <Icon as={MdLock} width="20px" height="20px" color="inherit" />,
    component: HomePublic,
    AuthRequired: false,
  },
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
    name: "Rentals Order",
    layout: "/admin",
    icon: <Icon as={MdBusiness} width="20px" height="20px" color="inherit" />,
    path: "/rental-order",
    component: RentalOrderTables,
    AuthRequired: true,
  },
  {
    name: "Fleets",
    layout: "/admin",
    icon: <Icon as={MdEmojiTransportation} width="20px" height="20px" color="inherit" />,
    path: "/fleets",
    component: FleetTables,
    AuthRequired: true,
  },
  {
    name: "Faqs",
    layout: "/admin",
    icon: <Icon as={MdQuestionAnswer} width="20px" height="20px" color="inherit" />,
    path: "/faqs",
    component: FaqTables,
    AuthRequired: true,
  },
  {
    name: "Testimonials",
    layout: "/admin",
    icon: <Icon as={MdDesignServices} width="20px" height="20px" color="inherit" />,
    path: "/testimonials",
    component: TestimonialTables,
    AuthRequired: true,
  },
  {
    name: "Contact",
    layout: "/admin",
    icon: <Icon as={MdBusiness} width="20px" height="20px" color="inherit" />,
    path: "/contact",
    component: ContactData,
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
