// import 'dotenv/config'
import { InMemoryCache, ApolloProvider, ApolloClient } from '@apollo/client'
import React from 'react'
import { render } from 'react-dom'
import { ThemeProvider } from 'styled-components'
import { BrowserRouter, Route } from 'react-router-dom'

import theme from './theme/theme'
import GlobalStyles from './theme/GlobalStyles'
import ScrollToTop from './components/ScrollToTop'

import Header from './components/Header'
import Items from './components/Items/Items'
import Item from './components/Items/Item'
import Dishes from './components/Dishes/Dishes'
import Inventory from './components/Inventory/Inventory'
import Purchases from './components/Purchases/Purchases'
import Purchase from './components/Purchases/Purchase'

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        purchases: {
          merge: false,
        },
        dishes: {
          merge: false,
        },
        inventoryItems: {
          merge: false,
        },
      },
    },
    Item: {
      fields: {
        dishes: {
          merge: false,
        },
        countsAs: {
          merge: false,
        },
      },
    },
    Dish: {
      fields: {
        dates: {
          merge: false,
        },
      },
    },
    Purchase: {
      fields: {
        items: {
          merge: false,
        },
      },
    },
  },
})

const client = new ApolloClient({
  uri: process.env.REACT_APP_SERVER_URI,
  resolvers: {},
  cache,
})

const App = () => (
  <ApolloProvider client={client}>
    <BrowserRouter>
      <>
        <ScrollToTop />
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          <Header />
          <Route exact path="/" component={Purchases} />
          <Route exact path="/purchases" component={Purchases} />
          <Route exact path="/purchase/:id" component={Purchase} />
          <Route exact path="/inventory" component={Inventory} />
          <Route exact path="/dishes" component={Dishes} />
          <Route exact path="/items" component={Items} />
          <Route exact path="/item/:id" component={Item} />
        </ThemeProvider>
      </>
    </BrowserRouter>
  </ApolloProvider>
)

render(<App />, document.getElementById('root'))
