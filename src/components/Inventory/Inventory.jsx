import React, { useState, useEffect } from 'react'
import { useQuery, gql } from '@apollo/client'
import moment from 'moment'

import * as Layout from '../Layout.styles'
import * as Styled from './Inventory.styles'
import Sidebar from '../Sidebar'
import SortingHeader from '../SortingHeader'
import InventoryLocations from './InventoryLocations'
import Search from '../Search'
import ListItem from '../ListItem'
import InventoryItemDetails from './InventoryItemDetails'
import Expander from '../Expander'
import InventoryItemAddForm from './InventoryItemAddForm'
import Wrapper from '../Wrapper'

const Inventory = () => {
  const [displayedItems, setDisplayedItems] = useState([])
  const [searchText, setSearchText] = useState('')
  const [selectedItemID, setSelectedItemID] = useState('')
  const [selectedElement, setSelectedElement] = useState()
  const [selectedLocationName, setSelectedLocationName] = useState('all')
  const [isAdding, setIsAdding] = useState(false)
  const [sortBy, setSortBy] = useState('expiration')
  const [sortOrder, setSortOrder] = useState('asc')

  const { data, loading } = useQuery(INVENTORY_ITEMS_QUERY)

  const toggleItemOpen = (event, id) => {
    setSelectedElement(event.target)

    if (selectedItemID === id) {
      setSelectedItemID('')
    } else {
      setSelectedItemID(id)
    }
  }

  useEffect(() => {
    if (data && data.inventoryItems) {
      let newDisplayedItems = data.inventoryItems.filter((item) => {
        if (selectedLocationName === 'all') {
          return true
        }
        if (
          selectedLocationName === 'perishable' &&
          item.location &&
          (item.location.name === 'fridge' ||
            item.location.name === 'leftovers' ||
            item.location.name === 'produce')
        ) {
          return true
        }
        return item.location && item.location.name === selectedLocationName
      })

      // Search
      if (searchText.length > 0) {
        newDisplayedItems = newDisplayedItems.filter((item) => {
          return item.item.name.includes(searchText)
        })
      }

      // Sort
      newDisplayedItems = newDisplayedItems.sort((a, b) => {
        if (sortBy === 'name') {
          if (a.item.name < b.item.name) {
            return -1
          }
          if (a.item.name > b.item.name) {
            return 1
          }
          return 0
        }

        if (sortBy === 'location') {
          if (a.location.name < b.location.name) {
            return -1
          }
          if (a.location.name > b.location.name) {
            return 1
          }
          return 0
        }

        if (sortBy === 'expiration') {
          if (!a.expiration) {
            return -1
          }
          if (!b.expiration) {
            return 1
          }
          if (Number(a.expiration) < Number(b.expiration)) {
            return -1
          }
          if (Number(a.expiration) > Number(b.expiration)) {
            return 1
          }
          return 0
        }
        return 0
      })

      if (sortOrder === 'desc') {
        newDisplayedItems.reverse()
      }

      setDisplayedItems(newDisplayedItems)
    }
  }, [data, searchText, selectedLocationName, sortBy, sortOrder])

  useEffect(() => {
    if (selectedElement)
      window.scrollTo({
        top: selectedElement.offsetTop - 100,
        behavior: 'smooth',
      })
  }, [selectedElement])

  const setSort = (newSortBy) => {
    let newSortOrder
    if (newSortBy === sortBy) {
      newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc'
    } else {
      newSortOrder = 'asc'
    }

    setSortBy(newSortBy)
    setSortOrder(newSortOrder)
  }

  return (
    <Layout.Container>
      <Sidebar>
        <InventoryLocations
          selectedLocationName={selectedLocationName}
          setSelectedLocationName={setSelectedLocationName}
        />
      </Sidebar>

      <Layout.List>
        {loading && <p>Loading...</p>}

        <>
          {data && data.inventoryItems && (
            <Styled.TopBar>
              <Search searchText={searchText} setSearchText={setSearchText} />

              <Styled.AddButton
                open={isAdding}
                onClick={() => setIsAdding(!isAdding)}
              >
                <div>+</div>
              </Styled.AddButton>
            </Styled.TopBar>
          )}

          {isAdding && (
            <Wrapper>
              <InventoryItemAddForm setIsAdding={setIsAdding} />
            </Wrapper>
          )}

          <SortingHeader>
            <div style={{ flex: '3' }}>
              <button type="button" onClick={() => setSort('name')}>
                Name
              </button>
            </div>
            <div style={{ flex: '2' }}>
              <button
                style={{ paddingLeft: '0' }}
                type="button"
                onClick={() => setSort('location')}
              >
                Location
              </button>
            </div>
            <div style={{ flex: '1', textAlign: 'right' }}>
              <button type="button" onClick={() => setSort('expiration')}>
                Expiration
              </button>
            </div>
          </SortingHeader>

          {displayedItems.map((item) => (
            <ListItem
              key={item.id}
              onClick={(e) => toggleItemOpen(e, item.id)}
              expander={
                selectedItemID === item.id && (
                  <Expander>
                    <InventoryItemDetails inventoryItem={item} />
                  </Expander>
                )
              }
            >
              <Styled.Name>{item.item.name}</Styled.Name>
              <Styled.Location>{item.location.name}</Styled.Location>
              <Styled.Expiration>
                {moment(Number(item.expiration)).fromNow()}
              </Styled.Expiration>
            </ListItem>
          ))}
        </>
      </Layout.List>
    </Layout.Container>
  )
}

const INVENTORY_ITEMS_QUERY = gql`
  query inventoryItems {
    inventoryItems {
      id
      item {
        id
        name
        dishes {
          id
          name
        }
        itemType
        category {
          id
          name
        }
      }
      location {
        id
        name
      }
      expiration
      addDate
      amount
    }
  }
`

export default Inventory
