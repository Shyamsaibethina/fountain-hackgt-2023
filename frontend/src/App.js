import NotesViewer from "./components/NotesViewer";

function App() {
  let randNotes = [1, 2, 3];
  return (
    <div className="bg-slate-700 h-screen" >
        <NotesViewer notes={randNotes}/>
    </div>
  );
}

export default App;
