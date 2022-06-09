import React, { useEffect, useState } from 'react'
import { gql, useQuery, useLazyQuery } from '@apollo/client'
import PropTypes from 'prop-types'
import moment from 'moment'

import * as Styled from './InventoryItemForm.styles'

const InventoryItemForm = ({
  addDate: initialAddDate,
  location: initialLocation,
  category: initialCategory,
  daysLeft: initialDaysLeft,
  amount: initialAmount,
  itemType: initialItemType,
  handleSave,
  handleCancel,
  isSaveComplete,
  setIsSaveComplete,
  isEdit,
  isBaseItem,
}) => {
  const { data: itemsData } = useQuery(ITEMS_QUERY)
  const { data: itemLocationsData } = useQuery(ITEM_LOCATIONS_QUERY)
  const { data: categoriesData } = useQuery(CATEGORIES_QUERY)

  const [name, setName] = useState('')
  const [location, setLocation] = useState(initialLocation)
  const [category, setCategory] = useState(initialCategory)
  const [addDate, setAddDate] = useState(initialAddDate)
  const [daysLeft, setDaysLeft] = useState(initialDaysLeft)
  const [amount, setAmount] = useState(initialAmount)
  const [number, setNumber] = useState('1')
  const [itemType, setItemType] = useState(initialItemType)

  const setItemDetails = () => {
    if (itemData.itemByName) {
      setItemType(itemData.itemByName.itemType)

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
    }
  }

  const queryItemDetails = () => {
    getItem({
      variables: {
        name,
      },
    })
  }

  const [getItem, { data: itemData }] = useLazyQuery(ITEM_QUERY, {
    onCompleted: setItemDetails,
    fetchPolicy: 'network-only',
  })

  const resetFields = () => {
    setName('')
    setLocation('')
    setCategory('')
    setDaysLeft('')
    setAmount('')
    setNumber('1')
    setItemType('')
  }

  useEffect(() => {
    if (isSaveComplete) {
      resetFields()
      setIsSaveComplete(false)
    }
  }, [isSaveComplete, setIsSaveComplete])

  return (
    <Styled.InventoryItemForm>
      {!isEdit && (
        <Styled.Name
          id="name"
          label="Name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          list={itemsData && itemsData.items ? itemsData.items : []}
          onBlur={queryItemDetails}
        ></Styled.Name>
      )}

      <Styled.Location
        id="location"
        label="Location"
        value={location}
        onChange={(event) => setLocation(event.target.value)}
        list={
          itemLocationsData && itemLocationsData.itemLocations
            ? itemLocationsData.itemLocations
            : []
        }
      ></Styled.Location>

      {isBaseItem && (
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
        ></Styled.Category>
      )}

      <Styled.AddDate
        id="addDate"
        label="Add date"
        value={addDate}
        type="date"
        onChange={(event) => setAddDate(event.target.value)}
      ></Styled.AddDate>

      <Styled.DaysLeft
        id="daysLeft"
        label="Days Left"
        value={daysLeft}
        onChange={(event) => setDaysLeft(event.target.value)}
      ></Styled.DaysLeft>

      <Styled.Amount
        id="amount"
        label="Amount"
        value={amount}
        onChange={(event) => setAmount(event.target.value)}
      ></Styled.Amount>

      {!isEdit && (
        <div>
          <Styled.Label>Add multiple?</Styled.Label>
          <Styled.Multiple
            id="number"
            value={number}
            onChange={(event) => setNumber(event.target.value)}
          />
        </div>
      )}

      <div>
        <Styled.Label>Item Type</Styled.Label>
        <Styled.ItemType
          value={itemType}
          onChange={(event) => setItemType(event.target.value)}
        >
          <option value="baseItem">baseItem</option>
          <option value="dish">dish</option>
          <option value="nonFoodItem">nonFoodItem</option>
        </Styled.ItemType>
      </div>

      <Styled.Actions>
        <button type="button" className="cancel" onClick={handleCancel}>
          Cancel
        </button>
        <button
          type="submit"
          className="submit"
          onClick={(event) =>
            handleSave(event, {
              name,
              location,
              category,
              addDate,
              daysLeft,
              amount,
              number,
              itemType,
            })
          }
        >
          Save
        </button>
      </Styled.Actions>
    </Styled.InventoryItemForm>
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

const ITEM_LOCATIONS_QUERY = gql`
  query itemLocations {
    itemLocations {
      id
      name
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

InventoryItemForm.propTypes = {
  addDate: PropTypes.string,
  location: PropTypes.string,
  category: PropTypes.string,
  daysLeft: PropTypes.string,
  amount: PropTypes.string,
  itemType: PropTypes.string,
  handleSave: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
  isSaveComplete: PropTypes.bool.isRequired,
  setIsSaveComplete: PropTypes.func.isRequired,
  isEdit: PropTypes.bool,
  isBaseItem: PropTypes.bool,
}

InventoryItemForm.defaultProps = {
  addDate: moment(Date.now()).format('YYYY-MM-DD'),
  location: '',
  category: '',
  daysLeft: '',
  amount: '',
  itemType: 'baseItem',
  isEdit: false,
  isBaseItem: true,
}

export default InventoryItemForm
