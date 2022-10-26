from minio import Minio
from minio.error import S3Error
from dotenv import load_dotenv
import os
import uuid

load_dotenv()

BUCKET_NAME = os.environ.get("MINIO_BUCKET")
ACCESS_KEY = os.environ.get("MINIO_KEY")
SECRET_KEY = os.environ.get("MINIO_SECRET")
is_production = os.environ.get("FLASK_ENV") == 'production'

ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg"}

MINIO_API_HOST = "theelderwan.us.to:9000"
s3 = Minio(MINIO_API_HOST, access_key=ACCESS_KEY, secret_key=SECRET_KEY, secure=True)

def isOnline():
    found = s3.bucket_exists(BUCKET_NAME)
    if not found:
        return False
    
    return True

def allowed_file(filename):
    return "." in filename and \
           filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS

def get_unique_filename(filename):
    ext = filename.rsplit(".", 1)[1].lower()
    unique_filename = uuid.uuid4().hex
    return f"{unique_filename}.{ext}"

def upload_file_to_s3(file):
    try:              
        s3.put_object(
            BUCKET_NAME,
            file.filename,
            file,
            length=-1,
            part_size=10*1024*1024
        )
    except Exception as e:
        # in case our s3 upload fails
        print(str(e))
        return {"errors": str(e)}

    return {"url": f"https://{MINIO_API_HOST}/{BUCKET_NAME}/{file.filename}"}

def delete_image_from_s3(filename):
    s3.remove_object(BUCKET_NAME, filename)