import { createContext, useState } from "react";
//@ts-ignore
export const editcontext = createContext({ edit: "0.5", changevalue });
const EditNoteContext: React.FC = ({ children }) => {
  var [editNote, setEditNote] = useState({ edit: "0.5" });
  function changevalue(): any {
    var data: string = Math.random().toString();
    setEditNote({ edit: data });
  }
  return (
    //@ts-ignore
    <editcontext.Provider value={editNote, changevalue}>
      {children}
    </editcontext.Provider>
  );
};

export default EditNoteContext;
function changevalue(): any {
  throw new Error("Function not implemented.");
}
