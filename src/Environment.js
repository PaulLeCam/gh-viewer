import { Environment, Network, RecordSource, Store } from 'relay-runtime'

export const create = () => {
  const fetchQuery = async (operation, variables) => {
    const res = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        authorization: 'bearer [your personal access token]',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        query: operation.text,
        variables: {},
      }),
    })
    if (res.ok) {
      return res.json()
    } else {
      throw new Error(res.statusText || 'Request error')
    }
  }

  const network = Network.create(fetchQuery)
  const source = new RecordSource()
  const store = new Store(source)

  return new Environment({ network, store })
}
