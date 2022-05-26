import React, { useState, useEffect } from 'react'
import { useQuery, gql } from '@apollo/client'

import * as Layout from '../Layout.styles'
import * as Styled from './Items.styles'
import Sidebar from '../Sidebar'
import ItemCategories from './ItemCategories'
import Search from '../Search'
import ListItem from '../ListItem'

const Items = () => {
  const [displayedItems, setDisplayedItems] = useState([])
  const [searchText, setSearchText] = useState('')
  const [selectedCategoryName, setSelectedCategoryName] = useState('all')

  const { data, loading } = useQuery(ITEMS_QUERY)

  useEffect(() => {
    if (data && data.items) {
      let newDisplayedItems = data.items.filter((item) => {
        return (
          selectedCategoryName === 'all' ||
          (item.category && item.category.name === selectedCategoryName)
        )
      })

      // Search
      if (searchText.length > 0)
        newDisplayedItems = newDisplayedItems.filter((item) => {
          return item.name.includes(searchText)
        })

      setDisplayedItems(newDisplayedItems)
    }
  }, [data, searchText, selectedCategoryName])

  return (
    <Layout.Container>
      <Sidebar>
        <ItemCategories
          selectedCategoryName={selectedCategoryName}
          setSelectedCategoryName={setSelectedCategoryName}
        />
      </Sidebar>
      <Layout.List>
        {loading && <p>Loading...</p>}

        <>
          {data && data.items && (
            <Search searchText={searchText} setSearchText={setSearchText} />
          )}

          {displayedItems.map((item) => (
            <Styled.CustomLink to={`/item/${item.id}`} key={item.id}>
              <ListItem>
                <Styled.Name>{item.name}</Styled.Name>
              </ListItem>
            </Styled.CustomLink>
          ))}
        </>
      </Layout.List>
    </Layout.Container>
  )
}

export const ITEMS_QUERY = gql`
  # query items {
  #   items {
  #     id
  #     name
  #     category {
  #       id
  #       name
  #     }
  #   }
  # }
  query items {
    items {
      id
      name
    }
  }
`

export default Items
