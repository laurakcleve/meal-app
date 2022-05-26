import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { useQuery, gql } from '@apollo/client'
import cloneDeep from 'lodash.clonedeep'

import * as Styled from './DishForm.styles'
import ListInput from '../ListInput'

const DishForm = ({
  dishName,
  dishTags,
  isActiveDish,
  dishIngredientSets,
  handleSave,
  handleCancel,
  isSaveComplete,
  setIsSaveComplete,
}) => {
  const { data: dishTagsData } = useQuery(DISH_TAGS_QUERY)
  const { data: itemsData } = useQuery(ITEMS_QUERY)

  const [name, setName] = useState(dishName)
  const [tags, setTags] = useState(dishTags)
  const [isActive, setIsActive] = useState(isActiveDish)
  const [ingredientSets, setIngredientSets] = useState(dishIngredientSets)

  const resetFields = () => {
    setName('')
    setTags([])
    setIngredientSets(initialIngredientSets)
  }

  useEffect(() => {
    if (isSaveComplete) {
      resetFields()
      setIsSaveComplete(false)
    }
  }, [isSaveComplete, setIsSaveComplete])

  const initialIngredientSets = [
    {
      id: Date.now(),
      isOptional: false,
      ingredients: [
        {
          id: Date.now(),
          item: {
            name: '',
          },
        },
      ],
    },
  ]

  const setIngredientText = (
    ingredientSetIndex,
    ingredientIndex,
    ingredientText
  ) => {
    const newIngredientSets = cloneDeep(ingredientSets)
    newIngredientSets[ingredientSetIndex].ingredients[
      ingredientIndex
    ].item.name = ingredientText
    setIngredientSets(newIngredientSets)
  }

  const addSubstitute = (ingredientSetIndex) => {
    const newIngredientSets = cloneDeep(ingredientSets)
    newIngredientSets[ingredientSetIndex].ingredients.push({
      id: Date.now(),
      item: {
        name: '',
      },
    })
    setIngredientSets(newIngredientSets)
  }

  const deleteIngredient = (ingredientSetIndex, ingredientIndex) => {
    const newIngredientSets = cloneDeep(ingredientSets)

    if (newIngredientSets[ingredientSetIndex].ingredients.length > 1) {
      newIngredientSets[ingredientSetIndex].ingredients.splice(
        ingredientIndex,
        1
      )
    } else if (newIngredientSets.length > 1) {
      newIngredientSets.splice(ingredientSetIndex, 1)
    }

    setIngredientSets(newIngredientSets)
  }

  const handleOptionalCheck = (ingredientSetIndex) => {
    const newIngredientSets = cloneDeep(ingredientSets)
    const oldOptionalValue = newIngredientSets[ingredientSetIndex].isOptional
    newIngredientSets[ingredientSetIndex].isOptional = !oldOptionalValue
    setIngredientSets(newIngredientSets)
  }

  return (
    <Styled.DishForm>
      <Styled.Name
        id="name"
        label="Name"
        value={name}
        onChange={(event) => setName(event.target.value)}
      ></Styled.Name>

      <div className="row">
        <Styled.Tags>
          <div className="label">Tags</div>

          <ListInput
            listItems={tags}
            dataList={
              dishTagsData && dishTagsData.dishTags
                ? dishTagsData.dishTags.filter(
                    (tag) => !tags.includes(tag.name)
                  )
                : []
            }
            setListItems={setTags}
          />
        </Styled.Tags>

        <Styled.Active>
          <Styled.Checkbox htmlFor="active" className="checkbox">
            <input
              id="active"
              type="checkbox"
              checked={isActive}
              onChange={() => setIsActive(!isActive)}
            />
            <div className="labelText">Active rotation</div>
          </Styled.Checkbox>
        </Styled.Active>
      </div>

      <Styled.Ingredients>
        <div className="label">Ingredients</div>
        {ingredientSets.map((ingredientSet, ingredientSetIndex) => (
          <Styled.IngredientSet key={ingredientSet.id}>
            <div className="inputs">
              {ingredientSet.ingredients.map((ingredient, ingredientIndex) => (
                <Styled.IngredientInputWrapper key={ingredient.id}>
                  <Styled.IngredientInput
                    id={`ingredient${ingredientSet.id}-${ingredientIndex}`}
                    type="text"
                    value={ingredient.item.name}
                    list="itemList"
                    onChange={(event) =>
                      setIngredientText(
                        ingredientSetIndex,
                        ingredientIndex,
                        event.target.value
                      )
                    }
                  />

                  {(ingredientSet.ingredients.length > 1 ||
                    ingredientSets.length > 1) && (
                    <button
                      type="button"
                      onClick={() =>
                        deleteIngredient(ingredientSetIndex, ingredientIndex)
                      }
                    >
                      <FontAwesomeIcon icon={faTimesCircle} size="lg" />
                    </button>
                  )}
                </Styled.IngredientInputWrapper>
              ))}

              <Styled.Checkbox
                htmlFor={`isOptional${ingredientSet.id}`}
                className="checkbox"
              >
                <input
                  id={`isOptional${ingredientSet.id}`}
                  type="checkbox"
                  checked={ingredientSets[ingredientSetIndex].isOptional}
                  onChange={() => handleOptionalCheck(ingredientSetIndex)}
                />
                <div className="labelText">Optional</div>
              </Styled.Checkbox>
            </div>

            <Styled.AddSubstitute>
              <button
                type="button"
                onClick={() => addSubstitute(ingredientSetIndex)}
              >
                Add substitute
              </button>
            </Styled.AddSubstitute>
          </Styled.IngredientSet>
        ))}

        <button
          type="button"
          onClick={() =>
            setIngredientSets([...ingredientSets, initialIngredientSets[0]])
          }
        >
          Add ingredient
        </button>

        {/* TODO: Input component does this for a list, just pass it */}
        {itemsData && itemsData.items && (
          <datalist id="itemList">
            {itemsData.items.map((item) => (
              <option key={item.id}>{item.name}</option>
            ))}
          </datalist>
        )}
      </Styled.Ingredients>

      <Styled.ButtonsWrapper>
        <button
          type="button"
          onClick={() => {
            resetFields()
            handleCancel()
          }}
        >
          Cancel
        </button>

        <button
          type="button"
          onClick={(event) =>
            handleSave(event, {
              name,
              tags,
              isActive,
              ingredientSets,
            })
          }
        >
          Save
        </button>
      </Styled.ButtonsWrapper>
    </Styled.DishForm>
  )
}

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

DishForm.defaultProps = {
  dishName: '',
  dishTags: [],
  isActiveDish: true,
  dishIngredientSets: [
    {
      id: Date.now(),
      isOptional: false,
      ingredients: [
        {
          id: Date.now(),
          item: {
            name: '',
          },
        },
      ],
    },
  ],
}

DishForm.propTypes = {
  dishName: PropTypes.string,
  dishTags: PropTypes.arrayOf(PropTypes.string),
  isActiveDish: PropTypes.bool,
  dishIngredientSets: PropTypes.arrayOf(PropTypes.shape({})),
  handleSave: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
  isSaveComplete: PropTypes.bool.isRequired,
  setIsSaveComplete: PropTypes.func.isRequired,
}

export default DishForm
