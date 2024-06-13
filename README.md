# React Native Story Writing App

This is a React Native application for writing stories, designed for both iOS and Android platforms. Users can write stories with a title, subtitle, and body, and can interact with a pop-up bar to access additional features. The app includes a feature to use Agastya AI for text improvements.

## Features

- Write stories with title, subtitle, and body.
- Pop-up bar with keyboard and star icons.
- Use Agastya AI for various text modifications (mock server).
- Copy selected text to clipboard.
- Display the response text below body text input.

## Installation

### Prerequisites

- Node.js
- npm or yarn
- React Native CLI
- Xcode (for iOS development)
- Android Studio (for Android development)

### Steps

1. Clone the repository:

```bash
git clone https://github.com/Riser17/StoryApp.git
cd StoryApp
```
2. Install dependencies:

```bash
npm install
```

## Running the App

### iOS
Make sure you have an iOS simulator or a physical device connected, then run:

```bash
npx react-native run-ios
```

### Android
Make sure you have an Android emulator or a physical device connected, then run:

```bash
npx react-native run-android
```

## Code Overview

- The main component containing the app's logic and UI.
- Manages state/ref for title, subtitle, body, keyboard visibility, Agastya AI visibility, selected text, and response text.
- Handles text selection, showing/hiding the keyboard, and interacting with Agastya AI.
- User can now select any text in the body (both screens show selected text) and then press an option such as “Make it shorter”. It will send a request to the server and get the response text. Display the response text below body text input.


## Screenshots 
<img src="https://github.com/Riser17/StoryApp/assets/91198103/c0da6a30-89f2-44bb-832b-4d82fa01ddab" width="300" height="500">


