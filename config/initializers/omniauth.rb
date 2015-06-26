Rails.application.config.middleware.use OmniAuth::Builder do
    #provider :twitter, 'CONSUMER_KEY', 'CONSUMER_SECRET'
    provider :facebook, '1579788118950175', '226d3de6d8954638443fd1b8b6a66b7d'
    # Mention other providers here you want to allow user to sign in with
end