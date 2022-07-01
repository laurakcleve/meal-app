import React, { useState } from 'react'
import { useQuery, gql } from '@apollo/client'
import PropTypes from 'prop-types'
import moment from 'moment'

import * as Layout from '../Layout.styles'
import * as Styled from './Item.styles'
import ListItem from '../ListItem'
import ItemEditForm from './ItemEditForm'
import PurchaseStats from './PurchaseStats'
import { unitPrice, inventoryAmountString } from '../../utils'

const Item = ({ match, history }) => {
  const { data, loading, error } = useQuery(ITEM_QUERY, {
    variables: { id: match.params.id },
  })

  const [isEditing, setIsEditing] = useState(false)

  return (
    <Layout.Container>
      <Styled.Main>
        {loading && <h2>Loading...</h2>}
        {error && <h2>Error</h2>}

        {data && data.itemById && (
          <>
            <Styled.Details>
              {isEditing ? (
                <div className="main">
                  <ItemEditForm
                    item={data.itemById}
                    setIsEditing={setIsEditing}
                    history={history}
                  />
                </div>
              ) : (
                <div className="main">
                  <Styled.Header>
                    <h1>{data.itemById.name}</h1>

                    <button type="button" onClick={() => setIsEditing(true)}>
                      Edit
                    </button>
                  </Styled.Header>

                  {data.itemById.category && (
                    <Styled.Detail>
                      <h2>Category</h2>
                      <p>{data.itemById.category.name}</p>
                    </Styled.Detail>
                  )}

                  <Styled.Detail>
                    <h2>Item Type</h2>
                    <p>{data.itemById.itemType}</p>
                  </Styled.Detail>

                  {!!data.itemById.defaultShelflife && (
                    <Styled.Detail>
                      <h2>Default shelflife</h2>
                      <p>{data.itemById.defaultShelflife} days</p>
                    </Styled.Detail>
                  )}

                  {data.itemById.defaultLocation && (
                    <Styled.Detail>
                      <h2>Default location</h2>
                      <p>{data.itemById.defaultLocation.name}</p>
                    </Styled.Detail>
                  )}

                  {data.itemById.countsAs.length > 0 && (
                    <Styled.Detail>
                      <h2>Counts as</h2>
                      <ul>
                        {data.itemById.countsAs.map((countsAsItem) => (
                          <li key={countsAsItem.id}>{countsAsItem.name}</li>
                        ))}
                      </ul>
                    </Styled.Detail>
                  )}
                </div>
              )}
            </Styled.Details>

            {data.itemById.dishes.length > 0 && (
              <Styled.Detail>
                <h2>Used in</h2>
                <ul>
                  {data.itemById.dishes.map((dish) => (
                    <li key={dish.id}>{dish.name}</li>
                  ))}
                </ul>
              </Styled.Detail>
            )}

            {data && data.itemById.purchases.length > 0 && (
              <Styled.Detail>
                <h2>Purchases</h2>
                <PurchaseStats purchases={data.itemById.purchases} />
                <Layout.List className="purchaseList">
                  {data.itemById.purchases.map((purchase) => (
                    <ListItem key={purchase.id}>
                      <Styled.Date>
                        {moment(purchase.purchase.date).format('M/D/YY')}
                      </Styled.Date>
                      <Styled.Location>
                        {purchase.purchase.location.name}
                      </Styled.Location>
                      <Styled.Price>
                        {purchase.price &&
                          `$${Number(purchase.price).toFixed(2)}`}
                      </Styled.Price>
                      <Styled.Amount>
                        {inventoryAmountString(
                          purchase.weightAmount,
                          purchase.weightUnit,
                          purchase.quantityAmount,
                          purchase.quantityUnit
                        )}
                      </Styled.Amount>
                      <Styled.UnitPrice>
                        {unitPrice(
                          purchase.price,
                          purchase.weightAmount,
                          purchase.weightUnit
                        )}
                      </Styled.UnitPrice>
                      <Styled.UnitPrice>
                        {unitPrice(
                          purchase.price,
                          purchase.quantityAmount,
                          purchase.quantityUnit
                        )}
                      </Styled.UnitPrice>
                    </ListItem>
                  ))}
                </Layout.List>
              </Styled.Detail>
            )}
          </>
        )}
      </Styled.Main>
    </Layout.Container>
  )
}

const ITEM_QUERY = gql`
  query itemById($id: ID!) {
    itemById(id: $id) {
      id
      name
      itemType
      defaultShelflife
      defaultLocation {
        id
        name
      }
      category {
        id
        name
      }
      purchases {
        id
        price
        weightAmount
        weightUnit
        quantityAmount
        quantityUnit
        purchase {
          date
          location {
            id
            name
          }
        }
      }
      dishes {
        id
        name
      }
      countsAs {
        id
        name
      }
    }
  }
`

Item.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
}

export default Item
