The website is in /main-application

/client /src --> front end content of the website (react, redux)
/actions
alert.js --> redux alerts
auth.js --> loading user, registration, login/logout
catalogue.js --> get All Events Liked (paginated)
event.js --> get events from db
loading.js --> setting the loading state in redux
modal.js --> share button makes modal pop up
profile.js --> creating/deleting/updating a profile
types.js --> all action types
/components

    /fonts
    /reducers -- takes care of redux states after action is dispatched
        alert.js
        auth.js
        catalogue.js
        event.js
        loading.js
        modal.js
        profile.js
    /utils
        checkIfCatalogued.js --> checks if event is catalogued or not
        setAuthToken.js --> authenticate user
        config.js --> create one of these and put in your api key
