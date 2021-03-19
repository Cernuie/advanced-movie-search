import React from 'react';
import axios from 'axios';



const deleteFavorite = () => {
  const movieID = document.location.pathname.split("/")[2];
  axios.delete(`/api/favorites/new?movieID=${movieID}`, {
    headers: { "Authorization": localStorage.getItem("token") },
  }).then((response) => {
    console.log("delete passed", response)
    console.log("deletion is here", response.data.deletion)
    if(response.data.deletion === "true") {
      console.log("inside the if statement")
      // setIsFavorite("deleted")
    }
  })

  alert("deleted?")
}

export default deleteFavorite;