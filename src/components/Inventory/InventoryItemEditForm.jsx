import React, { useState } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { useMutation, gql } from '@apollo/client'

import InventoryItemForm from './InventoryItemForm'
import { getExpirationFromNow, millisecondsToPgDate } from '../../utils'

const InventoryItemEditForm = ({ inventoryItem, setIsEditing }) => {
  const [isSaveComplete, setIsSaveComplete] = useState(false)

  const [updateInventoryItem] = useMutation(UPDATE_INVENTORY_ITEM_MUTATION, {
    onCompleted: () => {
      setIsEditing(false)
      setIsSaveComplete(true)
    },
    refetchQueries: [{ query: LOCATIONS_QUERY }, { query: CATEGORIES_QUERY }],
  })

  const handleSave = (
    event,
    { location, category, addDate, daysLeft, amount, itemType }
  ) => {
    event.preventDefault()

    updateInventoryItem({
      variables: {
        id: inventoryItem.id,
        location: location || null,
        category: category || null,
        addDate: addDate || null,
        expiration:
          addDate && daysLeft
            ? millisecondsToPgDate(getExpirationFromNow(daysLeft))
            : null,
        amount: amount || null,
        itemType,
      },
    })
  }

  const handleCancel = () => {
    setIsEditing(false)
  }

  return (
    <InventoryItemForm
      addDate={
        inventoryItem.addDate
          ? moment(inventoryItem.addDate).format('YYYY-MM-DD')
          : ''
      }
      location={inventoryItem.location ? inventoryItem.location.name : ''}
      category={
        inventoryItem.item.category ? inventoryItem.item.category.name : ''
      }
      daysLeft={
        inventoryItem.expiration
          ? moment(inventoryItem.expiration)
              .diff(moment(), 'days')
              .toString()
          : ''
      }
      amount={inventoryItem.amount || ''}
      itemType={inventoryItem.item.itemType}
      handleSave={handleSave}
      handleCancel={handleCancel}
      isSaveComplete={isSaveComplete}
      setIsSaveComplete={setIsSaveComplete}
      isEdit
      isBaseItem={inventoryItem.item.itemType === 'baseItem'}
    />
  )
}

const UPDATE_INVENTORY_ITEM_MUTATION = gql`
  mutation updateInventoryItem(
    $id: ID!
    $addDate: String
    $expiration: String
    $amount: String
    $location: String
    $category: String
    $itemType: String
  ) {
    updateInventoryItem(
      id: $id
      addDate: $addDate
      expiration: $expiration
      amount: $amount
      location: $location
      category: $category
      itemType: $itemType
    ) {
      id
      addDate
      expiration
      amount
      item {
        id
        name
        itemType
        category {
          id
          name
        }
      }
      location {
        id
        name
      }
    }
  }
`

const CATEGORIES_QUERY = gql`
  query itemCategories {
    itemCategories {
      id
      name
    }
  }
`

const LOCATIONS_QUERY = gql`
  query itemLocations {
    itemLocations {
      id
      name
    }
  }
`

InventoryItemEditForm.propTypes = {
  inventoryItem: PropTypes.shape({
    id: PropTypes.string.isRequired,
    addDate: PropTypes.string,
    expiration: PropTypes.string,
    amount: PropTypes.string,
    location: PropTypes.shape({
      name: PropTypes.string,
    }),
    item: PropTypes.shape({
      category: PropTypes.shape({
        name: PropTypes.string,
      }),
      itemType: PropTypes.string.isRequired,
    }),
  }).isRequired,
  setIsEditing: PropTypes.func.isRequired,
}

export default InventoryItemEditForm
