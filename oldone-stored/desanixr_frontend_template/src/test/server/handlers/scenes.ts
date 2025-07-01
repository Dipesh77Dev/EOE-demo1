import { rest } from 'msw';
import { nanoid } from 'nanoid';

import { API_URL } from '@/config';

import { db, persistDb } from '../db';
import { requireAuth, requireAdmin, delayedResponse } from '../utils';

type SceneBody = {
  sceneName: string;
  imageId: string;
  imageTitle: string;
  description: string;
};

export const scenesHandlers = [
  rest.get(`${API_URL}/scenes`, (req, res, ctx) => {
    try {
      // const user = requireAuth(req);
      const result = db.scene.findMany({});
      return delayedResponse(ctx.json(result));
    } catch (error: any) {
      return delayedResponse(
        ctx.status(400),
        ctx.json({ message: error?.message || 'Server Error' })
      );
    }
  }),

  rest.get(`${API_URL}/scenes/:sceneId`, (req, res, ctx) => {
    try {
      // const user = requireAuth(req);
      const { sceneId } = req.params;
      const result = db.scene.findFirst({
        where: {
          _id: {
            equals: sceneId,
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

  rest.post<SceneBody>(`${API_URL}/scenes`, (req, res, ctx) => {
    try {
      const user = requireAuth(req);
      const data = req.body;
      requireAdmin(user);
      const result = db.scene.create({
        _id: nanoid(),
        createdAt: Date.now(),
        ...data,
      });
      persistDb('scene');
      return delayedResponse(ctx.json(result));
    } catch (error: any) {
      return delayedResponse(
        ctx.status(400),
        ctx.json({ message: error?.message || 'Server Error' })
      );
    }
  }),

  rest.patch<SceneBody>(`${API_URL}/scenes/:sceneId`, (req, res, ctx) => {
    try {
      const user = requireAuth(req);
      const data = req.body;
      const { sceneId } = req.params;
      requireAdmin(user);
      const result = db.scene.update({
        where: {
          _id: {
            equals: sceneId,
          },
        },
        data,
      });
      persistDb('scene');
      return delayedResponse(ctx.json(result));
    } catch (error: any) {
      return delayedResponse(
        ctx.status(400),
        ctx.json({ message: error?.message || 'Server Error' })
      );
    }
  }),

  rest.delete(`${API_URL}/scenes/:sceneId`, (req, res, ctx) => {
    try {
      const user = requireAuth(req);
      const { sceneId } = req.params;
      requireAdmin(user);
      const result = db.scene.delete({
        where: {
          _id: {
            equals: sceneId,
          },
        },
      });
      persistDb('scene');
      return delayedResponse(ctx.json(result));
    } catch (error: any) {
      return delayedResponse(
        ctx.status(400),
        ctx.json({ message: error?.message || 'Server Error' })
      );
    }
  }),
];
