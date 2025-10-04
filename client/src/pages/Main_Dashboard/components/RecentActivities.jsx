const activities = [
  { message: "New lead added: Rajesh Kumar", time: "2 hrs ago" },
  { message: "Deal closed: Green Valley Project", time: "5 hrs ago" },
  { message: "Follow-up completed: Sneha Patel", time: "Yesterday" },
];

const RecentActivities = () => (
  <div className=" p-4 rounded-xl border ">
    <h2 className="text-lg font-semibold  mb-4">Recent Activities</h2>
    <ul className="space-y-3">
      {activities.map((a, i) => (
        <li key={i} className="flex justify-between text-gray-400">
          <p>{a.message}</p>
          <span className="text-sm text-gray-500">{a.time}</span>
        </li>
      ))}
    </ul>
  </div>
);

export default RecentActivities;
