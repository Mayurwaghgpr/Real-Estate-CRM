import CalendarWidget from "./components/CalendarWidget";
import DashboardHeader from "./components/DashboardHeader";
import DealsMiniKanban from "./components/DealsMiniKanban";
import DealsPipelineChart from "./components/DealsPipelineChart";
import FollowUpsWidget from "./components/FollowUpsWidget";
import LeadAnalyticsChart from "./components/LeadAnalyticsChart";
import RecentActivities from "./components/RecentActivities";
import SummaryCards from "./components/SummaryCards";

const Dashboard = () => {
  return (
    <div className=" flex flex-col h-full p-6 space-y-6 mb-20">
      <DashboardHeader />
      <SummaryCards />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LeadAnalyticsChart />
        <DealsPipelineChart />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <FollowUpsWidget />
        <DealsMiniKanban />
        <CalendarWidget />
      </div>
      <RecentActivities />
    </div>
  );
};

export default Dashboard;
