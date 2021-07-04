import {
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
  IonTitle,
} from '@ionic/react';

import { useLocation } from 'react-router-dom';
import { archiveOutline, archiveSharp, bookmarkOutline, heartOutline, heartSharp, mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, trashOutline, trashSharp, warningOutline, warningSharp } from 'ionicons/icons';
import './Menu.css';
import { useContext } from 'react';
import { authContext } from '../helpers/userauth';
import { auth } from '../firebase';
import { googleSignIn } from '../helpers/googleSign';

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: 'Inbox',
    url: '/page/Inbox',
    iosIcon: mailOutline,
    mdIcon: mailSharp
  },
  {
    title: 'Outbox',
    url: '/page/Outbox',
    iosIcon: paperPlaneOutline,
    mdIcon: paperPlaneSharp
  },
  {
    title: 'Favorites',
    url: '/page/Favorites',
    iosIcon: heartOutline,
    mdIcon: heartSharp
  },
  {
    title: 'Archived',
    url: '/page/Archived',
    iosIcon: archiveOutline,
    mdIcon: archiveSharp
  },
  {
    title: 'Trash',
    url: '/page/Trash',
    iosIcon: trashOutline,
    mdIcon: trashSharp
  },
  {
    title: 'Spam',
    url: '/page/Spam',
    iosIcon: warningOutline,
    mdIcon: warningSharp
  }
];

const labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

const Menu: React.FC = () => {
  var {user} = useContext<any>(authContext)
  // const location = useLocation();
  const googleSign = async() => {
    console.log(user)
    if (user !== null && !user?.isAnonymous) {
      alert("user Already logged")
    
      return 
    }

    await googleSignIn().then((value) => {
      alert(value)
    }).catch(e => {
      console.log(e)
    })

    
  }
  const signOut =()=>{
      auth.signOut()
  
  }

  return (
    <IonMenu contentId="main" type="overlay">
      <IonHeader mode="ios">
        <IonTitle>LOGO</IonTitle>
      </IonHeader>
      <IonList>
        {user !== null ? (
          <IonItem style={{ cursor: "pointer" }} onClick={(e) => signOut()}>
            Sign Out
          </IonItem>
        ) : (
          <IonItem style={{ cursor: "pointer" }} onClick={(e) => googleSign()}>
            Sign in with google
          </IonItem>
        )}
      </IonList>
    </IonMenu>
  );
};

export default Menu;
