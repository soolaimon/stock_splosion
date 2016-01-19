require 'httparty'

module StockSplosion

  def base_uri
    'http://stocksplosion.apsis.io/api/company'
  end

  def read_list
    HTTParty.get(base_uri)
  end

end
