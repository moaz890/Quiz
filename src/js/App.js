import React, { useEffect, useState } from "react"
import { nanoid } from "nanoid";
import Slide from "./Slide";
import data from "./data";

export default function App () {
    
    const [finished, setFinished] = useState(false);
    const [index, setIndex] = useState( () => {
        return +localStorage.getItem("currentIndex") || 0;
    });

    useEffect(() => {
        localStorage.setItem("currentIndex", `${index}`);
    }, [index]);

    useEffect (() => {
        localStorage.clear()
        if (index === 0) {
            document.getElementById("btn-prev").classList.add("prevented")
        }else {
            document.getElementById("btn-prev").classList.remove("prevented")

        }
    }, [index]);
    useEffect (() => {

        const controlBtns = document.querySelector(".control-buttons");

        if (finished) {
            controlBtns.remove();
        }

    }, [finished])
    const slide = <Slide key={nanoid()} index={index} finished={finished} />

    function handlePrev () {
        if (index > 0) {
            setIndex((last) => last - 1);
        }
    }
    function handleNext () {
        if (index < 4){
            setIndex((last) => last + 1);
        }
    }
    
    function handleFinished() {
        setFinished(true);
        localStorage.removeItem("currentIndex");
        setTimeout(() => {
            localStorage.removeItem("choices");
        }, 1000);
    }
    return (
        <main>
            <div className="container">
                {slide}
                <div className="control-buttons">
                    <button type="button" className='btn-prev' onClick={handlePrev} id="btn-prev" >Prev Question</button>
                    {index < 4 ? 
                        <button type="button" className="btn-next" onClick={handleNext} id="btn-next">Next Question</button>
                        :<button type="button" className="submit" id="submit" onClick={handleFinished}>Submit Quiz</button>
                    }
                </div>
            </div>
        </main>
    )
}