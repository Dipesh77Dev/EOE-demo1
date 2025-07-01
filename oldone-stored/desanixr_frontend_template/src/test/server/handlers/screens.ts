import { rest } from 'msw';
import { nanoid } from 'nanoid';

import { API_URL } from '@/config';

import { db, persistDb } from '../db';
import { requireAuth, requireAdmin, delayedResponse } from '../utils';

type ScreenBody = {
  screenName: string;
  imageId: string;
  imageTitle: string;
  description: string;
};

export const screensHandlers = [
  rest.get(`${API_URL}/screens`, (req, res, ctx) => {
    try {
      // const user = requireAuth(req);
      const result = db.screen.findMany({});
      return delayedResponse(ctx.json(result));
    } catch (error: any) {
      return delayedResponse(
        ctx.status(400),
        ctx.json({ message: error?.message || 'Server Error' })
      );
    }
  }),

  rest.get(`${API_URL}/screens/:screenId`, (req, res, ctx) => {
    try {
      // const user = requireAuth(req);
      const { screenId } = req.params;
      const result = db.screen.findFirst({
        where: {
          _id: {
            equals: screenId,
          },
        },
      });
      return delayedResponse(ctx.json(result));
    } catch (error: any) {
      return delayedResponse(
        ctx.status(400),
        ctx.json({ message: error?.message || 'Server Error' })
      );
    }
  }),

  rest.post<ScreenBody>(`${API_URL}/screens`, (req, res, ctx) => {
    try {
      const user = requireAuth(req);
      const data = req.body;
      requireAdmin(user);
      const result = db.screen.create({
        _id: nanoid(),
        createdAt: Date.now(),
        ...data,
      });
      persistDb('screen');
      return delayedResponse(ctx.json(result));
    } catch (error: any) {
      return delayedResponse(
        ctx.status(400),
        ctx.json({ message: error?.message || 'Server Error' })
      );
    }
  }),

  rest.patch<ScreenBody>(`${API_URL}/screens/:screenId`, (req, res, ctx) => {
    try {
      const user = requireAuth(req);
      const data = req.body;
      const { screenId } = req.params;
      requireAdmin(user);
      const result = db.screen.update({
        where: {
          _id: {
            equals: screenId,
          },
        },
        data,
      });
      persistDb('screen');
      return delayedResponse(ctx.json(result));
    } catch (error: any) {
      return delayedResponse(
        ctx.status(400),
        ctx.json({ message: error?.message || 'Server Error' })
      );
    }
  }),

  rest.delete(`${API_URL}/screens/:screenId`, (req, res, ctx) => {
    try {
      const user = requireAuth(req);
      const { screenId } = req.params;
      requireAdmin(user);
      const result = db.screen.delete({
        where: {
          _id: {
            equals: screenId,
          },
        },
      });
      persistDb('screen');
      return delayedResponse(ctx.json(result));
    } catch (error: any) {
      return delayedResponse(
        ctx.status(400),
        ctx.json({ message: error?.message || 'Server Error' })
      );
    }
  }),
];
