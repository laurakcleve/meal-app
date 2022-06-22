import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useMutation, gql } from '@apollo/client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'

import * as Styled from './DishDetails.styles'
import { pgDateToDisplayDate } from '../../utils'
import DishEditForm from './DishEditForm'
import Ingredient from './Ingredient'

const DishDetails = ({ dish }) => {
  const [datesExpanded, setDatesExpanded] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [newDateText, setNewDateText] = useState('')

  const [addDishDate] = useMutation(ADD_DISH_DATE_MUTATION, {
    onCompleted: () => setNewDateText(''),
    update: (cache, { data: { addDishDate } }) => {
      const data = cache.readQuery({ query: DISHES_QUERY })

      const updatedDish = { ...data.dishes.find((d) => d.id === dish.id) }
      updatedDish.dates = [...updatedDish.dates, addDishDate]
      updatedDish.dates.sort((a, b) => {
        if (a.date > b.date) return -1
        if (a.date < b.date) return 1
        return 0
      })

      const updatedDishes = [...data.dishes]
      const indexToDelete = updatedDishes.findIndex(
        (d) => d.id === updatedDish.id
      )
      updatedDishes.splice(indexToDelete, 1)

      cache.writeQuery({
        query: DISHES_QUERY,
        data: { dishes: [updatedDish, ...updatedDishes] },
      })
    },
  })

  const [deleteDishDate] = useMutation(DELETE_DISH_DATE_MUTATION, {
    update: (cache, { data: { deleteDishDate } }) => {
      const data = cache.readQuery({ query: DISHES_QUERY })

      const updatedDish = { ...data.dishes.find((d) => d.id === dish.id) }
      updatedDish.dates = updatedDish.dates.filter(
        (date) => date.id !== deleteDishDate
      )

      const updatedDishes = [...data.dishes]
      const indexToDelete = updatedDishes.findIndex(
        (d) => d.id === updatedDish.id
      )
      updatedDishes.splice(indexToDelete, 1)

      cache.writeQuery({
        query: DISHES_QUERY,
        data: { dishes: [updatedDish, ...updatedDishes] },
      })
    },
  })

  const dateListItem = (date) => (
    <li key={date.id}>
      {pgDateToDisplayDate(date.date)}
      <button
        className="delete"
        type="button"
        onClick={() => deleteDate(date.id)}
      >
        <FontAwesomeIcon icon={faTimesCircle} size="lg" />
      </button>
    </li>
  )

  const saveNewDate = (event) => {
    event.preventDefault()
    addDishDate({
      variables: {
        dishId: dish.id,
        date: newDateText,
      },
    })
  }

  const deleteDate = (dateId) => {
    deleteDishDate({ variables: { id: dateId } })
  }

  return (
    <>
      <Styled.Container>
        {isEditing ? (
          <DishEditForm
            dishId={dish.id}
            dishName={dish.name}
            dishTags={dish.tags.map((tag) => tag.name)}
            isActiveDish={dish.isActiveDish}
            dishIngredientSets={dish.ingredientSets}
            setIsEditing={setIsEditing}
          />
        ) : (
          <>
            {dish.ingredientSets.length > 0 && (
              <Styled.Ingredients>
                <h3>Ingredients</h3>
                <ul>
                  {dish.ingredientSets.map((ingredientSet) => (
                    <li key={ingredientSet.id}>
                      {ingredientSet.ingredients.map((ingredient, index) => (
                        <Ingredient
                          key={ingredient.id}
                          ingredient={ingredient}
                          indented={index > 0}
                          notLast={index < ingredientSet.ingredients.length - 1}
                          isInInventory={ingredient.isInInventory}
                        />
                      ))}

                      {ingredientSet.isOptional ? '(optional)' : ''}
                    </li>
                  ))}
                </ul>
              </Styled.Ingredients>
            )}
            <Styled.Tags>
              {dish.tags.length > 0 && (
                <>
                  <h3>Tags</h3>
                  <ul>
                    {dish.tags.map((tag) => (
                      <li key={tag.id}>{tag.name}</li>
                    ))}
                  </ul>
                </>
              )}
            </Styled.Tags>

            <Styled.Dates>
              <>
                <Styled.DateForm>
                  <label htmlFor="newDateText">
                    Add a date
                    <input
                      id="newDateText"
                      type="date"
                      value={newDateText}
                      onChange={(event) => setNewDateText(event.target.value)}
                    />
                  </label>
                  <button type="submit" onClick={(event) => saveNewDate(event)}>
                    Save
                  </button>
                </Styled.DateForm>

                {dish.dates.length > 0 && (
                  <Styled.DateList>
                    <ul>
                      {!datesExpanded
                        ? dish.dates
                            .slice(0, 3)
                            .map((date) => dateListItem(date))
                        : dish.dates.map((date) => dateListItem(date))}
                    </ul>
                    {dish.dates.length > 3 && (
                      <button
                        type="button"
                        onClick={() => setDatesExpanded(!datesExpanded)}
                      >
                        {datesExpanded ? 'Hide' : 'Show more dates...'}
                      </button>
                    )}
                  </Styled.DateList>
                )}
              </>
            </Styled.Dates>
          </>
        )}
      </Styled.Container>

      {!isEditing && (
        <Styled.Actions>
          <button
            type="button"
            className="edit"
            onClick={() => setIsEditing(true)}
          >
            Edit
          </button>
        </Styled.Actions>
      )}
    </>
  )
}

const ADD_DISH_DATE_MUTATION = gql`
  mutation addDishDate($dishId: ID!, $date: String!) {
    addDishDate(dishId: $dishId, date: $date) {
      id
      date
    }
  }
`

const DELETE_DISH_DATE_MUTATION = gql`
  mutation deleteDishDate($id: ID!) {
    deleteDishDate(id: $id)
  }
`

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

DishDetails.propTypes = {
  dish: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
      })
    ),
    isActiveDish: PropTypes.bool.isRequired,
    ingredientSets: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        ingredients: PropTypes.arrayOf(
          PropTypes.shape({
            id: PropTypes.string.isRequired,
            item: PropTypes.shape({
              id: PropTypes.string.isRequired,
              name: PropTypes.string.isRequired,
            }),
          })
        ).isRequired,
      })
    ),
    dates: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      })
    ),
  }).isRequired,
}

export default DishDetails
