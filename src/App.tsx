import * as React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { extendTheme, styled } from "@mui/material/styles";
import { AppProvider, Navigation } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { PageContainer } from "@toolpad/core/PageContainer";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import Grid from "@mui/material/Grid";
import AddUser from "./pages/AddUser";
import SearchUser from "./pages/SearchUser";
import UserList from "./pages/UserList";
import TotalCollection from "./pages/TotalCollection";



const NAVIGATION: Navigation = [
  { segment: "total-collection", title: "Total Collection", icon: <DashboardIcon /> },
  { segment: "add-user", title: "Add User", icon: <PersonAddAltIcon /> },
  { segment: "search-user", title: "Search User", icon: <PersonSearchIcon /> },
  { segment: "user-list", title: "User List", icon: <RecentActorsIcon /> },
];

const demoTheme = extendTheme({
  colorSchemes: { light: true, dark: true },
  colorSchemeSelector: "class",
  breakpoints: { values: { xs: 0, sm: 600, md: 600, lg: 1200, xl: 1536 } },
});

const Skeleton = styled("div")<{ height: number }>(({ theme, height }) => ({
  backgroundColor: theme.palette.action.hover,
  borderRadius: theme.shape.borderRadius,
  height,
  content: '" "',
}));

export default function App(props: any) {
  return (
    <AppProvider navigation={NAVIGATION} theme={demoTheme}>
      <DashboardLayout branding={{title:"Gulzar Masjid", logo: <></>, homeUrl: '/'}}>
              <Routes>
              <Route path="/" element={<Navigate to="/total-collection" />} />
                <Route path="/total-collection" element={<TotalCollection />} />
                <Route path="/add-user" element={<AddUser/>} />
                <Route path="/search-user" element={<SearchUser/>} />
                <Route path="/user-list" element={<UserList/>} />
                <Route path="*" element={<h1>404 - Page Not Found</h1>} />
              </Routes>
      </DashboardLayout>
    </AppProvider>
  );
}

