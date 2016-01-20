require_relative '../lib/date'
require 'httparty'

class Company

  attr_reader :id, :name, :symbol

  BASE_URI = 'http://stocksplosion.apsis.io/api/company'

  def initialize attributes
    @id = attributes['id'].to_i
    @name = attributes['name']
    @symbol = attributes['symbol']
  end

  def self.all
    @@all ||= HTTParty.get(BASE_URI)
  end

  def read_performance(start_date = (Date.today - 30).digify, end_date = Date.today.digify)
    response = HTTParty.get("#{BASE_URI}/#{@symbol}?startdate=#{start_date}&enddate=#{end_date}")
    response['prices']
  end

end

