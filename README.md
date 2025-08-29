# MovieApp

A modern and responsive movie discovery web application built with React, Vite, and Tailwind CSS. It leverages the TMDB API for movie data and Appwrite for backend services to track trending searches.

This project features a multi-page setup with routing, a clean user interface, and a backend integration for dynamic content.

## ✨ Features

-   **Seamless Routing**: Navigate between Home, About, and Developer pages without page reloads using `react-router-dom`.
-   **Powerful Movie Search**: Instantly search for any movie from The Movie Database (TMDB).
-   **Debounced Search**: Smart search functionality that waits for the user to stop typing before fetching results, improving performance.
-   **Discover Movies**: The homepage displays a list of popular movies by default.
-   **Trending Searches**: A unique feature powered by Appwrite that shows which movies are being searched for most often by users.
-   **Modern UI**: Clean, good-looking interface with a dynamic background pattern and gradients.
-   **Responsive Design**: Looks great on all devices, from desktops to mobile phones.

## 🛠️ Tech Stack

-   **Frontend:** React, Vite, Tailwind CSS
-   **Routing:** React Router DOM
-   **Backend:** Appwrite (Database)
-   **API:** The Movie Database (TMDB) API

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing.

### Prerequisites

-   Node.js (v18 or newer recommended)
-   npm (or yarn/pnpm)
-   An active Appwrite instance (you can use Appwrite Cloud or self-host with Docker).
-   A TMDB API Key.

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/movie-app.git
    cd movie-app
    ```

2.  **Install NPM packages:**
    ```bash
    npm install
    ```

3.  **Create an environment file:**
    Create a `.env` file in the root of your project. This file will store your secret keys and configuration variables.

    ```env
    # Get your API key from https://www.themoviedb.org/settings/api
    VITE_TMDB_API_KEY="YOUR_TMDB_API_KEY"

    # Get these from your Appwrite project's Settings page
    VITE_APPWRITE_ENDPOINT="https://cloud.appwrite.io/v1"
    VITE_APPWRITE_PROJECT_ID="YOUR_APPWRITE_PROJECT_ID"

    # Get these after creating the database and collection in Appwrite (see steps below)
    VITE_APPWRITE_DATABASE_ID="YOUR_APPWRITE_DATABASE_ID"
    VITE_APPWRITE_COLLECTION_ID="YOUR_APPWRITE_COLLECTION_ID"
    ```

4.  **Configure Appwrite:**
    Follow the detailed Appwrite configuration steps in the section below.

5.  **Run the development server:**
    ```bash
    npm run dev
    ```
    Open the URL provided in your terminal (usually `http://localhost:5173`) to see the application.

## ☁️ Appwrite Configuration

This project uses Appwrite to store and retrieve trending movie searches. Here’s how to set it up.

### 1. Create an Appwrite Project

1.  Log in to your Appwrite Console.
2.  Click **Create project**. Give it a name, for example, `MovieApp`.
3.  From the project's dashboard, copy the **Project ID** and **API Endpoint**. Add these to your `.env` file.

### 2. Add a Web Platform

For your React app to communicate with Appwrite, you must register it as a web platform.

1.  In your project's sidebar, go to **Platforms**.
2.  Click **Add Platform** and choose **Web**.
3.  Give it a name (e.g., "MovieApp Web").
4.  For the **Hostname**, enter `localhost`. This is crucial for local development.
5.  Click **Create**.

### 3. Create Database and Collection

1.  In the sidebar, go to **Databases**.
2.  Click **Create database**.
    -   **Name**: `Movie DB`
    -   **Database ID**: `movie_db` (or choose your own). **Copy this ID.**
3.  Enter the newly created database and click **Create collection**.
    -   **Name**: `Trending Searches`
    -   **Collection ID**: `trending_searches` (or choose your own). **Copy this ID.**

### 4. Configure Collection Attributes & Indexes

After creating the collection, you need to define its data structure (attributes) and create indexes for efficient querying.

#### Attributes

Go to the **Attributes** tab for your `trending_searches` collection and create the following:

| Key            | Type    | Size | Required | Default | Array |
| :------------- | :------ | :--- | :------- | :------ | :---- |
| `search_term`  | String  | 255  | Yes      |         | No    |
| `search_count` | Integer |      | Yes      | `1`     | No    |
| `title`        | String  | 255  | Yes      |         | No    |
| `poster_url`   | String  | 2048 | Yes      |         | No    |

#### Indexes

Go to the **Indexes** tab to create indexes. This is required for querying and sorting data.

1.  **Index for searching terms:**
    -   **Index Key**: `term_key`
    -   **Index Type**: `key`
    -   **Attributes**: Select `search_term` (ASC)
2.  **Index for sorting by popularity:**
    -   **Index Key**: `count_key`
    -   **Index Type**: `key`
    -   **Attributes**: Select `search_count` (DESC)

### 5. Set Collection Permissions

1.  Go to the **Settings** tab for your `trending_searches` collection.
2.  Under **Permissions**, click **Add Role**.
3.  Select **Any**.
4.  Check the boxes for **Create**, **Read**, and **Update**. This allows any user of your app to contribute to the trending search data and view it.
5.  Click **Update**.

### 6. Update Your Code with IDs

Finally, make sure your application code is using the correct Database and Collection IDs from your `.env` file.

1.  Add the `VITE_APPWRITE_DATABASE_ID` and `VITE_APPWRITE_COLLECTION_ID` to your `.env` file with the IDs you copied in step 3.
2.  Ensure your `src/appwrite/appwrite.js` file (or wherever you initialize your Appwrite database service) uses these environment variables.

**Example `src/appwrite/appwrite.js`:**
```javascript
import { Client, Databases, Query, ID } from 'appwrite';

// ... (client initialization using VITE_APPWRITE_ENDPOINT and VITE_APPWRITE_PROJECT_ID)

const databases = new Databases(client);

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID_TRENDING = import.meta.env.VITE_APPWRITE_COLLECTION_ID;

// ... (rest of your appwrite functions, which should use these constants)
```

Your Appwrite setup is now complete! The application should now be able to connect to your Appwrite backend.

