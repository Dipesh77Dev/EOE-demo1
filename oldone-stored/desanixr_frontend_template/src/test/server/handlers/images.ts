import { rest } from 'msw';
import { nanoid } from 'nanoid';

import { API_URL } from '@/config';

import { db, persistDb } from '../db';
import { requireAuth, requireAdmin, delayedResponse } from '../utils';

type ImageBody = {
  imageTitle: string;
  fileName: string;
  filePath: string;
  fileType: string;
  fileSize: string;
};

export const imagesHandlers = [
  rest.get(`${API_URL}/images`, (req, res, ctx) => {
    try {
      const user = requireAuth(req);
      const result = db.images.findMany({
        where: {
          teamId: {
            equals: user.teamId,
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

  rest.get(`${API_URL}/images/:imageId`, (req, res, ctx) => {
    try {
      const user = requireAuth(req);
      const { imageId } = req.params;
      const result = db.images.findFirst({
        where: {
          _id: {
            equals: imageId,
          },
          teamId: {
            equals: user.teamId,
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

  rest.post<ImageBody>(`${API_URL}/images`, (req, res, ctx) => {
    try {
      const user = requireAuth(req);
      const data = req.body;
      requireAdmin(user);
      const result = db.images.create({
        teamId: user.teamId,
        _id: nanoid(),
        createdAt: Date.now(),
        ...data,
      });
      persistDb('images');
      return delayedResponse(ctx.json(result));
    } catch (error: any) {
      return delayedResponse(
        ctx.status(400),
        ctx.json({ message: error?.message || 'Server Error' })
      );
    }
  }),

  rest.patch<ImageBody>(`${API_URL}/images/:imageId`, (req, res, ctx) => {
    try {
      const user = requireAuth(req);
      const data = req.body;
      const { imageId } = req.params;
      requireAdmin(user);
      const result = db.images.update({
        where: {
          teamId: {
            equals: user.teamId,
          },
          _id: {
            equals: imageId,
          },
        },
        data,
      });
      persistDb('images');
      return delayedResponse(ctx.json(result));
    } catch (error: any) {
      return delayedResponse(
        ctx.status(400),
        ctx.json({ message: error?.message || 'Server Error' })
      );
    }
  }),

  rest.delete(`${API_URL}/images/:imageId`, (req, res, ctx) => {
    try {
      const user = requireAuth(req);
      const { imageId } = req.params;
      requireAdmin(user);
      const result = db.images.delete({
        where: {
          _id: {
            equals: imageId,
          },
        },
      });
      persistDb('images');
      return delayedResponse(ctx.json(result));
    } catch (error: any) {
      return delayedResponse(
        ctx.status(400),
        ctx.json({ message: error?.message || 'Server Error' })
      );
    }
  }),
];
