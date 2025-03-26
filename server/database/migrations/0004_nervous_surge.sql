ALTER TABLE `urls` RENAME COLUMN "description" TO "comments";--> statement-breakpoint
ALTER TABLE `urls` DROP COLUMN `title`;