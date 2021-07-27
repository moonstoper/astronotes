import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonIcon,
  IonTitle,
  IonContent,
  IonList,
  IonListHeader,
  IonItem,
  IonFooter,
  IonRouterLink,
  IonCard,
  IonCardContent,
} from "@ionic/react";
import { arrowBackOutline } from "ionicons/icons";
import "./FutureRelease.scss";
const FutureRelease: React.FC = () => {
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
          <IonTitle slot="end">Dev Timeline</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent
        fullscreen
        style={{ fontFamily: "Poppins !important", fontSize: "large" }}
      >
        {/* <IonTitle>Next Release</IonTitle> */}
        <IonCard mode="ios">
          <IonList>
            <IonListHeader style={{ fontSize: "large", fontWeight: "bold" }}>
              Next Release
            </IonListHeader>
            <IonItem>
              - New element will be added below the current working element
            </IonItem>
            <IonItem> - Archive</IonItem>
            <IonItem> - Colored Cards (selected colors only)</IonItem>
            <IonItem> - Search</IonItem>
          </IonList>
        </IonCard>
        <IonCard mode="ios">
          <IonList>
            <IonListHeader style={{ fontSize: "large", fontWeight: "bold" }}>
              Parallel Works
            </IonListHeader>
            <IonItem>
              - For Andriod/IOS full switch to native rather than web-app
            </IonItem>
            <IonItem>- Account System (can be used without login)</IonItem>
            <IonItem>- Share Note Using QR</IonItem>
            <IonItem>- Easy Sync OF Images with Cloud</IonItem>
            <IonItem>- User controlled backup </IonItem>
          </IonList>
        </IonCard>
        <IonCard mode="ios">
          <IonList>
            <IonListHeader style={{ fontSize: "large", fontWeight: "bold" }}>
              Developers
            </IonListHeader>
            <IonItem style={{ fontSize: "larger" }}>
              GITHUB:&nbsp;
              <IonRouterLink
                href=" https://github.com/moonstoper/astronotes"
                target="_blank"
                style={{ textDecoration: "underline" }}
              >
                https://github.com/moonstoper/astronotes
              </IonRouterLink>
            </IonItem>
          </IonList>
        </IonCard>
      </IonContent>
      <IonFooter></IonFooter>
    </IonPage>
  );
};

export default FutureRelease;
