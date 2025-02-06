CREATE TABLE `subscriptions` (
	`id` text PRIMARY KEY NOT NULL,
	`customer_id` text,
	`price_id` text,
	`team_id` text,
	`user_id` text,
	`status` text NOT NULL,
	`metadata` text,
	`quantity` integer NOT NULL,
	`cancel_at_period_end` integer NOT NULL,
	`current_period_end` integer,
	`current_period_start` integer,
	`ended_at` integer,
	`cancel_at` integer,
	`trial_start` integer,
	`trial_end` integer,
	`created_at` integer,
	`updated_at` integer,
	FOREIGN KEY (`customer_id`) REFERENCES `customers`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`price_id`) REFERENCES `prices`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`team_id`) REFERENCES `teams`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
ALTER TABLE `users` ADD `proAccount` integer DEFAULT false NOT NULL;