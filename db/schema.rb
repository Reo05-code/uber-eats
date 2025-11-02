ActiveRecord::Schema[7.2].define(version: 2025_11_02_194942) do
  create_table "foods", force: :cascade do |t|
    t.integer "restaurant_id", null: false
    t.string "name", null: false
    t.integer "price", null: false
    t.text "description", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["restaurant_id"], name: "index_foods_on_restaurant_id"
  end

  create_table "line_foods", force: :cascade do |t|
    t.integer "food_id", null: false
    t.integer "restaurant_id", null: false
    t.integer "order_id"
    t.integer "count", default: 0, null: false
    t.boolean "active", default: false, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["food_id"], name: "index_line_foods_on_food_id"
    t.index ["order_id"], name: "index_line_foods_on_order_id"
    t.index ["restaurant_id"], name: "index_line_foods_on_restaurant_id"
  end

  create_table "orders", force: :cascade do |t|
    t.integer "total_price", default: 0, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "restaurants", force: :cascade do |t|
    t.string "name", null: false
    t.integer "fee", default: 0, null: false
    t.integer "time_required", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "foods", "restaurants"
  add_foreign_key "line_foods", "foods"
  add_foreign_key "line_foods", "orders"
  add_foreign_key "line_foods", "restaurants"
end
