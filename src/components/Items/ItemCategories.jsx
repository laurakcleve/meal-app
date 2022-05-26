import React from 'react'
import { useQuery, gql } from '@apollo/client'
import PropTypes from 'prop-types'

import SidebarList from '../SidebarList'

const ItemCategories = ({ selectedCategoryName, setSelectedCategoryName }) => {
  const { data, loading } = useQuery(ITEM_CATEGORIES_QUERY)

  return (
    <>
      {loading && <div>Loading...</div>}
      {data && data.itemCategories && (
        <SidebarList
          items={[{ id: '1000', name: 'all' }].concat(data.itemCategories)}
          selectedName={selectedCategoryName}
          setSelectedName={setSelectedCategoryName}
        />
      )}
    </>
  )
}

export const ITEM_CATEGORIES_QUERY = gql`
  query itemCategories {
    itemCategories {
      id
      name
    }
  }
`

ItemCategories.propTypes = {
  selectedCategoryName: PropTypes.string.isRequired,
  setSelectedCategoryName: PropTypes.func.isRequired,
}

export default ItemCategories
