import '../styles/defaults.scss'
import '../styles/layout.scss'
import '../styles/typography-sans.scss'
import '../styles/markdown.scss'
import '../styles/colors.scss'

// MD Style Wrapper
const components = {
  h1:  props => <h1 className={"markdown"} {...props} />,
  h2:  props => <h2 className={"markdown"} {...props} />,
  h3:  props => <h3 className={"markdown"} {...props} />,
  h4:  props => <h4 className={"markdown"} {...props} />,
  h5:  props => <h5 className={"markdown"} {...props} />,
  h6:  props => <h6 className={"markdown"} {...props} />,
}

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} components={components} />
}

export default MyApp
