export default function Note(props) {
    function handleClick() {
        props.setCurrNote(props.note);
    }
    return(
        <button onClick={handleClick} className="flex justify-center overflow-hidden bg-slate-500 w-4/5 hover:bg-slate-700 py-2 px-4 rounded">
            <p className="text-white font-poppins">{props.note}</p>
        </button>
    );
}