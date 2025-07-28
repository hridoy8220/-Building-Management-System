import {
  createBrowserRouter,
  RouterProvider,
} from "react-router"; 

import Root from "./Root";
import Home from "../Page/Home";
import Login from "../Page/Login";
import Register from "../Page/Register";
import Apartments from "../Page/Apartments";
import PrivateRout from "./PrivateRout";
import Dashboard from "../Component/Dashboard";
import MyProfile from "../Component/MyProfile";
import AgreementRequest from "../Component/AgreementRequest";
import MannageMember from "../Component/MannageMember";
import MakeAnnouncement from "../Component/MakeAnnouncement";
import Announcement from "../Component/Announcement";
import ManageCupon from "../Component/ManageCupon";
import MakePayment from "../Component/MakePayment";
import PaymentStory from "../Component/PaymentStory";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "login",
        element: <Login />
      },
      {
        path: "register",
        element: <Register />
      },
      {
        path: "apartments",
        element: <Apartments />
      },
      {
        path: "dashboard",
        element: (
          <PrivateRout>
            <Dashboard />
          </PrivateRout>
        ),
        children: [
          {
            path: "profile",
            element: <MyProfile />
          },
          {
            path:"agreementRequest",
            element:<AgreementRequest></AgreementRequest>
          },
          {
            path:"manage-members",
            element:<MannageMember></MannageMember>
          },
          {
            path:"make-announcement",
            element:<MakeAnnouncement></MakeAnnouncement>
          },
          {
            path:"announcements",
            element:<Announcement></Announcement>
          },
          {
            path:"manage-coupons",
            element:<ManageCupon></ManageCupon>
          },
          {
            path:"make-payment",
            element:<MakePayment></MakePayment>

          },
          {
            path:"payment-history",
            element:<PaymentStory></PaymentStory>
          }
        ]
      }
    ]
  }
]);
