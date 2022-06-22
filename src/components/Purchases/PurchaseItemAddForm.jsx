import React, { useEffect, useState, useRef } from 'react'
import { useQuery, useLazyQuery, useMutation, gql } from '@apollo/client'
import PropTypes from 'prop-types'

import * as Styled from './PurchaseItemAddForm.styles'
import {
  millisecondsToPgDate,
  getExpirationFromAddDate,
  inventoryAmountString,
} from '../../utils'

const PurchaseItemAddForm = ({ purchaseId }) => {
  const [itemName, setItemName] = useState('')
  const [weightAmount, setWeightAmount] = useState('')
  const [weightUnit, setWeightUnit] = useState('')
  const [quantityAmount, setQuantityAmount] = useState('')
  const [quantityUnit, setQuantityUnit] = useState('')
  const [price, setPrice] = useState('')
  const [number, setNumber] = useState('1')
  const [isNonFoodItem, setIsNonFoodItem] = useState(false)
  const [doNotInventory, setDoNotInventory] = useState(false)
  const [daysLeft, setDaysLeft] = useState('')
  const [category, setCategory] = useState('')
  const [location, setLocation] = useState('')

  const [isAddPurchaseItemDone, setIsAddPurchaseItemDone] = useState(false)
  const [isAddInventoryItemDone, setIsAddInventoryItemDone] = useState(false)

  const { data: itemsData } = useQuery(ITEMS_QUERY)
  const { data: purchaseData } = useQuery(PURCHASE_DATE_QUERY, {
    variables: { id: purchaseId },
  })
  const { data: categoriesData } = useQuery(CATEGORIES_QUERY)
  const { data: locationsData } = useQuery(LOCATIONS_QUERY)

  const setItemDetails = () => {
    if (itemData.itemByName) {
      if (itemData.itemByName.category) {
        setCategory(itemData.itemByName.category.name)
      } else {
        setCategory('')
      }

      if (itemData.itemByName.defaultLocation) {
        setLocation(itemData.itemByName.defaultLocation.name)
      } else {
        setLocation('')
      }

      if (itemData.itemByName.defaultShelflife) {
        setDaysLeft(itemData.itemByName.defaultShelflife.toString())
      } else {
        setDaysLeft('')
      }

      if (itemData.itemByName.itemType === 'nonFoodItem') {
        setIsNonFoodItem(true)
        setDoNotInventory(true)
      } else {
        setIsNonFoodItem(false)
        setDoNotInventory(false)
      }
    }
  }

  const [getItem, { data: itemData }] = useLazyQuery(ITEM_QUERY, {
    onCompleted: setItemDetails,
    fetchPolicy: 'network-only',
  })

  const [addPurchaseItem] = useMutation(ADD_PURCHASE_ITEM_MUTATION, {
    onCompleted: () => {
      setIsAddPurchaseItemDone(true)
    },
    update: (cache, { data: { addPurchaseItem } }) => {
      const data = cache.readQuery({
        query: PURCHASE_QUERY,
        variables: { id: purchaseId },
      })
      const updatedPurchase = { ...data.purchase }
      updatedPurchase.items = [addPurchaseItem, ...updatedPurchase.items]

      cache.writeQuery({
        query: PURCHASE_QUERY,
        variables: { id: purchaseId },
        data: { purchase: updatedPurchase },
      })
    },
  })

  const [addInventoryItem] = useMutation(ADD_INVENTORY_ITEM_MUTATION, {
    onCompleted: () => {
      setIsAddInventoryItemDone(true)
    },
    refetchQueries: [
      { query: INVENTORY_ITEMS_QUERY },
      { query: ITEMS_QUERY },
      { query: LOCATIONS_QUERY },
      { query: CATEGORIES_QUERY },
    ],
  })

  useEffect(() => {
    if (isAddInventoryItemDone && isAddPurchaseItemDone) {
      resetInputs()
      focusItemNameInput()
      setIsAddInventoryItemDone(false)
      setIsAddPurchaseItemDone(false)
    }
  }, [isAddInventoryItemDone, isAddPurchaseItemDone])

  const itemNameInput = useRef(null)

  const focusItemNameInput = () => {
    itemNameInput.current.focus()
  }

  const saveItem = (event) => {
    event.preventDefault()

    if (itemName) {
      addPurchaseItem({
        variables: {
          purchaseId: Number(purchaseId),
          name: itemName,
          price: Number(price) || null,
          weightAmount: Number(weightAmount) || null,
          weightUnit: weightUnit || null,
          quantityAmount: Number(quantityAmount) || null,
          quantityUnit: quantityUnit || null,
          number: Number(number) || 1,
          itemType: isNonFoodItem ? 'nonFoodItem' : 'baseItem',
        },
      })

      if (!doNotInventory) {
        addInventoryItem({
          variables: {
            name: itemName,
            addDate: purchaseData
              ? millisecondsToPgDate(purchaseData.purchase.date)
              : null,
            expiration: purchaseData
              ? millisecondsToPgDate(
                  getExpirationFromAddDate(purchaseData.purchase.date, daysLeft)
                )
              : null,
            amount:
              inventoryAmountString(
                weightAmount,
                weightUnit,
                quantityAmount,
                quantityUnit
              ) || null,
            defaultShelflife: daysLeft || null,
            category: category || null,
            location: location || null,
            number: Number(number) || 1,
            itemType: isNonFoodItem ? 'nonFoodItem' : 'baseItem',
          },
        })
      } else {
        setIsAddInventoryItemDone(true)
      }
    }
  }

  const resetInputs = () => {
    setItemName('')
    setPrice('')
    setWeightAmount('')
    setWeightUnit('')
    setQuantityAmount('')
    setQuantityUnit('')
    setNumber('1')
    setIsNonFoodItem(false)
    setDoNotInventory(false)
    setCategory('')
    setLocation('')
    setDaysLeft('')
  }

  const queryItemDetails = () => {
    getItem({
      variables: {
        name: itemName,
      },
    })
  }

  return (
    <Styled.AddForm>
      <Styled.PurchaseSection>
        <Styled.Item
          id="itemName"
          label="Item"
          value={itemName}
          onChange={(event) => setItemName(event.target.value)}
          list={itemsData && itemsData.items ? itemsData.items : []}
          forwardRef={itemNameInput}
          onBlur={queryItemDetails}
        />

        <Styled.Price
          id="price"
          label="Price"
          value={price}
          onChange={(event) => setPrice(event.target.value)}
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

        <div>
          <Styled.Label>Add multiple?</Styled.Label>
          <Styled.Multiple
            id="number"
            value={number}
            onChange={(event) => setNumber(event.target.value)}
          />
        </div>

        <label htmlFor="isNonFoodItem" className="checkbox">
          <input
            type="checkbox"
            name="isNonFoodItem"
            checked={isNonFoodItem}
            onChange={() => {
              if (!isNonFoodItem) {
                setDoNotInventory(true)
              } else {
                setDoNotInventory(false)
              }
              setIsNonFoodItem(!isNonFoodItem)
            }}
          />
          <Styled.Label className="labelText">Non food item</Styled.Label>
        </label>

        <label htmlFor="doNotInventory" className="checkbox">
          <input
            type="checkbox"
            name="doNotInventory"
            checked={doNotInventory}
            onChange={() => setDoNotInventory(!doNotInventory)}
          />
          <Styled.Label className="labelText">Do not inventory</Styled.Label>
        </label>
      </Styled.PurchaseSection>

      <Styled.InventorySection>
        <Styled.Category
          id="category"
          label="Category"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          list={
            categoriesData && categoriesData.itemCategories
              ? categoriesData.itemCategories
              : []
          }
          disabled={!!isNonFoodItem}
        ></Styled.Category>

        <Styled.Location
          id="location"
          label="Location"
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          list={
            locationsData && locationsData.itemLocations
              ? locationsData.itemLocations
              : []
          }
          disabled={!!isNonFoodItem}
        ></Styled.Location>

        <Styled.DaysLeft
          id="daysLeft"
          label="Days Left"
          value={daysLeft}
          onChange={(event) => setDaysLeft(event.target.value)}
          disabled={!!isNonFoodItem}
        ></Styled.DaysLeft>
      </Styled.InventorySection>

      <button type="submit" onClick={(event) => saveItem(event)}>
        Save
      </button>
    </Styled.AddForm>
  )
}

const ITEMS_QUERY = gql`
  query items {
    items {
      id
      name
      category {
        id
        name
      }
      defaultLocation {
        id
        name
      }
      defaultShelflife
      itemType
    }
  }
`

const PURCHASE_DATE_QUERY = gql`
  query purchaseDate($id: ID!) {
    purchase(id: $id) {
      date
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

const ITEM_QUERY = gql`
  query itemByName($name: String!) {
    itemByName(name: $name) {
      id
      category {
        id
        name
      }
      defaultLocation {
        id
        name
      }
      defaultShelflife
      itemType
    }
  }
`

const ADD_PURCHASE_ITEM_MUTATION = gql`
  mutation addPurchaseItem(
    $purchaseId: ID!
    $name: String!
    $price: Float
    $weightAmount: Float
    $weightUnit: String
    $quantityAmount: Float
    $quantityUnit: String
    $number: Int!
    $itemType: String!
  ) {
    addPurchaseItem(
      purchaseId: $purchaseId
      name: $name
      price: $price
      weightAmount: $weightAmount
      weightUnit: $weightUnit
      quantityAmount: $quantityAmount
      quantityUnit: $quantityUnit
      number: $number
      itemType: $itemType
    ) {
      id
    }
  }
`

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

PurchaseItemAddForm.propTypes = {
  purchaseId: PropTypes.string.isRequired,
}

export default PurchaseItemAddForm
