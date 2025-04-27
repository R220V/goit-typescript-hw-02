import axios from "axios";
import { Photo } from './components/App/App.types';

interface SearchResponse {
	page: number;
	per_page: number;
	results: Photo[];
  }


export const fetchImages = async (
	text: string,
	page: number
  ): Promise<Photo[]> => {
	
	const response = await axios.get<SearchResponse>("https://api.unsplash.com/search/photos", {
	  params: {
		query: text,
		per_page: 12,
		page: page,
		orientation: "portrait",
		client_id: "r1VafScOIZ1KRyDEraF9MZ4-vyuLHOe2h_P6ZPCIWG4",
	  },
	});
  
	return response.data.results;
  };
  
   