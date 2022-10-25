from minio import Minio
from minio.error import S3Error
from dotenv import load_dotenv
import os

load_dotenv()

BUCKET_NAME = os.environ.get("MINIO_BUCKET")
ACCESS_KEY = os.environ.get("MINIO_KEY")
SECRET_KEY = os.environ.get("MINIO_SECRET")

MINIO_API_HOST = "http://192.168.1.112:9000"
MINIO_CLIENT = Minio("192.168.1.112:9000", access_key=ACCESS_KEY, secret_key=SECRET_KEY, secure=False)

def main():
    found = MINIO_CLIENT.bucket_exists(BUCKET_NAME)
    if not found:
        print("Bucket does not exist!")
    else:
        print("Located bucket, minio initialized!!")
        
main()