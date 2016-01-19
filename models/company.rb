require_relative '../lib/date'
class Company
  include StockSplosion

  attr_reader :id, :name, :symbol

  def initialize attributes
    @id = attributes['id'].to_i
    @name = attributes['name']
    @symbol = attributes['symbol']
  end

end

