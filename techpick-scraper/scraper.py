import os
import requests
from bs4 import BeautifulSoup
import psycopg2
from dotenv import load_dotenv

load_dotenv()

TARGET_URL = "https://www.epey.com/laptop/"

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
}

def clean_price(raw_price_str):
    if not raw_price_str or raw_price_str == "No Price":
        return 0
    
    try:
        clean_str = raw_price_str.split("TL")[0].strip()
        clean_str = clean_str.replace(".", "")
        clean_str = clean_str.replace(",", ".")
        return int(float(clean_str))
    except Exception:
        return 0

def save_to_database(devices):
    print("\nConnecting to Database...")
    conn = None
    inserted_count = 0
    try:
        conn = psycopg2.connect(
            host=os.getenv("DB_HOST"),
            port=os.getenv("DB_PORT"),
            database=os.getenv("DB_NAME"),
            user=os.getenv("DB_USER"),
            password=os.getenv("DB_PASSWORD")
        )
        cursor = conn.cursor()

        cursor.execute("TRUNCATE TABLE raw_laptops RESTART IDENTITY;")

        insert_query = """
            INSERT INTO raw_laptops (brand, model, price) 
            VALUES (%s, %s, %s)
        """
        
        for device in devices:
            cursor.execute(insert_query, (device["brand"], device["model"], device["price"]))
            inserted_count += 1

        conn.commit()
        print(f"Success! {inserted_count} devices have been added to the database.")

    except Exception as e:
        print(f"Database error: {e}")
        if conn:
            conn.rollback() 
    finally:
        if conn:
            cursor.close()
            conn.close()
            print("The database connection has been safely closed.")

def scrape_laptops():
    print("Connecting to the target site...")
    response = requests.get(TARGET_URL, headers=HEADERS)
    
    if response.status_code == 200:
        print("Connection successful! Scanning products...\n")
        
        soup = BeautifulSoup(response.content, "html.parser")
        products = soup.find_all("ul", class_="metin row")

        cleaned_devices = []
        
        for item in products:
            try:
                name_tag = item.find("a", class_="urunadi")
                laptop_name = name_tag.text.strip() if name_tag else "Name Not Found"
                
                price_tag = item.find("li", class_="fiyat")
                raw_price = price_tag.text.strip() if price_tag else "No Price"

                numeric_price = clean_price(raw_price)

                if laptop_name != "Name Not Found" and numeric_price > 0:
                    cleaned_devices.append({
                        "brand": laptop_name.split()[0],
                        "model": laptop_name,
                        "price": numeric_price
                    })

            except Exception:
                continue
                
        print(f"Total number of sellable devices successfully cleaned: {len(cleaned_devices)}")
        
        save_to_database(cleaned_devices)
        
    else:
        print(f"Connection Error! Status: {response.status_code}")

if __name__ == "__main__":
    scrape_laptops()