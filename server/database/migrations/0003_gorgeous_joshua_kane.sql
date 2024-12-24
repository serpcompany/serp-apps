CREATE TABLE `passkey-challenges` (
	`id` text NOT NULL,
	`challenge` text NOT NULL,
	`expires_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `passkey-challenges_id_unique` ON `passkey-challenges` (`id`);