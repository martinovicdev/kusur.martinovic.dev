import { createTRPCRouter } from "./trpc";
import {calculationRouter} from "./routers/calculation";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  calculateRest: calculationRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
