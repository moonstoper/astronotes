import { IonApp, IonRouterOutlet, IonSplitPane } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route, Switch } from "react-router-dom";
import Menu from "./components/Menu";
import Page from "./pages/NoteDisplay";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.scss";
import NoteCreate from "./pages/NoteCreate";
import Notes from "./Notes";
import About from "./pages/About";
import FutureRelease from "./pages/FutureRelease";
var note: Notes = {
  title: "Luv you to bits",
  creationdate: new Date(),
  image: [],
  id: new Date().toISOString(), /// some better will be used to create unique id
  textContent: ["Cool Brezze"],
  todos: [],
  color: "",
  map: ["title", "text0"],
  currentElm: "text0",
};

const App: React.FC = () => {
  return (
    /// page routes are defined here
    <IonApp>
      <IonReactRouter>
        <Switch>
          <IonRouterOutlet>
            <Route path="/" exact={true} key={document.location.href}>
              <Page />
            </Route>
            <Route
              path="/createNote/:noteId"
              exact
              key={document.location.href}
            >
              <NoteCreate />
            </Route>
            <Route path="/create" key={document.location.href}>
              <NoteCreate />
            </Route>
            <Route path="/about" exact>
              <About />
            </Route>
            <Route path="/futurerelease" exact>
              <FutureRelease />
            </Route>
          </IonRouterOutlet>
        </Switch>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
