class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :certification_level, :certification_date, :homebase
end
