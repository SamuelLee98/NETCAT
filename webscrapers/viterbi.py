import sys
from bs4 import BeautifulSoup
import requests

result = requests.get("https://calendar.usc.edu/calendar/week?event_types%5B%5D=43451")

print(result.text)

