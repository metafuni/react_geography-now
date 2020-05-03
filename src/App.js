import React from 'react';
import { Route, Switch } from 'react-router-dom';

import './styles/styles.css';

import Home from './components/Home';
import Explorer from './components/Explorer/Explorer';
import Quiz from './components/Quiz/Quiz';
import GeoMap from './components/GeoMap';
import NotFound from './components/NotFound';

import Navbar from './components/Navbar';
import Footer from './components/Footer';


const App = () => (
    <div className="App">
      <Navbar />
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/home" component={Home} />
        <Route path="/explorer" component={Explorer} />
        <Route path="/geomap" component={GeoMap} />
        <Route path="/quiz" component={Quiz} />
        <Route component={NotFound} />
      </Switch>
      <Footer />
    </div>
);

export default App;