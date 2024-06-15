import { db } from "@/db/client"
import { planTable } from "@/schema/planModel"

export const getLocalPlans = async () => {
  console.log(`===== Helper plans called =====`)
  return await db.select().from(planTable);
}
