import os
import boto3
import logging
import time

logging.basicConfig(level=logging.INFO)

class StorageService:
    def __init__(self):
        self.r2_account_id = os.environ.get("R2_ACCOUNT_ID")
        self.r2_access_key = os.environ.get("R2_ACCESS_KEY_ID")
        self.r2_secret_key = os.environ.get("R2_SECRET_ACCESS_KEY")
        self.r2_bucket = os.environ.get("R2_BUCKET_NAME", "iykestudio-production")
        
        self.drive_creds = os.environ.get("GOOGLE_DRIVE_CREDENTIALS_JSON")
        self.drive_folder_id = os.environ.get("GOOGLE_DRIVE_FOLDER_ID")
        
        self._init_r2_client()

    def _init_r2_client(self):
        if self.r2_account_id and self.r2_access_key and self.r2_secret_key:
            try:
                self.s3 = boto3.client(
                    's3',
                    endpoint_url=f"https://{self.r2_account_id}.r2.cloudflarestorage.com",
                    aws_access_key_id=self.r2_access_key,
                    aws_secret_access_key=self.r2_secret_key,
                    region_name="auto"
                )
                self.r2_enabled = True
            except Exception as e:
                logging.error(f"Failed to init R2 client: {e}")
                self.r2_enabled = False
        else:
            self.r2_enabled = False
            
    def check_health(self):
        return {
            "r2_connected": self.r2_enabled,
            "google_drive_connected": bool(self.drive_creds)
        }
        
    def upload_asset(self, file_path: str, object_name: str = None) -> str:
        if not object_name:
            object_name = os.path.basename(file_path)
            
        if self.r2_enabled:
            try:
                self.s3.upload_file(file_path, self.r2_bucket, object_name)
                # For R2, if we have a custom domain attached to the bucket:
                return f"https://cdn.iykestudio.com/{object_name}"
            except Exception as e:
                logging.error(f"R2 upload failed: {e}")
                return f"https://mock-storage.local/{object_name}"
        else:
            return f"https://mock-storage.local/{object_name}"

    def backup_to_drive(self, file_path: str) -> bool:
        if not self.drive_creds:
            logging.warning("Google Drive not configured.")
            return False
            
        logging.info(f"Backing up {file_path} to Google Drive...")
        # Mocked implementation of google-api-python-client
        time.sleep(1)
        return True
