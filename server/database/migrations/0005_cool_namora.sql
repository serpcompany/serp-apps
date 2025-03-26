CREATE TABLE `url_analytics` (
	`id` text PRIMARY KEY NOT NULL,
	`urlId` text NOT NULL,
	`userId` text NOT NULL,
	`teamId` text NOT NULL,
	`country` text,
	`city` text,
	`device` text,
	`device_type` text,
	`os` text,
	`browser` text,
	`browser_version` text,
	`referrer` text,
	`referrer_domain` text,
	`ip` text,
	`user_agent` text,
	`created_at` integer,
	FOREIGN KEY (`urlId`) REFERENCES `urls`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`teamId`) REFERENCES `teams`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
ALTER TABLE `urls` ADD `shortcode` text NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX `urls_shortcode_unique` ON `urls` (`shortcode`);