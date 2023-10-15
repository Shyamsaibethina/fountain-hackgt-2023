import PointBox from "./PointBox";
import QuizQuestion from "./QuizQuestion";
import SliderButton from "./SliderButton";
import { useState } from 'react';
import SubmitQuiz from "./SubmitQuiz";

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage, ref, getDownloadURL} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBf5xxoM-DP0WHE7dLONYBwC6_JBVaTSPo",
  authDomain: "hackgtx.firebaseapp.com",
  projectId: "hackgtx",
  storageBucket: "hackgtx.appspot.com",
  messagingSenderId: "843484177339",
  appId: "1:843484177339:web:b8f62ca7e3ecb6242b1a9e",
  measurementId: "G-PNXH8CDYPJ"
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage();

export default function PointQuizViewer(props) {
    const [quizSelected, setQuiz] = useState(false)
    let randPoints = ["Sai likes Men Sai likes Men Sai likes MenSai likes Men Sai likes Men Sai likes Men Sai likes Men Sai likes Men Sai likes Men Sai likes Men", "Front end warrior", "Shyammmmmmm SAI", "Shyammmmmmm SAI", "Shyammmmmmm SAI", "Shyammmmmmm SAI", "Shyammmmmmm SAI", "Shyammmmmmm SAI", "Shyammmmmmm SAI", "Shyammmmmmm SAI", "Shyammmmmmm SAI", "Shyammmmmmm SAI", "Shyammmmmmm SAI", "Sai likes Men Sai likes Men Sai likes MenSai likes Men Sai likes Men Sai likes Men Sai likes Men Sai likes Men Sai likes Men Sai likes Men", "Front end warrior", "Shyammmmmmm SAI", "Shyammmmmmm SAI", "Shyammmmmmm SAI", "Shyammmmmmm SAI", "Shyammmmmmm SAI", "Shyammmmmmm SAI", "Shyammmmmmm SAI", "Shyammmmmmm SAI", "Shyammmmmmm SAI", "Shyammmmmmm SAI", "Shyammmmmmm SAI"];

    const [data, setData] = useState(null);
    const [score, setScore] = useState(0);

    function handleCorrect() {
        setScore(score + 1);
    }

    if (props.currNote !== "") {
        getDownloadURL(ref(storage, props.currNote.slice(0, props.currNote.length - 4) + ".json")).then((url) => {
            const xhr = new XMLHttpRequest();
            xhr.responseType = 'blob';
            xhr.onload = (event) => {
            const blob = xhr.response;
            };
            xhr.open('GET', url);
            xhr.send();
            setData(url);
        })
    }

    let lst = "";
    async function fetchMovies() {
        let response = await fetch(data);
        lst = (await response.text()).replace("```json\n", "").replace("```", "");
        lst = lst.replaceAll("}\n", "},\n");
        lst = lst.substring(0, lst.lastIndexOf(","));
        lst = "[" + lst + "]";
        console.log(lst);
    }
    fetchMovies();

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
                lst.map(question =>
                    <QuizQuestion question={question} handleCorrect={handleCorrect} />
                )
                }
                {quizSelected ? <SubmitQuiz /> : null}
            </ul>
        </div>
    );
}
