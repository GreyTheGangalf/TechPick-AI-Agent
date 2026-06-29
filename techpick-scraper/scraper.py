import requests
from bs4 import BeautifulSoup

TARGET_URL = "https://www.epey.com/laptop/"

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
}

def scrape_laptops():
    print("Connecting to website...")

    try:
        response = requests.get(TARGET_URL, headers=HEADERS)

        print(f"Connection status: {response.status_code}")

        if response.status_code == 200:
            print("Connection successful, Data has been collected!")

            soup = BeautifulSoup(response.content, "html.parser")

            print(f"Page Header: {soup.title.text.strip()}")
        else:
            print("Connection Error")
    except Exception as e:
        print(f"An error occured: {e}")

if __name__ == "__main__":
    scrape_laptops()