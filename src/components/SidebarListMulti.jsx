import React from 'react'
import PropTypes from 'prop-types'

import * as Styled from './SidebarList.styles'

const SidebarListMulti = ({ items, selectedNames, setSelectedNames }) => {
  const toggleName = (name) => {
    let tempNames = [...selectedNames]
    if (name === 'all') {
      tempNames = ['all']
    } else {
      if (tempNames.includes('all')) tempNames.splice(tempNames.indexOf('all'))
      if (tempNames.includes(name)) {
        tempNames.splice(tempNames.indexOf(name), 1)
      } else {
        tempNames.push(name)
      }
    }
    setSelectedNames(tempNames)
  }

  return (
    <Styled.List>
      {items.map((item) => (
        <li
          key={item.id}
          className={selectedNames.includes(item.name) ? 'selected' : null}
        >
          <button type="button" onClick={() => toggleName(item.name)}>
            {item.name}
          </button>
        </li>
      ))}
    </Styled.List>
  )
}

SidebarListMulti.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  selectedNames: PropTypes.arrayOf(PropTypes.string).isRequired,
  setSelectedNames: PropTypes.func.isRequired,
}

export default SidebarListMulti
