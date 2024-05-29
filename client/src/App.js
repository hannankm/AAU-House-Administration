// Import necessary dependencies
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signin from "./Pages/Common_Pages/Signin";
import Signup from "./Pages/Common_Pages/Signup";
import HouseAds from "./Pages/Applicant/house_ads";
import AddHouse from "./Pages/Head_of_Housing/add_house";
import Home from "./Pages/home";
import { AuthProvider } from "./contexts/AuthContext";
import House from "./Pages/Head_of_Housing/houses";
import PostAd from "./Pages/Head_of_Housing/post_ad";
import DirectorAuthorizationPage from "./Pages/Facility_Director/view_house_ad";
import PresidentAuthorizationPage from "./Pages/President/view_ads";
import Ads from "./Pages/Head_of_Housing/view_ads";
import AdDetail from "./Pages/Head_of_Housing/viewAd";
import AdDetails from "./Pages/Facility_Director/view Ad";
import AdDetails2 from "./Pages/President/view_ad";
import ApplicationPage from "./Pages/Applicant/application_form";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/applicant/house_ads" element={<HouseAds />} />
        <Route path="/head/houses" element={<House />} />
        <Route path="/head/house_ads" element={<Ads />} />
        <Route path="/head/add_house" element={<AddHouse />} />
        <Route path="/head/post_ad" element={<PostAd />} />
        <Route path="/director/ads" element={<DirectorAuthorizationPage />} />
        <Route path="/president/ads" element={<PresidentAuthorizationPage />} />
        <Route path="/head/ad/:id" element={<AdDetail />} />
        <Route path="/director/adDetails/:id" element={<AdDetails />} />
        <Route path="/president/adDetails/:id" element={<AdDetails2 />} />
        <Route path="/application/:houseAdId" element={<ApplicationPage />} />

        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
