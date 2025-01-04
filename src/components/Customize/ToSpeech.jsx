import React, { useRef, useState } from "react";
import Dropdownlist from "../DropdownList/DropdownList";

function ToSpeech() {
    const ref = useRef();
  const [pitch, setPitch] = useState(0);
  const [speech, setSpeech] = useState(0);
  const [voice, setVoice] = useState(0);
  const PitchList = [1, 0.5, 2];
  const SpeechList = ["0.8x", "1x", "1.2x"];
    const VoiceList = ["South women", "Northern women", "South men", "Northern men"];
  return (
    <div className="px-0 p-3">
      <p className="font-bold border-b-2 mb-2 pb-3 text-blue uppercase lg:text-lg text-[14px] ">
        Customize
      </p>
      <div className="flex flex-row justify-between ">
        <Dropdownlist
          title="Pitch"
          options={PitchList}
          callback={setPitch}
          selected={pitch}
        />
        <Dropdownlist
          title="Speech"
          options={SpeechList}
          callback={setSpeech}
          selected={speech}
        />
      </div>
      <Dropdownlist
        title="Voice"
        options={VoiceList}
        callback={setVoice}
        selected={voice}
      />
      {/* <div className="flex justify-end">
          <Button title="Transfer" />
        </div> */}
    </div>
  );
}

export default ToSpeech;
