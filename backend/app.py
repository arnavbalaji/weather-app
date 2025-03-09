from flask import Flask, request, jsonify
import requests
from flask_cors import CORS 

app = Flask(__name__)

CORS(app)

@app.route("/autocomplete", methods=["GET"])
def autocomplete():
    query = request.args.get("query", "")
    if not query:
        return jsonify([])

    # required by Nominatim's terms of use
    headers = {
        "User-Agent": "LocationSearchApp/1.0"
    }
    
    url = f"https://nominatim.openstreetmap.org/search?format=json&q={query}"
    
    response = requests.get(url, headers=headers)
    
    # Only try to parse JSON if we got a successful response
    if response.status_code == 200 and response.text:
        data = response.json()
        locations = [{"name": place["display_name"], "lat": place["lat"], "lon": place["lon"]} for place in data[:5]]
        return jsonify(locations)
    else:
        return jsonify({"error": f"API returned status {response.status_code}"}), 500
    
@app.route("/weather", methods=["GET"])
def weather():
    lat = request.args.get("lat")
    lon = request.args.get("lon")

    if not lat or not lon:
        return jsonify({"error": "Latitude and Longitude required"}), 400

    api_key = "4f18b09231c699754d01a5d668b3e846"

    # Fetch current weather
    weather_url = f"http://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={api_key}&units=metric"
    weather_response = requests.get(weather_url)

    # Fetch 5-day forecast
    forecast_url = f"http://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={api_key}&units=metric"
    forecast_response = requests.get(forecast_url)

    if weather_response.status_code == 200 and forecast_response.status_code == 200:
        weather_data = weather_response.json()
        forecast_data = forecast_response.json()

        temp_c = weather_data["main"]["temp"]
        temp_f = (temp_c * 1.8) + 32  # Convert Celsius to Fahrenheit

        # Process forecast data 
        forecast_list = forecast_data["list"]
        daily_forecast = {}
        for entry in forecast_list:
            date = entry["dt_txt"].split(" ")[0]  # Extracting date only
            if date not in daily_forecast:
                daily_forecast[date] = {
                    "temp_c": entry["main"]["temp"],
                    "temp_f": round((entry["main"]["temp"] * 1.8) + 32, 2),
                    "humidity": entry["main"]["humidity"],
                    "condition": entry["weather"][0]["description"],
                }

        return jsonify({
            "name": weather_data["name"],
            "current": {
                "temp_c": temp_c,
                "temp_f": round(temp_f, 2),
                "humidity": weather_data["main"]["humidity"],
                "condition": weather_data["weather"][0]["description"],
            },
            "forecast": daily_forecast
        })
    else:
        return jsonify({"error": "Weather data not found"}), 404

if __name__ == "__main__":
    app.run(debug=True, port=5000)
