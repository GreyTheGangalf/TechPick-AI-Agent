import { NextResponse } from "next/server";

export async function POST(req: Request){
  try{
    const body = await req.json();
    const userMessage = body.message;

    console.log("User Message: " , userMessage);


    const ollamaResponse = await fetch("http://localhost:11434/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "qwen2.5:1.5b",
        messages: [
          {
            role: "system",
            content: "You are TechPick, an expert AI assistant that provides recommendations on laptops and computer components. Provide your answers in Turkish—keep them very brief, friendly, and clear. Don’t ramble; get straight to the point."
          },
          {
            role: "system",
            content: userMessage
          }
        ],
        stream: false,
      }),
    });

    if (!ollamaResponse.ok){
      throw new Error('Ollama API Error: ${ollamaResponse.status.Text}');
    }

    const ollamaData = await ollamaResponse.json();
    const aiReply = ollamaData.message.content;

    console.log("Ollama's response: ",aiReply);

    return NextResponse.json({reply: aiReply});

  }catch (error){
    console.error("API Error: ", error);
    return NextResponse.json(
      {error: "The AI brain (Ollama) could not be accessed. Make sure it is running in the background"},
      {status: 500}
    );
  }
}