import {useState} from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage, ref, getDownloadURL} from "firebase/storage";

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

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.js',
    import.meta.url,
  ).toString();

export default function PdfViewer(props) {
    const [numPages, setNumPages] = useState(null);
    const [pdf, setPdf] = useState(null);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    getDownloadURL(ref(storage, 'notes/' + props.currNote)).then((url) => {
        // `url` is the download URL for 'images/stars.jpg'

        // This can be downloaded directly:
        const xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.onload = (event) => {
        const blob = xhr.response;
        };
        xhr.open('GET', url);
        xhr.send();

        // Or inserted into an <img> element
        setPdf(url);
    }).catch((error) => {
        // Handle any errors
    });

    return (
        <div className='flex h-[calc(100vh_-_65px)] justify-center'>
            <Document
                file={pdf}
                onLoadSuccess={onDocumentLoadSuccess}
                className="divide-y overflow-scroll"
                >
                {Array.from(
                    new Array(numPages),
                    (el, index) => (
                    <Page
                        key={`page_${index + 1}`}
                        pageNumber={index + 1}
                    />
                    ),
                )}
            </Document>
        </div>
    );
}