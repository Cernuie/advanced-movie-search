import React, { useEffect, useState } from 'react';

import { fetchDetails } from '../hooks/fetchDetails';


export function SpecificMovie( {match} ) {
  
  let params = match.params;
  const [detail, setDetail] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      setDetail(await fetchDetails(params.imdbID));
    };

    fetchAPI();
  }, [params.imdbID]);

  return (

    <div>
      Specific movie page here
      <div>
        <div>
          <img
          src={`${detail.Poster}`}
          alt={detail.Title}
          >
          </img>
        </div>
      </div>
    </div>
  )
}