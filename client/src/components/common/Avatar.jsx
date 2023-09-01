import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FaCamera } from "react-icons/fa";
import ContextMenu from "./ContextMenu";
import PhotoPicker from "./PhotoPicker";
import { render } from "react-dom";
import PhotoLibrary from "./PhotoLibrary";
import CapturePhoto from "./CapturePhoto";

function Avatar({ type, image, setImage }) {

  const [hover, setHover] = useState(false);
  const [isContextMenuVisible, setIsContextMenuVisible] = useState(false);
  const [contextMenuCoordinates, setContextMenuCoordinates] = useState({ x: 0, y: 0 });

  const [grabPhoto, setGrabPhoto] = useState(false);
  const [showPhotoLibrary, setShowPhotoLibrary] = useState(false);
  const [showCapturePhoto, setShowCapturePhoto] = useState(false);

  const showContextMenu = (e) => {
    e.preventDefault();
    setIsContextMenuVisible(true);
    setContextMenuCoordinates({ x: e.pageX, y: e.pageY });
  }

  useEffect(() => {
    if (grabPhoto) {
      const data = document.getElementById("photo-picker");
      data.click();
      document.body.onfocus = (e) => {
        setGrabPhoto(false);
      }
    }
  }, [grabPhoto])

  const contextMenuOptions = [
    {
      name: "Take Photo", callback: () => {
        setShowCapturePhoto(true);
      }
    },
    {
      name: "Choose From Library", callback: () => {
        setShowPhotoLibrary(true);
      }
    },
    {
      name: "Upload Photo", callback: () => {
        setGrabPhoto(true);
      }
    },
    {
      name: "Remove Photo", callback: () => {
        setImage("/default_avatar.png");
      }
    },
  ]

  const photoPickerChange = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    const data = document.createElement("img");

    reader.onload = function (event) {
      data.src = event.target.result;
      data.setAttribute("data-src", event.target.result);
    };

    reader.readAsDataURL(file);

    setTimeout(() => {
      setImage(data.src);
    }, 100);
  };

  return (
    <>
      <div className="flex items-center justify-center">
        {type === "sm" && (
          <div className="relative h-10 w-10">
            <Image src={image} alt="avatar" className="rounded-full" fill />
          </div>
        )}

        {type === "lg" && (
          <div className="relative h-14 w-14">
            <Image src={image} alt="avatar" className="rounded-full " fill />
          </div>
        )}

        {type === "xl" && (
          <div className="relative cursor-pointer z-0"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            <div className={`z-10 bg-photopicker-overlay-background h-60 w-60 absolute left-0 top-0 flex items-center rounded-full justify-center flex-col text-center gap-2 
            ${hover ? "visible" : "hidden"}`}
              onClick={(e) => showContextMenu(e)}
              id="context-opener"
            >
              <FaCamera className="text-2xl" id="context-opener" />
              <span id="context-opener" className="w-14 flex items-center justify-center">Change Profile Photo</span>
            </div>

            <div className="h-60 w-60 flex items-center justify-center">
              <Image src={image} alt="avatar" className="rounded-full " fill />
            </div>
          </div>

        )}

      </div>
      {
        isContextMenuVisible && <ContextMenu
          option={contextMenuOptions}
          coordinates={contextMenuCoordinates}
          contextMenu={isContextMenuVisible}
          setContextMenu={setIsContextMenuVisible} />
      }

      {showCapturePhoto &&
        <CapturePhoto
          setImage={setImage} hide={setShowCapturePhoto}
        />
      }

      {showPhotoLibrary &&
        <PhotoLibrary
          setImage={setImage}
          hidePhotoLibrary={setShowPhotoLibrary}
        />}

      {grabPhoto && <PhotoPicker onChange={photoPickerChange} />}

    </>
  )

}

export default Avatar;
