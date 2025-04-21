CREATE TABLE "auto" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"make" text NOT NULL,
	"model" text NOT NULL,
	"year" integer NOT NULL,
	"condition" text NOT NULL,
	"mileage" integer,
	"price" integer NOT NULL,
	"description" text,
	"estimated_price" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "listings" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"price" numeric(10, 2) NOT NULL,
	"image_url" text NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "cart" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" text NOT NULL,
	"car_id" text NOT NULL,
	"quantity" integer DEFAULT 1,
	"created_at" timestamp DEFAULT now()
);
