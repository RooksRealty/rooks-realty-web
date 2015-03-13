require File.expand_path('../boot', __FILE__)

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module RooksRealty
  class Application < Rails::Application
  	config.assets.enabled = true
    config.assets.paths << Rails.root.join("vendor","assets","bower_components")
    config.assets.paths << Rails.root.join("vendor","assets", "bower_components","fonts")
    config.assets.precompile << %r(.*.(?:eot|svg|ttf|woff|woff2)$)
  end
end
