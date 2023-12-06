/*
  Warnings:

  - A unique constraint covering the columns `[user_id,name,equipment,unilateral]` on the table `exercises` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "exercises_name_equipment_unilateral_key";

-- CreateIndex
CREATE UNIQUE INDEX "exercises_user_id_name_equipment_unilateral_key" ON "exercises"("user_id", "name", "equipment", "unilateral");
