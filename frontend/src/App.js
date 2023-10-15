import NotesViewer from "./components/NotesViewer";
import PdfViewer from "./components/PdfViewer";
import PointQuizViewer from "./components/PointQuizViewer";

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage, ref, listAll} from "firebase/storage";
import { useState, useEffect } from 'react';

const firebaseConfig = {
  apiKey: "AIzaSyBf5xxoM-DP0WHE7dLONYBwC6_JBVaTSPo",
  authDomain: "hackgtx.firebaseapp.com",
  projectId: "hackgtx",
  storageBucket: "hackgtx.appspot.com",
  messagingSenderId: "843484177339",
  appId: "1:843484177339:web:b8f62ca7e3ecb6242b1a9e",
  measurementId: "G-PNXH8CDYPJ"
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage();

function App() {
  const [notes, setNotes] = useState([]);
  const [currNote, setCurrNote] = useState("");

  const notesRef = ref(storage, 'notes');
  
  const getNotes = async () => {
    try {
      const res = await listAll(notesRef);
      setNotes(res.items.map((n) => n.name));
    } catch (error) {
      console.error("Error listing items:", error);
    }
  };
  useEffect(() => {
    getNotes();
  }, []);
  return (
    <div className="bg-slate-700 flex flex-col">
      <div className="w-screen"> 
      <div className="bg-slate-500 p-4">
          <nav className="flex items-center justify-center">
            <p className="text-white font-poppins text-4xl font-bold">Notable</p>
          </nav>
        </div>
      </div>
      <div className="flex flex-row">
      <div className="w-1/6" >
        <NotesViewer notes={notes} setCurrNote={setCurrNote} />
      </div>
      <div className="w-1/2" >
        <PdfViewer currNote={currNote} />
      </div>
      <div className="w-1/3 bg-slate-600" >
        <PointQuizViewer currNote={currNote} />
      </div>
      </div>
    </div>
  );
}

export default App;
