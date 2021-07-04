import { IonApp, IonRouterOutlet, IonSplitPane } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route, Switch } from 'react-router-dom';
import Menu from './components/Menu';
import Page from './pages/NoteDisplay';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.scss';
import NoteCreate from './pages/NoteCreate';

const App: React.FC = () => {
  return ( /// page routes are defined here
    <IonApp>
      <IonReactRouter>
        <Switch>
          <IonRouterOutlet  >
          <Route path="/" exact={true}  >
            <Page/>
            </Route>
            <Route path="/createNote" exact component={NoteCreate} />
          </IonRouterOutlet>
           </Switch>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
