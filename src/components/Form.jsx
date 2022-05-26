import React from 'react'
import PropTypes from 'prop-types'

import * as Styled from './Form.styles'

const Form = ({ children, className }) => {
  return <Styled.Form className={className}>{children}</Styled.Form>
}

Form.defaultProps = {
  className: '',
}

Form.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  className: PropTypes.string,
}

export default Form
