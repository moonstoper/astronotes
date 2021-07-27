"use strict";
import imageCompression from "browser-image-compression";
// import { auth, storage } from "../firebase";
import Notes from "../Notes";
// import NoteDisplay from "../pages/NoteDisplay";
var countDownPress = 0;

export const addingFiletoList = async (
  // imageURL: any,
  note: Notes,
  imagesize: number,
  imageFile: any
  // currentElm:string
) => {
  ///calling firebase to upload..
  try {
    let mapLength = note.map.length;
  let imageLength = note.image.length;
  debugger

  let filestring = await imageCompression.getDataUrlFromFile(imageFile)
  note.image[imageLength] = {
    src: filestring,
    status: "done",
  };

  if (note.map[mapLength - 1].replace(/[0-9]+/g, "") === "text") {
    var textid = Number(note.map[mapLength - 1].replace(/[a-z]+/g, ""));
    if (
      note.textContent[textid] === undefined ||
      note.textContent[textid] === null ||
      note.textContent[textid] === ""
    ) {
      note.map[mapLength - 1] = "image" + imageLength;
      note.map[mapLength] = "text" + textid;
    } else {
      note.map[mapLength] = "image" + imageLength;
      note.map[mapLength + 1] = "text" + (textid + 1).toString();
    }
  } else {
    note.map[mapLength] = "image" + imageLength;
    note.map[mapLength + 1] = "text" + note.textContent.length.toString();
  }
  } catch (e) {
    throw "error"
  }
  
};

export const onimagepressDown = () => {};
export const onimagepressRelease = () => {};

const reuploadimage = () => {
  alert("failed reupload");
};

export const imageRemove = (note: Notes, imageID: string): any => {
  console.table(note);
  console.log(imageID);

  // debugger
  var count = -1;
  var id = Number(imageID.replace(/[a-z]+/g, ""));
  note.image.splice(id, 1);
  note.map.map((value, index) => {
    // debugger;
    if (value.replace(/[0-9]+/g, "") === "image") {
      var valueID: number = Number(value.replace(/[a-z]+/g, ""));
      if (valueID === id) {
        count = index;
      }
      if (valueID > id) {
        note.map[index] = "image" + (valueID - 1).toString();
      }
      return value;
    }
  });
  console.log(note.map, note.image);
  if (count !== -1) {
    // note.map.splice(count, 1);
    if (
      note.map[count - 1].replace(/[0-9]+/g, "") === "text" &&
      note.map[count + 1].replace(/[0-9]+/g, "") === "text"
    ) {
      var textID = Number(note.map[count + 1].replace(/[0-9]+/g, ""));
      if (
        note.textContent[textID] === undefined ||
        note.textContent[textID] === null
      ) {
        note.map.splice(count, 2);
        note.map.map((value) => {
          if (value.replace(/[0-9]+/g, "") === "text") {
            var textMapID = Number(value.replace(/[0-9]+/g, ""));
            if (textMapID > textID) {
              value = "text" + (textMapID - 1).toString();
            }
          }
        });
      }
    } else {
      note.map.splice(count, 1);
    }
  }
  console.log(note.map, note.image);

  return;
};
