require 'sinatra'
require 'sinatra/reloader' if development?

require 'sinatra/json'
require './models/company'


get '/' do
  erb :index
end

get '/performance' do
  require 'pry'; binding.pry
  puts 'blah'
end

get '/search' do
  query = params[:query].downcase
  companies = Company.all.map {|c| Company.new(c) }
  companies = companies.select {|c| c.symbol.downcase.include? query}
  json companies.map { |c| c.to_json }
end

