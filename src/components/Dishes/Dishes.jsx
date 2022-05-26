import React, { useState, useEffect } from 'react'
import { useQuery, gql } from '@apollo/client'

import * as Layout from '../Layout.styles'
import * as Styled from './Dishes.styles'
import Sidebar from '../Sidebar'
import Search from '../Search'
import ListItem from '../ListItem'
import DishDetails from './DishDetails'
import DishTags from './DishTags'
import Expander from '../Expander'
import { formatDate } from '../../utils'
import SortingHeader from '../SortingHeader'
import DishAddForm from './DishAddForm'
import Wrapper from '../Wrapper'

const Dishes = () => {
  const [displayedDishes, setDisplayedDishes] = useState([])
  const [selectedItemID, setSelectedItemID] = useState('')
  const [selectedElement, setSelectedElement] = useState()
  const [selectedTagNames, setSelectedTagNames] = useState(['all'])
  const [match, setMatch] = useState('all')
  const [isActiveRotation, setIsActiveRotation] = useState(false)
  const [haveIngredients, setHaveIngredients] = useState(false)
  const [searchText, setSearchText] = useState('')
  const [sortBy, setSortBy] = useState('lastDate')
  const [sortOrder, setSortOrder] = useState('asc')
  const [isAdding, setIsAdding] = useState(false)

  const { data, loading } = useQuery(DISHES_QUERY)

  const toggleItemOpen = (event, id) => {
    setSelectedElement(event.target)

    if (selectedItemID === id) {
      setSelectedItemID('')
    } else {
      setSelectedItemID(id)
    }
  }

  const matchesFilters = (dish) => {
    return (
      matchesActive(dish) && matchesHaveIngredients(dish) && matchesTags(dish)
    )
  }

  const matchesActive = (dish) => {
    return (isActiveRotation && dish.isActiveDish) || !isActiveRotation
  }

  const matchesHaveIngredients = (dish) => {
    const hasAvailableIngredient = (ingredientSet) => {
      return ingredientSet.ingredients.find(
        (ingredient) => ingredient.isInInventory === true
      )
    }

    return (
      (haveIngredients && dish.ingredientSets.every(hasAvailableIngredient)) ||
      !haveIngredients
    )
  }

  const matchesTags = (dish) => {
    if (selectedTagNames.includes('all')) {
      return true
    }
    if (match === 'all') {
      return selectedTagNames.every((tagName) =>
        dish.tags.map((tag) => tag.name).includes(tagName)
      )
    }
    if (match === 'any') {
      return dish.tags
        .map((tag) => tag.name)
        .some((tagName) => selectedTagNames.includes(tagName))
    }
    return false
  }

  useEffect(() => {
    if (selectedElement)
      window.scrollTo({
        top: selectedElement.offsetTop - 100,
        behavior: 'smooth',
      })
  }, [selectedElement])

  useEffect(() => {
    if (data && data.dishes) {
      let newDisplayedDishes = [...data.dishes]

      // Search
      if (searchText.length > 0)
        newDisplayedDishes = newDisplayedDishes.filter((dish) => {
          return dish.name.includes(searchText)
        })

      // Sort
      newDisplayedDishes = newDisplayedDishes.sort((a, b) => {
        if (sortBy === 'name') {
          if (a.name < b.name) {
            return -1
          }
          if (a.name > b.name) {
            return 1
          }
          return 0
        }
        if (sortBy === 'lastDate') {
          if (a.dates.length <= 0) {
            return -1
          }
          if (b.dates.length <= 0) {
            return 1
          }
          if (Number(a.dates[0].date) < Number(b.dates[0].date)) {
            return -1
          }
          if (Number(a.dates[0].date) > Number(b.dates[0].date)) {
            return 1
          }
          return 0
        }
        return 0
      })

      if (sortOrder === 'desc') {
        newDisplayedDishes.reverse()
      }

      setDisplayedDishes(newDisplayedDishes)
    }
  }, [
    data,
    searchText,
    searchText.length,
    sortBy,
    sortOrder,
    displayedDishes.length,
  ])

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
        <Styled.CheckboxLabel htmlFor="isActiveRotation" className="checkbox">
          <input
            id="isActiveRotation"
            type="checkbox"
            checked={isActiveRotation}
            onChange={() => setIsActiveRotation(!isActiveRotation)}
          />
          <div className="labelText">Active rotation</div>
        </Styled.CheckboxLabel>

        <Styled.CheckboxLabel htmlFor="haveIngredients" className="checkbox">
          <input
            id="haveIngredients"
            type="checkbox"
            checked={haveIngredients}
            onChange={() => setHaveIngredients(!haveIngredients)}
          />
          <div className="labelText">Have ingredients</div>
        </Styled.CheckboxLabel>

        <DishTags
          selectedTagNames={selectedTagNames}
          setSelectedTagNames={setSelectedTagNames}
          match={match}
          setMatch={setMatch}
        />
      </Sidebar>

      <Layout.List>
        {loading && <p>Loading...</p>}

        <>
          <Styled.TopBar>
            <Search setSearchText={setSearchText} searchText={searchText} />

            <Styled.AddButton
              open={isAdding}
              onClick={() => setIsAdding(!isAdding)}
            >
              <div>+</div>
            </Styled.AddButton>
          </Styled.TopBar>
          {isAdding && (
            <Wrapper>
              <DishAddForm setIsAdding={setIsAdding} />
            </Wrapper>
          )}
          {data && data.dishes && (
            <>
              <SortingHeader>
                <div style={{ flex: '5' }}>
                  <button type="button" onClick={() => setSort('name')}>
                    Name
                  </button>
                </div>
                <div style={{ flex: '1', textAlign: 'right' }}>
                  <button type="button" onClick={() => setSort('lastDate')}>
                    Last date
                  </button>
                </div>
              </SortingHeader>
            </>
          )}

          {displayedDishes.map(
            (dish) =>
              matchesFilters(dish) && (
                <ListItem
                  key={dish.id}
                  onClick={(event) => toggleItemOpen(event, dish.id)}
                  expander={
                    selectedItemID === dish.id && (
                      <Expander>
                        <DishDetails dish={dish} />
                      </Expander>
                    )
                  }
                >
                  <Styled.Name>{dish.name}</Styled.Name>

                  <Styled.Active>{dish.isActiveDish && 'Active'}</Styled.Active>

                  <Styled.Date>
                    {dish.dates.length > 0 && formatDate(dish.dates[0].date)}
                  </Styled.Date>
                </ListItem>
              )
          )}
        </>
      </Layout.List>
    </Layout.Container>
  )
}

const DISHES_QUERY = gql`
  query dishes {
    dishes {
      id
      name
      isActiveDish
      tags {
        id
        name
      }
      dates {
        id
        date
      }
      ingredientSets {
        id
        isOptional
        ingredients {
          id
          isInInventory
          item {
            id
            name
          }
        }
      }
    }
  }
`

export default Dishes
