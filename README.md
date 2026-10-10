TimeAngleAssignment
Take-home assignment for Shipcom.
Created using TypeScript / Express.js and Jest.
Provides a post end point for converting time and or hours/minutes input to an angle on a clock.

#10/10/26 CORRECTIONS ADDED:

- Fixed the calculation logic based on the corrections provided by the developers in their review.
- Restructured the switch statement to improve input validation, as suggested in the feedback.
- Added unit tests for the individual functions instead of relying solely on integration tests for the POST endpoint. These tests are intended to provide greater confidence in the correctness of the code.

Steps to run this locally:

1. Clone the repository
git clone https://github.com/Tsaleem123/TimeAngleAssignment.git
Then move into the project folder:
cd TimeAngleAssignment
2. Install dependencies
Make sure you have Node.js installed, then run:
npm install
3. Create an environment file
Create a .env file in the root of the project:
API_URL=http://localhost:3000
The project uses this value for the API URL.
4. Start the application
Run:
npm start
The API should now be available at:
http://localhost:3000
5. Test the endpoint
The endpoint is:
POST /CalculateTimeAngle
You can provide a single time:
{
  "time": "03:00"
}
Or separate hour and minute values:
{
  "hour": "3",
  "minute": "0"
}
For 03:00, the response will be:
90°
6. Run the tests
Keep the application running, then open another terminal in the project directory and run:
npm test
Keep the application running, then open another terminal in the project directory and run:
npm test
The tests send requests to the running API and verify both successful calculations and invalid input handling.
