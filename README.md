# NearestPlug - An E-Waste Recycling App

This project is designed to help users identify e-waste items, locate nearby recycling centers, and earn points for recycling. The app integrates Firebase for authentication and Firestore for data storage, along with Google Maps for location-based services.

## Features

- **E-Waste Recognition**: Upload images to identify e-waste items.
- **Recycling Center Locator**: Find the nearest recycling centers using Google Maps.
- **User Authentication**: Sign up, log in, and manage your account using Firebase Authentication.
- **Points System**: Earn points for recycling and track your progress.

## Getting Started

Follow these instructions to set up and run the project on your local machine.

### Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- A Firebase project with Authentication and Firestore enabled.

### Installation

#### 1. Clone the Repository

```bash
git clone https://github.com/amxlns/NearestPlug
cd NearestPlug
```

#### 2. Install Dependencies

Install all the required libraries and dependencies:

```bash
npm install
```

The following libraries will be installed:

- `react`
- `react-dom`
- `react-router-dom`
- `firebase`
- `@react-google-maps/api`
- `react-toastify`
- `tailwindcss` (if using Tailwind CSS)

#### 3. Set Up Firebase

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/).
2. Enable Authentication (Email/Password and Google Sign-In) and Firestore.
3. Add your Firebase configuration to the project. Create a `.env` file in the root directory and add the following:

```env
REACT_APP_FIREBASE_API_KEY=your-api-key
REACT_APP_FIREBASE_AUTH_DOMAIN=your-auth-domain
REACT_APP_FIREBASE_PROJECT_ID=your-project-id
REACT_APP_FIREBASE_STORAGE_BUCKET=your-storage-bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
REACT_APP_FIREBASE_APP_ID=your-app-id
```

#### 4. Set Up Google Maps API

1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Enable the Google Maps JavaScript API.
3. Add your Google Maps API key to the `.env` file:

```env
REACT_APP_GOOGLE_MAPS_API_KEY=your-google-maps-api-key
```

#### 5. Run the Project

Start the development server:

```bash
npm start
```

The app will be available at [http://localhost:3000](http://localhost:3000).
