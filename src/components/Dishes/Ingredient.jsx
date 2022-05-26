import React from 'react'
import PropTypes from 'prop-types'

import * as Styled from './Ingredient.styles'

const Ingredient = ({ ingredient, indented, notLast, isInInventory }) => {
  return (
    <Styled.Name
      to={`/item/${ingredient.item.id}`}
      indented={indented ? indented.toString() : undefined}
      isininventory={isInInventory ? isInInventory.toString() : undefined}
    >{`${ingredient.item.name}${notLast ? ' /' : ''}`}</Styled.Name>
  )
}

Ingredient.propTypes = {
  ingredient: PropTypes.shape({
    item: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  indented: PropTypes.bool.isRequired,
  notLast: PropTypes.bool.isRequired,
}

export default Ingredient
