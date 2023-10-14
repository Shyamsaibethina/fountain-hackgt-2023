export default function SliderButton(props) {

    const handleKeyPointsPress = () => {
        props.setQuiz(false);
    }
    const handleQuizPress = () => {
        props.setQuiz(true);
    }
  
    return (
        <div>
            <button onClick={handleKeyPointsPress} className={(props.quizSelected ? "bg-slate-700" : "bg-slate-800") + " hover:bg-slate-800 font-poppins text-white text-2xl font-bold py-2 px-4 rounded-l"}>
                Key Points
            </button>
            <button onClick={handleQuizPress} className={(props.quizSelected ? "bg-slate-800" : "bg-slate-700") + " hover:bg-slate-800 font-poppins text-white text-2xl font-bold py-2 px-4 rounded-r"}>
                Quiz
            </button>
        </div>
    )
}