import styles from './AddImage.module.css';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

function AddImage({ petId }) {
    const [image, setImage] = useState(null);
    const [url, setUrl] = useState('');
    const [progress, setProgress] = useState(0);
    const history = useHistory();
    
    const handleChange = (e) => {
        if (e.target.files[0]) {
        setImage(e.target.files[0]);
        }
    };
    
    const handleUpload = () => {
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on(
        'state_changed',
        (snapshot) => {
            // progress function ...
            const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            setProgress(progress);
        },
        (error) => {
            // Error function ...
            console.log(error);
            alert(error.message);
        },
        () => {
            // complete function ...
            storage
            .ref('images')
            .child(image.name)
            .getDownloadURL()
            .then((url) => {
                setUrl(url);
                db.collection('Pets')
                .doc(petId)
                .update({
                    images: [...image, url],
                })
                .then(() => {
                    history.push('/Pets');
                });
            });
        }
        );
    };
    
    return (
        <div className={styles.addimage_container}>
        <progress value={progress} max="100" />
        <br />
        <input type="file" onChange={handleChange} />
        <button onClick={handleUpload}>Upload</button>
        <br />
        <img src={url || 'http://via.placeholder.com/300'} alt="firebase-image" />
        </div>
    );
    }