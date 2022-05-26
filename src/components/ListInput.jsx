import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'

import * as Styled from './ListInput.styles'

const ListInput = ({ listItems, dataList, setListItems }) => {
  const [inputText, setInputText] = useState('')

  const addItem = () => {
    if (listItems.includes(inputText)) return

    if (inputText.length > 0) {
      setListItems([...listItems, inputText])
    }
    setInputText('')
  }

  const deleteItem = (itemToDelete) => {
    const newItems = [...listItems].filter((item) => item !== itemToDelete)
    setListItems(newItems)
  }

  return (
    <Styled.Wrapper>
      {listItems.length > 0 && (
        <ul>
          {listItems.map((item) => (
            <Styled.ListItem key={item}>
              {item}

              <button type="button" onClick={() => deleteItem(item)}>
                <FontAwesomeIcon icon={faTimesCircle} size="lg" />
              </button>
            </Styled.ListItem>
          ))}
        </ul>
      )}

      <Styled.ItemInput
        id="listItemText"
        value={inputText}
        list={dataList}
        onChange={(event) => setInputText(event.target.value)}
        onBlur={addItem}
      />
    </Styled.Wrapper>
  )
}

ListInput.propTypes = {
  listItems: PropTypes.arrayOf(PropTypes.string).isRequired,
  dataList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  setListItems: PropTypes.func.isRequired,
}

export default ListInput
