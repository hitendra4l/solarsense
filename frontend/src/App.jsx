import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import "./App.css";
import LandingPage from "./pages/landing/LandingPage";
import LoginPage from "./pages/login/LoginPage";
import SignUpPage from "./pages/signup/SignUpPage";
import AboutPage from "./pages/about/AboutPage";
import FaqPage from "./pages/faq/FaqPage";
import ProfilePage from "./pages/profile/ProfilePage";
import CreateNewProject from "./pages/newProject/CreateNewProject";
import AllProjects from "./pages/allProjects/AllProjects";
import ProjectOverview from "./pages/projectOverview/ProjectOverview";
import MeteoDataPage from "./pages/meteoData/MeteoDataPage";
import PageLayout from "./components/PageLayout";
import EnergyPage from "./pages/energy/EnergyPage";
import FinancePage from "./pages/finance/FinancePage";
import ReportPage from "./pages/report/ReportPage";
import EnergyProvider from "./contexts/EnergyProvider";
import FinanceProvider from "./contexts/FinanceProvider";

export default function App() {
  return (
    <Router>
      <div className="font-nunito">
        <Routes>
          <Route index path="/" element={<LandingPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/create-new-project" element={<CreateNewProject />} />
          <Route path="/all-projects" element={<AllProjects />} />

          <Route path="/project/:projectId" element={<PageLayout />}>
            <Route
              path="project-overview"
              element={<ProjectOverview />}
            ></Route>
            <Route path="meteo-data" element={<MeteoDataPage />}></Route>
            <Route
              path="energy-estimation"
              element={
                <EnergyProvider>
                  <FinanceProvider>
                    <EnergyPage />
                  </FinanceProvider>
                </EnergyProvider>
              }
            ></Route>
            <Route
              path="finance"
              element={
                <EnergyProvider>
                  <FinanceProvider>
                    <FinancePage />
                  </FinanceProvider>
                </EnergyProvider>
              }
            ></Route>
            <Route
              path="generate-report"
              element={
                <EnergyProvider>
                  <FinanceProvider>
                    <ReportPage />
                  </FinanceProvider>
                </EnergyProvider>
              }
            ></Route>
          </Route>
        </Routes>
        <Toaster />
      </div>
    </Router>
  );
}
