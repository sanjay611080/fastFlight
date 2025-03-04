# FastFlight

FastFlight is a modern flight booking application built using **React**, **Vite**, **Firebase** for authentication, **TailwindCSS** for styling, and **React Icons** for enhanced UI elements. The application allows users to view flight details, calculate the total price, and navigate between pages using a simple navbar.

## Table of Contents

- [Technologies Used](#technologies-used)
- [Setup](#setup)
- [Folder Structure](#folder-structure)
- [Features](#features)
- [Deployment](#deployment)

## Technologies Used

- **React** - A JavaScript library for building user interfaces.
- **Vite** - A fast build tool for modern web development.
- **Firebase** - Authentication service for user management.
- **TailwindCSS** - A utility-first CSS framework for styling.
- **React Icons** - A collection of icons for React components.
- **Vercel** - For deployment.

## Setup

Follow the steps below to get the project up and running on your local machine:

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/fastflight.git
cd fastflight

### 2. Install dependencies

```bash
npm install

### 3. Set Up Firebase
This project uses Firebase for authentication. To integrate Firebase, follow these steps:

Go to the Firebase Console.
Create a new Firebase project.
Set up Firebase Authentication (Email/Password method or other methods you prefer).
Create a Firebase configuration file and copy the config keys provided by Firebase.

```bash
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-storage-bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
VITE_FIREBASE_APP_ID=your-app-id

### 4. Configure TailwindCSS

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init

### 5. Run the application

```bash
npm run dev

### 6. Features
Navbar: A simple, responsive navigation bar for easy navigation between pages.
Home Page: Displays available flight details with a feature to calculate total flight prices.
About Page: A basic About page with information about the project.
Authentication: Firebase-based authentication for login and user management.
Responsive Design: Fully responsive UI using TailwindCSS.

### 7. Deployed on vercel
Link: https://fast-flight.vercel.app/
