import React, { useState } from 'react'
import { gql, useQuery, useMutation } from '@apollo/client'

import Input from '../Input'
import * as Styled from './PurchaseItemEditForm.styles'

const PurchaseItemEditForm = ({
  id,
  name: initialName,
  weightAmount: initialWeightAmount,
  weightUnit: initialWeightUnit,
  quantityAmount: initialQuantityAmount,
  quantityUnit: initialQuantityUnit,
  price: initialPrice,
  setIsEditing,
}) => {
  const [name, setName] = useState(initialName)
  const [weightAmount, setWeightAmount] = useState(initialWeightAmount)
  const [weightUnit, setWeightUnit] = useState(initialWeightUnit)
  const [quantityAmount, setQuantityAmount] = useState(initialQuantityAmount)
  const [quantityUnit, setQuantityUnit] = useState(initialQuantityUnit)
  const [price, setPrice] = useState(initialPrice)

  const { data: itemsData } = useQuery(ITEMS_QUERY)

  const [updatePurchaseItem] = useMutation(UPDATE_PURCHASE_ITEM_MUTATION, {
    onCompleted: () => setIsEditing(false),
  })

  const handleSave = (event) => {
    event.preventDefault()
    updatePurchaseItem({
      variables: {
        id,
        name,
        price: Number(price) || null,
        weightAmount: Number(weightAmount) || null,
        weightUnit: weightUnit || null,
        quantityAmount: Number(quantityAmount) || null,
        quantityUnit: quantityUnit || null,
      },
    })
  }

  return (
    <Styled.EditForm>
      <Input
        id="name"
        label="Name"
        value={name}
        onChange={(event) => setName(event.target.value)}
        list={itemsData && itemsData.items ? itemsData.items : []}
      />

      <Styled.Combo>
        <Styled.Label>Weight</Styled.Label>
        <Styled.Amount
          className="input"
          id="weightAmount"
          value={weightAmount}
          onChange={(event) => setWeightAmount(event.target.value)}
          placeholder="1.23"
        />
        <Styled.Unit
          className="input"
          id="weightUnit"
          value={weightUnit}
          onChange={(event) => setWeightUnit(event.target.value)}
          placeholder="oz"
        />
      </Styled.Combo>

      <Styled.Combo>
        <Styled.Label>Quantity</Styled.Label>
        <Styled.Amount
          className="input"
          id="quantityAmount"
          value={quantityAmount}
          onChange={(event) => setQuantityAmount(event.target.value)}
          placeholder="12"
        />
        <Styled.Unit
          className="input"
          id="quantityUnit"
          value={quantityUnit}
          onChange={(event) => setQuantityUnit(event.target.value)}
          placeholder="units"
        />
      </Styled.Combo>

      <Styled.Price
        id="price"
        label="Price"
        value={price}
        onChange={(event) => setPrice(event.target.value)}
      />

      <Styled.Actions>
        <button
          type="button"
          className="cancel"
          onClick={() => setIsEditing(false)}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="save"
          onClick={(event) => handleSave(event)}
        >
          Save
        </button>
      </Styled.Actions>
    </Styled.EditForm>
  )
}

const ITEMS_QUERY = gql`
  query items {
    items {
      id
      name
    }
  }
`

const UPDATE_PURCHASE_ITEM_MUTATION = gql`
  mutation updatePurchaseItem(
    $id: ID!
    $name: String!
    $price: Float
    $weightAmount: Float
    $weightUnit: String
    $quantityAmount: Float
    $quantityUnit: String
  ) {
    updatePurchaseItem(
      id: $id
      name: $name
      price: $price
      weightAmount: $weightAmount
      weightUnit: $weightUnit
      quantityAmount: $quantityAmount
      quantityUnit: $quantityUnit
    ) {
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
`

export default PurchaseItemEditForm
