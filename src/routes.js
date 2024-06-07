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
  MdBookOnline,
} from "react-icons/md";

// Admin Imports
import MainDashboard from "views/admin/default";
import ServiceTables from "views/admin/servicesTables";
import RentalOrderTables from "views/admin/rentalsOrderTables";
import FleetTables from "views/admin/fleetsTables";
import FaqTables from "views/admin/faqsTables";
import TestimonialTables from "views/admin/testimonialsTables";
import ContactData from "views/admin/contactData";
import AboutData from "views/admin/aboutData";

// Public Imports
import HomePublic from "views/main/home";
import ServicePublic from "views/main/services";
import FleetPublic from "views/main/fleets";
import FaqPublic from "views/main/faqs";
import AboutUsPublic from "views/main/aboutUs";
import TermPublic from "views/main/terms";

// Auth Imports
import SignInCentered from "views/auth/signIn";


const routes = [
  // Routes For Main Section
  {
    name: "Home",
    layout: "/main",
    path: "/home",
    icon: <Icon as={MdLock} width="20px" height="20px" color="inherit" />,
    component: HomePublic,
    AuthRequired: false,
  },
  {
    name: "Services",
    layout: "/main",
    path: "/services",
    icon: <Icon as={MdLock} width="20px" height="20px" color="inherit" />,
    component: ServicePublic,
    AuthRequired: false,
  },
  {
    name: "Fleets",
    layout: "/main",
    path: "/fleets",
    icon: <Icon as={MdLock} width="20px" height="20px" color="inherit" />,
    component: FleetPublic,
    AuthRequired: false,
  },
  {
    name: "Fleets",
    layout: "/main",
    path: "/fleets",
    icon: <Icon as={MdLock} width="20px" height="20px" color="inherit" />,
    component: FleetPublic,
    AuthRequired: false,
  },
  {
    name: "Term",
    layout: "/main",
    path: "/terms",
    icon: <Icon as={MdLock} width="20px" height="20px" color="inherit" />,
    component: TermPublic,
    AuthRequired: false,
  },
  {
    name: "Faq",
    layout: "/main",
    path: "/faqs",
    icon: <Icon as={MdLock} width="20px" height="20px" color="inherit" />,
    component: FaqPublic,
    AuthRequired: false,
  },
  {
    name: "AboutUs",
    layout: "/main",
    path: "/about-us",
    icon: <Icon as={MdLock} width="20px" height="20px" color="inherit" />,
    component: AboutUsPublic,
    AuthRequired: false,
  },

  // Routes For Admin Section

  {
    name: "Dashboard",
    layout: "/admin",
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
    path: "/dashboard",
    component: MainDashboard,
    AuthRequired: true,
  },
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
    icon: <Icon as={MdBookOnline} width="20px" height="20px" color="inherit" />,
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
    name: "About",
    layout: "/admin",
    icon: <Icon as={MdBusiness} width="20px" height="20px" color="inherit" />,
    path: "/about",
    component: AboutData,
    AuthRequired: true,
  },
  // Routes For Auth Section
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
