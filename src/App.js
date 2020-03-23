import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import {Home} from './components/Home';
import {Explorer} from './components/Explorer';
import {Quiz} from './components/Quiz';
import {GeoMap} from './components/GeoMap';
import {Info} from './components/Info';
import {NotFound} from './components/NotFound';

import Navbar from './components/Navbar';


const App = () => (
  <BrowserRouter>
    <div className="App">
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/explorer" exact component={Explorer} />
        <Route path="/quiz" exact component={Quiz} />
        <Route path="/geomap" exact component={GeoMap} />
        <Route path="/info" exact component={Info} />
        <Route path="/" component={NotFound} />
      </Switch>
      <Navbar />
    </div>
  </BrowserRouter>
);

export default App;