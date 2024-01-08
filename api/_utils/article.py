import os
import uuid
from fastapi import UploadFile

def save_uploaded_image(upload_file: UploadFile) -> str:
    # Assuming you have a directory named 'uploads' to save the images
    upload_dir = 'uploads'
    os.makedirs(upload_dir, exist_ok=True)

    # Generate a unique filename for the saved image
    filename = str(uuid.uuid4()) + os.path.splitext(upload_file.filename)[1]
    file_path = os.path.join(upload_dir, filename)

    # Save the image to the specified path
    with open(file_path, 'wb') as file:
        file.write(upload_file.file.read())

    # return file_path
    return filename