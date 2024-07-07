/**
 * This file contains the root router of lobe chat tRPC-backend
 */
import { publicProcedure, router } from '@/server/trpc';

import { uploadRouter } from './edge/upload';

export const edgeRouter = router({
  healthcheck: publicProcedure.query(() => "i'm live!"),
  upload: uploadRouter,
});

export type EdgeRouter = typeof edgeRouter;
