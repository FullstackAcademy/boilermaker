// CONSTANTS

export const RECEIVE_BG = "RECEIVE_BG";
export const RECEIVE_IMG = "RECEIVE_IMG";
export const SHOW_CODE = "SHOW_CODE";
export const FLASH_MSG = "FLASH_MSG"

//ACTION CREATORS

export const receiveBG = bg => ({
  type: RECEIVE_BG,
  bg
})

export const receiveIMG = images => ({
  type: RECEIVE_IMG,
  images
})

export const showCode = () => ({
  type: SHOW_CODE
})

export const flashMSG = () => ({
  type: FLASH_MSG
})
