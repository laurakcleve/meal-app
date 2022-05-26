import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { MockedProvider } from '@apollo/react-testing'
import { ThemeProvider } from 'styled-components'
import wait from 'waait'
import '@testing-library/jest-dom'
import { act } from 'react-dom/test-utils'

import Items, { ITEMS_QUERY } from './Items'
import { ITEM_CATEGORIES_QUERY } from './ItemCategories'
import theme from '../../theme/theme'

const mocks = [
  {
    request: {
      query: ITEMS_QUERY,
    },
    result: {
      data: {
        items: [
          {
            id: '1',
            name: 'bananas',
            category: {
              id: '1',
              name: 'produce',
            },
            dishes: [
              {
                id: '2',
                name: 'smoothies',
              },
            ],
          },
        ],
      },
    },
  },
  {
    request: {
      query: ITEM_CATEGORIES_QUERY,
    },
    result: {
      data: {
        itemCategories: [
          {
            id: '1',
            name: 'produce',
          },
          {
            id: '2',
            name: 'meat',
          },
        ],
      },
    },
  },
]

it('should render without error', async () => {
  await act(async () => {
    render(
      <ThemeProvider theme={theme}>
        <MockedProvider mocks={mocks} addTypename={false}>
          <Items />
        </MockedProvider>
      </ThemeProvider>
    )
    await wait(0)
  })
})

it('should display an item', async () => {
  await act(async () => {
    const { getByText, getAllByText } = render(
      <ThemeProvider theme={theme}>
        <MockedProvider mocks={mocks} addTypename={false}>
          <Items />
        </MockedProvider>
      </ThemeProvider>
    )

    expect(getAllByText('Loading...')[0]).toBeInTheDocument()

    await wait(0)

    expect(getByText('bananas')).toBeInTheDocument()
  })
})

it('should display the item categories in the sidebar', async () => {
  await act(async () => {
    const { getByText, getAllByText } = render(
      <ThemeProvider theme={theme}>
        <MockedProvider mocks={mocks} addTypename={false}>
          <Items />
        </MockedProvider>
      </ThemeProvider>
    )

    expect(getAllByText('Loading...')[0]).toBeInTheDocument()

    await wait(0)

    expect(getByText('produce')).toBeInTheDocument()
    expect(getByText('meat')).toBeInTheDocument()
  })
})
