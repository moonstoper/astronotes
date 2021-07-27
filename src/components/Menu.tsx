import {
  IonContent,
  IonHeader,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
  IonTitle,
  IonToggle,
} from "@ionic/react";

import { useLocation } from "react-router-dom";
import {
  archiveOutline,
  archiveSharp,
  bookmarkOutline,
  heartOutline,
  heartSharp,
  mailOutline,
  mailSharp,
  moon,
  moonOutline,
  paperPlaneOutline,
  paperPlaneSharp,
  sunny,
  trashOutline,
  trashSharp,
  warningOutline,
  warningSharp,
} from "ionicons/icons";
import "./Menu.css";
import { useContext, useState } from "react";
import { authContext } from "../helpers/userauth";
import {  analyticsApp, auth } from "../firebase";
import { googleSignIn } from "../helpers/googleSign";
import LOGO from "../logo.png";
interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: "Inbox",
    url: "/page/Inbox",
    iosIcon: mailOutline,
    mdIcon: mailSharp,
  },
  {
    title: "Outbox",
    url: "/page/Outbox",
    iosIcon: paperPlaneOutline,
    mdIcon: paperPlaneSharp,
  },
  {
    title: "Favorites",
    url: "/page/Favorites",
    iosIcon: heartOutline,
    mdIcon: heartSharp,
  },
  {
    title: "Archived",
    url: "/page/Archived",
    iosIcon: archiveOutline,
    mdIcon: archiveSharp,
  },
  {
    title: "Trash",
    url: "/page/Trash",
    iosIcon: trashOutline,
    mdIcon: trashSharp,
  },
  {
    title: "Spam",
    url: "/page/Spam",
    iosIcon: warningOutline,
    mdIcon: warningSharp,
  },
];

const labels = ["Family", "Friends", "Notes", "Work", "Travel", "Reminders"];

const Menu: React.FC = () => {
  var { user } = useContext<any>(authContext);
  const [checked, setchecked] = useState(true);
  // const location = useLocation();
  const googleSign = async () => {
    console.log(user);
    if (user !== null && !user?.isAnonymous) {
      console.log("user Already logged");

      return;
    }

    await googleSignIn()
      .then((value) => {
        console.log(value);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const signOut = () => {
    auth.signOut();
  };

  const toggleDarkMode = () => {
    document.body.classList.toggle("dark");
    setchecked(!checked);
  };
  return (
    <IonMenu contentId="main" type="overlay">
      <IonHeader mode="ios">
        <IonItem mode="ios">
          <IonImg slot="start" src={LOGO} style={{ width: "20%" }}></IonImg>
        </IonItem>
        <IonItem>
          <IonLabel
            mode="ios"
            style={{ display: "flex", alignContent: "center" }}
          >
            <IonIcon icon={checked ? moon : sunny}></IonIcon>
            <span style={{ paddingLeft: "1rem" }}>Dark Mode</span>
          </IonLabel>
          <IonToggle checked={checked} onIonChange={toggleDarkMode}></IonToggle>
        </IonItem>
      </IonHeader>
      <IonContent>
        <IonList mode="ios">
          {/* {user !== null ? (
          <IonItem style={{ cursor: "pointer" }} onClick={(e) => signOut()}>
            Sign Out
          </IonItem>
        ) : (
          <IonItem style={{ cursor: "pointer" }} onClick={(e) => googleSign()}>
            Sign in with google
          </IonItem>
        )} */}

          <IonItem
            routerLink="about"
            key="about"
            onClick={(e) => {
              analyticsApp.logEvent("about_page");
            }}
          >
            About
          </IonItem>
          <IonItem
            routerDirection="forward"
            routerLink="futurerelease"
            key="ftrlease"
            onClick={(e) => {
              analyticsApp.logEvent("future_page");
            }}
          >
            Future Releases
          </IonItem>
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
