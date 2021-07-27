// import { } from "react";

import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCheckbox,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonImg,
  IonInput,
  IonItem,
  IonList,
  IonListHeader,
  IonNote,
  IonPage,
  IonTextarea,
  IonTitle,
  IonToolbar,
  useIonActionSheet,
  useIonLoading,
  useIonPopover,
} from "@ionic/react";
import imageCompression from "browser-image-compression";
import {
  imageOutline,
  checkboxOutline,
  trashBinOutline,
  addOutline,
  trashOutline,
  arrowBackOutline,
  trash,
  close,
} from "ionicons/icons";
import {
  addList,
  deleteTodoUnit,
  insertTodoUnit,
  modifytodoList,
} from "../helpers/todoHelper";
import { useContext, useEffect, useState } from "react";
import { useHistory, useLocation, useParams, withRouter } from "react-router";
import Notes from "../Notes";
import "./NoteCreate.scss";
import NoteDisplay from "./NoteDisplay";
import {
  addingFiletoList,
  imageRemove,
  onimagepressDown,
  onimagepressRelease,
} from "../helpers/imageHelper";
// import { auth, storage } from "../firebase";
import { editcontext } from "../helpers/noteEditProvider";
// import { randomInt } from "crypto";

// const todoTemplate = <Reac'
const NoteCreate: React.FC = () => {
  // const pt = window.location.pathname.split("/").slice(1, 3);
  let usehistory = useHistory();
  var params: any = useParams();
  let [showLoading, dismissLoading] = useIonLoading();
  let { edit } = useContext(editcontext);
  const [present, dismiss] = useIonActionSheet();
  const [firstLoad, desetFirstLoad] = useState(true);
  let [note, setnotes] = useState<Notes>({
    title: "",
    creationdate: new Date(),
    image: [],
    id: window.location.pathname.split("/").slice(1, 3)[1], /// some better will be used to create unique id
    textContent: [],
    todos: [],
    color: "",
    map: ["title", "text0"],
    currentElm: "text0",
  });
  let [elem, setelem] = useState<any>(null); /// will hold html elemts
  let [lookchange, setchange] = useState(false); /// track changes in elements
  const inputText = (e: any) => {
    e.preventDefault();
    if (e.target.value === "" || e.target.value === null) return;
    const pt = window.location.pathname.split("/").slice(1, 3);
    const localStorageData = JSON.parse(localStorage.getItem(pt[1]) as string);
    if (localStorageData !== null) {
      note = localStorageData;
    } else save();

    let id: string = e.target.id;
    if (id === undefined || id === null) return;
    id = id.substring(4);
    note.textContent[Number(id)] = e.target.value;
    save();
    // setchange(!lookchange)
    return;
  };
  const changeTitle = (inputvalue: any) => {
    // debugger;
    inputvalue.preventDefault();
    if (
      inputvalue.detail.value === undefined ||
      inputvalue.detail.value === undefined
    )
      return;
    // console.error(inputvalue);
    const pt = window.location.pathname.split("/").slice(1, 3);
    const localStorageData = JSON.parse(localStorage.getItem(pt[1]) as string);
    if (localStorageData !== null) {
      note = localStorageData;
    } else save();
    note.title = inputvalue.detail.value;
    // note.creationdate = new Date();
    save();
    // setchange(!lookchange)
    return;
  };

  const save = () => {
    // debugger;
    console.log(note);
    try {
      const pt = window.location.pathname.split("/").slice(1, 3);
      note.id = pt[1];

      if (note.id === null) {
        return;
      }
      let data: { count: number; collections: string[] } = JSON.parse(
        localStorage.getItem("notes_collection") as string
      );
      console.warn(pt[1]);
      if (data === null) {
        let notes_collection = {
          count: 1,
          collections: [pt[1]],
        };

        // console.log(notes_collection.toString());
        localStorage.setItem(
          "notes_collection",
          JSON.stringify(notes_collection)
        );
        localStorage.setItem(pt[1], JSON.stringify(note));
      } else {
        // debugger
        // data = JSON.parse(data);
        var data_collection = data.collections;
        if (pt[1] === null || pt[1] === undefined) {
          return;
        }
        if (data_collection.includes(pt[1]) === false) {
          data.count = data.count + 1;
          data.collections.splice(0, 0, pt[1]);
          localStorage.setItem("notes_collection", JSON.stringify(data));
        }

        localStorage.setItem(pt[1], JSON.stringify(note));
      }
      var value = Math.random().toString();
      localStorage.setItem("modified", value);
    } catch (error) {
      console.log(error);
      alert("failed to load");
    }
  };

  const appendElement = () => {
    //// going through the note data and adding the elements accordingly

    console.log("affecting elem");
    console.log(note);
    setelem(
      note.map.map((idE) => {
        var idtemp = idE.replace(/[0-9]/g, "");
        switch (idtemp) {
          case "title":
            return (
              <IonInput
                style={{ margin: ".7rem 0rem" }}
                onIonChange={(e) => {
                  // console.error(e.detail);

                  changeTitle(e);
                  // save();
                }}
                onIonFocus={(e) => {
                  changecurrentElm(e);
                }}
                onIonBlur={(e) => {
                  setchange(!lookchange);
                }}
                id="title"
                placeholder="Title"
                value={note.title}
              ></IonInput>
            );

          case "text":
            return (
              <IonTextarea
                id={idE}
                autoGrow={true}
                // placeholder="Your Note"
                // autofocus={true}
                value={note.textContent[Number(idE.replace(/[a-z]/g, ""))]}
                onIonFocus={(e) => {
                  changecurrentElm(e);
                }}
                onIonChange={(e) => {
                  inputText(e);
                  // save();
                }}
                onIonBlur={(e) => {
                  console.log(e);
                }}
              ></IonTextarea>
            );

          case "todo":
            return (
              <IonList id={idE}>
                <IonListHeader style={{ fontWeight: "bold" }}>
                  TODO LIST
                </IonListHeader>
                {note.todos[Number(idE.replace(/[a-z]/g, ""))].map(
                  (
                    objTodo: {
                      done: boolean | undefined;
                      data: string | undefined;
                    },
                    index: any
                  ) => {
                    return (
                      <IonItem className="ionTodo" mode="ios">
                        <IonCheckbox
                          mode="ios"
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
                          key={idE + index}
                          onIonChange={(e) =>
                            modifyListTodo(
                              e.target,
                              Number(idE.replace(/[a-z]/g, "")),
                              index,
                              "data"
                            )
                          }
                          style={{
                            textDecoration: objTodo.done
                              ? "line-through"
                              : "none",
                          }}
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
          case "image":
            return (
              <IonImg
                id={idE}
                onMouseDown={(e) => onimagepressDown()}
                onMouseUp={(e) => onimagepressRelease()}
                src={note.image[Number(idE.replace(/[a-z]+/g, ""))].src}
                style={{ fontSize: "larger" }}
                onClick={(e) => {
                  present({
                    buttons: [
                      {
                        text: "Remove",
                        icon: trash,
                        handler: () => {
                          {
                            imageDelete(idE);
                          }
                        },
                      },
                      { text: "Cancel", icon: close, role: "cancel" },
                    ],
                  });
                }}
              ></IonImg>
            );
          default:
            break;
        }
      })
    );
    console.log("triggreing focus");
    document.getElementById(note.currentElm)?.setAttribute("autofocus", "");
    console.log(elem);
  };

  const imageDelete = (idE: string) => {
    const pt = window.location.pathname.split("/").slice(1, 3);
    const localStorageData = JSON.parse(localStorage.getItem(pt[1]) as string);
    if (localStorageData !== null) {
      note = localStorageData;
    } else save();
    // debugger;
    imageRemove(note, idE);
    note.creationdate = new Date();
    save();
    setchange(!lookchange);
  };
  const changecurrentElm = (e: any) => {
    console.error(e.target);

    note.currentElm = e.target.id;
    save();
    note.creationdate = new Date();
    console.log(note.currentElm);
  };
  const insertTodo = (index: number, todoID: string) => {
    const pt = window.location.pathname.split("/").slice(1, 3);
    const localStorageData = JSON.parse(localStorage.getItem(pt[1]) as string);
    if (localStorageData !== null) {
      note = localStorageData;
    } else save();
    // debugger;
    insertTodoUnit(index, todoID, note);
    note.creationdate = new Date();
    save();
    setchange(!lookchange);
    return;
  };

  const addImageButton = async (e: any) => {
    const pt = window.location.pathname.split("/").slice(1, 3);
    const localStorageData = JSON.parse(localStorage.getItem(pt[1]) as string);
    if (localStorageData !== null) {
      note = localStorageData;
    } else save();
    debugger;
    showLoading({ message: "Fetching Image", duration: 3000 });
    if (e.target.files[0] === undefined) return;
    let imageFile = e.target.files[0];
    let imgsize = parseFloat((imageFile.size / (1024 * 1024)).toPrecision(2));
    let imageCompressedFile;
    dismissLoading();
    if (imgsize > 0.5) {
      // dismissLoading();
      showLoading({ message: "Compressing Image" });
      imageCompressedFile = await imageCompression(imageFile, {
        maxSizeMB: 0.5,
        maxWidthOrHeight: 520,
        useWebWorker: true,
      });
      await addingFiletoList(note, imgsize, imageCompressedFile)
        .then(() => {
          note.creationdate = new Date();
          save();
          setchange(!lookchange);
          dismissLoading();
        })
        .catch((e) => {
          dismissLoading();
        });
    } else {
      await addingFiletoList(note, imgsize, imageFile)
        .then(() => {
          note.creationdate = new Date();
          save();
          setchange(!lookchange);
          dismissLoading();
        })
        .catch((e) => {
          dismissLoading();
        });
    }
    // console.error(imageFile instanceof Blob)
    // let filereader = new FileReader();
    // filereader.onloadend = async function (_x) {
    //   if (imgsize > 0.5) {
    //     console.log("compress");
    //     return alert("tolarge a size");
    //   } else {
    //     await addingFiletoList(note, imgsize, imageFile);
    //     // note.currentElm = note.map[note.map.length - 1];
    //     // setchange(!lookchange);
    //     console.log(imageFile);
    //      note.image[note.image.length - 1] = {
    //       src: filereader.result as string,
    //       status: "done",
    //     };

    //     // save();
    //   }
    //   note.creationdate = new Date();
    //   save();
    //   setchange(!lookchange);

    //   return;
    // };

    // filereader.readAsDataURL(imageFile);
  };
  const deleteTodo = (index: number, todoID: string) => {
    const pt = window.location.pathname.split("/").slice(1, 3);
    const localStorageData = JSON.parse(localStorage.getItem(pt[1]) as string);
    if (localStorageData !== null) {
      setnotes(localStorageData);
    } else save();
    var ID = Number(todoID.replace(/[a-z]+/g, ""));
    var count = -1;
    // debugger;
    if (note.todos[ID].length === 1) {
      console.log("true condition");
      note.todos.splice(ID, 1);
      for (let v = 0; v < note.map.length; v++) {
        if (note.map[v].replace(/[0-9]+/g, "") === "todo") {
          var currentValID = Number(note.map[v].replace(/[a-z]+/g, ""));
          if (currentValID === ID) {
            count = v;
          }
          if (currentValID > ID) {
            note.map[v] = "todo" + (currentValID - 1).toString();
          }
        }
      }
      console.log(count);
      if (count !== -1) {
        // check text Content
        if (
          note.map[count + 1].replace(/[0-9]+/g, "") === "text" &&
          note.textContent[
            Number(note.map[count + 1].replace(/[a-z]+/g, ""))
          ] === undefined &&
          note.map[count - 1].replace(/[0-9]+/g, "") === "text"
        ) {
          note.textContent.splice(
            Number(note.map[count + 1].replace(/[a-z]+/g, "")),
            1
          );
          note.map.splice(count + 1, 1);
        }
        note.map.splice(count, 1);
      }
    } else {
      console.log("#else condition");
      note.todos[ID].splice(index, 1);
    }

    note.creationdate = new Date();
    save();
    setchange(!lookchange);
    return;
  };
  const modifyListTodo = (
    text: any,
    todoid: number,
    index: number,
    listChangeType: string
  ) => {
    // console.log( text,todoid,index,listChangeType);
    const pt = window.location.pathname.split("/").slice(1, 3);
    const localStorageData = JSON.parse(localStorage.getItem(pt[1]) as string);
    if (localStorageData !== null) {
      note = localStorageData;
    } else save();
    modifytodoList(text, todoid, index, listChangeType, note);
    note.creationdate = new Date();
    save();
    setchange(!lookchange);
  };

  const addListButton = () => {
    // debugger;
    const pt = window.location.pathname.split("/").slice(1, 3);
    const localStorageData = JSON.parse(localStorage.getItem(pt[1]) as string);
    if (localStorageData !== null) {
      note = localStorageData;
    } else save();
    addList(note);
    note.creationdate = new Date();
    save();
    setchange(!lookchange);
  };

  const onImageButton = () => {
    document.getElementById("addImageICON")?.click();
  };
  useEffect(() => {
    // console.log(params);
    // debugger;

    // console.log(par);
    let pt = window.location.pathname.split("/").slice(1, 3);
    const localStorageData = JSON.parse(localStorage.getItem(pt[1]) as string);
    if (localStorageData !== null) {
      console.log(note);
      // debugger
      note = localStorageData;
      save();
      // setchange(!lookchange)
    }

    appendElement();
  }, [lookchange, localStorage.getItem("editNote")]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons>
            <IonButton
              onClick={(e) => {
                usehistory.push("/");
              }}
            >
              <IonIcon icon={arrowBackOutline}></IonIcon>
            </IonButton>
          </IonButtons>
          {/* <IonButton
            onClick={(e) => {
              console.table(note);
            }}
            slot="end"
          >
            Debug
          </IonButton> */}
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding" id="content-component">
        {elem}
      </IonContent>
      <IonFooter>
        <IonToolbar>
          <IonButtons slot="start">
            <span style={{ paddingLeft: "1rem" }}>Actions:</span>
            <input
              type="file"
              accept="image/*"
              id="addImageICON"
              onChange={(e) => {
                addImageButton(e);
              }}
              style={{ display: "none" }}
            ></input>
            <IonButton
              onClick={(e) => {
                onImageButton();
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
