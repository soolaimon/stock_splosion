require 'sinatra'
require 'sinatra/reloader' if development?
require 'pry' if development?

require 'sinatra/json'
require './models/company'


get '/' do
  erb :index
end

get '/performance' do
  company = Company.new('symbol' => params[:symbol])
  start_date = Date.parse(params[:start_date])
  end_date = Date.parse(params[:end_date])
  json company.read_performance(start_date, end_date)
end

get '/search' do
  query = params[:query].downcase
  companies = Company.all.map {|c| Company.new(c) }
  companies = companies.select {|c| c.symbol.downcase.include? query}
  json companies.map { |c| c.to_json }
end
