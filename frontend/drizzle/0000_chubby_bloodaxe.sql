CREATE TABLE `exercise_photos` (
	`exercise_id` integer,
	`url` text,
	PRIMARY KEY(`exercise_id`, `url`),
	FOREIGN KEY (`exercise_id`) REFERENCES `exercises`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `exercises` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`initial_id` text,
	`body_part` text NOT NULL,
	`equipment` text DEFAULT 'body weight',
	`name` text(255) NOT NULL,
	`target` text NOT NULL,
	`instruction` text,
	`id_default_exercise` integer DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE `secondary_muscles` (
	`exercise_id` integer,
	`muscle` text,
	PRIMARY KEY(`exercise_id`, `muscle`),
	FOREIGN KEY (`exercise_id`) REFERENCES `exercises`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `exercise_to_routine` (
	`routine_id` integer NOT NULL,
	`exercise_id` integer NOT NULL,
	`order` integer NOT NULL,
	`reps` integer,
	`sets` integer,
	`kg` real,
	PRIMARY KEY(`exercise_id`, `routine_id`),
	FOREIGN KEY (`routine_id`) REFERENCES `routines`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`exercise_id`) REFERENCES `exercises`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `plans` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`description` text
);
--> statement-breakpoint
CREATE TABLE `routines` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`rest_time` integer
);
--> statement-breakpoint
CREATE TABLE `routine_to_plan` (
	`routine_id` integer NOT NULL,
	`plan_id` integer NOT NULL,
	PRIMARY KEY(`plan_id`, `routine_id`),
	FOREIGN KEY (`routine_id`) REFERENCES `routines`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`plan_id`) REFERENCES `plans`(`id`) ON UPDATE no action ON DELETE cascade
);
