//https://programadorwebvalencia.com/javascript-recortar-y-previsualizar-imagen/
import React, {useEffect, useState} from "react";
import Resizer from "react-image-file-resizer";

function ImageResize(props: any) {
    const {imageToResize, onImageResized, resizeAspect, resizeQuality} = props;

    const [imageToResizeUri, setImageToResizeUri] = useState();
    const [imageToResizeWidth, setImageToResizeWidth] = useState();
    const [imageToResizeHeight, setImageToResizeHeight] = useState();

    useEffect(() => {
        if (imageToResize) {
            const reader: any = new FileReader();

            reader.addEventListener('load', () => {
                setImageToResizeUri(reader.result);
            });

            reader.readAsDataURL(imageToResize);
        }
    }, [imageToResize])

    useEffect(() => {
        if (imageToResize && imageToResizeWidth && imageToResizeHeight) {
            try {
                Resizer.imageFileResizer(
                    imageToResize,
                  640,
                  640,
                  "JPEG",
                  resizeQuality,
                  0,
                  (uri) => {
                    onImageResized(uri)
                    },
                  "base64"
                );
              } catch (err) {
                console.log(err);
              }
        }
    }, [
        imageToResize, imageToResizeWidth, imageToResizeHeight,
        onImageResized, resizeAspect, resizeQuality
    ]);

    return (
        <figure className="figure profile__figure">
            <img
                src={imageToResizeUri}
                height="50"
                className="figure-img img-fluid rounded-circle h-100 border border-danger"
                onLoad= {(e) => {
                    const img: any = e.target;
                    setImageToResizeWidth(img.width);
                    setImageToResizeHeight(img.height);
                }}
                alt="profile_image" 
                crossOrigin="anonymous"
                />
        </figure>
    );
}

ImageResize.defaultProps = {
    onImageResized: () => {},
    resizeAspect: 0.5,
    resizeQuality: 100
}

export default ImageResize;