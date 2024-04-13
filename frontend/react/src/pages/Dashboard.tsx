import Areas from "./dashboard-modules/Areas";
import Forecast from "./dashboard-modules/Forecast";
import QuickActions from "./dashboard-modules/QuickActions";
import Recommandations from "./dashboard-modules/Recommandations";
import ToDoList from "./dashboard-modules/ToDoList";

const Dashboard = () => {
  const modules = [QuickActions, Forecast, Recommandations, ToDoList, Areas];

  return (
    <div className="flex justify-center">
      <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-5 w-full z-0">
        {modules.map((Module, index) => {
          return (
            <div
              key={index}
              className="bg-white opacity-90 min-h-[400px] lg:min-w-[370px] rounded-3xl flex flex-col border items-center p-5"
            >
              <Module />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
