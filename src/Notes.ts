export interface imageData{
  src: string;
  status:string
}
export interface todounit{
  data: string;
  done: boolean
}

export default interface Notes {   // note data interface ** may change
  title: string;
  creationdate: Date;   //date of creation
  todos: todounit[][];  //draggable todo ** to be added using librabry
  textContent: string[];   //  string array of text field
  image: imageData[];  //image array in field
  color: string;   //background color
  label?: string[];   /// label is optional for filtering ** feature not implemented
  map: string[];    /// how the diiferent elemnts are aranegd in notes ex[textfield,image,todos]
  id: string;      /// note id 
  [keys: string]: any;
  currentElm:string
}

export const demoNotes: Notes = {
    title: "",
    creationdate: new Date(),
    image: [],
    id: new Date().toISOString(), /// some better will be used to create unique id
    textContent: ["Write Your Dreams"],
    todos: [],
    color: "",
    map: ["title", "text0"],
    currentElm: "text0",
  }