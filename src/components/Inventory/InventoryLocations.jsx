import React from 'react'
import { useQuery, gql } from '@apollo/client'
import PropTypes from 'prop-types'

import SidebarList from '../SidebarList'

const InventoryLocations = ({
  selectedLocationName,
  setSelectedLocationName,
}) => {
  const { data, loading } = useQuery(LOCATIONS_QUERY)

  return (
    <>
      {loading && <div>Loading...</div>}
      {data && data.itemLocations && (
        <SidebarList
          items={[{ id: '1000', name: 'all' }, ...data.itemLocations]}
          selectedName={selectedLocationName}
          setSelectedName={setSelectedLocationName}
        />
      )}
    </>
  )
}

const LOCATIONS_QUERY = gql`
  query itemLocations {
    itemLocations {
      id
      name
    }
  }
`

InventoryLocations.propTypes = {
  selectedLocationName: PropTypes.string.isRequired,
  setSelectedLocationName: PropTypes.func.isRequired,
}

export default InventoryLocations
