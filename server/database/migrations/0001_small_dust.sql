CREATE TABLE `conversations` (
	`id` text PRIMARY KEY NOT NULL,
	`userId` text NOT NULL,
	`teamId` text NOT NULL,
	`title` text NOT NULL,
	`model` text NOT NULL,
	`created_at` integer,
	`updated_at` integer,
	FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`teamId`) REFERENCES `teams`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `messages` (
	`id` text PRIMARY KEY NOT NULL,
	`conversationId` text NOT NULL,
	`role` text DEFAULT 'user' NOT NULL,
	`content` text NOT NULL,
	`created_at` integer,
	FOREIGN KEY (`conversationId`) REFERENCES `conversations`(`id`) ON UPDATE no action ON DELETE cascade
);
