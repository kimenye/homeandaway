# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20121129112103) do

  create_table "nominees", :force => true do |t|
    t.integer  "story_id"
    t.string   "full_name"
    t.string   "mtcn"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  add_index "nominees", ["story_id"], :name => "index_nominees_on_story_id"

  create_table "sessions", :force => true do |t|
    t.string   "session_id", :null => false
    t.text     "data"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  add_index "sessions", ["session_id"], :name => "index_sessions_on_session_id"
  add_index "sessions", ["updated_at"], :name => "index_sessions_on_updated_at"

  create_table "stories", :force => true do |t|
    t.integer  "user_id"
    t.string   "title"
    t.text     "body"
    t.string   "status"
    t.datetime "created_at",           :null => false
    t.datetime "updated_at",           :null => false
    t.string   "picture_file_name"
    t.string   "picture_content_type"
    t.integer  "picture_file_size"
    t.datetime "picture_updated_at"
  end

  add_index "stories", ["user_id"], :name => "index_stories_on_user_id"

  create_table "users", :force => true do |t|
    t.string   "email"
    t.string   "password_hash"
    t.string   "password_salt"
    t.string   "login_type"
    t.datetime "created_at",          :null => false
    t.datetime "updated_at",          :null => false
    t.string   "provider"
    t.string   "uid"
    t.string   "oauth_token"
    t.datetime "oauth_expires_at"
    t.string   "avatar_file_name"
    t.string   "avatar_content_type"
    t.integer  "avatar_file_size"
    t.datetime "avatar_updated_at"
    t.string   "name"
    t.string   "location"
    t.boolean  "admin"
  end

  create_table "votes", :force => true do |t|
    t.integer  "nominee_id"
    t.integer  "user_id"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  add_index "votes", ["nominee_id"], :name => "index_votes_on_nominee_id"
  add_index "votes", ["user_id"], :name => "index_votes_on_user_id"

end
