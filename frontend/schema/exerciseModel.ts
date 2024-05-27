import { relations } from "drizzle-orm";
import { exerciseToRoutineTable } from "./exerciseToRoutineModel";
import {
  integer,
  primaryKey,
  sqliteTable,
  text,
} from "drizzle-orm/sqlite-core";

export const bodyPartsEnum = [
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
] as const;

export const equipmentsEnum = [
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
] as const;

export const musclesEnum = [
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
] as const;

export const exerciseTable = sqliteTable("exercises", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  initialId: text("initial_id"),
  bodyPart: text("body_part", { enum: bodyPartsEnum }).notNull(),
  equipment: text("equipment", { enum: equipmentsEnum }).default("body weight"),
  name: text("name", { length: 255 }).notNull(),
  target: text("target", { enum: musclesEnum }).notNull(),
  instruction: text("instruction"),
  isDefaultExercise: integer("id_default_exercise", { mode: "boolean" })
    .notNull()
    .default(false),
});

export const secondaryMuscleTable = sqliteTable(
  "secondary_muscles",
  {
    exercisesId: integer("exercise_id").references(() => exerciseTable.id, {
      onDelete: "cascade",
    }),
    muscle: text("muscle", { enum: musclesEnum }),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.exercisesId, table.muscle] }),
  })
);

export const exercisePhotoTable = sqliteTable(
  "exercise_photos",
  {
    exercisesId: integer("exercise_id").references(() => exerciseTable.id, {
      onDelete: "cascade",
    }),
    url: text("url"),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.exercisesId, table.url] }),
  })
);

export const exerciseRelation = relations(exerciseTable, ({ many, one }) => ({
  secondaryMuscles: many(secondaryMuscleTable),
  photos: many(exercisePhotoTable),
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
