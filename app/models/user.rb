class User < ApplicationRecord
    has_secure_password
    
    has_many :followed_users, foreign_key: :follower_id, class_name: 'Follow'
    has_many :followees, through: :followed_users

    has_many :following_users, foreign_key: :followee_id, class_name: 'Follow'
    has_many :followers, through: :following_users

    has_many :logs
    has_many :sites, through: :logs

    validates :name, presence: true, uniqueness: true
end
