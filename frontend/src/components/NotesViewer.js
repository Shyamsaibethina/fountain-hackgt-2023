import NewNote from './NewNote';
import Note from './Note';
export default function NotesViewer(props) {
    return (
        <div className="w-1/5 bg-slate-600 h-screen">
            <div className='flex justify-center'>
                <h className="text-3xl text-white font-sans">Notes</h>
            </div>
            <ul className="flex flex-col items-center justify-center">
                {props.notes.map(note => 
                <li>
                    <Note note={note}/>
                </li>
                )}
                <li>
                    <NewNote />
                </li>
            </ul>
        </div>
    );
}