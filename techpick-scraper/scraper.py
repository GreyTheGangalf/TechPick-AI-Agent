import requests
from bs4 import BeautifulSoup

TARGET_URL = "https://www.epey.com/laptop/"

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
}

def scrape_laptops():
    print("Connecting to the target site...")
    response = requests.get(TARGET_URL, headers=HEADERS)
    
    if response.status_code == 200:
        print("Connection successful! Scanning products...\n")
        soup = BeautifulSoup(response.content, "html.parser")
        
        products = soup.find_all("ul", class_="metin row")

        print(f"A total of {len(products)} product cards were found.\n")
        print("=" * 40)
        
        for item in products:
            try:
                name_tag = item.find("a", class_="urunadi")
                laptop_name = name_tag.text.strip() if name_tag else "Name Not Found"
                

                price_tag = item.find("li", class_="fiyat")
                
                if price_tag:

                    raw_price = price_tag.text.strip().split('\n')[0]
                else:
                    raw_price = "No Price"
                
                if laptop_name != "Name Not Found":
                    print(f"Model: {laptop_name}")
                    print(f"Price: {raw_price}")
                    print("-" * 40)
                    
            except Exception as e:
                continue
    else:
        print(f"Connection Error! Status: {response.status_code}")

if __name__ == "__main__":
    scrape_laptops()