class SiteSerializer < ActiveModel::Serializer
  attributes :id, :name, :location, :lat, :long
end
