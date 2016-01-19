require 'sinatra'
require 'sinatra/reloader' if development?
require './lib/stock_splosion'
include StockSplosion

get '/' do
  erb :index
end
