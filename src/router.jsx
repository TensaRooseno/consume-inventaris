import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Login from "./pages/Profile/Login";
import Profile from "./pages/Profile/Profile";
import Dashboard from "./pages/Dashboard";
import Stuff from "./pages/Stuff";
import TrashStuff from "./pages/TrashStuff";
import Inbound from "./pages/Inbound/index";
import InboundCreate from "./pages/Inbound/Create";
import Lending from "./pages/Lending/Lending";
import LendingCreate from "./pages/Lending/create";

export const router = createBrowserRouter([
    { path: '/', element: <App /> },
    { path: '/login', element: <Login /> },
    { path: '/profile', element: <Profile /> },
    { path: '/dashboard', element: <Dashboard /> },
    { path: '/stuff', element: <Stuff /> },
    { path: '/stuff/trash', element: <TrashStuff /> },
    { path: '/inbound-stuff', element: <Inbound /> },
    { path: '/inbound-stuff/create', element: <InboundCreate /> }, 
    { path: '/lending', element: <Lending /> },
    { path: '/lending/create', element: <LendingCreate /> }
]);
