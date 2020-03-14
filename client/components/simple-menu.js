import React from 'react'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

export default function SimpleMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null)

  const {color = 'primary', options, handleFilter} = props

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = e => {
    setAnchorEl(null)
    handleFilter(e.target.innerText)
  }

  return (
    <div>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <props.icon color={color} />
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {options.map((option, id) => {
          return (
            <MenuItem key={option} onClick={e => handleClose(e, option)}>
              {option}
            </MenuItem>
          )
        })}
      </Menu>
    </div>
  )
}
