"use client"; // ÇOK KRİTİK: Bu bileşenin tarayıcıda (etkileşimli) çalışacağını belirtir.

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Send } from "lucide-react";

// Mesajların tipini belirliyoruz (Kim gönderdi ve ne dedi?)
interface Message {
  role: "user" | "assistant";
  content: string;
}

export function ChatWidget() {
  // 1. HAFIZA: Mesaj geçmişini tutan State
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hi there! What kind of laptop are you looking for? Let me know your budget and priorities." }
  ]);
  
  // 2. HAFIZA: Kullanıcının input kutusuna o an yazdığı metni tutan State
  const [inputValue, setInputValue] = useState("");

  // Gönder butonuna basıldığında (veya Enter'a basıldığında) çalışacak fonksiyon
  // Fonksiyonun başına 'async' ekliyoruz çünkü API'den cevap bekleyeceğiz (await)
  const handleSend = async () => {
    if (!inputValue.trim()) return;

    // 1. Kullanıcının mesajını ekrana bas ve input'u temizle
    const userMessage: Message = { role: "user", content: inputValue };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInputValue(""); // Gönderdikten sonra kutuyu boşalt

    try {
      // 2. Kendi yazdığımız Backend API'sine (route.ts) POST isteği at
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage.content }), // Veriyi paketleyip yolla
      });

      // 3. API'den gelen cevabı bekle ve JSON'dan çıkar
      const data = await response.json();

      // 4. Gelen cevabı ekrandaki konuşma balonlarına (State'e) ekle
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply }
      ]);
      
    } catch (error) {
      console.error("Mesaj gönderilemedi:", error);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Bağlantı hatası! API'ye ulaşılamıyor." }
      ]);
    }
  };

  return (
    <Card className="flex-1 flex flex-col shadow-sm border-zinc-200">
      <CardHeader className="border-b bg-white pb-4">
        <CardTitle className="text-lg text-zinc-800">TechPick Assistant</CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col gap-4 p-4 bg-white">
        
        {/* === MESAJLARIN LİSTELENDİĞİ ALAN === */}
        <div className="flex-1 rounded-md bg-zinc-50 border p-4 overflow-y-auto flex flex-col gap-3">
          {messages.map((msg, index) => (
            <div 
              key={index} 
              className={`p-3 text-sm shadow-sm w-[85%] ${
                msg.role === "assistant" 
                  ? "bg-zinc-200 text-zinc-800 rounded-2xl rounded-tl-sm self-start" // Yapay zeka mesajı (Sol)
                  : "bg-zinc-800 text-white rounded-2xl rounded-tr-sm self-end" // Kullanıcı mesajı (Sağ)
              }`}
            >
              {msg.content}
            </div>
          ))}
        </div>

        {/* === KULLANICI GİRDİ (INPUT) ALANI === */}
        <div className="flex gap-2 mt-auto">
          <Input 
            placeholder="e.g., under $1200, lightweight for coding..." 
            className="flex-1 bg-zinc-50"
            value={inputValue} // Input'un değerini State'e bağlıyoruz
            onChange={(e) => setInputValue(e.target.value)} // Klavye hareketlerini State'e yazıyoruz
            onKeyDown={(e) => e.key === "Enter" && handleSend()} // Enter tuşuna basınca gönder
          />
          <Button onClick={handleSend} size="icon" className="shrink-0">
            <Send className="w-4 h-4" />
          </Button>
        </div>

      </CardContent>
    </Card>
  );
}