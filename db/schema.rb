# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2022_04_26_154521) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "follows", force: :cascade do |t|
    t.integer "follower_id"
    t.integer "followee_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "logs", force: :cascade do |t|
    t.string "notes"
    t.integer "depth"
    t.time "bottom_time"
    t.integer "bottom_temp"
    t.integer "suit_thickness"
    t.integer "weight"
    t.time "time_in"
    t.time "time_out"
    t.boolean "boat"
    t.boolean "fresh"
    t.date "date"
    t.string "divemaster"
    t.string "dive_budy"
    t.string "signature"
    t.bigint "user_id", null: false
    t.bigint "site_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["site_id"], name: "index_logs_on_site_id"
    t.index ["user_id"], name: "index_logs_on_user_id"
  end

  create_table "sites", force: :cascade do |t|
    t.string "name"
    t.string "location"
    t.float "lat"
    t.float "long"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "name"
    t.string "certification_level"
    t.date "certification_date"
    t.string "homebase"
    t.string "password_digest"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "logs", "sites"
  add_foreign_key "logs", "users"
end
