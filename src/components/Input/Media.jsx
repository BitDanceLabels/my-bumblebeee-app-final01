import MediaBase from "./MediaBase";
import {
  GooglePodcastsLogo,
  Image as I,
  VideoCamera,
} from "@phosphor-icons/react/dist/ssr";
import { useDispatch, useSelector } from "react-redux";
import { onClickAudio } from "../../redux/clickAudioSlice";
import { onClickImage } from "../../redux/clickImageSlice";
import { onClickVideo } from "../../redux/clickVideoSlice";
import React, { useContext, useEffect, useRef, useState } from "react";
import { BoxContext } from "../Whitespace/Element";

export const Audio = React.forwardRef(function AudioResult(_, ref) {
  // const selectDataAudio = useSelector((state) => state.clickSelect.data);
  // const selectDataIdAudio = selectDataAudio.id;
  // const dispatch = useDispatch();
    const acceptType = ["mp3", "raw", "wav", "mpeg"];

  // const hanleAudioUpload = async (source, filetype) => {
  //   try {
  //     const base64data = await blobToBase64(source);
  //     dispatch(
  //       onClickAudio({
  //         id: selectDataIdAudio,
  //         source: base64data,
  //         filetype: filetype,
  //       })
  //     );
  //   } catch (error) {
  //     console.error("Error converting Blob to base64:", error);
  //     // Xử lý lỗi nếu có
  //   }
  // };

  // const blobToBase64 = (blob) => {
  //   return new Promise((resolve, reject) => {
  //     const reader = new FileReader();
  //     reader.readAsDataURL(blob);
  //     reader.onloadend = () => {
  //       const base64data = reader.result;
  //       resolve(base64data);
  //     };
  //     reader.onerror = reject;
  //   });
  // };
  const [audioSrc, setAudioSrc] = useState("");
  const audioRef = useRef();

  return (
    <MediaBase
      IconComp={GooglePodcastsLogo}
      placeholder="Upload your Audio"
      accept={acceptType}
      childRef={audioRef}
      handleRef={ref}
    >
      <audio controls className="w-full" ref={audioRef} src={audioSrc}></audio>
    </MediaBase>
  );
});

export const Image = React.forwardRef(function ImageResult(_, ref) {
  const acceptType = ["jpg", "png", "jpeg"];
  // dispatch(onClickImage({id:selectDataIdImage, source: source, filetype: filetype }));
  const imageRef = useRef();
  return (
    <MediaBase
      IconComp={I}
      placeholder="Upload your Image"
      accept={acceptType}
      childRef={imageRef}
      handleRef={ref}
    >
      <img
        alt=""
        srcset=""
        ref={imageRef}
        className="pointer-events-none w-full h-full"
      />
    </MediaBase>
  );
});

export const Video = React.forwardRef(function VideoResult(_, ref) {
  const selectDataVideo = useSelector((state) => state.clickSelect.data);
  // const selectDataIdVideo = selectDataVideo.id;
  const acceptType = ["mp4", "wav", "mov", "webm"];
  // const dispatch = useDispatch();
  const videoRef = useRef();

  return (
    <MediaBase
      IconComp={VideoCamera}
      placeholder="Upload your video"
      accept={acceptType}
      childRef={videoRef}
      handleRef={ref}
    >
      <video width="400" height="400" ref={videoRef} controls autoPlay></video>
    </MediaBase>
  );
});
