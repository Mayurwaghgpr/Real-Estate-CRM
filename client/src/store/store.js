import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import teamSlice from "./teamSlice";
import leadsSlice from "./leadsSlice";
import propertiesSlice from "./propertiesSlice";
import followupsSlice from "./followupsSlice";
import dealsSlice from "./dealsSlice";
export default configureStore({
  reducer: {
    auth: authSlice,
    team: teamSlice,
    leads: leadsSlice,
    properties: propertiesSlice,
    followups: followupsSlice,
    deals: dealsSlice,
  },
});
