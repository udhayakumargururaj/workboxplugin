import React, { lazy, Suspense, useState} from 'react';
import ReactDOM from 'react-dom';
import {Workbox} from 'workbox-window';
import "./sample.css"
const About = lazy(() => import(/* webpackChunkName: 'About' */ './about'));
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/sw.js")
    .then((registration) => {
      registration.update();
      registration.addEventListener("updatefound", () => {
        // If updatefound is fired, it means that there's
        // a new service worker being installed.
        const installingWorker = registration.installing;
        console.log(
          "A new service worker is being installed:",
          installingWorker
        );

        // You can listen for changes to the installing service worker's
        // state via installingWorker.onstatechange
      });
    })
    .catch((error) => {
      console.error(`Service worker registration failed: ${error}`);
    });
} else {
  console.error("Service workers are not supported.");
}

const Index = () => {
  const [about, setAbout] = useState(false);
  const updateButton = () => {
    setAbout(true);
  }
  return <div>
    Hello React! 
    <button onClick={updateButton}>Update</button>
    { about && 
    <Suspense fallback="">
      <About />
    </Suspense>
    }
  </div>;
};

ReactDOM.render(<Index />, document.getElementById('index'));
