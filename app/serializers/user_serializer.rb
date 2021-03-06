class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :certification_level, :certification_date, :homebase, :icon

  has_many :followers
  has_many :followees
  has_many :logs
  
end
