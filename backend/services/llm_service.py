import os
from openai import OpenAI
import json

class LlmService:
    def __init__(self):
        self.api_key = os.environ.get("OPENAI_API_KEY")
        self.client = OpenAI(api_key=self.api_key) if self.api_key else None

    def check_health(self):
        return self.client is not None

    def generate_script(self, topic: str, style: str, duration: int):
        if not self.client:
            return {"error": "OpenAI API key not configured", "script": []}
            
        system_prompt = f"You are a professional screenplay writer. Write a {duration}-second script about '{topic}' in a '{style}' style. Format as a JSON array of scene objects with 'scene_number', 'setting', 'action', and 'dialogue' (array of {{\"character\": \"...\", \"text\": \"...\"}})."
        
        try:
            response = self.client.chat.completions.create(
                model="gpt-4o-mini",
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": "Generate the script in JSON format."}
                ],
                response_format={ "type": "json_object" }
            )
            content = response.choices[0].message.content
            # OpenAI typically wraps the array in an object when using json_object
            try:
                parsed = json.loads(content)
                if "scenes" in parsed:
                    return parsed["scenes"]
                elif isinstance(parsed, list):
                    return parsed
                return [parsed]
            except:
                return []
        except Exception as e:
            return {"error": str(e), "script": []}
