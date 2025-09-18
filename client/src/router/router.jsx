import { Routes, Route } from "react-router";
import { lazy, Suspense } from "react";
import ProtectedRoute from "../components/utils/ProtectedRoute";
import Layout from "../layout/Layout";

import { ImSpinner2 } from "react-icons/im";
import EditFollowup from "../pages/Followups_management/EditFollowup";

// Lazy imports
const Dashboard = lazy(() => import("../pages/Dashboard"));
const LeadsManager = lazy(() =>
  import("../pages/Leads Management/LeadsManager")
);
const PropertyManager = lazy(() =>
  import("../pages/Property Management /PropertyManager")
);
const TeamManager = lazy(() => import("../pages/Team Management/TeamManager"));
const AddLead = lazy(() => import("../pages/Leads Management/AddNewLead"));
const Login = lazy(() => import("../pages/Auth/Login"));
const CompanyRegistration = lazy(() =>
  import("../pages/Auth/CompanyRegistration")
);
const UserTable = lazy(() => import("../pages/Team Management/UserTable"));
const AddNewUser = lazy(() => import("../pages/Team Management/AddNewUser"));
const AddProperty = lazy(() =>
  import("../pages/Property Management /AddProperty")
);
const UserProfile = lazy(() => import("../pages/Auth/UserProfile"));
const LeadProfile = lazy(() => import("../pages/Leads Management/LeadProfile"));
const DisposedLeadsList = lazy(() =>
  import("../pages/Leads Management/DiposedLeadsList")
);
const LeadsList = lazy(() => import("../pages/Leads Management/LeadsList"));
const EditLead = lazy(() => import("../pages/Leads Management/EditLead"));
const AddFollowUp = lazy(() =>
  import("../pages/Followups_management/AddFollowUp")
);
const PropertyDetails = lazy(() =>
  import("../pages/Property Management /PropertyDetails")
);
const PropertyList = lazy(() =>
  import("../pages/Property Management /PropertiesList")
);
const ArchivedProperties = lazy(() =>
  import("../pages/Property Management /ArchivedProperties")
);
const EditProperty = lazy(() =>
  import("../pages/Property Management /EditProperty")
);
const Deals_Manager = lazy(() =>
  import("../pages/Deals_Management/Deals_Manager")
);
const AddDeal = lazy(() => import("../pages/Deals_Management/AddDeal"));
const DealsKanbanBoard = lazy(() =>
  import("../pages/Deals_Management/DealsKanbanBoard")
);
const LeadExportImport = lazy(() =>
  import("../components/utils/LeadsBulkImport")
);
const FollowupsManager = lazy(() =>
  import("../pages/Followups_management/FollowupsManager")
);
const FollowupsDashboard = lazy(() =>
  import("../pages/Followups_management/FollowupsDashboard")
);
const ReopenDeal = lazy(() =>
  import("../pages/Deals_Management/components/ReopenDeal")
);
const DealDetails = lazy(() => import("../pages/Deals_Management/DealDetails"));
const FolloupsList = lazy(() =>
  import("../pages/Followups_management/FolloupsList")
);
const TodaysFollowups = lazy(() =>
  import("../pages/Followups_management/TodaysFolloups")
);
const UpcomingFollowups = lazy(() =>
  import("../pages/Followups_management/UpcommingFollowups")
);
const Analytics = lazy(() => import("../pages/Followups_management/Analytics"));

function Router() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen">
          <ImSpinner2 className="text-2xl animate-spin" />
        </div>
      }
    >
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/company/register" element={<CompanyRegistration />} />

        {/* Protected Routes inside Layout */}
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/user/profile"
            element={
              <ProtectedRoute>
                <UserProfile />
              </ProtectedRoute>
            }
          />

          {/* Leads Management */}
          <Route
            path="leads_management"
            element={
              <ProtectedRoute>
                <LeadsManager />
              </ProtectedRoute>
            }
          >
            <Route
              path=""
              element={
                <ProtectedRoute>
                  <LeadsList />
                </ProtectedRoute>
              }
            />
            <Route
              path="disposed/leads"
              element={
                <ProtectedRoute>
                  <DisposedLeadsList />
                </ProtectedRoute>
              }
            />
            <Route
              path="add_leads"
              element={
                <ProtectedRoute>
                  <AddLead />
                </ProtectedRoute>
              }
            />
            <Route
              path="edit_leads"
              element={
                <ProtectedRoute>
                  <EditLead />
                </ProtectedRoute>
              }
            />
            <Route
              path="lead/profile/:leadId"
              element={
                <ProtectedRoute>
                  <LeadProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path="import"
              element={
                <ProtectedRoute>
                  <LeadExportImport />
                </ProtectedRoute>
              }
            />
            <Route
              path="followup/:leadId"
              element={
                <ProtectedRoute>
                  <AddFollowUp />
                </ProtectedRoute>
              }
            />
          </Route>

          {/* Property Management */}
          <Route
            path="property_management"
            element={
              <ProtectedRoute>
                <PropertyManager />
              </ProtectedRoute>
            }
          >
            <Route
              path=""
              element={
                <ProtectedRoute>
                  <PropertyList />
                </ProtectedRoute>
              }
            />
            <Route
              path="archived_properties"
              element={
                <ProtectedRoute>
                  <ArchivedProperties />
                </ProtectedRoute>
              }
            />
            <Route
              path="add_property"
              element={
                <ProtectedRoute>
                  <AddProperty />
                </ProtectedRoute>
              }
            />
            <Route
              path="edit_property"
              element={
                <ProtectedRoute>
                  <EditProperty />
                </ProtectedRoute>
              }
            />
            <Route
              path="property/details/:propertyId"
              element={
                <ProtectedRoute>
                  <PropertyDetails />
                </ProtectedRoute>
              }
            />
          </Route>

          {/* Team Management */}
          <Route
            path="team_management"
            element={
              <ProtectedRoute>
                <TeamManager />
              </ProtectedRoute>
            }
          >
            <Route
              path=""
              element={
                <ProtectedRoute>
                  <UserTable />
                </ProtectedRoute>
              }
            />
            <Route
              path="add_user"
              element={
                <ProtectedRoute>
                  <AddNewUser />
                </ProtectedRoute>
              }
            />
          </Route>

          {/* Deals Management */}
          <Route
            path="deals_management"
            element={
              <ProtectedRoute>
                <Deals_Manager />
              </ProtectedRoute>
            }
          >
            <Route
              path=""
              element={
                <ProtectedRoute>
                  <DealsKanbanBoard />
                </ProtectedRoute>
              }
            />
            <Route
              path="create_deal/:leadId/:propertyId"
              element={
                <ProtectedRoute>
                  <AddDeal />
                </ProtectedRoute>
              }
            />
            <Route
              path="deal/:dealId/details"
              element={
                <ProtectedRoute>
                  <DealDetails />
                </ProtectedRoute>
              }
            />
            <Route
              path="deal/:dealId/reopen"
              element={
                <ProtectedRoute>
                  <ReopenDeal />
                </ProtectedRoute>
              }
            />
          </Route>

          {/* Followups Management */}
          <Route
            path="followups_management"
            element={
              <ProtectedRoute>
                <FollowupsManager />
              </ProtectedRoute>
            }
          >
            <Route
              path=""
              element={
                <ProtectedRoute>
                  <FollowupsDashboard />
                </ProtectedRoute>
              }
            >
              <Route
                path=""
                element={
                  <ProtectedRoute>
                    <FolloupsList />
                  </ProtectedRoute>
                }
              />
              <Route
                path="todays_followups"
                element={
                  <ProtectedRoute>
                    <TodaysFollowups />
                  </ProtectedRoute>
                }
              />
              <Route
                path="upcomming"
                element={
                  <ProtectedRoute>
                    <UpcomingFollowups />
                  </ProtectedRoute>
                }
              />
              <Route
                path="analytics"
                element={
                  <ProtectedRoute>
                    <Analytics />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route
              path="update/:followupId"
              element={
                <ProtectedRoute>
                  <EditFollowup />
                </ProtectedRoute>
              }
            />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
}

export default Router;
