class PasswordMailer < Devise::Mailer
  helper :application

  def confirmation_instructions(record)
    super
  end

  def reset_password_instructions(record)
    super
  end

  def unlock_instructions(record)
    super
  end
end