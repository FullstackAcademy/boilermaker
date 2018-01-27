const SET_RTC_CONNECTION = 'SET_RTC_CONNECTION';

export const setRtcConnection = rtcConnection => ({
  type: SET_RTC_CONNECTION,
  rtcConnection
});

export default (prevState = {}, action) => {
  switch (action.type) {
    case SET_RTC_CONNECTION:
      return action.rtcConnection;
    default:
      return prevState;
  }
}
