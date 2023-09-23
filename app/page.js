"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [currentTime, setCurrentTime] = useState(0);
  const [limit, setLimit] = useState(0);
  const [getLimit, setGetLimit] = useState(0);
  const [unit, setUnit] = useState("Sec");
  const [minute, setMinute] = useState(0);
  const [running, setRunning] = useState(false);
  const alarm = new Audio("/alarm.wav");

  const options = ["Seconds", "Minutes", "Hours"];

  const handleReset = () => {
    alarm.pause();
    setLimit(0);
    setMinute(0);
    setCurrentTime(0);
    setRunning(false);
  };

  const handleChange = (e) => {
    setGetLimit(e.target.value);
  };

  const handleUnitChange = (e) => {
    setUnit(e.target.value);
  };

  const fixLimit = () => {
    setLimit(getLimit);
    setCurrentTime(0);
    setRunning(true);
    console.log(limit);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      if (minute == limit && limit > 0) {
        alarm.play();
      }

      if (minute < limit && running) {
        if (currentTime == 59) {
          setMinute(minute + 1);
          setCurrentTime(0);
        } else {
          setCurrentTime((prevTime) => prevTime + 1);
        }
      } else {
        clearInterval(timer); // Stop the timer when currentTime reaches 10
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [currentTime, limit, running, limit]);

  return (
    <>
      <div className="flex h-screen justify-center items-center flex-col gap-12">
        <div className="text-9xl  font-bold h-50 w-50 border-4 border-white p-10 rounded-2xl">
          {minute} : {currentTime} {unit}
        </div>
        <div>
          <button
            className="text-2xl m-8 text-white font-bold border-2 border-white p-2 rounded-md"
            onClick={handleReset}
          >
            Reset
          </button>

          <button
            className="text-2xl m-8 text-white font-bold border-2 border-white p-2 rounded-md"
            onClick={() => {
              setRunning(!running);
            }}
          >
            {running ? "Stop" : "Start"}
          </button>
        </div>

        <div className="flex items-center">
          <input
            className="p-4 text-black font-bold rounded-md text-center"
            placeholder="Set time"
            onChange={handleChange}
          />

          <button
            className="text-2xl mx-8 text-white font-bold border-2 border-white p-2 rounded-md"
            onClick={fixLimit}
          >
            Start Timer
          </button>
          <div>
            <label className="text-2xl font-bold">Select time :</label>
            <select
              className="text-2xl mx-8 text-white font-bold border-2 border-white p-2 rounded-md w-40 bg-black"
              onChange={handleUnitChange}
            >
              {options.map((unit) => {
                return <option>{unit}</option>;
              })}
            </select>
          </div>
        </div>
      </div>
    </>
  );
}
