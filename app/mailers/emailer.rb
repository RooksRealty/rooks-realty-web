class Emailer < ActionMailer::Base
  default from: 'jbrazelton@knology.net'

  def submit_contact_message(contact)
    @contact = contact
    mail(:to => 'lynndupree06+wedding@gmail.com',
         :subject => "Email from Contact Us Form")
  end
end
