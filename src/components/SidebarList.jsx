import React from 'react'
import PropTypes from 'prop-types'

import * as Styled from './SidebarList.styles'

const SidebarList = ({ items, selectedName, setSelectedName }) => {
  return (
    <Styled.List>
      {items.map((item) => (
        <li
          key={item.id}
          className={item.name === selectedName ? 'selected' : null}
        >
          <button type="button" onClick={() => setSelectedName(item.name)}>
            {item.name}
          </button>
        </li>
      ))}
    </Styled.List>
  )
}

SidebarList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  selectedName: PropTypes.string.isRequired,
  setSelectedName: PropTypes.func.isRequired,
}

export default SidebarList
