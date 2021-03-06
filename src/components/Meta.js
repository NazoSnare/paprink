import Head from 'next/head'
import { withRouter } from 'next/router'
import ReactGA from 'react-ga'

import { meta } from '../api/meta'

class Meta extends React.Component {

  componentDidMount() {
    ReactGA.initialize(process.env.GA_TRACKING_ID)
  }

  render() {
    return (
      <Head>

        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />

        <link rel="shortcut icon" href="/static/favicon.ico" />

        <title>{meta.meta_ogTitle}</title>

      </Head>
    )
  }
  
}

export default withRouter(Meta)