import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCheckbox,
  IonContent,
  IonFab,
  IonFabButton,
  IonFooter,
  IonHeader,
  IonIcon,
  IonImg,
  IonItem,
  IonList,
  IonMenuButton,
  IonPage,
  IonSlide,
  IonSlides,
  IonText,
  IonTitle,
  IonToolbar,
  useIonToast,
} from "@ionic/react";
import {
  ContextType,
  useContext,
  useEffect,
  useState,
  Suspense,
  lazy,
} from "react";
import { Link, useHistory, withRouter } from "react-router-dom";
import Menu from "../components/Menu";
import {  analyticsApp, auth, db } from "../firebase";
import { authContext } from "../helpers/userauth";
import Masonry from "react-masonry-css";
import Notes from "../Notes"; /// Note Interface
import "./NoteDisplay.scss";
import {
  addOutline,
  arrowForward,
  documentOutline,
  remove,
  removeCircle,
  share,
  trash,
  trashBin,
  trashOutline,
} from "ionicons/icons";
import { editcontext } from "../helpers/noteEditProvider";
import { resolve } from "path";
// import About from "./About";
import LOGO from "../logo.png";
const Page: React.FC = () => {
  const navigation = useHistory();
  var { user } = useContext(authContext) as any; // fetching user context from authContext Provider
  var { edit, changevalue } = useContext(editcontext);
  var [notes, setnotes] = useState<any>([]); // note state
  var [imag, setimag] = useState<any>({}); //image state ** decrypted
  const [showToast, dismissToast] = useIonToast();
  const [textToast, changeTextToast] = useState("");
  var firedb: any;
  const getuserNotes = () => {
    console.log(user);
    if (user === null) {
      /// check if user is logged in or not  (Anonymous or google)
      return;
    }
    // console.log(user?.uid)
    firedb = db
      .collection("users") /// subscribing to firestore data
      .doc(user?.uid)
      .collection("notes")
      .onSnapshot((snaps) => {
        ///using onSnapShot to subscribe to changes in firestore data
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

          // console.table(note)
        }
      });
  };

  const userNotesLocal = () => {
    console.log("fetching notes");
    var notes_collection = JSON.parse(
      localStorage.getItem("notes_collection") as string
    );
    if (notes_collection === null) {
      return;
    }

    console.log(notes_collection);

    var notedaatas: any = [];
    var collection: string[] = notes_collection.collections;
    // debugger
    setnotes(
      collection.map((noteID: any) => {
        var note = JSON.parse(localStorage.getItem(noteID) as string);
        console.table(note);

        if (noteID !== null) {
          let notestate: string = checkIFempty(note);
          if (notestate !== "empty") return notecard(note);
          else deleteNote(noteID, false);
        }
      })
    );
    // setnotes(notedaatas as any);
  };
  useEffect(() => {
    // debugger
    userNotesLocal(); /// called when this page is rendered
  }, [localStorage.getItem("modified")]); //called again on user change ** dependency

  const textc = (note: Notes) => {
    if (
      note.map[1] === undefined ||
      note.map[1].replace(/[0-9]/g, "") === "image"
    ) {
      return null;
    } else {
      var noteM = note.map[1].replace(/[0-9]/g, "");
      switch (noteM) {
        case "text":
          return note.textContent[0];

        case "todo":
          return "Your TODOS LIST";

        default:
          return null;
          break;
      }
    }
  };
  const noteeditOPen = (e: any) => {
    console.log(e.currentTarget.id);
    var note_id = e.currentTarget.id;
    // console.log(note_id);
    if (note_id !== undefined || note_id !== null || note_id !== "") {
      navigation.push("/createNote/" + note_id, {
        data: localStorage.setItem("editNote", Math.random().toString()),
      });
    }
  };

  const deleteNote = (noteID: string, displayToast: boolean) => {
    try {
      let coll: { count: number; collections: string[] } = JSON.parse(
        localStorage.getItem("notes_collection") as string
      );
      // if (coll === null) return
      // if (coll.collections === undefined) return
      if (coll.collections.includes(noteID)) {
        coll.collections.splice(coll.collections.indexOf(noteID), 1);
        coll.count -= 1;
      }
      localStorage.setItem("notes_collection", JSON.stringify(coll));
      localStorage.removeItem(noteID);
      localStorage.setItem("modified", Math.random().toString());
      // changeTextToast("Note Deleted");
      // alert(textToast);
      if (displayToast) showToast("Note Deleted", 3000);
    } catch {
      // changeTextToast("Failed To delete Note");
      if (displayToast) showToast("Failed To delete Note", 3000);
    }
  };
  const notecard = (note: Notes) => {
    /*
    ``card is formed here in notecard
    */
    return (
      <IonCard key={note.id} mode="ios">
        <IonCardHeader onClick={(e) => noteeditOPen(e)} id={note.id}>
          {note.image.length > 0 ? (
            <IonImg aria-disabled src={note.image[0].src}></IonImg>
          ) : null}
          <IonCardTitle>{note.title}</IonCardTitle>
          {note.textContent[0]! ? (
            <IonText>
              {note.textContent[0].length < 30
                ? note.textContent[0]
                : note.textContent[0].substring(0, 32) + ".."}
            </IonText>
          ) : null}
          {note.todos[0]! ? (
            <IonList id="todo0">
              {note.todos[0].map((el, index) => {
                if (index < 5)
                  return (
                    <IonList class="displayList" id={"todo0" + index}>
                      <IonCheckbox checked={el.done} disabled></IonCheckbox>
                      <IonText
                        style={{
                          textDecoration: el.done ? "line-through" : "auto",
                        }}
                      >
                        {el.data.length <= 15
                          ? el.data
                          : el.data.substring(0, 15)}
                      </IonText>
                    </IonList>
                  );
              })}
            </IonList>
          ) : null}
        </IonCardHeader>

        {/*  creating image with id of note.id which will later be filled with src */}

        <IonFooter>
          <IonButtons style={{ justifyContent: "flex-end" }}>
            {/* <IonButton slot="end">
              <IonIcon icon={share}></IonIcon>
            </IonButton> */}
            <IonButton
              slot="end"
              onClick={(e) => {
                // e.preventDefault();
                deleteNote(note.id, true);
                analyticsApp.logEvent("delete_note");
              }}
            >
              Delete
              <IonIcon icon={trashOutline}></IonIcon>
            </IonButton>
          </IonButtons>
        </IonFooter>
      </IonCard>
    );
  };

  const main = () => {
    return (
      <>
        <Menu />

        <IonHeader id="main">
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
            <IonTitle slot="end" class="ion-toolbarTitle">
              ASTRONOTES
            </IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent fullscreen>
          {/* <IonButton onClick={(e) => displayuser()}>Dev Console</IonButton> */}
          <div className="container">
            {notes}
            {/* notes state is added here  */}
          </div>
          <IonFab
            onClick={(e) => {
              var nvid = "note_" + new Date().toISOString();
              navigation.push("/createnote/" + nvid, {
                data: localStorage.setItem(
                  "editNote",
                  Math.random().toString()
                ),
              });
              analyticsApp.logEvent("add_note");
            }}
            vertical="bottom"
            horizontal="end"
            slot="fixed"
          >
            <IonFabButton>
              {" "}
              {/* <IonIcon icon={documentOutline}></IonIcon> */}
              <IonIcon icon={addOutline}></IonIcon>
            </IonFabButton>
            {/* swtiching page */}
          </IonFab>
        </IonContent>
      </>
    );
  };

  const displayuser = () => {
    console.log(notes);
    console.log(auth.currentUser);
  };

  const firstSlides = () => {
    return (
      <IonContent fullscreen>
        <IonSlides>
          {/* <IonSlide>
            <div style={{ margin: "40vh auto" }}>
              {":)  HI"}
              <br />
            </div>
          </IonSlide> */}
          <IonSlide
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: "5rem",
            }}
          >
            <IonImg src={LOGO}></IonImg>
            <IonTitle class="ionTitle" style={{ marginTop: "10vh" }}>
              Astronotes
              <p
                style={{
                  fontFamily: "'Poppins'",
                  fontWeight: "bold",
                  fontSize: "4vmin",
                }}
              >
                YOUR OWN NOTE APP
              </p>
            </IonTitle>

            <IonButton
              style={{ marginBottom: "0" }}
              onClick={(e) => {
                localStorage.setItem("user_present", "true");
              }}
              routerLink="/"
            >
              Continue <IonIcon icon={arrowForward}></IonIcon>
            </IonButton>
          </IonSlide>
        </IonSlides>
      </IonContent>
    );
  };

  return (
    <IonPage>
      {localStorage.getItem("user_present") === "true" ? main() : firstSlides()}
    </IonPage>
  );
};

export default withRouter(Page);
function checkIFempty(note: Notes): string {
  try {
    let emptyfactors = 0;
    if (note.map.length === 2) {
      if (note.title === "" || note.title === null) {
        emptyfactors += 1;
      }
      if (note.map[1].replace(/[0-9]+/g, "") === "text") {
        if (
          note.textContent[0] === "" ||
          note.textContent[0] === null ||
          note.textContent[0] === undefined
        ) {
          emptyfactors += 1;
        }
      }
    }
    if (note.map.length === 1 && note.title === "") {
      emptyfactors += 2;
    }
    if (emptyfactors > 1) {
      return "empty";
    } else return "not empty";
  } catch (error) {
    return "empty";
  }
}
