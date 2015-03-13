# Add your own tasks in files placed in lib/tasks ending in .rake,
# for example lib/tasks/capistrano.rake, and they will automatically be available to Rake.

require File.expand_path('../config/application', __FILE__)

Rails.application.load_tasks

begin
  task :precompile_test_assets do
    fail_on_error('rake assets:precompile assets:clean RAILS_ENV=test RAILS_GROUPS=assets')
  end

  namespace :test do

    task :all => [:spec]

    desc "Ensure assets are precompiled before jasmine tests"
    task :javascript => [:precompile_test_assets] do
      fail_on_error('rake jasmine:ci')
    end

    private

    def fail_on_error(cmd)
      raise "Could not complete task #{cmd}" unless system(cmd)
    end
  end

rescue LoadError
end