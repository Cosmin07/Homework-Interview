import { Movie } from "../models/Movie";
  
  class MovieService {
    private apiUrl = "https://www.omdbapi.com/";
    private apiKey = import.meta.env.VITE_OMDB_API_KEY;
    
    async getMovies(query: string): Promise<Movie[]> {
      if (!query) return [];
  
      try {
        const response = await fetch(
          `${this.apiUrl}?s=${encodeURIComponent(query)}&apikey=${this.apiKey}`
        );
  
        const data = await response.json();
        return data.Search || [];
      } catch (error) {
        console.error("Error fetching movies:", error);
        return [];
      }
    }
  }
  
  export default new MovieService();