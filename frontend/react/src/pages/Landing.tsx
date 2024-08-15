import { Link } from "react-router-dom";

import dashboardScreenshot from "../assets/landing/screenshots/dashboard.png";
import forecastScreenshot from "../assets/landing/screenshots/forecast.png";
import managerLeftScreenshot from "../assets/landing/screenshots/manager-left.png";
import managerRightScreenshot from "../assets/landing/screenshots/manager-right.png";
import guideScreenshot from "../assets/landing/screenshots/guide.png";
import productionScreenshot from "../assets/landing/screenshots/production.png";

import carrotIcon from "../assets/landing/icons/carrot.png";
import chatBotIcon from "../assets/landing/icons/chatbot.png";
import eggplantIcon from "../assets/landing/icons/eggplant.png";
import forecastIcon from "../assets/landing/icons/forecast.png";
import guideIcon from "../assets/landing/icons/guide.png";
import managerIcon from "../assets/landing/icons/manager.png";
import moveUpIcon from "../assets/landing/icons/move-up.png";
import productionIcon from "../assets/landing/icons/production.png";
import sowingIcon from "../assets/landing/icons/sowing.png";
import toDoIcon from "../assets/landing/icons/todo.png";
import tomatoIcon from "../assets/landing/icons/tomato.png";
import useAuth from "../hooks/useAuth";

const Landing = () => {
  const [user, isLoading] = useAuth();
  if (isLoading) return <div>Chargement</div>;

  return (
    <div className="background text-zinc-900 p-5 md:pt-14 mx-auto">
      <div className="container mx-auto flex flex-col gap-32">
        <div className="flex flex-col gap-5 xl:gap-10">
          <div className="flex flex-col gap-5 ">
            <div className="flex flex-col gap-2">
              <h1
                className="text-6xl md:text-7xl text-right md:text-center font-bold"
                id="home"
              >
                Garden Companion
              </h1>
              <p className="text-2xl md:text-3xl text-right md:text-center md:ml-96">
                Cultivons l'abondance
              </p>
            </div>
            <div className="h-0 border-t border-zinc-900 w-1/3 mx-auto"></div>
            <div className="flex justify-center gap-10 md:gap-10 lg:gap-20">
              <button
                className=" font-bold border-b-2 border-transparent hover:border-black text-zinc-900 md:whitespace-nowrap text-lg lg:text-xl"
                role="button"
              >
                <Link to="/login">Se connecter</Link>
              </button>
              <button
                className=" font-bold border-b-2 border-transparent hover:border-black text-zinc-900 md:whitespace-nowrap text-lg lg:text-xl"
                role="button"
              >
                <Link to="/register">Démarrer gratuitement</Link>
              </button>
            </div>
          </div>

          <div className="flex flex-col 2xl:flex-row justify-between items-center gap-5 md:gap-10">
            <img
              className="2xl:w-3/4"
              src={dashboardScreenshot}
              alt="dashboard screenshot"
            />
            <div className="w-4/5 md:w-3/5 flex flex-col gap-5">
              <div className="flex justify-center gap-5">
                <img
                  className="w-9 md:w-12"
                  src={tomatoIcon}
                  alt="tomato icon"
                />
                <img
                  className="w-9 md:w-12"
                  src={eggplantIcon}
                  alt="tomato icon"
                />
                <img
                  className="w-9 md:w-12"
                  src={carrotIcon}
                  alt="tomato icon"
                />
              </div>
              <p className="text-justify text-xl md:text-2xl">
                Garden Companion est un tableau de bord complet qui donne aux
                amateurs de jardin potager, les outils et les informations
                nécessaires pour gérer leur espace de culture de manière
                efficace et efficiente.
              </p>
            </div>
          </div>
        </div>

        <main className="flex flex-col px-5 md:px-20 text-lg md:text-xl gap-24">
          <div className="flex flex-col gap-24">
            <h2
              className="text-center text-4xl md:text-5xl font-bold"
              id="features"
            >
              Fonctionnalités
            </h2>

            <div className="flex flex-col 2xl:flex-row justify-center items-center gap-10 xl:gap-20">
              <div className="lg:w-3/5 flex flex-col gap-5 items-center">
                <h3 className="text-center text-2xl md:text-3xl font-bold">
                  Gestionnaire de Plantes et <br /> d'Éspaces de Culture
                </h3>
                <img src={managerIcon} alt="manager icon" className="w-12" />
                <p className="text-justify">
                  Organisez et gérez efficacement des zones distinctes dans
                  votre jardin en créant des parcelles dédiées à différents
                  types de plantes ou d'usages. Attribuez ensuite à chaque
                  parcelle les légumes au fil de vos semis et plantations.
                </p>
                <p className="text-justify">
                  Tenez à jour ces informations en suivant le développement de
                  chaque culture, depuis le stade de semis jusqu'à la fin de
                  culture et enregistrez les quantités récoltées.
                </p>
              </div>
              <div className="flex 2xl:w-4/5">
                <img src={managerLeftScreenshot} alt="screenshot manager" />
                <img
                  className="hidden lg:block"
                  src={managerRightScreenshot}
                  alt="screenshot manager"
                />
              </div>
            </div>

            <div className="flex flex-col justify-center items-center gap-10 xl:gap-10">
              <div className="lg:w-3/5 flex flex-col gap-5 items-center">
                <h3 className="text-center text-2xl md:text-3xl font-bold">
                  Visualisation de la Production
                </h3>
                <img
                  src={productionIcon}
                  alt="production icon"
                  className="w-12"
                />
                <p className="text-justify">
                  Optimisez la gestion de votre jardin en ayant une constante
                  vue d'ensemble de chaque espace de culture de votre potager.
                  Lorsque vous enregistrez la première récolte d'un légume, la
                  timeline change de couleur, améliorant ainsi la visualisation.
                </p>
                <p className="text-justify">
                  À mesure que plusieurs saisons s'écoulent, vous développerez
                  une meilleure vision du temps nécessaire à chaque légume selon
                  la période de l'année. Cela contribuera à accroître
                  l'efficacité et les rendements de votre potager.
                </p>
              </div>
              <img
                className=""
                src={productionScreenshot}
                alt="screenshot production"
              />
            </div>

            <div className="flex flex-col 2xl:flex-row justify-center items-center 2xl:gap-20 gap-10">
              <img
                className="hidden 2xl:block w-1/3"
                src={forecastScreenshot}
                alt=""
              />
              <div className="lg:w-1/2 2xl:w-1/3 flex flex-col gap-5 items-center">
                <h3 className="text-center text-2xl md:text-3xl font-bold ">
                  Prévisions Météo
                </h3>
                <img src={forecastIcon} alt="forecast icon" className="w-12" />
                <p className="text-justify">
                  Restez informé sur la météo grâce à des prévisions pour votre
                  localisation. Planifiez vos activités de jardinage en toute
                  confiance.
                </p>
              </div>
              <img
                className="2xl:hidden sm:w-4/5 md:w-2/3 lg:w-1/2"
                src={forecastScreenshot}
                alt=""
              />
            </div>

            <div className="flex flex-col justify-center items-center gap-10">
              <div className="lg:w-3/5 flex flex-col gap-5 items-center">
                <h3 className="text-center text-2xl md:text-3xl font-bold">
                  Guide de Culture
                </h3>
                <img src={guideIcon} alt="guide icon" className="w-12" />
                <p className="text-justify">
                  Explorez notre guide de culture, une source complète consacrée
                  à une multitude de légumes. Il propose des descriptions ainsi
                  que des informations essentielles, telles que les périodes de
                  semis, les températures de germination, les besoins en eau,
                  etc. L'ensemble est présenté de manière concise et facilement
                  accessible pour une consultation rapide.
                </p>
              </div>
              <img className="" src={guideScreenshot} alt="" />
            </div>

            <div className="flex flex-col lg:flex-row justify-center items-center lg:items-start gap-20">
              <div className="md:w-4/5 lg:w-2/5 flex flex-col gap-5 items-center">
                <h3 className="text-center text-xl md:text-2xl font-bold">
                  To-Do List
                </h3>
                <img src={toDoIcon} alt="todo icon" className="w-12" />
                <p className="text-justify">
                  Restez organisé avec une liste de tâches spécifique au jardin
                  et suivez vos activités de jardinage.
                </p>
              </div>

              <div className="md:w-4/5 lg:w-2/5 flex flex-col gap-5 items-center">
                <h3 className="text-center text-xl md:text-2xl font-bold">
                  Assistant Spécialisé
                </h3>
                <img src={chatBotIcon} alt="chatbot icon" className="w-12" />
                <p className="text-justify">
                  Interagissez avec un chatbot compétent conçu pour répondre à
                  vos questions sur le jardinage, fournir des conseils et vous
                  assister en temps réel.
                </p>
              </div>

              <div className="md:w-4/5 lg:w-2/5 flex flex-col gap-5 items-center">
                <h3 className="text-center text-xl md:text-2xl font-bold">
                  Semis du moment
                </h3>
                <img src={sowingIcon} alt="sowing icon" className="w-12" />
                <p className="text-justify">
                  Identifiez rapidement les semis recommandés en fonction de la
                  date actuelle.
                </p>
              </div>
            </div>

            <div className="flex flex-col justify-center items-center gap-5">
              <h3 className="text-center text-xl md:text-2xl font-bold">
                Rejoignez la communauté !
              </h3>
              <button
                className=" bg-stone-700 hover:bg-stone-900 text-white text-lg lg:text-xl font-bold py-3 px-7 rounded-full"
                role="button"
              >
                Créez votre compte dès maintenant
              </button>
            </div>
          </div>

          <div className="h-0 border-t border-zinc-900 w-2/3 mx-auto"></div>

          <div className="flex flex-col gap-10">
            <h2
              className="text-center text-4xl md:text-5xl font-bold"
              id="about"
            >
              À propos
            </h2>
            <div className="flex flex-col gap-5 xl:w-2/3 mx-auto">
              <p className="text-justify">
                Se lancer dans le jardinage peut être intimidant pour les
                débutants, découragés par la multitude d'informations à
                assimiler et de paramètres à prendre en compte. Même pour les
                jardiniers plus expérimentés, rester organisé et optimiser la
                production peut devenir laborieux à mesure que le jardin potager
                grandit.
              </p>
              <p className="text-justify">
                <span className="font-bold">Garden Companion</span> est né de ma
                volonté de simplifier cette expérience, la rendre accessible au
                plus grand nombre. Les fonctionnalités implémentées visent à
                résoudre ces deux problématiques : offrir une assistance tant
                dans l'apprentissage que dans l'optimisation du jardin potager.
                Le tout, réuni dans un espace agréable, intuitif et facile
                d'utilisation.
              </p>
              <p className="text-justify">
                L'application en est à ses débuts, mon ambition est d'intégrer
                rapidement d'autres outils tels qu'un planificateur de culture,
                un journal de bord ou encore un module pour l'arrosage
                automatique, dans le but d'offrir une expérience complète et
                pratique.
              </p>
              <p className="text-justify">
                Vos retours sont l'un des éléments essentiels dans l'évolution
                de <span className="font-bold">Garden Companion</span>. La
                démarche est guidée par la passion partagée pour le jardinage et
                le désir constant de rendre cette expérience agréable et
                enrichissante pour chacun.
              </p>
              <p>
                <span className="font-bold">Happy Gardening 😉🥕</span>
              </p>
              <p>Benjamin, créateur de l'application</p>
            </div>
          </div>
          <a href="#home">
            <div className="flex flex-col items-center">
              <img src={moveUpIcon} alt="move-up icon" className="w-12" />
              <p>Retour en haut</p>
            </div>
          </a>
        </main>

        <footer>
          <p className="text-center">
            &copy; 2024 Garden Companion - Tous droits réservés
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Landing;
