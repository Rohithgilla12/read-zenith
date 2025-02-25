-- CreateEnum
CREATE TYPE "subscription_tier" AS ENUM ('FREE', 'PREMIUM');

-- CreateEnum
CREATE TYPE "saved_item_type" AS ENUM ('BOOKMARK', 'READING_LIST');

-- CreateEnum
CREATE TYPE "delivery_status" AS ENUM ('PENDING', 'PROCESSING', 'SENT', 'FAILED');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "image" TEXT,
    "role" TEXT NOT NULL DEFAULT 'user',
    "kindle_email" TEXT,
    "stripe_customer_id" TEXT,
    "notification_prefs" JSONB NOT NULL DEFAULT '{}',

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "saved_items" (
    "id" TEXT NOT NULL,
    "type" "saved_item_type" NOT NULL,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "content" TEXT,
    "summary" TEXT,
    "image_url" TEXT,
    "favicon" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_read" BOOLEAN NOT NULL DEFAULT false,
    "is_archived" BOOLEAN NOT NULL DEFAULT false,
    "reading_time" INTEGER,
    "user_id" TEXT NOT NULL,
    "folder_id" TEXT,

    CONSTRAINT "saved_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "folders" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "color" TEXT,
    "icon" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "user_id" TEXT NOT NULL,
    "parent_id" TEXT,

    CONSTRAINT "folders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tags" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "color" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tags_on_items" (
    "item_id" TEXT NOT NULL,
    "tag_id" TEXT NOT NULL,
    "assigned_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tags_on_items_pkey" PRIMARY KEY ("item_id","tag_id")
);

-- CreateTable
CREATE TABLE "bundles" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "bundles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bundles_on_items" (
    "bundle_id" TEXT NOT NULL,
    "item_id" TEXT NOT NULL,
    "added_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "bundles_on_items_pkey" PRIMARY KEY ("bundle_id","item_id")
);

-- CreateTable
CREATE TABLE "delivery_history" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "delivery_status" NOT NULL,
    "email_to" TEXT NOT NULL,
    "epub_url" TEXT,
    "error_msg" TEXT,
    "bundle_id" TEXT,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "delivery_history_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "saved_items_user_id_idx" ON "saved_items"("user_id");

-- CreateIndex
CREATE INDEX "saved_items_folder_id_idx" ON "saved_items"("folder_id");

-- CreateIndex
CREATE UNIQUE INDEX "saved_items_user_id_url_key" ON "saved_items"("user_id", "url");

-- CreateIndex
CREATE INDEX "folders_user_id_idx" ON "folders"("user_id");

-- CreateIndex
CREATE INDEX "folders_parent_id_idx" ON "folders"("parent_id");

-- CreateIndex
CREATE UNIQUE INDEX "folders_user_id_name_parent_id_key" ON "folders"("user_id", "name", "parent_id");

-- CreateIndex
CREATE INDEX "tags_user_id_idx" ON "tags"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "tags_user_id_name_key" ON "tags"("user_id", "name");

-- CreateIndex
CREATE INDEX "tags_on_items_tag_id_idx" ON "tags_on_items"("tag_id");

-- CreateIndex
CREATE INDEX "tags_on_items_item_id_idx" ON "tags_on_items"("item_id");

-- CreateIndex
CREATE INDEX "bundles_user_id_idx" ON "bundles"("user_id");

-- CreateIndex
CREATE INDEX "bundles_on_items_bundle_id_idx" ON "bundles_on_items"("bundle_id");

-- CreateIndex
CREATE INDEX "bundles_on_items_item_id_idx" ON "bundles_on_items"("item_id");

-- CreateIndex
CREATE INDEX "delivery_history_user_id_idx" ON "delivery_history"("user_id");

-- CreateIndex
CREATE INDEX "delivery_history_bundle_id_idx" ON "delivery_history"("bundle_id");

-- AddForeignKey
ALTER TABLE "saved_items" ADD CONSTRAINT "saved_items_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "saved_items" ADD CONSTRAINT "saved_items_folder_id_fkey" FOREIGN KEY ("folder_id") REFERENCES "folders"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "folders" ADD CONSTRAINT "folders_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "folders" ADD CONSTRAINT "folders_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "folders"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tags" ADD CONSTRAINT "tags_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tags_on_items" ADD CONSTRAINT "tags_on_items_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "saved_items"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tags_on_items" ADD CONSTRAINT "tags_on_items_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bundles" ADD CONSTRAINT "bundles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bundles_on_items" ADD CONSTRAINT "bundles_on_items_bundle_id_fkey" FOREIGN KEY ("bundle_id") REFERENCES "bundles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bundles_on_items" ADD CONSTRAINT "bundles_on_items_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "saved_items"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "delivery_history" ADD CONSTRAINT "delivery_history_bundle_id_fkey" FOREIGN KEY ("bundle_id") REFERENCES "bundles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "delivery_history" ADD CONSTRAINT "delivery_history_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
