import { useEffect, useState } from "react";
import "./AdviceComp.css";
import twitterLogo from "./images/twitterLogo.png";

type Data = {
  slip: {
    advice: string;
  };
};
const AdviceComp = () => {
  const [advice, setAdvice] = useState("");

  const fetchData = async (): Promise<Data> => {
    const response = await fetch("https://api.adviceslip.com/advice");
    const data = await response.json();
    return data;
  };

  useEffect(() => {
    const changeText = async () => {
      const adviceInfo = await fetchData();
      setAdvice(adviceInfo.slip.advice);
    };

    changeText();
  }, []);

  return (
    <section className="container">
      <section className="card">
        <blockquote cite="unknown">
          <p className="text"> {advice}</p>
        </blockquote>
        <section className="button-container">
          <a target="_blank" href="">
            <figure>
              <img className="twitter" src={twitterLogo} alt="" />
            </figure>
          </a>
          <button
            onClick={async () => {
              const newAdvice = await fetchData();
              setAdvice(newAdvice.slip.advice);
            }}
            className="another-quote"
          >
            Another one please
          </button>
        </section>
      </section>
    </section>
  );
};

export default AdviceComp;
