import React, { useState } from 'react'
import { useQuery, useMutation, gql } from '@apollo/client'
import { Link } from 'react-router-dom'

import cloneDeep from 'lodash.clonedeep'
import * as Layout from '../Layout.styles'
import * as Styled from './Purchases.styles'
import Input from '../Input'
import ListItem from '../ListItem'
import { formatDate } from '../../utils'

const Purchases = () => {
  const { data: locationsData, loading, error } = useQuery(
    PURCHASE_LOCATIONS_QUERY
  )

  const { data: purchasesData } = useQuery(PURCHASES_QUERY)

  const [addPurchase] = useMutation(ADD_PURCHASE_MUTATION, {
    onCompleted: () => {
      setDate('')
      setLocation('')
    },
    update: (cache, { data: { addPurchase } }) => {
      const data = cache.readQuery({ query: PURCHASES_QUERY })
      const newPurchase = cloneDeep(addPurchase)

      newPurchase.date = new Date(addPurchase.date)

      cache.writeQuery({
        query: PURCHASES_QUERY,
        data: { purchases: [newPurchase, ...data.purchases] },
      })
    },
  })

  const [date, setDate] = useState('')
  const [location, setLocation] = useState('')

  const submit = (event) => {
    event.preventDefault()
    if (date && location) {
      addPurchase({
        variables: {
          date,
          location,
        },
      })
    }
  }

  return (
    <Layout.Container>
      <Layout.List>
        <div style={{ maxWidth: '540px', margin: '0 auto' }}>
          <Styled.AddForm>
            <Input
              id="date"
              label="Date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              backgroundColor="#fff"
            />
            <Input
              id="location"
              label="Location"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              list={locationsData && locationsData.purchaseLocations}
            />
            <button type="submit" onClick={(e) => submit(e)}>
              SAVE
            </button>
          </Styled.AddForm>

          {loading && <p>Loading...</p>}
          {error && <p>Error</p>}
          {purchasesData &&
            purchasesData.purchases &&
            purchasesData.purchases.map((purchase) => (
              <Link key={purchase.id} to={`/purchase/${purchase.id}`}>
                <ListItem>
                  <Styled.Location>{purchase.location.name}</Styled.Location>
                  <Styled.Date>{formatDate(purchase.date)}</Styled.Date>
                </ListItem>
              </Link>
            ))}
        </div>
      </Layout.List>
    </Layout.Container>
  )
}

const PURCHASES_QUERY = gql`
  query purchases {
    purchases {
      id
      date
      location {
        id
        name
      }
    }
  }
`

const PURCHASE_LOCATIONS_QUERY = gql`
  query purchaseLocations {
    purchaseLocations {
      id
      name
    }
  }
`

const ADD_PURCHASE_MUTATION = gql`
  mutation addPurchase($date: String!, $location: String!) {
    addPurchase(date: $date, location: $location) {
      id
      date
      location {
        id
        name
      }
    }
  }
`

export default Purchases
