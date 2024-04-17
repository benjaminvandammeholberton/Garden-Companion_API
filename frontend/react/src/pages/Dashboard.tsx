import Seedlings from "./dashboard-modules/Seedlings";
import Areas from "./dashboard-modules/Areas";
import Forecast from "./dashboard-modules/Forecast";
import QuickActions from "./dashboard-modules/QuickActions";
import Recommandations from "./dashboard-modules/Recommandations";
import ToDoList from "./dashboard-modules/ToDoList";

const Dashboard = () => {
  const modules = [
    QuickActions,
    Areas,
    ToDoList,
    Seedlings,
    Forecast,
    Recommandations,
  ];

  return (
    <div className="flex justify-center">
      <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-5 w-full z-0">
        {modules.map((Module, index) => {
          return (
            <div
              key={index}
              className="bg-white opacity-90 h-[350px] py-1 px-2s w-[370px] rounded-3xl flex flex-col border items-center"
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
