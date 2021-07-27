import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonRouterLink,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { arrowBack, arrowBackOutline } from "ionicons/icons";
import { withRouter } from "react-router-dom";
const About: React.FC = ({}) => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons>
            <IonButton
              slot="start"
              style={{ background: "none", border: "0px" }}
              routerLink="/"
            >
              <IonIcon icon={arrowBackOutline}></IonIcon>
            </IonButton>
          </IonButtons>
          {/* <IonBackButton ></IonBackButton> */}
          <IonTitle slot="end">ABOUT</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent
        fullscreen
        style={{ fontFamily: "'Poppins' !important", fontSize: "large" }}
      >
        <p style={{ padding: "1rem", fontFamily: "Poppins" }}>
          This project is being created as a alternative to OEM notes app.
          Simple and be easy to sync in any device.
        </p>
        <IonTitle style={{ fontfamily: "'Anton'!important" }}>
          playbitDreams
        </IonTitle>
        <address style={{ padding: "1rem" }}>
          <span>Suraj Kachhap</span>
          <br />
          <IonRouterLink
            style={{ textDecoration: "underline" }}
            href="mailto:someone@yoursite.com"
          >
            playbitdreams@gmail.com
          </IonRouterLink>
        </address>
      </IonContent>
    </IonPage>
  );
};

export default withRouter(About);
