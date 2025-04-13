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
