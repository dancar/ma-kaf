import mixpanel from 'mixpanel-browser'
const MIXPANEL_API_KEY = process.env.REACT_APP_MIXPANEL_KEY;
mixpanel.init(MIXPANEL_API_KEY)
function getSessionId () {
  if (!window.sessionStorage) {
    return "unknown"
  }

  let sessionId = window.sessionStorage["sessionId"]
  if (!sessionId) {
    sessionId = (((1+Math.random())*0x100000000)|0).toString(16).substring(1);
    window.sessionStorage["sessionId"] = sessionId
  }
  return sessionId
}
export default {
  track (name, attrs) {
    const sessionId = getSessionId()
    mixpanel.track(name, {sessionId, ...attrs})
    console.log(name, attrs)
  }
}
