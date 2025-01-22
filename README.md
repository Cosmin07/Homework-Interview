## Repository description
Create a dynamic movie search application that interacts with the OMDb API, updates data in real-time as the user types, and categorizes movies by decades based on the search results

## Features to Implement

### 1. Search Bar
- Create a search bar where the user can type a query. (e.g. "batman")
- While typing, display the current query text below the search bar in real-time.

### 2. API Integration
- On pressing "Enter", make an API call to:  
  `http://www.omdbapi.com/?i=tt3896198&apikey=<api_key>&s=<query>`
- Parse the response to retrieve the movie titles and their release years.
- Create a .env file where you will store a VITE_OMDB_API_KEY variable with the API key.

### 3. Categorization by Decades
- From the API data, extract the decades of the movies (e.g., 2020s, 2010s, etc.).
- Take the movies from the most recent 4 decades that are available in the data, and group them by decades.
  - For example, if data contains movies from 1975 to 2023, show only: `2020s, 2010s, 2000s, 1990s`.
- Each decade group should display the **first 3 movies** of that decade, sorted by year (ascending).

### 4. Load More Button
- Below each decade group, include a "Load More" button.
- On clicking "Load More", display the next 3 movies from that decade.

## API usage

Please use the OMDb API at the following link: [here](https://www.omdbapi.com/apikey.aspx)

Choose a FREE account type, and you will receive the API (with the key) for usage via mail (Please open the validation URL received in your email). In my case the API looked like this: http://www.omdbapi.com/?i=tt3896198&apikey=12345678
### The response looks like this:
```
{
  "Search": [
    {
      "Title": "Batman Begins",
      "Year": "2005",
      "imdbID": "tt0372784",
      "Type": "movie",
      "Poster": "https://m.media-amazon.com/images/M/MV5BODIyMDdhNTgtNDlmOC00MjUxLWE2NDItODA5MTdkNzY3ZTdhXkEyXkFqcGc@._V1_SX300.jpg"
    },
    ...
    {
      "Title": "Batman v Superman: Dawn of Justice (Ultimate Edition)",
      "Year": "2016",
      "imdbID": "tt18689424",
      "Type": "movie",
      "Poster": "https://m.media-amazon.com/images/M/MV5BOTRlNWQwM2ItNjkyZC00MGI3LThkYjktZmE5N2FlMzcyNTIyXkEyXkFqcGdeQXVyMTEyNzgwMDUw._V1_SX300.jpg"
    }
  ],
  "totalResults": "586",
  "Response": "True"
}
```


