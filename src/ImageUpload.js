import { Button } from '@material-ui/core'
import React, { useState } from 'react'
import db, {storage} from './firebase'
import firebase from 'firebase'
import './imageUpload.css'
import { Input } from '@material-ui/core';

const ImageUpload = ({username, show, setShow}) => {

    const [caption, setCaption] = useState('')
    const [image, setImage] = useState(null)
    const [progress, setProgress] = useState(0)


    const handleChange = (e) => {
        if(e.target.files[0]){
            setImage(e.target.files[0])
        }
    }

    const handleUpload = () => {
        const uploadTask = storage.ref(`images/${image.name}`).put(image)
    
        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(progress)
            },
            (error) => {
                console.log(error)
                alert(error)
            },
            () => {
                storage
                .ref('images').child(image.name).getDownloadURL()
                .then(url => {
                    db.collection('posts').add({
                        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                        caption: caption,
                        imageUrl: url,
                        username: username
                    })
                    setShow(false)
                    setProgress(0);
                    setCaption('');
                    setImage(null)
                });
            }
            )
            
    
    }


    return (
        <div className='imageUploadContainer'>
            <progress className='progressBar' value={progress} max='100' />
            <Input type='text'  placeholder='enter a caption...' value={caption} onChange={(e)=> setCaption(e.target.value)}/>
            <input type='file' className='fileUpload' onChange={handleChange}/>
            <Button className='btn-upload' onClick={handleUpload}>Upload</Button>
        </div>
    )
}

export default ImageUpload
