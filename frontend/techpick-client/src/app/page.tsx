import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Send } from "lucide-react";
import { LaptopCard } from "@/page_components/LaptopCard";
import { ChatWidget } from "@/page_components/ChatWidget";
import { pool } from "../lib/db";

async function getLaptops() {
    try{
      const result = await pool.query("SELECT * FROM raw_laptops ORDER BY price ASC");
      return result.rows;
    } catch (error) {
      console.error("Laptops could not be retrieved from the database: ",error);
      return[];
    }
}

export default async function HomePage() {
  
  const laptops = await getLaptops();

  return (
    <main className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header  */}
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">TechPick Laptop Catalog</h1>
          <p className="text-muted-foreground">
            Our database currently lists <span className="font-semibold text-primary">{laptops.length}</span> up-to-date devices.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {laptops.length === 0 ? (
            <p className="text-muted-foreground col-span-full text-center py-12">
              No devices have been found to list yet. Please run the scraper bot.
            </p>
          ) : (
            laptops.map((laptop: any) => (
              <div 
                key={laptop.id} 
                className="border rounded-xl p-5 shadow-sm bg-card hover:shadow-md transition-shadow flex flex-col justify-between space-y-4"
              >
                <div>
                  <span className="text-xs font-semibold px-2 py-1 bg-secondary rounded-full uppercase text-secondary-foreground">
                    {laptop.brand}
                  </span>
                  <h3 className="font-bold text-lg mt-2 line-clamp-2 min-h-[3.5rem]">
                    {laptop.model}
                  </h3>
                </div>
                <div className="flex justify-between items-center pt-2 border-t">
                  <span className="text-sm text-muted-foreground">Current Price</span>
                  <span className="text-xl font-extrabold text-primary">
                    {laptop.price.toLocaleString("tr-TR")} TL
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </main>
  );
}