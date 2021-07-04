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
import {
  addList,
  deleteTodoUnit,
  insertTodoUnit,
  modifytodoList,
} from "../helpers/todoHelper";
import { useEffect, useState } from "react";
import { withRouter } from "react-router";
import Notes from "../Notes";
import "./NoteCreate.scss";
import NoteDisplay from "./NoteDisplay";
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
                style={{ margin: ".7rem 0rem" }}
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
                placeholder="Your Note"
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
                  (
                    objTodo: {
                      done: boolean | undefined;
                      data: string | undefined;
                    },
                    index: any
                  ) => {
                    return (
                      <IonItem key={idE + index} className="ionTodo">
                        <IonCheckbox
                          onIonChange={(e) => {
                            modifyListTodo(
                              e.target,
                              Number(idE.replace(/[a-z]/g, "")),
                              index,
                              "check"
                            );
                          }}
                          checked={objTodo.done}
                        ></IonCheckbox>
                        <IonInput
                          // style={{textDecoration:`${objTodo.done?'line-through':'none'}`}}
                          onIonChange={(e) =>
                            modifyListTodo(
                              e.target,
                              Number(idE.replace(/[a-z]/g, "")),
                              index,
                              "data"
                            )
                          }
                          value={objTodo.data}
                        ></IonInput>
                        <IonButtons>
                          <IonButton onClick={(e) => insertTodo(index, idE)}>
                            <IonIcon icon={addOutline}></IonIcon>
                          </IonButton>
                          <IonButton onClick={(e) => deleteTodo(index, idE)}>
                            <IonIcon icon={trashOutline}></IonIcon>
                          </IonButton>
                        </IonButtons>
                      </IonItem>
                    );
                  }
                )}
              </IonList>
            );

          default:
            break;
        }
      })
    );
    console.log(elem);
  };

  const insertTodo = (index: number, todoID: string) => {
    insertTodoUnit(index, todoID, note);
    setchange(!lookchange);
  };
  const deleteTodo = (index: number, todoID: string) => {
    var ID = Number(todoID.replace(/[a-z]+/g, ""));
    var count = -1;
    debugger;
    if (note.todos[ID].length === 1) {
      console.log("true condition");
      note.todos.splice(ID, 1);
      for (let v = 0; v < note.map.length; v++){
        if (note.map[v].replace(/[0-9]+/g, '') === 'todo') {
          var currentValID = Number(note.map[v].replace(/[a-z]+/g, ""));
          if (currentValID === ID) {
            count = v
          }
          if (currentValID > ID) {
            note.map[v] = 'todo'+(currentValID-1).toString()
          }
        }
      }
      console.log(count)
      if (count !== -1) {
        // check text Content
        if (
          note.map[count + 1].replace(/[0-9]+/g, "") === "text" &&
          note.textContent[
            Number(note.map[count + 1].replace(/[a-z]+/g, ""))
          ] === undefined &&
          note.map[count - 1].replace(/[0-9]+/g, "") === "text"
        ) {
          note.textContent.splice(Number(note.map[count+1].replace(/[a-z]+/g,'')),1)
          note.map.splice(count + 1, 1);
          
        }
        note.map.splice(count, 1);
      }
    } else {
      console.log("#else condition");
      note.todos[ID].splice(index, 1);
    }
    setchange(!lookchange);
  };
  const modifyListTodo = (
    text: any,
    todoid: number,
    index: number,
    listChangeType: string
  ) => {
    // console.log( text,todoid,index,listChangeType);
    modifytodoList(text, todoid, index, listChangeType, note);
  };
  useEffect(() => {
    console.log(note.map.length);
    appendElement();
  }, [lookchange]);

  const addListButton = () => {
    addList(note);
    setchange(!lookchange);
  };
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
          <IonButtons slot="start">
            Actions:
            <IonButton
              onClick={(e) => {
                alert("Not build right now");
              }}
            >
              <IonIcon icon={imageOutline} color="red"></IonIcon>
            </IonButton>
            <IonButton
              onClick={(e) => {
                addListButton();
              }}
            >
              <IonIcon icon={checkboxOutline} color="red"></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default withRouter(NoteCreate);
