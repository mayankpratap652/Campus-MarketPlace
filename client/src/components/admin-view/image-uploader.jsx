
import React, { useEffect, useRef } from 'react'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { FileIcon, Loader, UploadCloudIcon, XIcon } from 'lucide-react'
import { Button } from '../ui/button'
import axios from 'axios'


function ProductImageUpload({ imageFile,
    setImageFile,
    imageLoadingState,
    uploadedImageUrl,
    setUploadedImageUrl,
    setImageLoadingState,
    isEditMode
}) {

    let inputRef = useRef(null)

    //for upload the image in cloudinary 

    let uploadImageToCloudinary = async () => {
        try {
            setImageLoadingState(true);
            const formData = new FormData();
            formData.append("my_file", imageFile);
            console.log("Uploading file...", imageFile);

            const response = await axios.post("https://campus-marketplace-0eju.onrender.com/api/admin/products/upload-image", formData);
            console.log("Upload response:", response);

            if (response?.data?.success === true) {
                setUploadedImageUrl(response.data.result.url);
            } else {
                console.error("Upload failed:", response.data);
            }
        } catch (err) {
            console.error("Upload error:", err);
            if (err.response) {
                console.error("Server responded with error:", err.response.data);
            }
        } finally {
            setImageLoadingState(false);
        }
    };

    let handleImageFileChange = (e) => {
        console.log(e.target.files);
        let selectedFile = e.target.files?.[0]
        if (selectedFile) setImageFile(selectedFile)
    }

    //
    let handleDragOver = (e) => {
        e.preventDefault()
    }

    let handleDrop = (e) => {
        e.preventDefault()//by deafault refresh n hoo

        let droppedFile = e.dataTransfer.files?.[0]
        if (droppedFile) {
            setImageFile(droppedFile)
        }
    }

    //for remove the imagefile 
    function handleRemoveImage() {
        setImageFile(null);
        if (inputRef.current) {
            inputRef.current.value = "";
        }
    }

    //
    useEffect(() => {

        if (imageFile !== null) uploadImageToCloudinary();
    }, [imageFile]);


    return (
        <div className='w-full max-w-md mx-auto px-5'>
            <Label className={"text-lg font-semibold mb-2"}>Upload Image</Label>

            <div
                onDragOver={handleDragOver}
                onDrop={handleDrop}

                className={`flex flex-col items-center justify-center gap-3 border-2  rounded-2xl p-8 bg-gradient-to-br from-gray-50 to-white hover:border-blue-500 transition-all duration-300 shadow-lg ${isEditMode ? "opacity-40 cursor-not-allowed" : "cursor-pointer"} `}>
                <Input
                    id="image-upload"
                    type="file"
                    className={""}
                    accept="image/*"
                    ref={inputRef} //all file can be eaasily access
                    onChange={handleImageFileChange}
                    disabled={isEditMode} //when edit mode is start then it is disable 

                />
                {
                    !imageFile ? //agr image upload nhi hui tbb chalega 
                        (
                            isEditMode ? "" :
                                <label htmlFor="image-upload" className="flex flex-col items-center cursor-pointer">
                                    <UploadCloudIcon className="w-10 h-10 text-blue-500 mb-2" />
                                    <span className="text-gray-600 font-medium text-sm text-center">
                                        Drag & Drop or <span className="text-blue-600 underline">Click to Upload</span>
                                    </span>
                                </label>
                        )
                        :
                        //agar image upload ho chuki hai tbb ye fire hoga 
                        (imageLoadingState ?
                            <Loader className="animate-spin text-blue-500 w-6 h-6 mb-1" />
                            :

                            <div className="flex items-center justify-between mt-2 flex-wrap">
                                <div className="flex items-center">
                                    <FileIcon className='size-8' />
                                </div>
                                <p className="text-sm mr-8 font-semibold text-gray-700 truncate max-w-[200px]">{imageFile.name}</p>

                                <Button variant="outline" onClick={handleRemoveImage} className="flex items-center gap-1 text-sm mt-2">
                                    <XIcon className="w-4 h-4" />
                                    Remove
                                </Button>
                                {uploadedImageUrl && (
                                    <a
                                        href={uploadedImageUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 text-sm underline"
                                    >
                                        View Image
                                    </a>
                                )}

                            </div>
                        )

                }
            </div>
        </div>
    )
}

export default ProductImageUpload