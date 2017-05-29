import { Platform, StatusBar, StyleSheet } from 'react-native'

export const sharedStyles = StyleSheet.create({
  scene: {
    flex: 1,
    ...Platform.select({
      android: {
        marginTop: StatusBar ? StatusBar.currentHeight : 0,
      },
      ios: {
        marginTop: 20,
      },
    }),
  },
  mainContents: {
    padding: 10,
  },
  centerContents: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textCenter: {
    textAlign: 'center',
  },
})
