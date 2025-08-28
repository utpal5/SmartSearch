const BASE_URL = 'https://openlibrary.org';

export const searchBooks = async (params) => {
  const { query, searchType, sortBy, limit } = params;
  
  let searchUrl = `${BASE_URL}/search.json?`;
  
  // Build search query based on type
  switch (searchType) {
    case 'title':
      searchUrl += `title=${encodeURIComponent(query)}`;
      break;
    case 'author':
      searchUrl += `author=${encodeURIComponent(query)}`;
      break;
    case 'subject':
      searchUrl += `subject=${encodeURIComponent(query)}`;
      break;
    case 'isbn':
      searchUrl += `isbn=${encodeURIComponent(query)}`;
      break;
    default:
      searchUrl += `q=${encodeURIComponent(query)}`;
  }
  
  // Add sorting
  if (sortBy === 'new') {
    searchUrl += '&sort=new';
  } else if (sortBy === 'old') {
    searchUrl += '&sort=old';
  } else if (sortBy === 'rating') {
    searchUrl += '&sort=rating';
  }
  
  searchUrl += `&limit=${limit}&fields=key,title,author_name,author_key,cover_i,cover_edition_key,publisher,publish_date,publish_year,first_publish_year,isbn,subject,language,number_of_pages_median,edition_count,ratings_average,ratings_count`;
  
  const response = await fetch(searchUrl);
  
  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }
  
  const data = await response.json();
  return {
    docs: data.docs || [],
    numFound: data.numFound || 0,
    start: data.start || 0
  };
};

export const getCoverUrl = (coverId, size = 'M') => {
  return `https://covers.openlibrary.org/b/id/${coverId}-${size}.jpg`;
};

export const getBookDetails = async (bookKey) => {
  const response = await fetch(`${BASE_URL}${bookKey}.json`);
  if (!response.ok) {
    throw new Error(`Failed to fetch book details: ${response.status}`);
  }
  return response.json();
};