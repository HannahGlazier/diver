class FollowSerializer < ActiveModel::Serializer
  attributes :id, :follower_id, :followee_id
  has_one :followee
  has_many :logs
end
