import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Send } from "lucide-react";
import { LaptopCard } from "@/page_components/LaptopCard";
import { ChatWidget } from "@/page_components/ChatWidget";

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-50 p-4 md:p-8">
      
      <div className="mx-auto max-w-7xl h-[90vh] grid grid-cols-1 md:grid-cols-12 gap-6">

        {/* ================= LEFT PANEL (CHAT INTERFACE) ================= */}
        <div className="md:col-span-4 flex flex-col h-full">
          <ChatWidget />
        </div>

        {/* ================= RIGHT PANEL (LAPTOP RESULTS) ================= */}
        <div className="md:col-span-8 flex flex-col h-full">
          <Card className="flex-1 shadow-sm border-zinc-200 bg-white overflow-y-auto">
            
            <CardHeader className="border-b pb-4 sticky top-0 bg-white z-10">
              <CardTitle className="text-lg text-zinc-800">Recommended Devices</CardTitle>
            </CardHeader>

            <CardContent className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                
                {/* AKILLI BİLEŞENLERİMİZİ KULLANIYORUZ */}
                <LaptopCard 
                  brand="ASUS" 
                  model="ROG Strix G16" 
                  specs="Intel i7 13650HX • RTX 4060 • 16GB RAM" 
                  price={1450} 
                />

                <LaptopCard 
                  brand="Lenovo" 
                  model="Legion Pro 5" 
                  specs="AMD Ryzen 7 7745HX • RTX 4070 • 32GB RAM" 
                  price={1899} 
                />

                <LaptopCard 
                  brand="Apple" 
                  model="MacBook Air M3" 
                  specs="M3 Chip • 16GB Unified RAM • 512GB SSD" 
                  price={1299} 
                />

              </div>
            </CardContent>

          </Card>
        </div>

      </div>
    </main>
  );
}