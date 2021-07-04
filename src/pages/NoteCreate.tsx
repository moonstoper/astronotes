// import { } from "react";

import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCheckbox,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonList,
  IonPage,
  IonTextarea,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import {
  imageOutline,
  checkboxOutline,
  trashBinOutline,
  addOutline,
  trashOutline,
} from "ionicons/icons";
// import { addListener } from "process";
import { useEffect, useState } from "react";
import { withRouter } from "react-router";
import Notes from "../Notes";
import "./NoteCreate.scss";
// const todoTemplate = <Reac'
const NoteCreate: React.FC = () => {
  var [note, setnotes] = useState<Notes>({
    title: "",
    creationdate: new Date(),
    image: [],
    id: new Date().toISOString(), /// some better will be used to create unique id
    textContent: ["Nice Place hun"],
    todos: [],
    color: "",
    map: ["title", "text0"],
  });
  var [elem, setelem] = useState<any>(null); /// will hold html elemts
  var [lookchange, setchange] = useState(false); /// track changes in elements
  const inputText = (e: any) => {
    /// take input for text area f
    var id = e.target.id;
    if (id === undefined || id === null) return;
    id = Number(id.substring(4));
    note.textContent[id] = e.target.value;
  };
  const changeTitle = (inputvalue: any) => {
    note.title = inputvalue.value;
  };
  const addList = () => { /// onClick of add list 
    var noteList: Notes = note;
    var mapLength = note.map.length;
    var todoLength = note.todos.length;
    note.todos[todoLength] = [
      {
        index: 1,
        data: "TODO 1",
        done: false,
      },
      {
        index: 2,
        data: "TODO 2",
        done: false,
      },
    ];

    note.map[mapLength] = "todo" + todoLength;

    setchange(!lookchange);  /// changing lookchange to trigger effect
    console.log("notes mOdified", noteList, note);
  };
  const appendElement = () => {
    //// going through the note data and adding the elements accordingly
    console.log("affecting elem");
    setelem(
      note.map.map((idE) => {
        var idtemp = idE.replace(/[0-9]/g, "");
        switch (idtemp) {
          case "title":
            return (
              <IonInput
                onIonChange={(e) => {
                  changeTitle(e.target);
                }}
                id="title"
                placeholder="Title"
              ></IonInput>
            );

          case "text":
            return (
              <IonTextarea
                id={idE}
                autoGrow={true}
                placeholder="..."
                // autofocus={true}
                value={note.textContent[Number(idE.replace(/[a-z]/g, ""))]}
                onIonChange={(e) => {
                  inputText(e);
                }}
              ></IonTextarea>
            );

          case "todo":
            return (
              <IonList id={idE}>
                {note.todos[Number(idE.replace(/[a-z]/g, ""))].map(
                  (objTodo: {
                    done: boolean | undefined;
                    data: string | undefined;
                    index: number | undefined;
                  }) => {
                    return (
                      <IonItem key={objTodo.index}>
                        <IonCheckbox
                          onIonChange={(e) => {
                            modifyListTodo(
                              e.target,
                              Number(idE.replace(/[a-z]/g, "")),
                              objTodo.index,
                              "check"
                            );
                          }}
                          checked={objTodo.done}
                        ></IonCheckbox>
                        <IonInput
                          onIonChange={(e) =>
                            modifyListTodo(
                              e.target,
                              Number(idE.replace(/[a-z]/g, "")),
                              objTodo.index,
                              "data"
                            )
                          }
                          value={objTodo.data}
                        ></IonInput>
                        <IonButtons>
                          <IonButton
                            onClick={(e) => console.log(objTodo.index)}
                          >
                            <IonIcon icon={addOutline}></IonIcon>
                          </IonButton>
                          <IonButton
                            onClick={(e) => console.log(objTodo.index)}
                          >
                            <IonIcon icon={trashOutline}></IonIcon>
                          </IonButton>
                        </IonButtons>
                      </IonItem>
                    );
                  }
                )}
              </IonList>
            );
        }
      })
    );
    console.log(elem);
  };

  const modifyListTodo = (
    text: any,
    todoid: number,
    index: number | undefined,
    listChangeType: string
  ) => {
    console.log("what no change", text);
    var notes = note;
    notes.todos[todoid].forEach(
      (obj: { data: string; index: number; done: boolean }) => {
        if (obj.index === index) {
          if (listChangeType === "data") obj.data = text.value;
          if (listChangeType === "check") obj.done = !obj.done;
        }
      }
    );
    setnotes(notes);
  };
  useEffect(() => {
    console.log(note.map.length);
    appendElement();
  }, [lookchange]);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons>
            <IonBackButton></IonBackButton>
          </IonButtons>
          <IonButton
            onClick={(e) => {
              console.table(note, elem);
            }}
            slot="end"
          >
            Debug
          </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding" id="content-component">
        {elem}
      </IonContent>
      <IonFooter>
        <IonToolbar>
          <IonButtons>
            <IonButton
              onClick={(e) => {
                alert("Not build right now");
              }}
            >
              <IonIcon icon={imageOutline} color="red"></IonIcon>
            </IonButton>
            <IonButton onClick={(e) => addList()}>
              <IonIcon icon={checkboxOutline} color="red"></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default withRouter(NoteCreate);
