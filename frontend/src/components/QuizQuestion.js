export default function QuizQuestion(props) {
    return (
        <div class="bg-slate-500 w-4/5 py-2 px-4 overflow-y-auto">
            <div>
                <div className="flex justify-center">
                    <p className="text-white font-poppins mb-1">{props.question.question}</p>
                </div>
                {props.question.answers.map(answer => 
                    <div className="flex align-center">
                        <input type="radio" name={props.question.id} value={answer} />
                        <label className="text-white font-poppins ml-1" for={answer}>{answer}</label>
                    </div>
                )}
            </div>
        </div>
    );
}