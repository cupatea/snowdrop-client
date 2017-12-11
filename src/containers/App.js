import React, { Component } from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import { appName, categories } from '../data/fixtures'

import Header from '../components/Header'
import Footer from '../components/Footer'
import Tabs from '../components/Tabs'
import Categories from './Categories'
import Products from './Products'

class App extends Component {

  render() {
    const currentTabSlug = this.props.location.pathname.split('/')[1]
    return(
      <div>
        <Header appName = { appName } />
        <Tabs tabs = { categories } currentTab = { currentTabSlug } />
        <Switch>
         <Route exact path = '/' component = { Categories }/>
          { categories.map(c => <Route key = { c.id } exact path = { `/${ c.slug }` } component = { Products } />)}
        </Switch>
        <Footer text = 'Contacts' />
      </div>
    )
  }
}  
export default withRouter(App)
