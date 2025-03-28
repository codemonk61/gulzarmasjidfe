import * as React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { extendTheme } from "@mui/material/styles";
import { AppProvider, Navigation } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import RecentActorsIcon from "@mui/icons-material/RecentActors";
import AddUser from "./pages/AddUser";
import SearchUser from "./pages/SearchUser";
import UserList from "./pages/UserList";
import TotalCollection from "./pages/TotalCollection";
import MasjidIcon from "./components/MasjidIcon";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import AddExpendature from "./pages/AddExpendature";
import AllExpendature from "./pages/AllExpendature";
import CurrencyRupeeSharpIcon from '@mui/icons-material/CurrencyRupeeSharp';
import AddCircleOutlineSharpIcon from '@mui/icons-material/AddCircleOutlineSharp';


const NAVIGATION: Navigation = [
  { segment: "total-collection", title: "Total Collection", icon: <DashboardIcon sx={{ color: "#2f7d32" }} /> },
  { segment: "add-user", title: "Add User", icon: <PersonAddAltIcon sx={{ color: "#2f7d32" }} /> },
  { segment: "search-user", title: "Search User", icon: <PersonSearchIcon sx={{ color: "#2f7d32" }} /> },
  { segment: "user-list", title: "User List", icon: <RecentActorsIcon sx={{ color: "#2f7d32" }} /> },
  { segment: "add-expendature", title: "Add Expendature", icon: <AddCircleOutlineSharpIcon sx={{ color: "#2f7d32" }} /> },
  { segment: "all-expendature", title: "All Expendature", icon: <CurrencyRupeeSharpIcon sx={{ color: "#2f7d32" }} /> },
];

const demoTheme = extendTheme({
  colorSchemes: { light: true, dark: true },
  breakpoints: { values: { xs: 0, sm: 600, md: 600, lg: 1200, xl: 1536 } },
  components: {
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          color: "#2f7d32 !important",
        },
      },
    },
  },
});

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const auth = React.useContext(AuthContext);
  if (!auth?.isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return <>{children}</>;
}

export default function App(props: any) {
  return (
    <>
  
      <AuthProvider>
        <AppProvider navigation={NAVIGATION} theme={demoTheme}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<Navigate to="/total-collection" />} />
            <Route
              path="/*"
              element={
                <ProtectedRoute>
                  <DashboardLayout
                    branding={{ title: "Gulzar Masjid", logo: <MasjidIcon />, homeUrl: "/" }}
                    sx={{
                      "& .MuiTypography-root.MuiTypography-h6": {
                        color: "#2f7d32 !important",
                        fontFamily: "'Reem Kufi', Arial, sans-serif", 
                        fontSize: "1.5rem", 
                        fontWeight: 700, 
                      },
                      "& .MuiSvgIcon-root": { color: "#2f7d32" },
                    }}
                  >
                    <Routes>
                      <Route path="/total-collection" element={<TotalCollection />} />
                      <Route path="/add-user" element={<AddUser />} />
                      <Route path="/search-user" element={<SearchUser />} />
                      <Route path="/user-list" element={<UserList />} />
                      <Route path="/add-expendature" element={<AddExpendature />} />
                      <Route path="/all-expendature" element={<AllExpendature />} />
                      <Route path="*" element={<h1>404 - Page Not Found</h1>} />
                    </Routes>

                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
          </Routes>
        </AppProvider>
      </AuthProvider>
    </>
  );
}
