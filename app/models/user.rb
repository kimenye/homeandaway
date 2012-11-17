class User < ActiveRecord::Base
  include Paperclip::Glue

  attr_accessible :email, :password, :password_confirmation, :first_name, :last_name, :login_type, :avatar

  attr_accessor :password
  before_save :encrypt_password
  has_attached_file :avatar, :styles => { :medium => "300x300>", :thumb => "100x100>" }

  validates_confirmation_of :password
  validates_presence_of :password, :on => :create
  validates_presence_of :email
  validates_uniqueness_of :email

  has_many :stories, :dependent => :destroy

  def self.authenticate(email, password)
    user = find_by_email_and_login_type(email, "http")
    if user && user.password_hash == BCrypt::Engine.hash_secret(password, user.password_salt)
      user
    else
      nil
    end
  end

  def encrypt_password
    if password.present?
      self.password_salt = BCrypt::Engine.generate_salt
      self.password_hash = BCrypt::Engine.hash_secret(password, password_salt)
    end
  end

  def self.from_omniauth(auth)
    where(auth.slice(:provider, :uid)).first_or_initialize.tap do |user|
      user.provider = auth.provider
      user.uid = auth.uid
      user.first_name = auth.info.first_name
      user.last_name = auth.info.last_name
      user.email = auth.info.email
      user.login_type = "oauth"

      password_salt = BCrypt::Engine.generate_salt
      user.password =  BCrypt::Engine.hash_secret("none", password_salt)
      user.oauth_token = auth.credentials.token
      user.oauth_expires_at = Time.at(auth.credentials.expires_at)
      user.save!
    end
  end

  def has_pic?
    return !avatar_file_name.nil?
  end

  def display_name
    return "#{first_name} #{last_name}"
  end

end
