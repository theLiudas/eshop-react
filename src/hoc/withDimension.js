import React from 'react'
import { Flex } from '../components/shared/Flex/Flex'

const withTooltip = (WrappedComponent, tooltip) => {
  class HOC extends React.Component {
    render() {
      return <WrappedComponent {...this.props} title={tooltip} />
    }
  }

  return HOC
}

const withLabel = (WrappedComponent, label) => props => (
  <>
    <WrappedComponent {...props} />
    <p>{label}</p>
  </>
)

export default withLabel
