Accounts.oauth.registerService "twitch"
if Meteor.isClient
  Meteor.loginWithTwitch = (options, callback) ->
    
    # support a callback without options
    if not callback and typeof options is "function"
      callback = options
      options = null

    if !options.requestPermissions? then options.requestPermissions = ["user_read"]

    credentialRequestCompleteCallback = Accounts.oauth.credentialRequestCompleteHandler(callback)
    Twitch.requestCredential options, credentialRequestCompleteCallback
    return
else
  Accounts.addAutopublishFields
    
    # publish all fields including access token, which can legitimately
    # be used from the client (if transmitted over ssl or on
    # localhost). http://api.twitch.tv/kraken/auth/#oauth2implicit
    forLoggedInUser: ["services.twitch"]
    forOtherUsers: ["services.twitch.id", "services.twitch.name"]
