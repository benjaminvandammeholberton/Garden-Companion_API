import Seedlings from "./seedlings/SeedlingsModule";
import Areas from "./areas/components/AreasModule";
import Forecast from "./forecast/Forecast";
import ActionsModule from "./actions/ActionsModule";
import Recommandations from "./recommandations/Recommandations";
import ToDoList from "./todo-list/components/ToDoListModule";

const dashboardModulesList = [
  { id: 2, component: Areas, title: "Zones de Culture", helper: "" },
  {
    id: 1,
    component: ActionsModule,
    title: "Nouvelle action",
    helper: "",
  },
  {
    id: 4,
    component: Seedlings,
    title: "Mes semis en pot",
    helper: "",
  },
  {
    id: 3,
    component: ToDoList,
    title: "Liste de tâches",
    helper: "",
  },
  {
    id: 5,
    component: Forecast,
    title: "Prévisions météo",
    helper: "",
  },
  {
    id: 6,
    component: Recommandations,
    title: "Prêt à semer !",
    helper: "",
  },
];

export default dashboardModulesList;
