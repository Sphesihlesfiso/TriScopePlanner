import { NavBar } from "@/pages/layouts/Navbar";
import { TaskHolder } from "@/components/TaskHolder";
import { useState } from "react";

export const Home = () => {
  const [refreshKey, setRefreshKey] = useState(0);
  const triggerRefresh = () => setRefreshKey((k) => k + 1);

  return (
    <div>
      <NavBar onRefresh={triggerRefresh} />
      <div className="p-6">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
          <TaskHolder
            scope="Daily"
            due="Due Today"
            refreshKey={refreshKey}
            onRefresh={triggerRefresh}
          />
          <TaskHolder
            scope="Weekly"
            due="Due this week"
            refreshKey={refreshKey}
            onRefresh={triggerRefresh}
          />
          <TaskHolder
            scope="Monthly"
            due="Due later this month"
            refreshKey={refreshKey}
            onRefresh={triggerRefresh}
          />
        </div>
      </div>
    </div>
  );
};
