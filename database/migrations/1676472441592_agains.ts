import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class Agains extends BaseSchema {
  protected tableName = "mascotas";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.integer("codigo_animal").primary().unsigned();
      table.string("nombre_animal").notNullable();
      table.integer("especie").notNullable();
      table.integer("raza").notNullable();
      table.integer("genero").notNullable();
      table.integer("edad").notNullable();
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
