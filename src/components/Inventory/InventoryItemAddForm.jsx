import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useMutation, gql } from '@apollo/client'
import moment from 'moment'

import InventoryItemForm from './InventoryItemForm'
import * as Styled from './InventoryItemAddForm.styles'
import { getExpirationFromAddDate, millisecondsToPgFormat } from '../../utils'

const InventoryItemAddForm = ({ setIsAdding }) => {
  const [isSaveComplete, setIsSaveComplete] = useState(false)

  const [addInventoryItem] = useMutation(ADD_INVENTORY_ITEM_MUTATION, {
    onCompleted: () => {
      setIsSaveComplete(true)
    },
    update: (cache, { data: { addInventoryItem } }) => {
      const data = cache.readQuery({ query: INVENTORY_ITEMS_QUERY })
      cache.writeQuery({
        query: INVENTORY_ITEMS_QUERY,
        data: { inventoryItems: [addInventoryItem, ...data.inventoryItems] },
      })
    },
  })

  const handleSave = (
    event,
    { name, location, category, addDate, daysLeft, amount, number, itemType }
  ) => {
    event.preventDefault()
    addInventoryItem({
      variables: {
        name,
        addDate: addDate || null,
        expiration:
          addDate && daysLeft
            ? millisecondsToPgFormat(
                getExpirationFromAddDate(moment(addDate).valueOf(), daysLeft)
              )
            : null,
        amount: amount || null,
        defaultShelflife: daysLeft || null,
        category: category || null,
        location: location || null,
        number: Number(number),
        itemType,
      },
    })
  }

  const handleCancel = () => {
    setIsAdding(false)
  }

  return (
    <Styled.Wrapper>
      <h3>Add to inventory</h3>
      <InventoryItemForm
        handleSave={handleSave}
        handleCancel={handleCancel}
        isSaveComplete={isSaveComplete}
        setIsSaveComplete={setIsSaveComplete}
      />
    </Styled.Wrapper>
  )
}

const ADD_INVENTORY_ITEM_MUTATION = gql`
  mutation addInventoryItem(
    $name: String!
    $addDate: String
    $expiration: String
    $amount: String
    $defaultShelflife: String
    $category: String
    $location: String
    $itemType: String!
    $number: Int!
  ) {
    addInventoryItem(
      name: $name
      addDate: $addDate
      expiration: $expiration
      amount: $amount
      defaultShelflife: $defaultShelflife
      category: $category
      location: $location
      itemType: $itemType
      number: $number
    ) {
      id
    }
  }
`

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
InventoryItemAddForm.propTypes = {
  setIsAdding: PropTypes.func.isRequired,
}

export default InventoryItemAddForm
