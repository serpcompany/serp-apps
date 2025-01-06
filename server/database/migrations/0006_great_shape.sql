PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_users` (
	`id` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`name` text NOT NULL,
	`avatarUrl` text DEFAULT '',
	`hashedPassword` text,
	`banned` integer DEFAULT false NOT NULL,
	`bannedReason` text,
	`emailVerified` integer DEFAULT false NOT NULL,
	`phoneNumber` text,
	`bannedUntil` integer,
	`onboarded` integer DEFAULT false NOT NULL,
	`lastSelectedTeamId` text,
	`theme` text DEFAULT 'system',
	`emailNotifications` integer DEFAULT true,
	`pushNotifications` integer DEFAULT true,
	`created_at` integer,
	`updated_at` integer,
	`last_active` integer
);
--> statement-breakpoint
INSERT INTO `__new_users`("id", "email", "name", "avatarUrl", "hashedPassword", "banned", "bannedReason", "emailVerified", "phoneNumber", "bannedUntil", "onboarded", "lastSelectedTeamId", "theme", "emailNotifications", "pushNotifications", "created_at", "updated_at", "last_active") SELECT "id", "email", "name", "avatarUrl", "hashedPassword", "banned", "bannedReason", "emailVerified", "phoneNumber", "bannedUntil", "onboarded", "lastSelectedTeamId", "theme", "emailNotifications", "pushNotifications", "created_at", "updated_at", "last_active" FROM `users`;--> statement-breakpoint
DROP TABLE `users`;--> statement-breakpoint
ALTER TABLE `__new_users` RENAME TO `users`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_phoneNumber_unique` ON `users` (`phoneNumber`);