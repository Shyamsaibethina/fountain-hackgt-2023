import NotesViewer from "./components/NotesViewer";
import PdfViewer from "./components/PdfViewer";
import PointQuizViewer from "./components/PointQuizViewer";

function App() {
  let randNotes = ["Math", "English", "Science"];
  return (
    <div className="bg-slate-700 flex flex-col">
      <div className="w-screen"> 
      <div class="bg-slate-500 p-4">
          <nav class="flex items-center justify-center">
            <p class="text-white font-poppins text-3xl font-bold">Notable</p>
          </nav>
        </div>
      </div>
      <div className="flex flex-row">
      <div className="w-1/6" >
        <NotesViewer notes={randNotes}/>
      </div>
      <div className="w-1/2" >
        <PdfViewer />
      </div>
      <div className="w-1/3 bg-slate-600" >
        <PointQuizViewer />
      </div>
      </div>
    </div>
  );
}

export default App;
