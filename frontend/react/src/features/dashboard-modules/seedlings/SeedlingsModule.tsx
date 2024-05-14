// import addIcon from "../../../assets/dashboard-modules/seedlings/add.png";
// import sortIcon from "../../../assets/dashboard-modules/seedlings/sort.png";
// import useSort from "../../../hooks/useSort";
// import useAdd from "../../../hooks/useAdd";
// import backIcon from "../../../assets/dashboard-modules/areas/back.png";
// import SeedlingsAdd from "./SeedlingsAdd";
// import SeedlingsList from "./SeedlingsList";
// import { useState } from "react";

// const seedlingsData = {};

// const SeedlingsModule = () => {
//   const [isSortOpen, toggleSort, sortedBy, handleClickSort] =
//     useSort("date ascending");
//   const [addOpen, handleClickAdd] = useAdd();
//   const [seedlings, setSeedlings] = useState(seedlingsData);

//   const sortChoices = [
//     ["date d'ajout (ancien en tête)", "date ascending"],
//     ["date d'ajout (récent en tête)", "date descending"],
//     ["nom (a - z)", "name ascending"],
//     ["nom (z - a)", "name descending"],
//   ];
//   return (
//     <div>
//       <div
//         onClick={handleClickAdd}
//         className={`absolute top-2 ${
//           addOpen ? "right-4" : "right-2"
//         } cursor-pointer`}
//       >
//         <img
//           className={addOpen ? "w-8 h-8" : "w-10 h-10"}
//           src={addOpen ? backIcon : addIcon}
//           alt=""
//         />
//       </div>
//       <div
//         className={`absolute top-2 left-2 cursor-pointer ${
//           addOpen ? "hidden" : "visible"
//         }`}
//         onClick={toggleSort}
//       >
//         <img className="w-10 h-10" src={sortIcon} alt="" />
//       </div>
//       <div className={`ml-3 ${isSortOpen ? "visible" : "hidden"}`}>
//         Trier par :
//         <ul className="ml-5">
//           {sortChoices.map((choice, index) => {
//             return (
//               <li
//                 key={index}
//                 className="cursor-pointer hover:underline"
//                 onClick={() => {
//                   handleClickSort(choice[1]);
//                 }}
//               >
//                 - {choice[0]}
//               </li>
//             );
//           })}
//         </ul>
//       </div>

//       {addOpen ? (
//         <SeedlingsAdd {...{ setSeedlings, handleClickAdd }} />
//       ) : (
//         <SeedlingsList {...{ sortedBy, seedlings, handleClickSort }} />
//       )}
//     </div>
//   );
// };
// export default SeedlingsModule;

const SeedlingsModule = () => {
  return <div></div>;
};

export default SeedlingsModule;
