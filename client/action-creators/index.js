// CONSTANTS

export const RECEIVE_BG = "RECEIVE_BG";
export const RECEIVE_IMG = "RECEIVE_IMG";

//ACTION CREATORS

export const receiveBG = bg => ({
  type: RECEIVE_BG,
  bg
})

export const receiveIMG = images => ({
  type: RECEIVE_IMG,
  images
})
