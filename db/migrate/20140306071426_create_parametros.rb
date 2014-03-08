class CreateParametros < ActiveRecord::Migration
  def change
    create_table :parametros do |t|
      t.integer :bottomsimil
      t.integer :topsimil
      t.integer :tension

      t.timestamps
    end
  end
end
