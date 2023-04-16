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
  const [randomColor, setRandomColor] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Set the data on first render and whenever the reFetch state changes
  useEffect(() => {
    const getText = async () => {
      const adviceInfo = await fetchData();
      setAdvice(adviceInfo.slip.advice);
    };

    getText();
  }, [reFetch]);

  // Function to get the data
  const fetchData = async (): Promise<Data> => {
    setIsLoading(true);
    const response = await fetch("https://api.adviceslip.com/advice");
    const data = await response.json();
    setIsLoading(false);

    return data;
  };

  // Function to randomize the background color
  const getRandomColor = () => {
    // String with all possible letters in a hexa color code
    const letters = "0123456789ABCDEF";
    // All colors begin with a #
    let color = "#";
    // Loop 6 times
    for (let i = 0; i < 6; i++) {
      // Randomize the letter in each index
      color += letters[Math.floor(Math.random() * 16)];
    }

    return color;
  };

  return (
    <section style={{ backgroundColor: randomColor }} className="container">
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
              setRandomColor(getRandomColor());
            }}
            disabled={isLoading}
            className="another-quote"
          >
            {isLoading ? "Loading..." : "Another one please"}
          </button>
        </section>
      </section>
    </section>
  );
};

export default AdviceComp;
