import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";
import { formatNumberToString } from "../../../utils/numberOperations";

const rate = 7.5345;
export const calculationRouter = createTRPCRouter({
  calculateRest: publicProcedure
    .input(
      z.object({
        priceEur: z.number().nonnegative(),
        givenEur: z.number().nonnegative(),
        givenKn: z.number().nonnegative(),
      })
    )
    .query(({ input }) => {
      const returnSum = input.priceEur - input.givenEur - input.givenKn / rate;
      const returnSumEur = formatNumberToString(
        Math.abs(Math.round(returnSum * 100) / 100)
      );
      const returnSumKn = formatNumberToString(
        Math.abs(Math.round(returnSum * rate * 100) / 100)
      );

      return {
        resultText:
          returnSum <= 0
            ? `Preostalo za vratiti kupcu: ${returnSumEur} €, tj. ${returnSumKn} kn`
            : `Kupac duguje: ${returnSumEur} €, tj. ${returnSumKn} kn`,
      };
    }),
});
