import React from 'react';
import logo from './logo.svg';
import PageManager from './pages/PageManager';

import Server from './services/server/Server';
import Store from './services/Store/Store';

import './App.css';
import Mediator from './services/Mediator/Mediator';
import CONFIG from './config';

export const MediatorContext = React.createContext<Mediator>(null!);

function App() {

  const store = new Store();
  const mediator = new Mediator(CONFIG.MEDIATOR);
  const server = new Server({store, mediator});


  const pressMeHandler = () => mediator.get(
    CONFIG.MEDIATOR.TRIGGERS.MESSAGE,
    { name: 'Vasya', text: 'something' }
  );

  const props = {
        mediator,
        server,
        store,
    }

  return (
      <div className="App">
        <button onClick={pressMeHandler}>Press Me</button>
        <div className='app'>
          <PageManager {...props}/>
        </div>
      </div>
  );
}

export default App;
