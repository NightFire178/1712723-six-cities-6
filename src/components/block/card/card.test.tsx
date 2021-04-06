import React from 'react'
import {render} from '@testing-library/react'
import Card from './card'
import mockOneHotel from "../../../mock/mock-hotels";
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import {CardPlaceEnum} from "../../../enum";

//eslint-disable-next-line
jest.mock('../favorite-button/favorite-button', () => () => (<><div>favorite button component</div></>))


test(`Card component block test`, () => {
  const hotel = mockOneHotel
  const history = createMemoryHistory()
  const city = render(
    <Router history={history}>
      <Card objCard={hotel} cardPlace={CardPlaceEnum.cities}/>
    </Router>
    )
  expect(city).toMatchSnapshot()
  const favorites = render(
    <Router history={history}>
      <Card objCard={hotel} cardPlace={CardPlaceEnum.favorites}/>
    </Router>
  )
  expect(favorites).toMatchSnapshot()
  const near = render(
    <Router history={history}>
      <Card objCard={hotel} cardPlace={CardPlaceEnum.near}/>
    </Router>
  )
  expect(near).toMatchSnapshot()
})
