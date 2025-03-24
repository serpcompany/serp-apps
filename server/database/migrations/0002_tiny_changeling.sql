PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_conversations` (
	`id` text PRIMARY KEY NOT NULL,
	`userId` text NOT NULL,
	`teamId` text NOT NULL,
	`title` text DEFAULT 'New Conversation' NOT NULL,
	`model` text DEFAULT 'gpt-4o-mini' NOT NULL,
	`created_at` integer,
	`updated_at` integer,
	FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`teamId`) REFERENCES `teams`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_conversations`("id", "userId", "teamId", "title", "model", "created_at", "updated_at") SELECT "id", "userId", "teamId", "title", "model", "created_at", "updated_at" FROM `conversations`;--> statement-breakpoint
DROP TABLE `conversations`;--> statement-breakpoint
ALTER TABLE `__new_conversations` RENAME TO `conversations`;--> statement-breakpoint
PRAGMA foreign_keys=ON;