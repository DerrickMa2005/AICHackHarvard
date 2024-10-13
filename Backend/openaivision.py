from openai import OpenAI
from bs4 import BeautifulSoup
import requests
import os

class OpenAIVision:
    # Intialize the OpenAI API with the API key
    def __init__(self):
        self.openai = OpenAI()

    # Gets details of the part from the two images taken by the user
    def get_part_details(self, image_url):
        response = self.openai.chat.completions.create(
                        model="gpt-4o-mini",
                        messages=[
                            {
                            "role": "user",
                            "content": [
                                {
                                "type": "text",
                                "text": "Return the Manufacturer, Model, and Name of the device present in the image. Then, in a new line, provide a good reselling price for the device",
                                },
                                {
                                "type": "image_url",
                                "image_url": {
                                    "url": image_url,
                                },
                                },
                            ],
                            }
                        ],
                        max_tokens=300,
                        )
        self.response = response.choices[0].message.content

    # Parses the response from the OpenAI API and stores the details inside a dictionary
    def parse_response(self):
        details = {}
        self.response = self.response.replace("*", "")
        for line in self.response.split("\n"):
            if line:
                if "Manufacturer" in line:
                    details["Manufacturer"] = line.split(":")[1].strip()
                elif "Model" in line:
                    details["Model"] = line.split(":")[1].strip()
                elif "Name" in line:
                    details["Name"] = line.split(":")[1].strip()
                elif "Price" in line:
                    details["Price"] = line.split(":")[1].strip()
        self.details = details
        print(self.details)

    # Searches eBay for the part and stores the results in a Dictionary
    def search_ebay(self):
        search_query = f"{self.details['Manufacturer']} {self.details['Model']}"
        url = f"https://www.ebay.com/sch/i.html?_nkw={search_query.replace(' ', '+')}"
        response = requests.get(url)
        soup = BeautifulSoup(response.content, 'html.parser')

        # Parse eBay listings
        items = []
        for item in soup.select('.s-item')[3:8]:  # Limiting to 5 items
            title_tag = item.select_one('.s-item__title')
            price_tag = item.select_one('.s-item__price')
            link_tag = item.select_one('.s-item__link')
            if title_tag and price_tag and link_tag:
                items.append({
                    'title': title_tag.text,
                    'price': price_tag.text,
                    'link': link_tag['href']
                })
        self.ebay_results = items

    # Displays the eBay results
    def display_ebay_results(self):
        for idx, item in enumerate(self.ebay_results, 1):
            print(f"Result {idx}:")
            print(f"Title: {item['title']}")
            print(f"Price: {item['price']}")
            print(f"Link: {item['link']}")
            print("-" * 40)

# Testing
if __name__ == "__main__":
    model = OpenAIVision()
    model.get_part_details("https://itknowledgeexchange.techtarget.com/coffee-talk/files/2019/12/t430s-1.jpg")
    model.parse_response()
    model.search_ebay()
    model.display_ebay_results()