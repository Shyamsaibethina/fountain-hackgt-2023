import { AiOutlinePlus } from 'react-icons/ai';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage, ref, uploadBytes} from "firebase/storage";
import { useState } from 'react';

const firebaseConfig = {
  apiKey: "AIzaSyBf5xxoM-DP0WHE7dLONYBwC6_JBVaTSPo",
  authDomain: "hackgtx.firebaseapp.com",
  projectId: "hackgtx",
  storageBucket: "hackgtx.appspot.com",
  messagingSenderId: "843484177339",
  appId: "1:843484177339:web:b8f62ca7e3ecb6242b1a9e",
  measurementId: "G-PNXH8CDYPJ"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Get a reference to the storage service, which is used to create references in your storage bucket
const storage = getStorage();

export default function NewNote() {
    const [file, setFile] = useState(null);

    function handleFile(event) {
        setFile(event.target.files[0])
    };

    function handleUpload() {
        if (file === null) {
            alert("Please select a file to upload");
            return;
        }
        const notesRef = ref(storage, "notes/" + file.name);
        uploadBytes(notesRef, file).then((snapshot) => {
            console.log('Uploaded a blob or file!');
            window.location.reload(false);
        });
    };

    return (
        <div className='flex flex-col items-center justify-center'>
            <div className='flex w-full justify-center'>
                <button onClick={handleUpload} class="flex w-4/5 justify-center overflow-hidden bg-slate-500 hover:bg-slate-700 py-2 px-4 rounded" >
                    <div className="flex p-1 items-center">
                        <AiOutlinePlus className='fill-white mr-2'/>
                        <p className="text-white font-poppins">Create Note</p>
                    </div>
                </button>
            </div>
            <div className='flex w-full justify-center'>
                <input onChange={handleFile} class="w-4/5 block text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file" />
            </div>
        </div>
    );
}