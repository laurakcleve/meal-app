import React, { useState } from 'react'
import { gql, useMutation } from '@apollo/client'

import * as Styled from './PurchaseItemDetails.styles'
import PurchaseItemEditForm from './PurchaseItemEditForm'

const PurchaseItemDetails = ({ purchaseId, purchaseItem }) => {
  const [isEditing, setIsEditing] = useState(false)

  const [deletePurchaseItem] = useMutation(DELETE_PURCHASE_ITEM_MUTATION, {
    onCompleted: () => setIsEditing(false),
    update: (cache, { data: { deletePurchaseItem } }) => {
      const data = cache.readQuery({
        query: PURCHASE_QUERY,
        variables: { id: purchaseId },
      })

      const updatedPurchase = { ...data.purchase }
      const updatedPurchaseItems = [...updatedPurchase.items]
      const indexToDelete = updatedPurchaseItems.findIndex(
        (i) => i.id === deletePurchaseItem
      )
      updatedPurchaseItems.splice(indexToDelete, 1)

      updatedPurchase.items = [...updatedPurchaseItems]

      cache.writeQuery({
        query: PURCHASE_QUERY,
        variables: { id: purchaseId },
        data: { purchase: updatedPurchase },
      })
    },
  })

  const handleDelete = () => {
    deletePurchaseItem({
      variables: {
        id: purchaseItem.id,
      },
    })
  }

  return (
    <Styled.Container>
      {isEditing && (
        <PurchaseItemEditForm
          id={purchaseItem.id}
          name={purchaseItem.item.name}
          weightAmount={
            purchaseItem.weightAmount
              ? purchaseItem.weightAmount.toString()
              : ''
          }
          weightUnit={purchaseItem.weightUnit || ''}
          quantityAmount={
            purchaseItem.quantityAmount
              ? purchaseItem.quantityAmount.toString()
              : ''
          }
          quantityUnit={purchaseItem.quantityUnit || ''}
          price={purchaseItem.price.toString()}
          setIsEditing={setIsEditing}
        />
      )}

      <button type="button" onClick={handleDelete}>
        Delete
      </button>
      {!isEditing && (
        <button type="button" onClick={() => setIsEditing(true)}>
          Edit
        </button>
      )}
    </Styled.Container>
  )
}

const DELETE_PURCHASE_ITEM_MUTATION = gql`
  mutation deletePurchaseItem($id: ID!) {
    deletePurchaseItem(id: $id)
  }
`

const PURCHASE_QUERY = gql`
  query purchase($id: ID!) {
    purchase(id: $id) {
      id
      date
      location {
        id
        name
      }
      items {
        id
        item {
          id
          name
        }
        price
        weightAmount
        weightUnit
        quantityAmount
        quantityUnit
      }
    }
  }
`

export default PurchaseItemDetails
