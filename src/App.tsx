import React from "react";
import "./App.css";

const bankOne = [
  {
    key: "Q",
    id: "Heater-1",
    src: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-1.mp3",
  },
  {
    key: "W",
    id: "Heater-2",
    src: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-2.mp3",
  },
  {
    key: "E",
    id: "Heater-3",
    src: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-3.mp3",
  },
  {
    key: "A",
    id: "Heater-4",
    src: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-4_1.mp3",
  },
  {
    key: "S",
    id: "Clap",
    src: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-6.mp3",
  },
  {
    key: "D",
    id: "Open-HH",
    src: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Dsc_Oh.mp3",
  },
  {
    key: "Z",
    id: "Kick-n-Hat",
    src: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Kick_n_Hat.mp3",
  },
  {
    key: "X",
    id: "Kick",
    src: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/RP4_KICK_1.mp3",
  },
  {
    key: "C",
    id: "Closed-HH",
    src: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Cev_H2.mp3",
  },
];

const bankTwo = [
  {
    key: "Q",
    id: "Chord-1",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3",
  },
  {
    key: "W",
    id: "Chord-2",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3",
  },
  {
    key: "E",
    id: "Chord-3",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3",
  },
  {
    key: "A",
    id: "Shaker",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3",
  },
  {
    key: "S",
    id: "Open-HH",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3",
  },
  {
    key: "D",
    id: "Closed-HH",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3",
  },
  {
    key: "Z",
    id: "Punchy-Kick",
    src: "https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3",
  },
  {
    key: "X",
    id: "Side-Stick",
    src: "https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3",
  },
  {
    key: "C",
    id: "Snare",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3",
  },
];

function App() {
  const [display, setDisplay] = React.useState("");
  const [power, setPower] = React.useState(true);
  const [volume, setVolume] = React.useState(0.3);
  const [bank, setBank] = React.useState(true);
  const [active, setActive] = React.useState(null);

  const currentBank = bank ? bankOne : bankTwo;

  const playDrum = React.useCallback(
    (drum) => {
      if (!power) {
        setDisplay("");
        return;
      }

      const audio = document.getElementById(drum.key);

      if (audio) {
        audio.volume = volume;
        audio.currentTime = 0;
        audio.play();

        setDisplay(drum.id.replace(/-/g, " "));
        setActive(drum.key);

        setTimeout(() => setActive(null), 150);
      }
    },
    [power, volume],
  );

  React.useEffect(() => {
    const handleKey = (e) => {
      const key = e.key.toUpperCase();
      const drum = currentBank.find((d) => d.key === key);

      if (drum) {
        playDrum(drum);
      }
    };

    document.addEventListener("keydown", handleKey);

    return () => {
      document.removeEventListener("keydown", handleKey);
    };
  }, [playDrum, currentBank]);

  return (
    <div className="page">
      <div id="drum-machine" className="machine-div">
        <div className="machine">
          <div className="pad-grid">
            {currentBank.map((drum) => (
              <button
                key={drum.key}
                id={drum.id}
                className={`drum-pad ${active === drum.key ? "active" : ""}`}
                onClick={() => playDrum(drum)}
              >
                <audio id={drum.key} className="clip" src={drum.src} />
                {drum.key}
              </button>
            ))}
          </div>

          <div className="controls">
            {/* Power */}
            <div className="control-group">
              <div className="label">Powers {power ? "ON" : "OFF"}</div>

              <div
                className="toggle"
                onClick={() => {
                  setPower((p) => !p);
                  setDisplay("");
                }}
              >
                <div className={`toggle-half ${!power ? "on" : ""}`} />
                <div className={`toggle-half ${power ? "on" : ""}`} />
              </div>
            </div>

            {/* Display */}
            <div id="display" className="display">
              {display || "\u00A0"}
            </div>

            {/* Volume */}
            <div className="control-group">
              <div className="slider-row">
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  className="slider"
                  onChange={(e) => {
                    const v = parseFloat(e.target.value);

                    setVolume(v);

                    if (power) {
                      setDisplay(`Volume: ${Math.round(v * 100)}`);
                    }
                  }}
                />
              </div>
            </div>

            {/* Bank */}
            <div className="control-group">
              <div className="label">Bank Box{bank ? "One" : "Two"}</div>

              <div
                className="bank-toggle"
                onClick={() => {
                  setBank((b) => !b);

                  setDisplay(bank ? "Bank Two" : "Bank One");
                }}
              >
                <div className={`toggle-half ${bank ? "on" : ""}`} />
                <div className={`toggle-half ${!bank ? "on" : ""}`} />
              </div>
            </div>
          </div>
        </div>

        <div className="logo">FCC (🔥)</div>
      </div>
    </div>
  );
}

export default App;
