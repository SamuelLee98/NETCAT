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
    /alert
        Alerts.js --> creates alert component
        AlertComponent.js --> the html of the component and also can handle remove alert action
    /auth 
        login and register components 
    /content 
        featured page component by school 
    /dashboard
        Dashboard.js --> parent component 
        Catalogue.js --> card display of events 
        ProfileDisplay.js --> user's profile
    /details 
        component for the detailed version of a single event
    /explorMore 
        explore page component
    /layout 
        footer, header, spinner componenents
    /map 
        google map components
    /navbar 
        side nav and top nav bar 
    /profile forms 
        registration form + create profile form 
    /routing 
        Private vs. regular routes. 

/fonts --> font files
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
