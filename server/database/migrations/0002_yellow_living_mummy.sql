CREATE TABLE `passkeys` (
	`id` text PRIMARY KEY NOT NULL,
	`userId` text NOT NULL,
	`name` text,
	`external_id` text NOT NULL,
	`public_key` blob NOT NULL,
	`sign_count` integer DEFAULT 0 NOT NULL,
	`created_at` integer,
	`updated_at` integer,
	FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `passkeys_external_id_unique` ON `passkeys` (`external_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `passkeys_public_key_unique` ON `passkeys` (`public_key`);