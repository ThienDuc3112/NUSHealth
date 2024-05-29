import { relations } from "drizzle-orm";
import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  primaryKey,
  serial,
  text,
  varchar,
} from "drizzle-orm/pg-core";
import { userTable } from "../user/userModel";
import { exerciseToRoutineTable } from "./exerciseToRoutineModel";

export const bodyPartsEnum = pgEnum("body_parts", [
  "back",
  "cardio",
  "chest",
  "lower arms",
  "lower legs",
  "neck",
  "shoulders",
  "upper arms",
  "upper legs",
  "waist",
]);

export const equipmentsEnum = pgEnum("equipments", [
  "assisted",
  "band",
  "barbell",
  "body weight",
  "bosu ball",
  "cable",
  "dumbbell",
  "elliptical machine",
  "ez barbell",
  "hammer",
  "kettlebell",
  "leverage machine",
  "medicine ball",
  "olympic barbell",
  "resistance band",
  "roller",
  "rope",
  "skierg machine",
  "sled machine",
  "smith machine",
  "stability ball",
  "stationary bike",
  "stepmill machine",
  "tire",
  "trap bar",
  "upper body ergometer",
  "weighted",
  "wheel roller",
]);

export const musclesEnum = pgEnum("targets", [
  "abductors",
  "abs",
  "adductors",
  "biceps",
  "calves",
  "cardiovascular system",
  "delts",
  "forearms",
  "glutes",
  "hamstrings",
  "lats",
  "levator scapulae",
  "pectorals",
  "quads",
  "serratus anterior",
  "spine",
  "traps",
  "triceps",
  "upper back",
]);

export const exerciseTable = pgTable("exercises", {
  id: serial("id").primaryKey(),
  initialId: integer("initial_id"),
  bodyPart: bodyPartsEnum("bodypart").notNull(),
  equipment: equipmentsEnum("equipment").default("body weight"),
  name: varchar("name").notNull(),
  target: musclesEnum("target").notNull(),
  instruction: text("instruction"),
  isDefaultExercise: boolean("id_default_exercise").notNull().default(false),
  creatorId: integer("creator_id").references(() => userTable.id, {
    onDelete: "set null",
  }),
});

export const secondaryMuscleTable = pgTable(
  "secondary_muscles",
  {
    exercisesId: integer("exercise_id")
      .references(() => exerciseTable.id, {
        onDelete: "cascade",
      })
      .notNull(),
    muscle: musclesEnum("muscle").notNull(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.exercisesId, table.muscle] }),
  })
);

export const exercisePhotoTable = pgTable(
  "exercise_photos",
  {
    exercisesId: integer("exercise_id")
      .references(() => exerciseTable.id, {
        onDelete: "cascade",
      })
      .notNull(),
    url: varchar("url").notNull(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.exercisesId, table.url] }),
  })
);

export const exerciseRelation = relations(exerciseTable, ({ many, one }) => ({
  secondaryMuscles: many(secondaryMuscleTable),
  photos: many(exercisePhotoTable),
  creator: one(userTable),
  routine: many(exerciseToRoutineTable),
}));

export const exercisePhotoRelation = relations(
  exercisePhotoTable,
  ({ one }) => ({
    exercise: one(exerciseTable),
  })
);

export const secondaryMuscleRelation = relations(
  exercisePhotoTable,
  ({ one }) => ({
    exercise: one(exerciseTable),
  })
);
