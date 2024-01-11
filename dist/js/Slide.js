import { nanoid } from "nanoid"
import { useEffect, useState } from "react"
import data from "./data"

export default function Slide (props) {
    const [result, setResult] = useState(0);
    const [choices, setChoices] = useState(() => JSON.parse(localStorage.getItem("choices")) || Array(data.questions.length).fill("")) 
    const currentQuestion = data.questions[props.index];

    useEffect(() => {
        const answers = document.querySelectorAll("li");
        const slide = document.querySelector(".slide");

        slide.addEventListener("click", selectChoice);
        answers.forEach((li) => {

            if (li.querySelector(".text").textContent === choices[props.index]){
                li.classList.add("selected")
            }

        });
        function selectChoice(e) {
    
            const target = e.target.closest("li");
    
            if (target) {
                
                target.parentElement.querySelectorAll("li").forEach((li) => {
                    li.classList.remove("selected");
                })
                setChoices((last) => {
                    return last.map((choice, x) => {
                        return x === props.index ? target.querySelector(".text").textContent : choice;
                    })
                });
            }
    
        }
        return () => {
            slide.removeEventListener("click", selectChoice)
        }
    });
    

    useEffect(() => {
        localStorage.setItem("choices", JSON.stringify(choices))
    }, [choices]);
    
    useEffect(() => {})
    useEffect(() => {
        
        document.querySelectorAll(".slide--answers li").forEach((li) => {
            if (li.querySelector(".text").textContent === choices[props.index]){
                li.classList.add("selected");
            }
        });

    }, [props.index, choices]);
    
    useEffect(() => {
        
        setResult((prev) => {
            let final = 0;
            choices.forEach((choice, x) => {

                if (data.questions[x].correct === choice){
                    final += 1;
                }
            });
            return final;
        });
    },[props.finished]);
    

    return (

        <div className="slide">
            {!props.finished ? 
                <h3 className={`slide--title`}>{currentQuestion.id}.{currentQuestion.title}</h3>
                : 
                <h3 className={`slide--title center`}>Quiz Questions Had been Finished & Your Result is</h3>
            }
            {!props.finished
                ?
                <ul className="slide--answers">
                    {currentQuestion.answers.map((answer) => {
                        return <li key={nanoid()}><span className="circle"></span> <span className="text">{answer}</span></li>
                    })}
                </ul>
                :
                <h1 className="slide--result">{result}/5</h1>
            }
        </div>
    )
}