require 'sinatra'
require 'sinatra/reloader' if development?
require './models/company'


get '/' do
  @companies = Company.read_list.map {|c| Company.new(c) }
  erb :index
end
