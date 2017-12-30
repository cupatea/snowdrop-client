import React, { Component } from 'react'
import { connect } from 'react-redux'
import  { initCategories }  from '../actions'
import { push } from 'react-router-redux'

import { withStyles } from 'material-ui/styles'
import { CircularProgress } from 'material-ui/Progress'
import { serverURL, productsPath } from '../config/pathHelper' 
import Category from '../components/Category'
import Footer from '../components/Footer'

import ScrollToTopOnMount from './ScrollToTopOnMount'

const styles = theme => ({
  root:{
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
  },
  container: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
  },
  errorMessage: {
    textAlign: 'center',
    fontFamily: 'Roboto'
  },
  progress: {
    justifySelf: 'center',
    margin: `0 ${theme.spacing.unit * 2}px`,
  },
})

class Categories extends Component{
  classes = this.props.classes

  componentWillMount() {
    this.props.onInitCategories(this.props.locale)
  }
  componentWillReceiveProps(nextProps) { 
    if (nextProps.locale !== this.props.locale) {
      this.props.onInitCategories(nextProps.locale)
    }
  }
  
  renderCategory({ id, title, image, slug }){
    return(
      <Category
        key         = { id }
        title       = { title} 
        image       = { serverURL(image.url) } 
        path        = { productsPath(slug) } 
        linkTo      = { this.props.handleLocationChange }
        buttonText  = { this.props.actionButtonText }
      />  
    )
  }
  renderError(){
    return <p className = {this.classes.errorMessage}>Error! Can't fetch categories from the server</p>
  }
  renderLoading(){
    return <CircularProgress className = { this.classes.progress } size = { 50 } color = "accent" />
  }
  renderFooter(){
    return <Footer text = { this.props.footerButtonText } />
  }
  render(){
    return (
      <div className = { this.classes.root }>
        <ScrollToTopOnMount />
        { this.props.loading && this.renderLoading() }
        { this.props.error && this.renderError() }
        <div className = { this.classes.container }>
          { this.props.loaded && this.props.categories.map(c => this.renderCategory(c))  } 
          { this.props.loaded && this.renderFooter() }    
        </div>
      </div>
    )
  }    
}


const mapStateToProps = state => {
  return {
    locale: state.uiState.locale,
    categories: state.categories.data,
    actionButtonText: state.uiState.actionButtonText,
    footerButtonText: state.uiState.footerButtonText,
    error: state.categories.error,
    loading: state.categories.loading,
    loaded: state.categories.loaded
  }
}

const mapDispachToProps = dispatch => {
  return {
    onInitCategories: locale => dispatch(initCategories(locale)),
    handleLocationChange: (path) => dispatch(push(path))
  }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispachToProps)(Categories))
