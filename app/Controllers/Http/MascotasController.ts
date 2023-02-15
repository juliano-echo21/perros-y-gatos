import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Mascota from "App/Models/Mascota";

export default class MascotasController {
  public async index({}: HttpContextContract) {}

  public async create({ request, response }: HttpContextContract) {
    try {
      const dataMascota = request.only([
        "codigo_animal",
        "nombre_animal",
        "especie",
        "raza",
        "genero",
        "edad",
      ]);
      const curCod = dataMascota.codigo_animal;
      const mascotaExistente = await this.getValidarMascotaExistente(curCod);

      if (mascotaExistente === 0) {
        await Mascota.create(dataMascota);
        response.status(200).json({ msg: "Registro hecho con éxito" });
      } else {
        response
          .status(400)
          .json({ msg: "Error, el codigo ya se encuentra registrado" });
      }
    } catch (error) {
      response.status(500).json({ msg: "Hubo un error,", error });
    }
  }

  private async getValidarMascotaExistente(
    codigo_animal: Number
  ): Promise<Number> {
    const total = await Mascota.query()
      .where({ codigo_animal: codigo_animal })
      .count("*")
      .from("mascotas");
    return parseInt(total[0]["count(*)"]);
  }

  public async getBySpecie({ request, response }: HttpContextContract) {
    const specie = request.params().specie;

    try {
      return await Mascota.query().where("especie", specie);
    } catch (error) {}
  }

  public async show({ request, response }: HttpContextContract) {
    try {
      return await Mascota.all();
    } catch (error) {
      response.status(500).json({ msg: "hubo un error", error });
    }
  }

  public async getByAge({ request, response }: HttpContextContract) {
    // const age = request.params().id;
    try {
      return await Mascota.query().where("edad", "<", 8);
    } catch (error) {
      response.status(500).json({ msg: "hubo un error", error });
    }
  }

  public async update({ request, response }: HttpContextContract) {
    const id = request.params().id;
    const mascota = request.all();

    try {
      await Mascota.query().where("codigo_animal", id).update({
        nombre_animal: mascota.nombre_animal,
        especie: mascota.especie,
        raza: mascota.raza,
        genero: mascota.genero,
        edad: mascota.edad,
      });

      response
        .status(200)
        .json({ msg: "Se ha actualizado con exito la mascota con id " + id });
    } catch (error) {
      response.status(400).json({ msg: error });
    }
  }

  public async delete({ request, response }: HttpContextContract) {
    const id = request.params().id;

    try {
      await Mascota.query().where("codigo_animal", id).delete();
      response.status(200).json({
        msg: "Se ha borrado la mascota con codigo " + id,
      });
    } catch (error) {
      response.status(400).json({
        msg: error,
      });
    }
  }
}
