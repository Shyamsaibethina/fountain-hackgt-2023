import NewNote from './NewNote';
import Note from './Note';
export default function NotesViewer(props) {
    return (
        <div className="bg-slate-600 h-[calc(100vh_-_65px)] overflow-scroll">
            <div className='flex justify-center py-2'>
                <h className="text-3xl text-white font-bold font-poppins">Notes</h>
            </div>
            <ul className="flex space-y-1 flex-col items-center justify-center">
                {props.notes.map(note => 
                    <Note note={note}/>
                )}
                <NewNote />
            </ul>
        </div>
    );
}