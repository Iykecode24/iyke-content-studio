const fs = require("fs");

async function testOpenAI() {
  const apiKey = "REMOVED_API_KEY";
  
  const systemPrompt = `You are a professional screenplay writer. Write a 30-second script about 'The future of AI movie production' in a 'Cinematic' style. Format as a JSON array of scene objects with 'scene_number', 'setting', 'action', and 'dialogue' (array of {"character": "...", "text": "..."}).`;

  try {
    console.log("Sending request to OpenAI API (gpt-4o-mini)...");
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: "Generate the script in JSON format." }
        ],
        response_format: { type: "json_object" }
      })
    });

    if (!response.ok) {
        const errorText = await response.text();
        console.error(`API Error: ${response.status} - ${errorText}`);
        return;
    }

    const data = await response.json();
    const content = JSON.parse(data.choices[0].message.content);
    console.log("\n=== SUCCESS: SCRIPT GENERATED ===\n");
    console.log(JSON.stringify(content, null, 2));
    
  } catch (error) {
    console.error("Error connecting to OpenAI:", error);
  }
}

testOpenAI();

