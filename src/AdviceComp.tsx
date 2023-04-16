import { useEffect, useState } from "react";
import "./AdviceComp.css";

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
      <section className="card">{advice}</section>
    </section>
  );
};

export default AdviceComp;
