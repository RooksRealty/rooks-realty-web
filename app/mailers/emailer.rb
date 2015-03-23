class Emailer < ActionMailer::Base
  default from: 'info@rooks-realty.com'

  def submit_contact_message(contact)
    @contact = contact
    mail(:to => 'lynndupree06@gmail.com, 7830a1ac067c675b34cc@cloudmailin.net',
         :subject => "Email from Website")
  end

  def schedule_showing(showing_details)
  	@details = showing_details
  	mail(:to => @details[:realtor].email, :subject => 'Someone wants to schedule a showing!')
  end

  def property_question(details)
    @details = details
    mail(:to => @details[:realtor].email, :subject => 'Property Question')
  end
end
