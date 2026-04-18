CREATE TABLE `accounts` (
	`id` text(36) PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`type` integer NOT NULL,
	`bank` text,
	`metadata` text,
	`status` integer NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `categories` (
	`id` text(36) PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`type` integer NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `parsed_txns` (
	`id` text(36) PRIMARY KEY NOT NULL,
	`statement_id` text NOT NULL,
	`data` text NOT NULL,
	`status` integer NOT NULL,
	`created_at` text NOT NULL,
	FOREIGN KEY (`statement_id`) REFERENCES `statements`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `statements` (
	`id` text(36) PRIMARY KEY NOT NULL,
	`file_name` text NOT NULL,
	`status` integer NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `transactions` (
	`id` text(36) PRIMARY KEY NOT NULL,
	`account_id` text NOT NULL,
	`category_id` text NOT NULL,
	`related_acc` text,
	`related_txn` text,
	`amount` integer NOT NULL,
	`description` text NOT NULL,
	`fingerprint` text NOT NULL,
	`note` text,
	`timestamp` text NOT NULL,
	`created_at` text NOT NULL,
	FOREIGN KEY (`account_id`) REFERENCES `accounts`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`related_acc`) REFERENCES `accounts`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`related_txn`) REFERENCES `transactions`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `transactions_fingerprint_unique` ON `transactions` (`fingerprint`);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` text(36) PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);