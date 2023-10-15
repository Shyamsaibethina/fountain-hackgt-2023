import { useState } from "react";

export default function QuizQuestion(props) {
    const data = JSON.parse(props.question);
    const options = data.options.split("\n");
    const [selected, setSelected] = useState(null);

    function handleChange(event) {
        setSelected(event.target.value);
    }

    if (selected === data.answer) {
        props.handleCorrect();
    }

    return (
        <div class="bg-slate-500 w-4/5 py-2 px-4 overflow-y-auto">
            <div onChange={handleChange}>
                <div className="flex justify-center">
                    <p className="text-white font-poppins mb-1">{data.question}</p>
                </div>
                {options.map(option => 
                    <div className="flex align-center">
                        <input type="radio" name={data.hashCode()} value={option} />
                        <label className="text-white font-poppins ml-1" for={option}>{option}</label>
                    </div>
                )}
            </div>
        </div>
    );
}