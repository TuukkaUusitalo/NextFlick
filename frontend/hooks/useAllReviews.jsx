import { useState } from 'react'

export default function useAllReviews() {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
      
    
    const getReviews = async() => {
      setIsLoading(true);
      setError(null);

      const response = await fetch("/api/reviews",{
          method:"GET",
        })
      const reviews = await response.json();
      
    if(!response.ok){
      setError(reviews.error)
      setIsLoading(false)
      console.log("Reviews response:", response.status)
      return false;
    }
    setIsLoading(false)
    console.log(reviews)
    return reviews;
    }

  return { getReviews, isLoading, error };
}

