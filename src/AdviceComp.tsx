import { useEffect, useState } from "react";
import "./AdviceComp.css";
import twitterLogo from "./images/twitterLogo.png";

type Data = {
  slip: {
    advice: string;
  };
};
const AdviceComp = () => {
  // State to store the advice text
  const [advice, setAdvice] = useState("");
  const [reFetch, setReFetch] = useState(0);

  // Function to get the data
  const fetchData = async (): Promise<Data> => {
    const response = await fetch("https://api.adviceslip.com/advice");
    const data = await response.json();
    return data;
  };

  // Set the data on first render and whenever the reFetch state changes
  useEffect(() => {
    const getText = async () => {
      const adviceInfo = await fetchData();
      setAdvice(adviceInfo.slip.advice);
    };

    getText();
  }, [reFetch]);

  return (
    <section className="container">
      <section className="card">
        <blockquote cite="unknown">
          <p className="text"> {advice}</p>
        </blockquote>
        <section className="button-container">
          <a
            target="_blank"
            rel="noreferrer"
            href={`https://twitter.com/intent/tweet?text=${advice}`}
          >
            <figure>
              <img className="twitter" src={twitterLogo} alt="" />
            </figure>
          </a>
          <button
            onClick={async () => {
              // Change the reFetch value to trigger the useEffect hook
              setReFetch(reFetch + 1);
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
