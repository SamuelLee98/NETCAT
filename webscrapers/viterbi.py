from selenium import webdriver
import time
import os
from datetime import datetime
import pymongo
import dns
from geopy import geocoders
import certifi

# initialize instance of geoloc api
geo_api = geocoders.GoogleV3("AIzaSyCWgXw8FWA3_pGBCC7vAJxtaY0-2bPlLDY")

# initialize client
client = pymongo.MongoClient(
    "mongodb+srv://fomo:FOMO%40usc2021@fomo-bhjbi.mongodb.net/test?retryWrites=true&w=majority"
)
db = client.NETCAT
allEvents = db.events
print(allEvents.count_documents({}))

# event array
eventArray = []

# start webdriver and load website from disk
chromedriver = "./chromedriver"
os.environ["webdriver.chrome.driver"] = chromedriver
driver = webdriver.Chrome(chromedriver)

# open webpage
url = "https://viterbi-usc-csm.symplicity.com//students/?signin_tab=0"
driver.get(url)

# go to log in
python_button = driver.find_element_by_css_selector(
    "body > div.login-wrapper.login-main.has-reg > div.page-main > div > div > div > div > div.signin > div.form.form-editmode > form > div.page-blurb > p > strong > a"
)
python_button.click()

# put in username and password and log in
field1 = driver.find_element_by_id("username")
field2 = driver.find_element_by_id("password")

field1.send_keys("lee344")
field2.send_keys("Qwe1122334455rty***")

button_login = driver.find_element_by_css_selector(
    "#loginform > div:nth-child(5) > button"
)
button_login.click()

# open event menu and wait to load
button_events = driver.find_element_by_css_selector(
    "#nav-container > ul > li:nth-child(6) > a > span"
)
button_events.click()
time.sleep(1)

# go to workshops
button_workshops = driver.find_element_by_xpath("//span[contains(text(), 'Workshops')]")
button_workshops.click()

# month dictionary
month = {
    "Jan": "January",
    "Feb": "February",
    "Mar": "March",
    "Apr": "April",
    "May": "May",
    "Jun": "June",
    "July": "July",
    "Aug": "August",
    "Sept": "September",
    "Sep": "September",
    "Oct": "October",
    "Nov": "November",
    "Dec": "December",
}

# find total number of events displayed
total_num_events = driver.find_element_by_css_selector(
    "#frame > main > div.page-main > div > div > div > div > div > div > div.lst-head > div.lst-head-l > span > span > span.lst-cnt-total"
).text
arr = total_num_events.split(" ")
total_num_events = int(arr[0])

# scraping loop
while total_num_events > 0:
    events_shown = None
    try:
        start_range = driver.find_element_by_css_selector(
            "#frame > main > div.page-main > div > div > div > div > div > div > div.lst-head > div.lst-head-l > span > span > span.lst-cnt-range > span.lst-cnt-range-start"
        ).text
        end_range = driver.find_element_by_css_selector(
            "#frame > main > div.page-main > div > div > div > div > div > div > div.lst-head > div.lst-head-l > span > span > span.lst-cnt-range > span.lst-cnt-range-end"
        ).text
        events_shown = int(end_range) - int(start_range) + 1
    except:
        events_shown = int(
            driver.find_element_by_css_selector(
                "#frame > main > div.page-main > div > div > div > div > div > div > div.lst-head > div.lst-head-l > span > span > span"
            )
            .text.replace("results", "")
            .strip()
        )

    for i in range(events_shown):
        # open event
        button_event = driver.find_element_by_css_selector(
            "#frame > main > div.page-main > div > div > div > div > div > div > ul > li:nth-child("
            + str(i + 1)
            + ") > div.list-item-body > div.list-item-title > a"
        )
        button_event.click()
        # try:
        #     eventisfull = driver.find_element_by_id("ui_module_instructions").text
        #     driver.back()
        #     continue
        # except:
        #     print("all good")

        print("*****EVENT " + str(i + 1) + "******")
        # scrape everything
        title = driver.find_element_by_id(
            "dnf_class_values_workshop__title__widget"
        ).text
        print(title)

        # initialize date
        start = driver.find_element_by_id(
            "dnf_class_values_workshop__starttime__widget"
        ).text
        # print(start)
        end = driver.find_element_by_id(
            "dnf_class_values_workshop__endtime__widget"
        ).text
        # print(end)

        # set multiday
        sDay = ""
        eDay = ""
        multiDay = False
        for i in range(len(start)):
            if start[i].isdigit():
                if start[i + 1].isdigit():
                    sDay += start[i] + start[i + 1]
                else:
                    sDay += start[i]
                break
        for i in range(len(end)):
            if end[i].isdigit():
                if end[i + 1].isdigit():
                    eDay += end[i] + end[i + 1]
                else:
                    eDay += end[i]
                break

        if sDay != eDay:
            multiDay = True

        if len(sDay) == 1:
            sDay = "0" + sDay

        if len(eDay) == 1:
            eDay = "0" + eDay

        sTime = start.split(",")[2][1:]
        in_time = datetime.strptime(sTime, "%I:%M %p")
        sTime = datetime.strftime(in_time, "%H:%M") + ":00"

        eTime = end.split(",")[2][1:]
        in_time = datetime.strptime(eTime, "%I:%M %p")
        eTime = datetime.strftime(in_time, "%H:%M") + ":00"

        start_refined = (
            "" + sDay + " " + month[start[0:3]] + start.split(",")[1] + " " + sTime
        )
        start_refined = datetime.strptime(start_refined, "%d %B %Y %H:%M:%S")

        end_refined = (
            "" + eDay + " " + month[end[0:3]] + end.split(",")[1] + " " + eTime
        )
        end_refined = datetime.strptime(end_refined, "%d %B %Y %H:%M:%S")
        print(start_refined)
        print(end_refined)
        # find description
        description = driver.find_element_by_id(
            "dnf_class_values_workshop__description__widget"
        ).text

        # find location string and parse
        location = driver.find_element_by_id(
            "dnf_class_values_workshop__location__widget"
        ).text

        # initiliaze building code dictionary
        f = open("building-code.txt", "r")
        dict = {}
        for line in f:
            k, v = line.strip().split(":")
            dict[k.strip()] = v.strip()

        buildingcode = location[location.find("(") + 1 : location.find(")")]
        roomNumber = buildingcode + location[location.find(")") + 1 :]
        address = dict[buildingcode]
        coordinates = geo_api.geocode(address, timeout=10)
        # print("lat:" + str(coordinates.latitude))
        # print("lon:" + str(coordinates.longitude))
        # check if an rsvp-able event
        try:
            rsvp = driver.find_element_by_css_selector(
                "#frame > main > div.page-main > div > div > div > div > div > div > div > div.form-footer > input.input-button.btn.btn_primary"
            )
            rsvp = "https://viterbicareers.usc.edu/students/gateway/"
        except:
            rsvp = None

        mydict = {
            "title": title,
            "location": {
                "room": roomNumber,
                "address": address,
                "longitude": coordinates.longitude,
                "latitude": coordinates.latitude,
            },
            "featured": False,
            "date": {
                "multiDay": multiDay,
                "allDay": False,
                "from": start_refined,
                "to": end_refined,
            },
            "description": description,
            "thumbnailUrl": "https://i.pinimg.com/280x280_RS/e4/b5/af/e4b5af02e5c4509b16d209cdb3ce5fdf.jpg?fbclid=IwAR1bZopy2_ZS74MXUrWlEiInuymq9Itn-_yqlEvr6frjLA0FxdC5btz37q8",
            "school": "viterbi",
            "type": "workshop",
            "rsvpLink": rsvp,
        }
        # push to db
        allEvents.insert_one(mydict)
        # back to list of events
        back_button = driver.find_element_by_css_selector(
            "#frame > main > div.page-main > div > div > div > div > div > div > div > div.form-footer > input.input-button.btn.btn_generic"
        )
        back_button.click()
    # decrease while condition
    total_num_events -= events_shown + 1
    # next page
    try:
        next_button = driver.find_element_by_css_selector(
            "#frame > main > div.page-main > div > div > div > div > div > div > div.lst-foot > div > a.btn.btn_primary"
        )
        next_button.click()
    except:
        print("No more pages, terminating script.")
# quit browser
driver.quit()
