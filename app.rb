require 'sinatra'
require 'sinatra/reloader' if development?
require './models/company'


get '/' do
  erb :index
end


get '/search' do
  query = params[:query]
  companies = Company.all.map {|c| Company.new(c) }
  companies = companies.select {|c| c.symbol.include? query}
  json companies
end
