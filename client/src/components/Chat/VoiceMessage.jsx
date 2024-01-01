import { useStateProvider } from "@/context/StateContext";
import React, { useState, useEffect, useRef } from "react";
import WaveSurfer from "wavesurfer.js";
import Avatar from "../common/Avatar";
import { FaPlay, FaStop } from "react-icons/fa";
import { calculateTime } from "@/utils/CalculateTime";
import MessageStatus from "../common/MessageStatus";

function VoiceMessage({ message }) {
  const [{ currentChatUser, userInfo }] = useStateProvider();
  const [audioMessage, setaudioMessage] = useState(null);
  const [isPlaying, setisPlaying] = useState(false);
  const [currentPlaybackTime, setcurrentPlaybackTime] = useState(0);
  const [totalDuration, settotalDuration] = useState(0);

  const waveformRef = useRef();
  const waveform = useRef();

  useEffect(() => {
    if (audioMessage) {
      const updatePlaybackTime = () => {
        setcurrentPlaybackTime(audioMessage.currentTime);
      };
      audioMessage.addEventListener("timeupdate", updatePlaybackTime);

      return () => {
        audioMessage.removeEventListener("timeupdate", updatePlaybackTime);
      };
    }
  }, [audioMessage]);

  useEffect(() => {
    if (!waveform.current) {
      waveform.current = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: "#ccc",
        progressColor: "4a9eff",
        cursorColor: "#7ae3c3",
        barWidth: 2,
        height: 30,
        responsive: true,
      });
      waveform.current.on("finish", () => {
        setisPlaying(false);
      });
    }

    return () => {
      waveform.current.destroy();
    };
  }, []);

  useEffect(() => {
    const audioURL = message.message;
    const audio = new Audio(audioURL);
    setaudioMessage(audio);
    if (waveform && waveform.current) {
      waveform.current.load(audioURL);
      waveform.current.on("ready", () => {
        settotalDuration(waveform.current.getDuration());
      });
    }
  }, [message.message]);

  const handlePlayAudio = () => {
    if (audioMessage) {
      waveform.current.stop();
      waveform.current.play();
      audioMessage.play();
      setisPlaying(true);
    }
  };

  const handlePauseAudio = () => {
    waveform.current.stop();
    audioMessage.pause();
    setisPlaying(false);
  };

  const formatTime = (time) => {
    if (isNaN(time)) return "00:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div
      className={`flex items-center gap-5 text-white px-4 pr-2 py-4 text-sm rounded-md
    ${
      message.senderId === currentChatUser.id
        ? "bg-incoming-background "
        : "bg-outgoing-background"
    }`}
    >
      <div>
        <Avatar type="lg" image={currentChatUser?.profilePicture} />
      </div>

      <div className="cursor-pointer text-xl">
        {!isPlaying ? (
          <FaPlay onClick={handlePlayAudio} />
        ) : (
          <FaStop onClick={handlePauseAudio} />
        )}
      </div>

      <div className="relative ">
        <div className="w-60" ref={waveformRef} />
        <div className="text-bubble-meta text-[11px] pt-1 flex justify-between absolute bottom-[-22px] w-full">
          <span>
            {formatTime(isPlaying ? currentPlaybackTime : totalDuration)}
          </span>
          <div className="flex gap-1 ">
            <span>{calculateTime(message.createdAt)}</span>
            {message.senderId === userInfo.id && (
              <MessageStatus messageStatus={message.messageStatus} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default VoiceMessage;
