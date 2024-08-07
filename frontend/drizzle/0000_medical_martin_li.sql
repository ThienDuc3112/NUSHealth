CREATE TABLE `exercise_photos` (
	`exercise_id` integer,
	`url` text NOT NULL,
	PRIMARY KEY(`exercise_id`, `url`),
	FOREIGN KEY (`exercise_id`) REFERENCES `exercises`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `exercises` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`initial_id` text,
	`name` text(255) NOT NULL,
	`equipment` text DEFAULT 'body weight',
	`target` text NOT NULL,
	`instruction` text,
	`id_default_exercise` integer DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE `targeted_muscles` (
	`exercise_id` integer,
	`muscle` text NOT NULL,
	PRIMARY KEY(`exercise_id`, `muscle`),
	FOREIGN KEY (`exercise_id`) REFERENCES `exercises`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `exercise_to_routine` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`routine_id` integer NOT NULL,
	`exercise_id` integer NOT NULL,
	`order` integer NOT NULL,
	`reps` integer NOT NULL,
	`sets` integer NOT NULL,
	`kg` real,
	FOREIGN KEY (`routine_id`) REFERENCES `routines`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`exercise_id`) REFERENCES `exercises`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `history` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`time` integer
);
--> statement-breakpoint
CREATE TABLE `history_set` (
	`id` integer,
	`reps` integer NOT NULL,
	`history_key` integer NOT NULL,
	`exercise_id` integer NOT NULL,
	FOREIGN KEY (`history_key`) REFERENCES `history`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`exercise_id`) REFERENCES `exercises`(`id`) ON UPDATE no action ON DELETE no action
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
--> statement-breakpoint
CREATE INDEX `routine_index` ON `exercise_to_routine` (`routine_id`);--> statement-breakpoint
CREATE INDEX `history_key_idx` ON `history_set` (`history_key`);--> statement-breakpoint
CREATE INDEX `plan_index` ON `routine_to_plan` (`plan_id`);