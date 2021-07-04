import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonImg,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import {
  ContextType,
  useContext,
  useEffect,
  useState,
  Suspense,
  lazy,
} from "react";
import { Link, withRouter } from "react-router-dom";
import Menu from "../components/Menu";
import { auth, db, storage } from "../firebase";
import { authContext } from "../helpers/userauth";
import Masonry from "react-masonry-css";

import Notes from "../Notes"; /// Note Interface
import "./NoteDisplay.scss";

const Page: React.FC = () => {
  var { user } = useContext(authContext) as any; // fetching user context from authContext Provider
  var subs:any = null
  var [notes, setnotes] = useState<any>([]); // note state
  var [imag, setimag] = useState<any>({});  //image state ** decrypted
  var firedb: any;
  const getuserNotes = () => {
    console.log(user);
    if (user === null) {   /// check if user is logged in or not  (Anonymous or google)
      return;
    }
    // console.log(user?.uid)
    firedb = db.collection("users")   /// subscribing to firestore data 
      .doc(user?.uid)
      .collection("notes")
      .onSnapshot((snaps) => {   ///using onSnapShot to subscribe to changes in firestore data
        console.log(snaps.empty);
        if (!snaps.empty) {
          let snapnote: Notes[] = [];
          snaps.forEach((doc) => {
            snapnote.push(doc.data() as any as Notes);
          });
          // setnotes(note)
          setnotes(
            snapnote.map((note) => {
              return notecard(note); /// addding card elemnt to notes state
            })
          );
          snapnote.map((note) => {
            try {
              if (note.image.length !== undefined)
                storage
                  .child("/" + note.image[0])
                  .getDownloadURL()
                  .then((url) => {
                  
                    var imgDoc = document.getElementById(note.id);   // adding src attrribute to img element in card
                    imgDoc?.setAttribute("src", url);
                  });
            }
            catch (e) {
              
              console.log('error catch')
            }
          });
          // console.table(note)
        }
      });
  };
  useEffect(() => {
    getuserNotes(); /// called when this page is rendered
   
  }, [user]); //called again on user change ** dependency

  const textc = (note: Notes) => {
    if (note.map[1] === undefined || note.map[1].replace(/[0-9]/g, '') === 'image') {
      return null
    } else {
      var noteM = note.map[1].replace(/[0-9]/g, "");
      switch (noteM) {
        case 'text': return note.textContent[0]
                
        case 'todo': return 'Your TODOS LIST'
            
        default: return null
          break;
      }
    }
  }
  
  const notecard = (note: Notes) => {
    /*
    ``card is formed here in notecard
    */
    return (
      <IonCard key={note.title}>
         <IonImg id={note.id}></IonImg>   {/*  creating image with id of note.id which will later be filled with src */}
        <IonCardHeader>
          <IonCardTitle>{note.title}</IonCardTitle>
        </IonCardHeader>
        <IonCardContent></IonCardContent>
      </IonCard>
    );
  };

  const displayuser = () => {
    console.log(imag);
    console.log(auth.currentUser);
  };
 
  return (
    <IonPage>
      <Menu />

      <IonHeader id="main">
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle slot="end" className="ionTitle">
            ASTRONOTES
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonButton onClick={(e) => displayuser()}>Dev Console</IonButton>
        <div className="conatiner">
          {notes}
          {/* notes state is added here  */}
        </div>
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton routerLink="createNote">+</IonFabButton>
          {/* swtiching page */}
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default withRouter(Page);
