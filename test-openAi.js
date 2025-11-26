import 'dotenv/config';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

async function testKey() {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: "Say hello!" }
      ],
      temperature: 0
    });

    console.log("✅ Success! Response from OpenAI:");
    console.log(response.choices[0].message.content);
  } catch (error) {
    console.error("❌ Error with API Key:", error);
  }
}

testKey();
