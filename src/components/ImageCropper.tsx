import Cropper from "react-cropper";
import { Button } from "@/components/Button";
import { AiOutlineRotateRight } from "react-icons/ai";
import { useState } from "react";
import api from "@/api/api";
import "cropperjs/dist/cropper.css";
import styles from "../styles/components/ImageCropper.module.css";
import cookie from "js-cookie";

interface ImageCropperProps {
  src: File | undefined | null;
  returnFile: (file: File) => void;
  closeCropper?: () => void;
}

export function ImageCropper(
  {src, returnFile, closeCropper}: ImageCropperProps
) {
  const [cropper, setCropper] = useState<Cropper>(null);
  if(src) URL.createObjectURL(src);
  const rotate = () => {
    cropper.rotate(90);
  };


  const getCropData = async () => {
      if (cropper) {
          const file = await fetch(cropper.getCroppedCanvas().toDataURL())
          .then((res) => res.blob())
          .then((blob) => {
              const file2 = new File([blob], "teste.jpg", { type: "image/jpeg" });
              //console.log(file2);
              returnFile(file2);
              if(closeCropper) closeCropper();
              return file2;
          });
      }
  };

  return (
    <>
      <section className={styles.cropperBlur}>
        <section className={styles.sectionCropper}>
          <div className={styles.divRecorte}>
            { src &&
            <Cropper
              width={450}
              //src={"/DeLado.jpg"}
              //src={"/Empe.jpg"}
              //src={"/alface.jpg"}
              //src={"/abobrinha.jpg"}
              src={src ? URL.createObjectURL(src) : ""}

              cropBoxResizable={false}
              aspectRatio={16 / 9}
              rotatable={true}
              cropBoxMovable={false}
              toggleDragModeOnDblclick={false}
              guides={true}
              checkOrientation={false}
              viewMode={1}
              background={false}
              autoCropArea={1}
              responsive={true}
              dragMode="move"
              onInitialized={(instance) => {
                setCropper(instance);
              }}
            />
          }
          </div>
          <AiOutlineRotateRight size={25} onClick={rotate}/>
          <Button
            text="Escolher imagem"
            onClick={async () => {
               await getCropData();
            }}
            classType="botaoEnviarImagem"
          ></Button>
        </section>
      </section>
    </>
  );
}