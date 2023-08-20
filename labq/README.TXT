Hi The system that I have built is called LabQ and it allows students to ask questions of educators during laboratory hours.

To start the system.
1. Run npm install in the src folder
2. Run npm install in the labq folder
3. Run npm run dev in the src folder
4. Run node server.js in the labq folder.

To start the tests:
1. Follow the start the system tutorial
2. Go into The datamodel folder and uncomment the import to import db from "../Database/db-test.js" and comment out the import: import db from "../Database/db.js";
3. You need to restart the server every time you run the test suites.