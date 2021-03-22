import React from 'react';


export default function footer() {

  return (

    <div className="flex">
      <div className="default-padding">
        <h3>ABOUT US:</h3>
        <p>
          Hello! Welcome to our movie database project. We are three full-stack developers that have
          built this project from the ground up as part of a two week finals project for Lighthouse Labs
          web development bootcamp!
      </p>
        <p>
          This movie database leverages React on the front end combined with two main APIs to render all the media search elements. PostgreSQL is used to store user favorites and watchlists. The backend is functional off node-express. If you would like to contact us, please see below:
      </p>
        <ul className="list-inline">
          <h4>Project Contributers: (GitHub Links)</h4>
          <li className="list-inline-item">
            <a className="footer-anchor" href="https://github.com/Cernuie" style={{ color: "#f4c10f" }}>
              Alexander Nguyen
          </a>
          </li>
          <li className="list-inline-item">
            <a className="footer-anchor"href="https://github.com/stephant98" style={{ color: "#f4c10f" }}>
              Stephan Truchsess
          </a>
          </li>
          <li className="list-inline-item">
            <a className="footer-anchor" href="https://github.com/chriskang24" style={{ color: "#f4c10f" }}>
              Christopher Kang
          </a>
          </li>
        </ul>
      </div>
      <div className="default-padding">
        <h3>APIs Used:</h3>
        <div>
          <img src="TMDB.png" alt="image" width="135px" />
          <img src="OMDB.png" alt="image" height="100px" />
        </div>
      </div>
    </div>

  )
}