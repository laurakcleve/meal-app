import React, { useState } from 'react'
import { useQuery, useMutation, gql } from '@apollo/client'
import PropTypes from 'prop-types'
import moment from 'moment'

import * as Layout from '../Layout.styles'
import * as Styled from './Purchase.styles'
import ListItem from '../ListItem'
import PurchaseItemAddForm from './PurchaseItemAddForm'
import { unitPrice } from '../../utils'
import Expander from '../Expander'
import PurchaseItemDetails from './PurchaseItemDetails'

const Purchase = ({ match, history }) => {
  const [selectedItemID, setSelectedItemID] = useState('')

  const { data, loading, error } = useQuery(PURCHASE_QUERY, {
    variables: { id: match.params.id },
  })

  const [deletePurchase] = useMutation(DELETE_PURCHASE_MUTATION, {
    onCompleted: () => history.push('/purchases'),
    refetchQueries: [{ query: PURCHASES_QUERY }],
  })

  const submitDelete = (event) => {
    event.preventDefault()
    if (window.confirm('Delete purchase?')) {
      deletePurchase({ variables: { id: match.params.id } })
    }
  }

  const toggleItemOpen = (id) => {
    if (selectedItemID === id) {
      setSelectedItemID('')
    } else {
      setSelectedItemID(id)
    }
  }

  return (
    <Layout.Container>
      <Layout.List>
        {loading && <h2>Loading...</h2>}
        {error && <h2>Error</h2>}

        {data && data.purchase && (
          <>
            <Styled.Header>
              <h2>
                {`${moment(Number(data.purchase.date)).format('M/D/YY')} - ${
                  data.purchase.location.name
                }`}
              </h2>

              <button type="button" onClick={(event) => submitDelete(event)}>
                Delete
              </button>
            </Styled.Header>

            <PurchaseItemAddForm purchaseId={match.params.id} />

            {data.purchase.items.map((purchaseItem) => (
              <ListItem
                key={purchaseItem.id}
                onClick={() => toggleItemOpen(purchaseItem.id)}
                expander={
                  selectedItemID === purchaseItem.id && (
                    <Expander>
                      <PurchaseItemDetails
                        purchaseId={data.purchase.id}
                        purchaseItem={purchaseItem}
                      />
                    </Expander>
                  )
                }
              >
                <Styled.Name>{purchaseItem.item.name}</Styled.Name>
                <Styled.Weight>
                  {purchaseItem.weightAmount} {purchaseItem.weightUnit}
                </Styled.Weight>
                <Styled.Quantity>
                  {purchaseItem.quantityAmount} {purchaseItem.quantityUnit}
                </Styled.Quantity>
                <Styled.Price>
                  {purchaseItem.price && `$${purchaseItem.price.toFixed(2)}`}
                </Styled.Price>
                <Styled.WeightPrice>
                  {unitPrice(
                    purchaseItem.price,
                    purchaseItem.weightAmount,
                    purchaseItem.weightUnit
                  )}
                </Styled.WeightPrice>
                <Styled.QuantityPrice>
                  {unitPrice(
                    purchaseItem.price,
                    purchaseItem.quantityAmount,
                    purchaseItem.quantityUnit
                  )}
                </Styled.QuantityPrice>
              </ListItem>
            ))}
          </>
        )}
      </Layout.List>
    </Layout.Container>
  )
}

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

const DELETE_PURCHASE_MUTATION = gql`
  mutation deletePurchase($id: ID!) {
    deletePurchase(id: $id)
  }
`

Purchase.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
}

export default Purchase
