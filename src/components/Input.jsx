import React from 'react'
import PropTypes from 'prop-types'

import * as Styled from './Input.styles'

const Input = ({
  id,
  label,
  type,
  list,
  value,
  onChange,
  className,
  forwardRef,
  backgroundColor,
  ...rest
}) => {
  return (
    <div className={className}>
      <Styled.Label htmlFor={id}>
        <div className="label">{label}</div>
        <Styled.InputEl
          type={type}
          value={value}
          onChange={onChange}
          list={list.length > 0 ? `${id}List` : null}
          backgroundColor={backgroundColor}
          ref={forwardRef}
          {...rest}
        />
      </Styled.Label>
      {list.length > 0 && (
        <datalist id={`${id}List`}>
          {list.map((item) => (
            <option style={{ textTransform: 'capitalize' }} key={item.id}>
              {item.name}
            </option>
          ))}
        </datalist>
      )}
    </div>
  )
}

Input.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  type: PropTypes.string,
  list: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ),
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
}

Input.defaultProps = {
  type: 'text',
  list: [],
  label: '',
  className: '',
}

export default Input
