import Cropper from "react-cropper";
import { Button } from "@/components/Button";
import { RxRotateCounterClockwise } from "react-icons/rx";
import { IoArrowBack } from "react-icons/io5";
import { useState } from "react";
import "cropperjs/dist/cropper.css";
import styles from "../styles/components/ImageCropper.module.css";
import Resizer from "react-image-file-resizer";

interface ImageCropperProps {
  src: File | undefined | null;
  returnFile: (file: File) => void;
  fileName?: string;
  goBack?: () => void;
  closeCropper?: () => void;
}

export function ImageCropper({
  src,
  returnFile,
  fileName = "unknown",
  goBack,
  closeCropper,
}: ImageCropperProps) {
  const [cropper, setCropper] = useState<Cropper | undefined>(undefined);
  if (src) URL.createObjectURL(src);
  const rotate = () => {
    cropper?.rotate(90);
  };

  const resizeFile = (file: Blob) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        640,
        360,
        "JPEG",
        100,
        0,
        (uri) => {
          resolve(uri);
        },
        "blob"
      );
    });

  const getCropData = async () => {
    if (cropper) {
      const file = await fetch(cropper.getCroppedCanvas().toDataURL())
        .then((res) => res.blob())
        .then(async (blob) => {
          const resizedFile = await resizeFile(blob);
          if (fileName === "") fileName = "unknown";
          else fileName = fileName.replaceAll(" ", "_");
          const file2 = new File([resizedFile as BlobPart], fileName + ".jpg", {
            type: "image/jpeg",
          });
          returnFile(file2);
          if (closeCropper) closeCropper();
          return file2;
        });
    }
  };

  return (
    <>
      <section className={styles.cropperBlur}>
        <section className={styles.sectionCropper}>
          <div className={styles.divCabecalho}>
            <IoArrowBack
              onClick={() => {
                if (goBack) goBack();
              }}
              size={20}
              color="#72b234"
              className={styles.iconeVoltar}
            />
            <h1 className={styles.titulo}>Recortar imagem</h1>
          </div>
          <div className={styles.divRecorte}>
            {src && (
              <Cropper
                className={styles.cropper}
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
            )}
          </div>
          <RxRotateCounterClockwise
            className={styles.iconGirar}
            size={20}
            onClick={rotate}
          />
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
