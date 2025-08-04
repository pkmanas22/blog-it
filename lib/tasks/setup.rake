desc "Sets up DB (development: drop, create, migrate, seed; production: migrate only)"

task setup: [:environment] do
  if Rails.env.production?
    puts "Production environment detected: running db:migrate only"
    Rake::Task["db:migrate"].invoke
  else
    Rake::Task["db:drop"].invoke
    Rake::Task["db:create"].invoke
    Rake::Task["db:migrate"].invoke
    Rake::Task["populate_with_sample_data"].invoke if Rails.env.development?
  end
end

desc "Populates database with sample data (development only)"

task populate_with_sample_data: [:environment] do
  if Rails.env.production?
    puts "Skipping deleting and populating sample data in production"
  else
    create_sample_data!
    puts "Sample data has been added"
  end
end

def create_sample_data!
  puts "Seeding with sample data..."

  org1 = create_organization!(name: "PixelCompute", domain: "px.com")
  org2 = create_organization!(name: "Gmail", domain: "gmail.com")

  user1 = create_user!(
    name: "Manas",
    email: "manas@px.com",
    password: "password",
    password_confirmation: "password",
    organization: org1
  )
  user2 = create_user!(
    name: "Manas",
    email: "manas@gmail.com",
    password: "password",
    password_confirmation: "password",
    organization: org2
  )

  cat1 = create_category!(name: "Tech", organization: org1)
  cat2 = create_category!(name: "News", organization: org1)
  cat3 = create_category!(name: "Tech", organization: org2)

  create_post!(
    user: user1,
    title: "Welcome to PixelCompute",
    description: "We process pixels at scale.",
    categories: [cat1, cat2],
    organization: org1
  )

  create_post!(
    user: user2,
    title: "Gmail Security Update",
    description: "Latest on Gmail's privacy features.",
    categories: [cat3],
    organization: org2
  )

  puts 'Done! You can login with either "manas@gmail.com" or "manas@px.com" using password "password"'
end


def create_organization!(options = {})
  defaults = {}
  attributes = defaults.merge(options)
  Organization.create!(attributes)
end

def create_user!(options = {})
  defaults = {
    password: 'password',
    password_confirmation: 'password'
  }
  attributes = defaults.merge(options)
  User.create!(attributes)
end

def create_category!(options = {})
  defaults = {}
  attributes = defaults.merge(options)
  Category.create!(attributes)
end

def create_post!(options = {})
  defaults = {}
  attributes = defaults.merge(options)
  Post.create!(attributes)
end
