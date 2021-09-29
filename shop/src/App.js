import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Main } from './components/Main';
import { Catalog } from './components/Catalog';
import { Search } from './components/Search';
import { ProductPage } from './components/ProductPage';
import { About } from './components/About';
import { Contacts } from './components/Contacts';
import { ConnectedCart } from './components/Cart';
import { Menu } from './components/Menu';
import { Footer } from './components/Footer';
import { Layout } from './components/Layout';
import { PageNotFound } from './components/PageNotFound';

const exact = true;

export default function App() {
  return (
    <Router>
      <Menu />
      <Layout>
        <Switch>
          <Route path="/" exact={exact} component={Main} />
          <Route path="/catalog" exact={exact}>
            <Catalog>
              <Search />
            </Catalog>
          </Route>
          <Route path="/catalog/:id" component={ProductPage} />
          <Route path="/about" component={About} />
          <Route path="/contacts" component={Contacts} />
          <Route path="/cart" component={ConnectedCart} />
          <Route path="*" component={PageNotFound} />
        </Switch>
      </Layout>
      <Footer />
    </Router>
  );
}
