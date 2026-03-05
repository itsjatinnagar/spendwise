CREATE TABLE `accounts` (
	`id` text(36) PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`type` integer NOT NULL,
	`currency` text NOT NULL,
	`balance` real DEFAULT 0 NOT NULL,
	`credit_limit` real,
	`status` integer NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `categories` (
	`id` text(36) PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`type` integer NOT NULL,
	`icon` text,
	`color` text NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `import_sessions` (
	`id` text(36) PRIMARY KEY NOT NULL,
	`file_name` text NOT NULL,
	`status` integer NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `invest_txns` (
	`type` integer NOT NULL,
	`txn_id` text NOT NULL,
	`account_id` text NOT NULL,
	FOREIGN KEY (`txn_id`) REFERENCES `transactions`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`account_id`) REFERENCES `accounts`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `loan_txns` (
	`loan_id` text NOT NULL,
	`txn_id` text NOT NULL,
	`created_at` text NOT NULL,
	FOREIGN KEY (`loan_id`) REFERENCES `loans`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`txn_id`) REFERENCES `transactions`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `loans` (
	`id` text(36) PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`type` integer NOT NULL,
	`amount` real NOT NULL,
	`repaid` real DEFAULT 0 NOT NULL,
	`status` integer NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `parsed_txns` (
	`id` text(36) PRIMARY KEY NOT NULL,
	`session_id` text NOT NULL,
	`data` text NOT NULL,
	`user_data` text NOT NULL,
	`status` integer NOT NULL,
	`created_at` text NOT NULL,
	FOREIGN KEY (`session_id`) REFERENCES `import_sessions`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `transactions` (
	`id` text(36) PRIMARY KEY NOT NULL,
	`account_id` text NOT NULL,
	`category_id` text NOT NULL,
	`type` integer NOT NULL,
	`amount` real NOT NULL,
	`description` text NOT NULL,
	`note` text,
	`timestamp` text NOT NULL,
	`source` integer NOT NULL,
	`related_txn_id` text,
	`created_at` text NOT NULL,
	FOREIGN KEY (`account_id`) REFERENCES `accounts`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`related_txn_id`) REFERENCES `transactions`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `transfers` (
	`id` text(36) PRIMARY KEY NOT NULL,
	`source_txn_id` text NOT NULL,
	`dest_txn_id` text NOT NULL,
	`created_at` text NOT NULL,
	FOREIGN KEY (`source_txn_id`) REFERENCES `transactions`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`dest_txn_id`) REFERENCES `transactions`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` text(36) PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`currency` text NOT NULL,
	`created_at` text NOT NULL
);
