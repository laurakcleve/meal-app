import React from 'react'
import PropTypes from 'prop-types'
import pluralize from 'pluralize'

import * as Styled from './PurchaseStats.styles'

const PurchaseStats = ({ purchases }) => {
  const hasWeight = purchases.find(
    (purchase) => purchase.weightAmount && purchase.weightUnit
  )
  const hasQuantity = purchases.find((purchase) => purchase.quantityAmount)

  const pricesByLocation = purchases.reduce((acc, curr) => {
    const newEntry = {
      price: curr.price,
      weightAmount: curr.weightAmount,
      weightUnit: curr.weightUnit,
      quantityAmount: curr.quantityAmount,
      quantityUnit: curr.quantityUnit,
    }
    if (acc[curr.purchase.location.name]) {
      acc[curr.purchase.location.name].push(newEntry)
    } else {
      acc[curr.purchase.location.name] = [newEntry]
    }
    return acc
  }, {})

  const weightPrices = (purchaseList) =>
    purchaseList
      .map((purchase) => {
        return purchase.weightAmount
          ? Number((purchase.price / purchase.weightAmount).toFixed(2))
          : ''
      })
      .filter((pricePerWeight) => pricePerWeight !== '')

  const quantityPrices = (purchaseList) =>
    purchaseList
      .map((purchase) => {
        return purchase.quantityAmount
          ? Number((purchase.price / purchase.quantityAmount).toFixed(2))
          : ''
      })
      .filter((pricePerQuantity) => pricePerQuantity !== '')

  const averagePrice = (prices) =>
    (prices.reduce((acc, curr) => acc + curr, 0) / prices.length).toFixed(2)

  return (
    <div>
      <Styled.Price>
        <h3>Average price:</h3>
        {hasWeight && (
          <div>
            ${averagePrice(weightPrices(purchases))}/{purchases[0].weightUnit}
          </div>
        )}
        {hasQuantity && (
          <div>
            ${averagePrice(quantityPrices(purchases))}/
            {purchases[0].quantityUnit
              ? pluralize(purchases[0].quantityUnit, 1)
              : 'ea'}
          </div>
        )}
      </Styled.Price>

      <Styled.PriceByLocation>
        <h3>Average price by location:</h3>
        <table>
          <tbody>
            {Object.keys(pricesByLocation).map((location) => (
              <tr key={location}>
                <td className="location">{location}</td>
                <td>
                  {hasWeight &&
                    `$${averagePrice(
                      weightPrices(pricesByLocation[location])
                    )}/${pricesByLocation[location][0].weightUnit}`}
                </td>
                <td>
                  {hasQuantity &&
                    `$${averagePrice(
                      quantityPrices(pricesByLocation[location])
                    )}/${
                      pricesByLocation[location][0].quantityUnit
                        ? pluralize(
                            pricesByLocation[location][0].quantityUnit,
                            1
                          )
                        : 'ea'
                    }`}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Styled.PriceByLocation>
    </div>
  )
}

PurchaseStats.propTypes = {
  purchases: PropTypes.arrayOf(
    PropTypes.shape({
      weightAmount: PropTypes.number,
      weightUnit: PropTypes.string,
      quantityAmount: PropTypes.number,
      quantityUnit: PropTypes.string,
    })
  ).isRequired,
}

export default PurchaseStats
