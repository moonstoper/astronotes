export default interface Notes {   // note data interface ** may change
  title: string;
  creationdate: Date;   //date of creation
  todos: any[];  //draggable todo ** to be added using librabry
  textContent: string[];   //  string array of text field
  image: string[];  //image array in field
  color: string;   //background color
  label?: string[];   /// label is optional for filtering ** feature not implemented
  map: string[];    /// how the diiferent elemnts are aranegd in notes ex[textfield,image,todos]
  id: string;      /// note id 
  [keys: string]: any;

}
