import React, { useState } from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import { useMutation, gql } from '@apollo/client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

import * as Styled from './InventoryItemDetails.styles'
import { formatDate } from '../../utils'
import UsedIn from './UsedIn'
import InventoryItemEditForm from './InventoryItemEditForm'

const InventoryItemDetails = ({ inventoryItem }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [deleteInventoryItem] = useMutation(DELETE_INVENTORY_ITEM_MUTATION, {
    update: (cache, { data: { deleteInventoryItem } }) => {
      const data = cache.readQuery({ query: INVENTORY_ITEMS_QUERY })

      const updatedInventoryItems = [...data.inventoryItems]
      const indexToDelete = updatedInventoryItems.findIndex(
        (d) => d.id === deleteInventoryItem
      )
      updatedInventoryItems.splice(indexToDelete, 1)

      cache.writeQuery({
        query: INVENTORY_ITEMS_QUERY,
        data: { inventoryItems: [...updatedInventoryItems] },
      })
    },
  })

  const submitDelete = (event) => {
    event.preventDefault()
    deleteInventoryItem({ variables: { id: inventoryItem.id } })
  }

  return (
    <>
      {isEditing ? (
        <InventoryItemEditForm
          setIsEditing={setIsEditing}
          inventoryItem={inventoryItem}
        />
      ) : (
        <Styled.Container>
          <div className="column">
            {inventoryItem.addDate && (
              <Styled.AddDate>
                <h3>Added:</h3>
                <p>
                  {formatDate(inventoryItem.addDate)} (
                  {moment(Number(inventoryItem.addDate)).fromNow()})
                </p>
              </Styled.AddDate>
            )}

            {inventoryItem.amount && (
              <Styled.Amount>
                <h3>Amount:</h3>
                <p>{inventoryItem.amount}</p>
              </Styled.Amount>
            )}
          </div>

          <div className="column">
            {inventoryItem.item.dishes.length > 0 && (
              <Styled.UsedIn>
                {inventoryItem.item.dishes && (
                  <UsedIn dishes={inventoryItem.item.dishes} />
                )}
              </Styled.UsedIn>
            )}
          </div>
        </Styled.Container>
      )}

      <Styled.Actions>
        <button type="button">
          <Link to={`/item/${inventoryItem.item.id}`}>Item page</Link>

          <FontAwesomeIcon icon={faExternalLinkAlt} />
        </button>

        <button type="button" onClick={(event) => submitDelete(event)}>
          Delete
        </button>

        <button type="button" onClick={() => setIsEditing(true)}>
          Edit
        </button>
      </Styled.Actions>

    </>
  )
}

const DELETE_INVENTORY_ITEM_MUTATION = gql`
  mutation deleteInventoryItem($id: ID!) {
    deleteInventoryItem(id: $id)
  }
`

const INVENTORY_ITEMS_QUERY = gql`
  query inventoryItems {
    inventoryItems {
      id
      item {
        id
        name
        itemType
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

InventoryItemDetails.propTypes = {
  inventoryItem: PropTypes.shape({
    id: PropTypes.string.isRequired,
    addDate: PropTypes.string,
    amount: PropTypes.string,
    item: PropTypes.shape({
      id: PropTypes.string.isRequired,
      dishes: PropTypes.arrayOf(PropTypes.shape({})),
    }),
  }).isRequired,
}

export default InventoryItemDetails
