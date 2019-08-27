import React from 'react'
import { storiesOf } from '@storybook/react-native'

import {LaunchScreenList} from './LaunchScreenList'



storiesOf('LaunchScreenList')
  .add('Default', () => (
    <LaunchScreenList
    />
  ))