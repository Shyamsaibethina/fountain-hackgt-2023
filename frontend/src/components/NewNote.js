import { AiOutlinePlus } from 'react-icons/ai';
export default function NewNote() {
    return (
        <button class="flex justify-center overflow-hidden bg-slate-500 w-4/5 hover:bg-slate-700 py-2 px-4 rounded">
            <div className="flex p-1 items-center width-max">
                <AiOutlinePlus className='fill-white mr-2'/>
                <p className="text-white font-poppins">Create Note</p>
            </div>
        </button>
    );
}