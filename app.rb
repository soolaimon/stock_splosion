require 'sinatra'
require 'sinatra/reloader' if development?
require './lib/stock_splosion'
require './models/company'

include StockSplosion

get '/' do
  @companies = read_list.map {|c| Company.new(c) }
  erb :index
end
