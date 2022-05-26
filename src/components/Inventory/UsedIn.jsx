import React, { useState } from 'react'
import PropTypes from 'prop-types'

import * as Styled from './UsedIn.styles'
import DetailListItem from './DetailListItem'

const UsedIn = ({ dishes }) => {
  const [expanded, setExpanded] = useState(false)

  const itemsToShow = 5

  const displayItem = (dish) => {
    return <DetailListItem key={dish.id} name={dish.name} />
  }

  return (
    <Styled.UsedIn>
      <h3>USED IN:</h3>
      {expanded
        ? dishes.map((dish) => displayItem(dish))
        : dishes.slice(0, itemsToShow).map((dish) => displayItem(dish))}
      {dishes.length > itemsToShow && (
        <button type="button" onClick={() => setExpanded(!expanded)}>
          {expanded ? 'Show less' : 'Show more'}
        </button>
      )}
    </Styled.UsedIn>
  )
}

UsedIn.propTypes = {
  dishes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
}

export default UsedIn
