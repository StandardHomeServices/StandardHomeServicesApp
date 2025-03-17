# StandardHomeServicesApp

A working prototype for the Home Services App that demonstrates the user flow from entering an address to scheduling and paying for home services, with a focus on the 3D modeling technology that enables instant quotes.

## Features

- **Address Validation** - Uses Google Maps API for address validation and geolocation
- **3D Model Visualization** - Simulates 3D model creation and visualization using Three.js
- **Photo Upload** - Allows users to upload photos of their home for 3D model creation
- **Interactive Scheduling** - Calendar widget for selecting service dates and times
- **Payment Processing** - Simulated payment method selection and processing

## How to Use

1. Open `index.html` in a web browser
2. Click "Get Started" to begin the process
3. Enter your address or use geolocation
4. The app will check if a 3D model of your home exists
5. If a model exists, you'll see a 3D visualization and a quote
6. If no model exists, you can upload photos of your home
7. After processing, you'll receive a quote based on your home's dimensions
8. Select a date and time for the service
9. Choose a payment method and complete the booking

## Technical Implementation

This prototype is built using:

- **HTML/CSS/JavaScript** - For the frontend interface
- **Google Maps API** - For address validation and geolocation
- **Three.js** - For 3D model visualization
- **FullCalendar** - For the scheduling calendar
- **LocalStorage** - For storing user data between sessions

## Setup for Development

To set up this project for development:

```
git clone https://github.com/YOUR_USERNAME/StandardHomeServicesApp.git
cd StandardHomeServicesApp
# Open index.html in your browser
```

## Google Maps API Setup

To use the Google Maps functionality:

1. Get a Google Maps API key from the [Google Cloud Console](https://console.cloud.google.com/)
2. Enable the Maps JavaScript API and Places API
3. Replace `YOUR_API_KEY` in the index.html file with your actual API key

**Important:** For security reasons, you should restrict your API key to your domain when using it in production.

## Deployment

This project is set up to be deployed on GitHub Pages:

1. Push the code to your GitHub repository
2. Go to the repository settings
3. Scroll down to the GitHub Pages section
4. Select the main branch as the source
5. Click Save

Your site will be published at `https://YOUR_USERNAME.github.io/StandardHomeServicesApp/`

## Next Steps for Development

To turn this prototype into a production-ready application:

- Implement a backend server for data storage and processing
- Integrate with a real 3D modeling service or API
- Add user authentication and account management
- Implement actual payment processing with Stripe or similar
- Add service provider management and scheduling
- Implement notifications and reminders
