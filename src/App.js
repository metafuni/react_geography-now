import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './styles/styles.css';

import Home from './components/Home';
import Explorer from './components/Explorer/Explorer';
import Quiz from './components/Quiz/Quiz';
import GeoMap from './components/GeoMap';
import Info from './components/Info';
import NotFound from './components/NotFound';

import Navbar from './components/Navbar';
import Footer from './components/Footer';


const App = () => (
  <BrowserRouter>
    <div className="App">
      <Navbar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/home" exact component={Home} />
        <Route path="/explorer" exact component={Explorer} />
        <Route path="/geomap" exact component={GeoMap} />
        <Route path="/quiz" exact component={Quiz} />
        {/* <Route path="/info" exact component={Info} /> */}
        <Route path="/404" component={NotFound} />
      </Switch>
      <Footer />
    </div>
  </BrowserRouter>
);

export default App;