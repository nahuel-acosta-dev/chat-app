import { ChangeEvent, FormEvent, ImgHTMLAttributes, useEffect, useRef, useState } from "react";
import { Col, Form, Row, FormControl, Button, Alert } from "react-bootstrap";
import {useUpdateProfileMeMutation} from '../features/profile/updateProfileMeSlice';
import Resizer from 'react-image-file-resizer'
import ImageResize from "../components/profile/ImageResize";
import Layout from "../hocs/Layout";
import ProfileImg from "../img/profile.png";
import { useSelector } from "react-redux";
import { selectCurrentProfile } from "../features/profile/profileSlice";

interface InsertImg {
    backgroundImage?: string
}

const ProfileScreen = () => {
    const profile = useSelector(selectCurrentProfile);
    const userRef = useRef<HTMLInputElement>(null);
    const errRef = useRef<HTMLInputElement>(null);
    const [errMsg, setErrMsg] = useState<string>('');
    const [img, setImg] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    //const [imageToResize, setImageToResize] = useState(undefined);
    //const [resizedImage, setResizedImage] = useState(undefined);
    const [insertImg, setInsertImg] = useState<InsertImg | null>(null);
    const [updateProfile, { isLoading }] = useUpdateProfileMeMutation();

    /*const onUploadFile = (event: any) => {
        if (event.target.files && event.target.files.length > 0) {
            setImageToResize(event.target.files[0]);
        }
    };

    console.log(preview);*/

    console.log(profile);

    useEffect(() =>  {
        let objectUrl: any = null;
        if(img){
            objectUrl = URL.createObjectURL(img);
            setPreview(objectUrl);
            setInsertImg({backgroundImage: `url(${objectUrl})`})
        }
        return () => URL.revokeObjectURL(objectUrl)
    }, [img])

    const uploadImg = (e: any) => {
        if(e.target.files !== null){
            if (e.target.files[0].size > 10e6) {
                setErrMsg("Por favor intente con una imagen menor a 10mb");
                return false;
            }
            setImg(e.target.files[0]);
            setErrMsg("");
        }
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try{
            const fileForm = new FormData();
            if(img !== null){
                if (img.size > 10e6) {
                    console.log('estoy en el size')
                    setErrMsg("Por favor intente con una imagen menor a 10mb");
                    return false;
                }
                console.log(img);
                fileForm.append('photo', img);
                console.log(fileForm);
                const updateData = await updateProfile({data: fileForm, id: profile.id}).unwrap();
                console.log(updateData);
            }
            else{
                setErrMsg("No se encontro la imagen");
            }
        }
        catch(err: any) {
            if (err.status === 400){
                setErrMsg("Error al subir la imagen");
            }
            else if (err.status === 401){
                setErrMsg("No se ha encontrado el usuario");
            }
            else {
                setErrMsg("No server Response");
            }
            if (errRef.current !== null) {
                errRef.current.focus();
            }
        }
        setImg(null);
    }


    return(
        <Layout>
            <Row>
                <Col xs={1}></Col>
                <Col xs={10}>
                    <Row>
                        <Col className="cont__profile mt-4" xs={12} md={7}>
                            <figure className="figure profile__figure">
                                <div className="figure-img img-fluid rounded-circle border border-white" 
                                    style={
                                        insertImg !== null ? 
                                            insertImg 
                                        : 
                                        profile.photo !== null ? 
                                            {
                                                backgroundImage: `url(${process.env.REACT_APP_API_URL}${profile.photo})`
                                            }
                                            :
                                            {
                                                backgroundImage: `url(${ProfileImg})`
                                            }
                                    }
                                    ></div>
                            </figure>
                        </Col>
                        <Col className="mt-5" xs={12} md={5}>
                            <Form onSubmit={e => handleSubmit(e)}>
                                <Form.Group controlId="formFileSm" className="mb-3">
                                    <Form.Label>Carga tu nueva foto de perfil</Form.Label>
                                    <Form.Control type="file"
                                        size="sm"
                                        name="file"
                                        multiple={false}
                                        onChange={(e) => uploadImg(e)}
                                        accept="image/png, image/jpeg, image/jpg" />
                                </Form.Group>
                                {img !== null &&
                                    <Button variant="primary" type="submit">
                                        Confirmar
                                    </Button>}
                                    <p ref={errRef} 
                                        className={
                                            errMsg !== null && errMsg !== "" ? 
                                            "alert alert-danger" 
                                            : 
                                            "offscreen"
                                        } 
                                    role="alert" aria-live="assertive">
                                        {errMsg}
                                    </p>
                            </Form>
                        </Col>
                    </Row>
                </Col>
                <Col xs={1}></Col>
            </Row>
        </Layout>
    )
}


export default ProfileScreen;