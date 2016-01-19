require_relative '../lib/date'
require 'httparty'

class Company

  attr_reader :id, :name, :symbol

  BASE_URI = 'http://stocksplosion.apsis.io/api/company'

  def self.read_list
    HTTParty.get(BASE_URI)
  end

  def initialize attributes
    @id = attributes['id'].to_i
    @name = attributes['name']
    @symbol = attributes['symbol']
  end

end

