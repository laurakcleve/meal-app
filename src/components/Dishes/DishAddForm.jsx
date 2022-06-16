import React, { useState } from 'react'
import { useMutation, gql } from '@apollo/client'

import * as Styled from './DishAddForm.styles'
import DishForm from './DishForm'

const DishAddForm = ({ setIsAdding }) => {
  const [isSaveComplete, setIsSaveComplete] = useState(false)

  const [addDish] = useMutation(ADD_DISH_MUTATION, {
    onCompleted: () => {
      setIsSaveComplete(true)
      setIsAdding(false)
    },
    update: (cache, { data: { addDish } }) => {
      const data = cache.readQuery({ query: DISHES_QUERY })
      cache.writeQuery({
        query: DISHES_QUERY,
        data: { dishes: [addDish, ...data.dishes] },
      })
    },
    refetchQueries: [{ query: DISH_TAGS_QUERY }, { query: ITEMS_QUERY }],
  })

  const handleSave = (event, { name, tags, isActive, ingredientSets }) => {
    event.preventDefault()
    addDish({
      variables: {
        name,
        tags,
        isActive,
        ingredientSets,
      },
    })
  }

  const handleCancel = () => {
    setIsAdding(false)
  }

  return (
    <Styled.Wrapper>
      <h3>New Dish</h3>
      <DishForm
        handleSave={handleSave}
        handleCancel={handleCancel}
        isSaveComplete={isSaveComplete}
        setIsSaveComplete={setIsSaveComplete}
      />
    </Styled.Wrapper>
  )
}

const ADD_DISH_MUTATION = gql`
  mutation addDish(
    $name: String!
    $tags: [String]
    $isActive: Boolean!
    $ingredientSets: [IngredientSetInput]!
  ) {
    addDish(
      name: $name
      tags: $tags
      isActive: $isActive
      ingredientSets: $ingredientSets
    ) {
      id
      name
      isActiveDish
      dates {
        id
        date
      }
      ingredientSets {
        id
        isOptional
        ingredients {
          id
          item {
            id
            name
          }
        }
      }
      tags {
        id
        name
      }
    }
  }
`

const DISHES_QUERY = gql`
  query dishes {
    dishes {
      id
      name
      tags {
        id
        name
      }
      isActiveDish
      ingredientSets {
        id
        isOptional
        ingredients {
          id
          item {
            id
            name
          }
        }
      }
    }
  }
`

const DISH_TAGS_QUERY = gql`
  query dishTags {
    dishTags {
      id
      name
    }
  }
`

const ITEMS_QUERY = gql`
  query items {
    items {
      id
      name
    }
  }
`

export default DishAddForm
