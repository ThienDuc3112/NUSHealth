import { Request, Response } from "express";
import { publicImageSchema } from "../types/image";
import { access, constants } from "node:fs";
import { join } from "node:path";

export const getPublicGif = async (req: Request, res: Response) => {
  const { data: id } = await publicImageSchema.safeParseAsync(req.params.id);
  if (!id)
    return res.status(400).json({ message: "id not a 4 character string" });

  const filePath = join(__dirname, "..", "..", "public", "gif", `${id}.gif`);

  access(filePath, constants.F_OK, (err) => {
    if (err) {
      console.error(err);
      return res.status(400).json({ message: "gif don't exist" });
    }
    return res.sendFile(filePath, (err) => {
      if (!err) return;
      console.error(err);
      return res.status(500).json({ message: "cannot send gif" });
    });
  });
};
