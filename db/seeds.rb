puts "Clearing old data..."
# User.destroy_all
# Log.destroy_all
# Follow.destroy_all
# Site.destroy_all

puts "🌱 Seeding Users"

u1 = User.create(name: Faker::FunnyName.name, certification_level: "Open Water Diver", certification_date: Faker::Date.between(from: '2003-09-23', to: '2021-09-25'), homebase: Faker::Games::Witcher.location, password: "password")

u2 = User.create(name: Faker::FunnyName.name, certification_level: "Advanced Open Water Diver", certification_date: Faker::Date.between(from: '2003-09-23', to: '2021-09-25'), homebase: Faker::Games::Witcher.location, password: "password")

u3 = User.create(name: Faker::FunnyName.name, certification_level: "Dive Master", certification_date: Faker::Date.between(from: '2003-09-23', to: '2021-09-25'), homebase: Faker::Games::Witcher.location, password: "password")

u4 = User.create(name: Faker::FunnyName.name, certification_level: "Advanced Open Water Diver", certification_date: Faker::Date.between(from: '2003-09-23', to: '2021-09-25'), homebase: Faker::Games::Witcher.location, password: "password")

u5 = User.create(name: Faker::FunnyName.name, certification_level: "Open Water Diver", certification_date: Faker::Date.between(from: '2003-09-23', to: '2021-09-25'), homebase: Faker::Games::Witcher.location, password: "password")

puts "🌱 Seeding Sites"

s1 = Site.create(name: Faker::Lorem.sentence(word_count: 3), location: Faker::Nation.capital_city, lat: rand(1...100), long: rand(1...100))

s2 = Site.create(name: Faker::Lorem.sentence(word_count: 3), location: Faker::Nation.capital_city, lat: rand(1...100), long: rand(1...100))

s3 = Site.create(name: Faker::Lorem.sentence(word_count: 3), location: Faker::Nation.capital_city, lat: rand(1...100), long: rand(1...100))

s4 = Site.create(name: Faker::Lorem.sentence(word_count: 3), location: Faker::Nation.capital_city, lat: rand(1...100), long: rand(1...100))

s5 = Site.create(name: Faker::Lorem.sentence(word_count: 3), location: Faker::Nation.capital_city, lat: rand(1...100), long: rand(1...100))

puts "🌱 Seeding Logs"

Log.create(
    notes: Faker::Lorem.sentence(word_count: 5), 
    depth: rand(20...100), 
    bottom_time: '01:00', 
    bottom_temp: rand(60...85), 
    suit_thickness: rand(5...15), 
    weight: rand(6...25), 
    time_in: '01:00', 
    time_out: '02:00', 
    boat: false, 
    fresh: true, 
    date: '2020-01-06', 
    divemaster: Faker::FunnyName.name, 
    dive_budy:Faker::FunnyName.name, 
    signature: "signature", 
    user_id: u1.id, 
    site_id: s1.id)

Log.create(
    notes: Faker::Lorem.sentence(word_count: 5), 
    depth: rand(20...100), 
    bottom_time: '01:00', 
    bottom_temp: rand(60...85), 
    suit_thickness: rand(5...15), 
    weight: rand(6...25), 
    time_in: '02:00', 
    time_out: '03:00', 
    boat: false, 
    fresh: true, 
    date: '2020-02-07', 
    divemaster: Faker::FunnyName.name, 
    dive_budy:Faker::FunnyName.name, 
    signature: "signature", 
    user_id: u2.id, 
    site_id: s2.id)

Log.create(
    notes: Faker::Lorem.sentence(word_count: 5), 
    depth: rand(20...100), 
    bottom_time: '01:00', 
    bottom_temp: rand(60...85), 
    suit_thickness: rand(5...15), 
    weight: rand(6...25), 
    time_in: '03:00', 
    time_out: '04:00',
    boat: true, 
    fresh: false, 
    date: '2019-02-09', 
    divemaster: Faker::FunnyName.name, 
    dive_budy:Faker::FunnyName.name, 
    signature: "signature", 
    user_id: u3.id, 
    site_id: s3.id)

Log.create(
    notes: Faker::Lorem.sentence(word_count: 5), 
    depth: rand(20...100), 
    bottom_time: '01:00', 
    bottom_temp: rand(60...85), 
    suit_thickness: rand(5...15), 
    weight: rand(6...25), 
    time_in: '04:00', 
    time_out: '05:00', 
    boat: false, 
    fresh: true, 
    date: '2017-05-12', 
    divemaster: Faker::FunnyName.name, 
    dive_budy:Faker::FunnyName.name, 
    signature: "signature", 
    user_id: u4.id, 
    site_id: s4.id)

Log.create(
    notes: Faker::Lorem.sentence(word_count: 5), 
    depth: rand(20...100), 
    bottom_time: '01:00', 
    bottom_temp: rand(60...85), 
    suit_thickness: rand(5...15), 
    weight: rand(6...25), 
    time_in: '01:00', 
    time_out: '02:00', 
    boat: true, 
    fresh: false, 
    date: '2019-08-10', 
    divemaster: Faker::FunnyName.name, 
    dive_budy:Faker::FunnyName.name, 
    signature: "signature", 
    user_id: u5.id, 
    site_id: s5.id)


puts "🌱 Seeding Follows"

Follow.create(follower_id: u1.id , followee_id: u2.id)
Follow.create(follower_id: u2.id, followee_id: u3.id)
Follow.create(follower_id: u3.id, followee_id: u4.id)
Follow.create(follower_id: u4.id, followee_id: u5.id)
Follow.create(follower_id: u5.id, followee_id: u1.id)
Follow.create(follower_id: u1.id, followee_id: u3.id)




puts "🌱 Seeding Complete!!!"