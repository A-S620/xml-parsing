# xml-parsing
XML Parsing and Storage

## Tasks
Create an application that can:
* Read the ‘directory’ of XML files (Do not use the local filesystem)
* Parse each XML file asynchronously, transforming each one from XML to JSON
* Store the full JSON document in a cloud database of choice 
* Read each JSON object document extracting all the <ReturnedDebitItem> objects and storing into the database
* Trigger a notification of choice to indicate the files have been successfully parsed and key data extracted – this could be an email, SMS, phone call, or * even a push notification. If you create a UI then this could be a toast notification alert box etc.
* Handle the archiving of the processed files (archive folder or another style of activity)
* (Optional) create a simple UI to read the extracted data (the ReturnedDebitItems)

 ## Running locally
 To run the code locally you will need a .env file set up as shown:
 ![image](https://user-images.githubusercontent.com/48350000/164015341-ab8fd31d-9e73-446a-a518-59051f299976.png)
  
* Run `npm run postinstall` then run `npm start`
  
* Testing - To run tests use the command `npm run test`
  
## S3 Structure
  
 Set up your bucket to include the following folders:
 test/
    new-files/
    json/
    archive/
 prod/
    new-files/
    json/
    archive/
