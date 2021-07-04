import Notes from "../Notes";
export const addList = (note: Notes) => {
  var mapLength = note.map.length;
  var todoLength = note.todos.length;
  note.todos[todoLength] = [
    {
      data: "TODO 1",
      done: false,
    },
    {
      data: "TODO 2",
      done: false,
    },
  ];

  var checkTextA = note.map[mapLength - 1];
  console.log(checkTextA.replace(/[a-z]/g, ""));
  if (checkTextA.replace(/[0-9]/g, "") === "text") {
    // console.log('here inside text')
    var index = Number(checkTextA.replace(/[a-z]/g, ""));
    console.log(note.textContent[index]);
    if (
      note.textContent[index] === undefined ||
      note.textContent[index] === null ||
      note.textContent[index] === ""
    ) {
      console.log("#inside if cond");
      note.map[mapLength - 1] = "todo" + todoLength.toString();
      note.map[mapLength] = checkTextA;
    } else {
      console.log("#inside else cond");
      note.map[mapLength] = "todo" + todoLength.toString();
      note.map[mapLength + 1] = "text" + (index + 1).toString();
    }
  }
  return true;
};

export const deleteTodoUnit = (index: number, todoID: string, note: Notes) => {
  var ID = Number(todoID.replace(/[a-z]+/g, ""));
  var count = -1;
  if (note.todos[ID].length === 1) {
    note.todos.splice(ID, 1);
    note.map.map((val, index) => {
      if (val.replace(/[0-9]+/g, "") === "todo") {
        var currentValID = Number(val.replace(/[a-z]+/g, ""));
        if (currentValID === ID) {
          count = index;
        }
        if (currentValID > ID) {
          val = "todo" + (currentValID - 1);
        }
      }
    });

    if (count !== -1) {
        // check text Content
      if (
        note.map[count + 1].replace(/[0-9]+/g, "") === "text" &&
        note.textContent[Number(note.map[count + 1].replace(/[a-z]+/g, ""))] ===
          undefined &&
        note.map[count - 1].replace(/[0-9]+/g, "") === "text"
      ) {
        note.map.splice(count + 1, 1);
      }
      note.map.splice(count, 1);
    }
  } else {
    note.todos[ID].splice(index, 1);
  }
};

export const insertTodoUnit = (index: number, todoID: string, note: Notes) => {
  console.log(index, todoID);
  note.todos[Number(todoID.replace(/[a-z]/g, ""))].splice(index + 1, 0, {
    data: "TODO",
    done: false,
  });
};

export const modifytodoList = (
  text: any,
  todoid: number,
  index: number,
  listChangeType: string,
  note: Notes
) => {
  // console.log( text,todoid,index,listChangeType);
  var data: { data: string; done: boolean } = note.todos[todoid][index];
  if (listChangeType === "check") {
    data.done = !data.done;
  }
  if (listChangeType === "data") data.data = text.value;

  note.todos[todoid][index] = data;
};
