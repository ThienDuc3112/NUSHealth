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
  "abductors", // none
  "abs",
  "adductors",
  "biceps",
  "calves",
  "cardiovascular system", // not a muscle
  "delts", // deltoids
  "forearms", // forearm
  "glutes", // gluteal
  "hamstrings", // hamstring
  "lats", // lower back
  "levator scapulae", // neck
  "pectorals", // chest
  "quads", // tibialis?
  "serratus anterior", // none
  "spine", // none
  "traps", // trapezius
  "triceps",
  "upper back",
] as const;

export const exerciseTable = sqliteTable("exercises", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  initialId: text("initial_id"),
  name: text("name", { length: 255 }).notNull(),
  bodyPart: text("body_part").notNull(),
  equipment: text("equipment").default("body weight"),
  target: text("target").notNull(),
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
    muscle: text("muscle").notNull(),
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
    url: text("url").notNull(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.exercisesId, table.url] }),
  })
);
