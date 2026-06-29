import { Button } from "@/components/ui/button";

// TypeScript Arayüzü (Interface): Bu karta dışarıdan hangi verilerin geleceğini kurallara bağlıyoruz.
export interface LaptopProps {
  brand: string;
  model: string;
  specs: string; // Örn: "Intel i7 • RTX 4060 • 16GB RAM"
  price: number;
}

export function LaptopCard({ brand, model, specs, price }: LaptopProps) {
  return (
    <div className="border rounded-xl p-4 bg-white shadow-sm hover:shadow-md transition-shadow flex flex-col gap-3">
      
      {/* Görsel Alanı */}
      <div className="h-40 bg-zinc-100 rounded-lg flex items-center justify-center text-zinc-400 font-medium">
        Device Image
      </div>
      
      {/* Cihaz Bilgileri */}
      <div>
        <h3 className="font-bold text-zinc-800">{brand} {model}</h3>
        <p className="text-xs text-zinc-500 mt-1">{specs}</p>
      </div>
      
      {/* Fiyat ve Buton */}
      <div className="mt-auto pt-4 border-t flex justify-between items-center">
        {/* toLocaleString() ile fiyatı 1,450 şeklinde formatlıyoruz */}
        <span className="font-extrabold text-lg text-zinc-900">${price.toLocaleString("en-US")}</span>
        <Button variant="outline" size="sm">View Details</Button>
      </div>
      
    </div>
  );
}