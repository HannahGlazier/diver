class LogSerializer < ActiveModel::Serializer
  attributes :id, :notes, :depth, :bottom_time, :bottom_temp, :suit_thickness, :weight, :time_in, :time_out, :boat, :fresh, :date, :divemaster, :dive_budy, :signature
  has_one :user
  has_one :site

  # Custom serializers needed to remove only the time from PostgreSQL's time conversion.

  def bottom_time
    self.object.bottom_time.to_s.slice(11..15)
  end

  def time_in
    self.object.time_in.to_s.slice(11..15)
  end

  def time_out
    self.object.time_out.to_s.slice(11..15)
  end

end
