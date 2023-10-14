export default function PointBox(props) {
    return (
        <div class="flex justify-center overflow-hidden bg-slate-500 w-4/5 hover:bg-slate-700 py-2 px-4">
            <p className="text-white font-poppins">{props.text}</p>
        </div>
    );
}