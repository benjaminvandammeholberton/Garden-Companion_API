import ModuleHeader from "../features/dashboard-modules/ModuleHeader";
import dashboardModulesList from "../features/dashboard-modules/dashboardModulesList";

const Dashboard = () => {
  return (
    <div>
      <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-5 w-full">
        {dashboardModulesList.map((module) => {
          return (
            <div
              key={module.id}
              className="
              h-[350px]
              w-[370px]
              bg-white
              opacity-90
              rounded-3xl
              "
            >
              <div className="relative w-full h-full overflow-hidden">
                <ModuleHeader title={module.title} />
                <module.component />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
