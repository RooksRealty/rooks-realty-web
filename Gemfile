source 'https://rubygems.org'

gem 'rails', '4.1.8'
gem 'uglifier', '>= 1.3.0'
gem 'coffee-rails', '~> 4.0.0'
gem 'jquery-rails'
gem 'jbuilder', '~> 2.0'
gem 'sdoc', '~> 0.4.0',          group: :doc
gem 'sass', '3.2.19'
gem 'bower-rails'
gem "foreman"
gem 'nokogiri'

group :test, :development do
  gem "rspec-rails", "~> 2.0"
  gem "factory_girl_rails", "~> 4.0"
  gem "capybara"
  gem "database_cleaner"
  gem "selenium-webdriver"
  gem 'spring'
  gem 'sqlite3'  
  gem 'pry'
  gem 'pry-remote'
  gem 'pry-stack_explorer'
end


group :production, :staging do
  gem "rails_12factor"
  gem "rails_stdout_logging"
  gem "rails_serve_static_assets"
  gem "pg"
end
