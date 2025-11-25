# NASA_APOD
A simple web to view NASA's Astronomy Picture of the Day (APOD).

# Features
- Shows today's APOD automatically
- View APODs for any past date using a date picker
- Displays image, title, date, and explanation
- Backend caches API responses for 1 hour

# Tech Stack
- Backend: Node.js
- Frontend: HTML, CSS, JavaScript
- API: NASA APOD API

# Notes
- NASA API has a rate limit. Sometimes requests may fail if the limit is exceeded. The app works correctly when the API allows requests.
