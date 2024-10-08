'use client';

import Image from 'next/image';
import { useState, useRef } from 'react';

export default function FirebaseFormComponent(props) {
    // const [name, setName] = useState('kawa');
    const fileInputRef = useRef(null);
    const [selectedImage, setSelectedImage] = useState();

    const imageChange = (e) => {
        // 選取圖片後顯示預覽
        if (e.target.files && e.target.files.length > 0) {
            setSelectedImage(e.target.files[0]);
        }
    };

    const removeSelectedImage = () => {
        // 清除預覽圖
        setSelectedImage();

        // 清空 input 的選取
        fileInputRef.current.value = '';
    };

    return (
        <>
            <h1>{props.test}</h1>
            <div style={styles.container}>
                <input
                    ref={fileInputRef}
                    accept="image/*"
                    type="file"
                    onChange={imageChange}
                />

                {selectedImage && (
                    <div style={styles.preview}>
                        <img
                            src={URL.createObjectURL(selectedImage)}
                            style={styles.image}
                            alt="Thumb"
                        />
                        <button onClick={removeSelectedImage} style={styles.delete}>
                            Remove This Image
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}

const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 50,
    },
    preview: {
        marginTop: 50,
        display: "flex",
        flexDirection: "column",
    },
    image: { maxWidth: "100%", maxHeight: 320 },
    delete: {
        cursor: "pointer",
        padding: 15,
        background: "red",
        color: "white",
        border: "none",
    },
};