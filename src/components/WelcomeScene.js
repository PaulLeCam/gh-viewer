// @flow

import React from 'react'
import { ActivityIndicator, View } from 'react-native'
import { Button, Icon, Text } from 'react-native-elements'
import { graphql, QueryRenderer } from 'react-relay'

import { create } from '../Environment'

import { sharedStyles } from './styles'

const environment = create()

type QueryErrorProps = {
  error: Error,
  retry: () => void,
}
const QueryError = ({ error, retry }: QueryErrorProps) => (
  <View style={[sharedStyles.scene, sharedStyles.centerContents]}>
    <View style={sharedStyles.mainContents}>
      <Text h2 style={sharedStyles.textCenter}>
        {error.message || 'Request error'}
      </Text>
    </View>
    <View style={sharedStyles.bottomContents}>
      <Button onPress={retry} title="Retry" />
    </View>
  </View>
)

const QueryLoader = () => (
  <View style={[sharedStyles.scene, sharedStyles.centerContents]}>
    <View style={sharedStyles.mainContents}>
      <ActivityIndicator animating size="large" />
      <Text h2 style={sharedStyles.textCenter}>Loading...</Text>
    </View>
  </View>
)

type WelcomeSceneProps = {
  viewer: {
    login: string,
  },
}
const WelcomeScene = ({ viewer }: WelcomeSceneProps) => (
  <View style={[sharedStyles.scene, sharedStyles.centerContents]}>
    <View style={sharedStyles.mainContents}>
      <Icon name="octoface" size={60} type="octicon" />
      <Text h2 style={sharedStyles.textCenter}>
        Welcome, {viewer.login}!
      </Text>
    </View>
  </View>
)

const WelcomeSceneRenderer = () => (
  <QueryRenderer
    environment={environment}
    query={graphql`
      query WelcomeSceneQuery {
        viewer {
          login
        }
      }
    `}
    render={({ error, props, retry }) => {
      if (error) {
        return <QueryError error={error} retry={retry} />
      } else if (props) {
        return <WelcomeScene {...props} />
      } else {
        return <QueryLoader />
      }
    }}
  />
)

export default WelcomeSceneRenderer
