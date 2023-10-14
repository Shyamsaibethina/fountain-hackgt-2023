export default function Note(props) {
    return(
        <div className="p-1">
            <p className="text-white font-sans">{props.note}</p>
        </div>
    );
}