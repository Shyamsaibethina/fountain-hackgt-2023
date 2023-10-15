import { useState } from "react";

export default function QuizQuestion(props) {
    const data = JSON.parse(props.question);
    const [selected, setSelected] = useState(null);

    function handleChange(event) {
        setSelected(event.target.value);
        if (selected === data.answer) {
            props.updateScore(props.score + 1);
        }
    }

    return (
        <div class="bg-slate-500 w-4/5 py-2 px-4 overflow-y-auto">
            <div className="space-y-2">
                <div className="flex justify-center">
                    <p className="text-white font-poppins mb-1">{data.question}</p>
                </div>
                {data.options.map(option => 
                    <div className="flex align-top items-top" >
                        <div>
                            <input className="mt-[6px]" type="radio" name={data.question} value={option} />   
                        </div>
                        <div>
                            <label className="text-white font-poppins ml-2" for={option}>{option}</label>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}