OmniAuth.config.logger = Rails.logger

Rails.application.config.middleware.use OmniAuth::Builder do
  provider :facebook, ENV['FACEBOOK_APP_ID'], ENV['FACEBOOK_SECRET'], {:scope => 'email, user_location' }
  #provider :facebook, "306148939490767", "77ea6a8e0b43f126494feafa8ab4bd16", {:scope => 'email, user_location' }
end