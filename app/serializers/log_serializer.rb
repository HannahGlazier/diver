class LogSerializer < ActiveModel::Serializer
  attributes :id, :notes, :depth, :bottom_time, :bottom_temp, :suit_thickness, :weight, :time_in, :time_out, :boat, :salt, :date, :divemaster, :dive_budy, :signature
  has_one :user
  has_one :site
end
