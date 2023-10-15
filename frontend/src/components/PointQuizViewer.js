import PointBox from "./PointBox";
import QuizQuestion from "./QuizQuestion";
import SliderButton from "./SliderButton";
import { useEffect, useState } from 'react';
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
    const [quizSelected, setQuiz] = useState(false);
    let randPoints = ["Sai likes Men Sai likes Men Sai likes MenSai likes Men Sai likes Men Sai likes Men Sai likes Men Sai likes Men Sai likes Men Sai likes Men", "Front end warrior", "Shyammmmmmm SAI", "Shyammmmmmm SAI", "Shyammmmmmm SAI", "Shyammmmmmm SAI", "Shyammmmmmm SAI", "Shyammmmmmm SAI", "Shyammmmmmm SAI", "Shyammmmmmm SAI", "Shyammmmmmm SAI", "Shyammmmmmm SAI", "Shyammmmmmm SAI", "Sai likes Men Sai likes Men Sai likes MenSai likes Men Sai likes Men Sai likes Men Sai likes Men Sai likes Men Sai likes Men Sai likes Men", "Front end warrior", "Shyammmmmmm SAI", "Shyammmmmmm SAI", "Shyammmmmmm SAI", "Shyammmmmmm SAI", "Shyammmmmmm SAI", "Shyammmmmmm SAI", "Shyammmmmmm SAI", "Shyammmmmmm SAI", "Shyammmmmmm SAI", "Shyammmmmmm SAI", "Shyammmmmmm SAI"];

    const [data, setData] = useState(null);
    const [data2, setData2] = useState(null);
    const [score, setScore] = useState(0);
    const [questions, setQuestions] = useState([]);
    const [keyWords, setKeyWords] = useState([]);

    if (props.currNote !== "") {
        let noteRef = ref(storage, props.currNote.slice(0, props.currNote.length - 4) + ".json");
        getDownloadURL(noteRef).then((url) => {
            const xhr = new XMLHttpRequest();
            xhr.responseType = 'blob';
            xhr.onload = (event) => {
            const blob = xhr.response;
            };
            xhr.open('GET', url);
            xhr.send();
            setData(url);
        }).catch((error) => {
            // Handle any errors
        });

        noteRef = ref(storage, props.currNote.slice(0, props.currNote.length - 4) + "-key" + ".json");
        getDownloadURL(noteRef).then((url) => {
            const xhr = new XMLHttpRequest();
            xhr.responseType = 'blob';
            xhr.onload = (event) => {
            const blob = xhr.response;
            };
            xhr.open('GET', url);
            xhr.send();
            setData2(url);
        }).catch((error) => {
            // Handle any errors
        });
    }

    let lst = "";
    let lst2 = [];
    async function fetchQs() {
        const response = await fetch(data);
        lst = (await response.text()).replace("```json\n", "").replaceAll("```", "");
        lst2 = lst.split("},");
        lst2.pop();
        setQuestions(lst2);
    }
    useEffect(() => {
        fetchQs();
    }, [data]);

    lst = "";
    lst2 = [];
    async function fetchKeys() {
        const response = await fetch(data2);
        lst = (await response.text()).replace("```json\n", "").replaceAll("```", "").replace("[", "").replace("]", "").replaceAll(/^\n+|\n+$/g, '').replaceAll("\t", "").replaceAll("\"", "");
        console.log(lst)
        lst2 = lst.split(",\n");
        setKeyWords(lst2);
        console.log(lst2);
    }
    useEffect(() => {
        fetchKeys();
    }, [data2]);
    return (
        <div className="h-[calc(100vh_-_65px)] overflow-scroll">
            <div className="flex justify-center py-2">
                <SliderButton quizSelected={quizSelected} setQuiz={setQuiz} />
            </div>
            <ul className="flex space-y-2 my-2 flex-col items-center justify-center">
                {!quizSelected ?
                keyWords.map(point =>
                    <PointBox text={point} />
                )
                :
                questions.map(question =>
                    <QuizQuestion question={question + " }"} />
                )
                }
                {!quizSelected ?
                    <p className="text-white font-poppins text-lg">{"Score: " + score + "/" + questions.length}</p>
                    : null
                }
                {quizSelected ? <SubmitQuiz /> : null}
                {quizSelected ? <p className="font-poppins text-white text-lg">{"Score: " + Math.floor(Math.random() * questions.length) + "/" + questions.length}</p> : null}
            </ul>
        </div>
    );
}
