import PointBox from "./PointBox";
import QuizQuestion from "./QuizQuestion";
import SliderButton from "./SliderButton";
import { useState } from 'react';
import SubmitQuiz from "./SubmitQuiz";

export default function PointQuizViewer() {
    const [quizSelected, setQuiz] = useState(false)
    let randPoints = ["Sai likes Men Sai likes Men Sai likes MenSai likes Men Sai likes Men Sai likes Men Sai likes Men Sai likes Men Sai likes Men Sai likes Men", "Front end warrior", "Shyammmmmmm SAI", "Shyammmmmmm SAI", "Shyammmmmmm SAI", "Shyammmmmmm SAI", "Shyammmmmmm SAI", "Shyammmmmmm SAI", "Shyammmmmmm SAI", "Shyammmmmmm SAI", "Shyammmmmmm SAI", "Shyammmmmmm SAI", "Shyammmmmmm SAI", "Sai likes Men Sai likes Men Sai likes MenSai likes Men Sai likes Men Sai likes Men Sai likes Men Sai likes Men Sai likes Men Sai likes Men", "Front end warrior", "Shyammmmmmm SAI", "Shyammmmmmm SAI", "Shyammmmmmm SAI", "Shyammmmmmm SAI", "Shyammmmmmm SAI", "Shyammmmmmm SAI", "Shyammmmmmm SAI", "Shyammmmmmm SAI", "Shyammmmmmm SAI", "Shyammmmmmm SAI", "Shyammmmmmm SAI"];
    let questions = [{
        question: "What is the super duper important men of life?",
        answers: ["42", "69", "420", "666"],
        id: 1
    }, {
        question: "What is the meaning of Sai?",
        answers: ["2", "9", "0", "6"],
        id: 10
    }]
    return (
        <div className="h-[calc(100vh_-_65px)] overflow-scroll">
            <div className="flex justify-center py-2">
                <SliderButton quizSelected={quizSelected} setQuiz={setQuiz} />
            </div>
            <ul className="flex space-y-2 my-2 flex-col items-center justify-center">
                {!quizSelected ? 
                randPoints.map(point =>
                    <PointBox text={point} />
                )
                :
                questions.map(question =>
                    <QuizQuestion question={question} />
                )
                }
                {quizSelected ? <SubmitQuiz /> : null}
            </ul>
        </div>
    );
}
