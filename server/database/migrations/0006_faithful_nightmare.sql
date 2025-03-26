CREATE TABLE `tasks` (
	`id` text PRIMARY KEY NOT NULL,
	`createdById` text NOT NULL,
	`teamId` text NOT NULL,
	`assignedToId` text NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`status` text DEFAULT 'pending' NOT NULL,
	`due_date` integer,
	`created_at` integer,
	`updated_at` integer,
	FOREIGN KEY (`createdById`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`teamId`) REFERENCES `teams`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`assignedToId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
