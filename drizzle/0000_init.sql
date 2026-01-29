CREATE TABLE `budgets` (
	`id` text PRIMARY KEY NOT NULL,
	`category_id` text NOT NULL,
	`amount` real NOT NULL,
	`year` text NOT NULL,
	`month` text NOT NULL,
	`created_at` text NOT NULL,
	FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `categories` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`type` integer NOT NULL,
	`parent_id` text,
	`created_at` text NOT NULL,
	FOREIGN KEY (`parent_id`) REFERENCES `categories`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE TABLE `loans` (
	`id` text PRIMARY KEY NOT NULL,
	`person` text NOT NULL,
	`type` integer NOT NULL,
	`repaid` real NOT NULL,
	`status` integer NOT NULL,
	`note` text,
	`transaction_id` text NOT NULL,
	`created_at` text NOT NULL,
	FOREIGN KEY (`transaction_id`) REFERENCES `transactions`(`id`) ON UPDATE no action ON DELETE restrict
);
--> statement-breakpoint
CREATE TABLE `transactions` (
	`id` text NOT NULL,
	`wallet_id` text NOT NULL,
	`category_id` text NOT NULL,
	`type` integer NOT NULL,
	`amount` real NOT NULL,
	`note` text,
	`timestamp` text NOT NULL,
	`related_txn` text,
	`created_at` text NOT NULL,
	FOREIGN KEY (`wallet_id`) REFERENCES `wallets`(`id`) ON UPDATE no action ON DELETE restrict,
	FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON UPDATE no action ON DELETE set null,
	FOREIGN KEY (`related_txn`) REFERENCES `transactions`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE TABLE `transfers` (
	`id` text PRIMARY KEY NOT NULL,
	`from_wallet` text NOT NULL,
	`to_wallet` text NOT NULL,
	`amount` real NOT NULL,
	`timestamp` text NOT NULL,
	`created_at` text NOT NULL,
	FOREIGN KEY (`from_wallet`) REFERENCES `wallets`(`id`) ON UPDATE no action ON DELETE restrict,
	FOREIGN KEY (`to_wallet`) REFERENCES `wallets`(`id`) ON UPDATE no action ON DELETE restrict
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`full_name` text NOT NULL,
	`email` text NOT NULL,
	`currency` text NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `wallets` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`type` integer NOT NULL,
	`initial_balance` real NOT NULL,
	`current_balance` real NOT NULL,
	`created_at` text NOT NULL
);
