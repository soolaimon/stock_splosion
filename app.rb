require 'sinatra'
require 'sinatra/reloader' if development?
require './models/company'


get '/' do
  @companies = Company.all.map {|c| Company.new(c) }
  erb :index
end
