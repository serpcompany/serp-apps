CREATE TABLE `stripe_webhook_events` (
	`id` text PRIMARY KEY NOT NULL,
	`teamId` text NOT NULL,
	`eventType` text NOT NULL,
	`eventData` text NOT NULL,
	`created_at` integer,
	FOREIGN KEY (`teamId`) REFERENCES `teams`(`id`) ON UPDATE no action ON DELETE cascade
);
