import React, { lazy, Suspense, useState} from 'react';
import ReactDOM from 'react-dom';
import {Workbox} from 'workbox-window';
import "./sample.css"
const About = lazy(() => import(/*webpackChunkName: About*/ './about'));
const wb = new Workbox('/service-worker.js');
wb.register();

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
