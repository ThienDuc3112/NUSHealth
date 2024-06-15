import { db } from "@/db/client"
import { planTable } from "@/schema/planModel"

export const getLocalPlans = async () => {
  const plans = await db.select().from(planTable);
  console.log(`Helper plans: ${JSON.stringify(plans, null, 2)}`)
  return plans;
}
