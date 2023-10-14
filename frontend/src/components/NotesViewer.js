import NewNote from './NewNote';
import Note from './Note';
export default function NotesViewer(props) {
    return (
        <div className="bg-slate-600 h-[calc(100vh_-_65px)] overflow-scroll">
            <div className='flex justify-center py-2'>
                <p className="text-3xl text-white font-bold font-poppins">Notes</p>
            </div>
            <ul className="flex space-y-1 flex-col items-center justify-center">
                {props.notes.map(note => 
                    <Note note={note} setCurrNote={props.setCurrNote} />
                )}
                <NewNote />
            </ul>
        </div>
    );
}