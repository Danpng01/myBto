import platform
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from traceback import print_exc

# Set up Chrome options for headless mode
chrome_options = Options()
chrome_options.add_argument("--headless")
chrome_options.add_argument("--disable-gpu")
chrome_options.add_argument("--no-sandbox")
chrome_options.add_argument("--disable-extensions")
chrome_options.add_argument("--disable-dev-shm-usage")

# Set log level to suppress informational messages
chrome_options.add_argument("--log-level=3")  # ERROR

# Windows users: Use 'nul' to discard logs, Unix-based users: Use '/dev/null'
chrome_options.add_experimental_option('excludeSwitches', ['enable-logging'])
# chrome_options.add_argument("--enable-logging")
# chrome_options.add_argument("--v=1")
chrome_options.add_argument("user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36")
chrome_options.add_argument("--disable-web-security")

# Determine the operating system
current_os = platform.system()

# Set the WebDriver path based on the operating system
if current_os == 'Windows':
    webdriver_path = '../chromedriver.exe'
elif current_os == 'Darwin':  # Mac OS
    webdriver_path = '../chromedriver'

# Setting up Chrome WebDriver
service = Service(webdriver_path)
driver = webdriver.Chrome(service=service, options=chrome_options)

# URL of the HDB press releases page
url = 'https://www.hdb.gov.sg/about-us/news-and-publications/press-releases'

try:
    driver.get(url)
    
    # It's important to wait for the elements to be present. Uncomment this line.
    # WebDriverWait(driver, 20).until(
    #     EC.presence_of_all_elements_located((By.CLASS_NAME, 'list-item'))
    # )

    entries = driver.find_elements(By.CLASS_NAME, 'list-item')
    
    # Debugging: print the page source or take a screenshot if entries are empty.
    if not entries:
        print("No entries found. Here's the page source:")
        print(driver.page_source)  # Or save it to a file to review
        
        # Take a screenshot for debugging
        driver.save_screenshot('page_screenshot.png')

    for entry in entries:
        print(entry.text)

except Exception as e:
    print(f"An error occurred: {e}")
    # print_exc()

finally:
    driver.quit()


