# NUS Health

**Team Name:** Health In Motion (HIM)  
**App Name:** NUS Health (subject to change)  
**Project Video:** [Watch Video](https://drive.google.com/file/d/1rRC9gu3iT5knVtWWoZz5FLYZA-36NN8L/view)  
**Project Poster:** [View Poster](https://drive.google.com/file/d/19TQDifl0IWkaejjB1TYwG0mC95gvVkQ2/view)  
**Full project README:** [View README](https://docs.google.com/document/d/1mO43v1y6ybi474F-Ofe_jgNJ77ZbTg2U4fDhyX6yxiQ/edit?usp=sharing)

**Current (test) build:** [Install APK](https://drive.google.com/file/d/196eYWZmyp6_Mvx_jpT9InmL4Hse0bHvc/view?usp=sharing)

## Proposed Level of Achievement

**APOLLO**

## Motivation

The motivation behind creating the app stemmed from recognizing the common struggles and barriers individuals face when trying to maintain a consistent fitness routine. Our aim was to provide a solution that simplifies these complexities, offering users a comprehensive platform to personalize their workouts, access a diverse range of exercises, connect with a supportive community, and track their progress seamlessly.

## User Stories

1. **Beginner:** As a beginner to fitness, I want access to a diverse library of exercises with clear instructions, so that I can learn proper form and technique and feel confident in my workouts, even without prior experience.
2. **Fitness Enthusiast:** As a fitness enthusiast, I want to be able to connect with like-minded individuals in a supportive community, so that I can share my progress, celebrate achievements, and find motivation and inspiration to stay committed to my fitness journey.
3. **Progress Tracker:** As someone who values progress and accountability, I want to track my workouts and monitor my fitness progress over time, so that I can set new goals, see my improvements, and stay motivated to continue pushing myself towards greater fitness achievements.
4. **Fitness Coach:** As a fitness coach or personal trainer, I want to be able to create and share customized workout plans with my clients, so that I can provide them with tailored guidance and support to help them reach their fitness goals effectively.

## How to Run the Development Build

Although there is a build attached, it may not always be up to date. Follow these steps to run the app directly from this repository:

1. Clone this repository.
2. Open the command line in the folder of the cloned repository and change the directory to the frontend.
3. Run npm install to install all dependencies.
4. Run npx expo run.
5. Once the development server is running, check if it's using Expo Go (the default). If it’s using a development build, switch back to Expo Go.
6. A QR code should appear. On iOS, scan the QR code using the Camera app. On Android, install Expo Go from the Google Play Store and scan the QR code from the app.
 

## Features

### User Accounts: Basic Authentication Method with Sign Up / Sign In (Completed)
- If you are a new user, register for a new account; otherwise, log in to the system.
- Users have to enter a valid username and password with a retyped password.

### Workout Planner (To be done)
- Users can create workout routines, consisting of many workouts, either from the existing database or a custom one. Users can also create a workout plan, consisting of many workout routines, either from an existing one or a custom-made one.

### Workout Forum (To be done)
- Discussion forum for users to share and rate workout sets. Users can use available shared workout sets without needing to create a new one.

### Statistics Tracking (To be done)
- Save workout history and analyze workout statistics.

### Instant Sharing (To be done)
- A user can share workouts with other users and non-users.

### Recommendation System (To be done)
- Recommend appropriate exercise sets targeting an appropriate muscle group.

### Diet Planner (To be done)
- Create a meal plan and provide nutritional analysis. This may also be integrated with the workout forum for convenient sharing.

### NUS Personal Trainer (To be done)
- An imagined service for NUS students, where students can register to be personal trainers and schedule time to meet and train.

## Tech Stack

- **Frontend:** Expo (React Native)
- **Backend:** Express.js, PostgreSQL with Drizzle ORM, JWT
---
