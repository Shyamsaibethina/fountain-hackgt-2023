import {useState} from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import samplePDF from './Truist.pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.js',
    import.meta.url,
  ).toString();

export default function PdfViewer() {
    const [numPages, setNumPages] = useState(null);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
        <div className='flex h-[calc(100vh_-_65px)] justify-center'>
            <Document
                file={samplePDF}
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