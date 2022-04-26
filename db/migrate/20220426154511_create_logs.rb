class CreateLogs < ActiveRecord::Migration[7.0]
  def change
    create_table :logs do |t|
      t.string :notes
      t.integer :depth
      t.time :bottom_time
      t.integer :bottom_temp
      t.integer :suit_thickness
      t.integer :weight
      t.time :time_in
      t.time :time_out
      t.boolean :boat
      t.boolean :fresh
      t.date :date
      t.string :divemaster
      t.string :dive_budy
      t.string :signature
      t.belongs_to :user, null: false, foreign_key: true
      t.belongs_to :site, null: false, foreign_key: true

      t.timestamps
    end
  end
end
