import React from 'react'
import { useQuery, gql } from '@apollo/client'
import PropTypes from 'prop-types'

import * as Styled from './DishTags.styles'
import SidebarListMulti from '../SidebarListMulti'

const DishTags = ({
  selectedTagNames,
  setSelectedTagNames,
  match,
  setMatch,
}) => {
  const { data, loading } = useQuery(DISH_TAGS_QUERY)

  return (
    <>
      {loading && <div>Loading...</div>}
      {data && data.dishTags && (
        <>
          <SidebarListMulti
            items={[{ id: '1000', name: 'all' }].concat(data.dishTags)}
            selectedNames={selectedTagNames}
            setSelectedNames={setSelectedTagNames}
          />
          <Styled.Container>
            <Styled.Button
              match={match}
              data-match="all"
              type="button"
              onClick={() => setMatch('all')}
            >
              Match all
            </Styled.Button>
            <Styled.Button
              match={match}
              data-match="any"
              type="button"
              onClick={() => setMatch('any')}
            >
              Match any
            </Styled.Button>
          </Styled.Container>
        </>
      )}
    </>
  )
}

const DISH_TAGS_QUERY = gql`
  query dishTags {
    dishTags {
      id
      name
    }
  }
`

DishTags.propTypes = {
  selectedTagNames: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  setSelectedTagNames: PropTypes.func.isRequired,
  match: PropTypes.string.isRequired,
  setMatch: PropTypes.func.isRequired,
}

export default DishTags
