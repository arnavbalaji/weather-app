# Weather App

This is a simple weather app that fetches weather data based on user input and current location.

## Features
- Search for weather by city, ZIP code, or landmark
- Get current location weather using GPS
- 5-day forecast display

## Installation and Running
1. Install Python 3 and `pip`
2. Clone the repository:
   ```bash
   git clone https://github.com/arnavbalaji/weather-app.git
   cd weather-app
   ```
3. Install the required packages for the backend.
   ```
   pip install -r backend/requirements.txt
   ```
4. Then, do:
   ```
   cd backend
   python app.py
   ```
5. Create a new terminal and then do:
   ```
   cd frontend
   npm install
   npm run dev
   ```
You should then be able to access the site at http://localhost:3000/