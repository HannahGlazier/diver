class FollowWithFolloweeSerializer < ActiveModel::Serializer
    attributes :id, :follower_id, :followee_id
    has_one :followee
  end