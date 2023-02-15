import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class Ones extends BaseSchema {
  protected tableName = "mascotas";

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.timestamps(false);
    });
  }

  public async down() {
    // this.schema.dropTable(this.tableName)
    this.schema.alterTable(this.tableName, (table) => {
      table.timestamps(true);
    });
  }
}
