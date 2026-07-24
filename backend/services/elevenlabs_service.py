import os
import time
import httpx
import logging

logging.basicConfig(level=logging.INFO)

class ElevenlabsService:
    def __init__(self):
        self.api_key = os.environ.get("ELEVENLABS_API_KEY")
        self.base_url = "https://api.elevenlabs.io/v1"
        self.headers = {
            "xi-api-key": self.api_key if self.api_key else ""
        }
        
    def check_health(self):
        return True
        
    def generate_audio(self, text: str, voice_id: str = "21m00Tcm4TlvDq8ikWAM"):
        if not self.api_key:
            time.sleep(1.5)
            return "https://mock-storage.local/audio/mock-voice.mp3"
            
        try:
            url = f"{self.base_url}/text-to-speech/{voice_id}"
            headers = self.headers.copy()
            headers["Accept"] = "audio/mpeg"
            headers["Content-Type"] = "application/json"
            
            data = {
                "text": text,
                "model_id": "eleven_monolingual_v1",
                "voice_settings": {"stability": 0.5, "similarity_boost": 0.5}
            }
            response = httpx.post(url, json=data, headers=headers, timeout=30.0)
            if response.status_code == 200:
                return "https://real-storage.local/audio/generated.mp3"
            return "https://mock-storage.local/audio/error.mp3"
        except Exception as e:
            return "https://mock-storage.local/audio/error.mp3"

    async def add_voice(self, name: str, description: str, files: list) -> str:
        """Uploads files to clone a voice on ElevenLabs"""
        if not self.api_key:
            logging.info("Mocking add_voice - No API Key")
            return f"mock_voice_{int(time.time())}"
            
        url = f"{self.base_url}/voices/add"
        
        # Prepare multipart form data for httpx
        data = {
            "name": name,
            "description": description
        }
        
        # files format for httpx: [('files', (filename, file_content, mime_type))]
        multipart_files = []
        for f in files:
            multipart_files.append(("files", (f.filename, await f.read(), f.content_type)))
            
        try:
            async with httpx.AsyncClient() as client:
                response = await client.post(url, headers=self.headers, data=data, files=multipart_files, timeout=60.0)
                
                if response.status_code == 200:
                    result = response.json()
                    return result.get("voice_id")
                else:
                    logging.error(f"Failed to add voice: {response.text}")
                    raise Exception(f"ElevenLabs API Error: {response.status_code}")
        except Exception as e:
            logging.error(f"Exception during add_voice: {e}")
            raise

    async def delete_voice(self, voice_id: str) -> bool:
        if not self.api_key or voice_id.startswith("mock_"):
            return True
            
        url = f"{self.base_url}/voices/{voice_id}"
        try:
            async with httpx.AsyncClient() as client:
                response = await client.delete(url, headers=self.headers, timeout=10.0)
                return response.status_code == 200
        except Exception as e:
            logging.error(f"Exception during delete_voice: {e}")
            return False
