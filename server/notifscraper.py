from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from bs4 import BeautifulSoup
import time

# Path to where you've saved your ChromeDriver
webdriver_path = '../chromedriver.exe'

# Setting up Chrome WebDriver
service = Service(webdriver_path)
driver = webdriver.Chrome(service=service)

# URL of the HDB press releases page
url = 'https://www.hdb.gov.sg/about-us/news-and-publications/press-releases'

# Use the driver to fetch the webpage
driver.get(url)

# # Optional: wait for a few seconds to make sure the page is fully loaded
# time.sleep(5)

# Now, use Selenium to find all elements with the class 'list-item'
entries = driver.find_elements(By.CLASS_NAME, 'list-item')

# Process and print relevant information
for entry in entries:
    # Assuming the structure is consistent, you might want to get more specific information
    # For example, if there's a heading and a date inside each 'list-item', you would locate them like so:
    # title = entry.find_element(By.TAG_NAME, 'h3').text
    # date = entry.find_element(By.CLASS_NAME, 'date-class-name').text
    # print(f'Date: {date}, Title: {title}')

    # But if you just want the entire text:
    print(entry.text)

# Close the browser
driver.quit()