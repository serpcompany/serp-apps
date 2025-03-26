ALTER TABLE `tasks` ADD `priority` text DEFAULT 'low' NOT NULL;--> statement-breakpoint
ALTER TABLE `tasks` DROP COLUMN `status`;