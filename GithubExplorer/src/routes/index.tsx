import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';
import Repository from '../pages/Repository';

const Routes: React.FC = () => {
    return (
        <Switch>
            <Route path="/" exact component={Dashboard} />
            <Route path="/repository/:name+" component={Repository} />
        </Switch>
    );
};

// O "+" no nome da rota indica que tudo que vem depois daquela barra é o parametro, isto permite que o parametro tenha "/" em sua composição

export default Routes;
