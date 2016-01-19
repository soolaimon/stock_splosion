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

  def read_performance
    HTTParty.get("#{BASE_URI}/#{@symbol}")
  end


end

