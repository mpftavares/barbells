-- AlterTable
ALTER TABLE "schema" ALTER COLUMN "number" DROP DEFAULT;
DROP SEQUENCE "schema_number_seq";

-- AlterTable
ALTER TABLE "sets" ALTER COLUMN "number" DROP DEFAULT;
DROP SEQUENCE "sets_number_seq";
