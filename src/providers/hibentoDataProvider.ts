import type { DataProvider, RaRecord } from "react-admin";
import { eventsResource } from "./resources/events";
import { sessionsResource } from "./resources/sessions";
import { speakersResource } from "./resources/speakers";
import { roomsResource } from "./resources/rooms";
import { venuesResource } from "./resources/venues";
import { questionsResource } from "./resources/questions";

const resourceMap: Record<string, typeof eventsResource> = {
  events: eventsResource,
  sessions: sessionsResource,
  speakers: speakersResource,
  rooms: roomsResource,
  venues: venuesResource,
  questions: questionsResource,
};

export const hibentoDataProvider: DataProvider = {
  getList: (resource, params) => {
    const provider = resourceMap[resource];
    if (!provider) throw new Error(`Unknown resource: ${resource}`);
    return provider.getList(params);
  },

  getOne: (resource, params) => {
    const provider = resourceMap[resource];
    if (!provider) throw new Error(`Unknown resource: ${resource}`);
    return provider.getOne(params);
  },

  create: (resource, params) => {
    const provider = resourceMap[resource];
    if (!provider) throw new Error(`Unknown resource: ${resource}`);
    return provider.create(params);
  },

  update: (resource, params) => {
    const provider = resourceMap[resource];
    if (!provider) throw new Error(`Unknown resource: ${resource}`);
    return provider.update(params);
  },

  delete: (resource, params) => {
    const provider = resourceMap[resource];
    if (!provider) throw new Error(`Unknown resource: ${resource}`);
    return provider.delete(params);
  },

  getMany: async (resource, params) => {
    const provider = resourceMap[resource];
    const results = await Promise.all(
      params.ids.map((id) => provider!.getOne({ id, meta: undefined })),
    );
    return { data: results.map((r) => r.data) };
  },

  getManyReference: async (resource, params) => {
    const provider = resourceMap[resource];
    if (!provider) throw new Error(`Unknown resource: ${resource}`);
    if (!provider.getManyReference) {
      throw new Error(`getManyReference not implemented for resource: ${resource}`);
    }
    return provider.getManyReference(params);
  },

  updateMany: async (resource, params) => {
    const provider = resourceMap[resource];
    const results = await Promise.all(
      params.ids.map((id) =>
        provider!.update({
          id,
          data: params.data,
          previousData: {} as RaRecord,
          meta: undefined,
        }),
      ),
    );
    return { data: results.map((r) => r.data.id) };
  },

  deleteMany: async (resource, params) => {
    const provider = resourceMap[resource];
    await Promise.all(
      params.ids.map((id) =>
        provider!.delete({
          id,
          meta: undefined,
          previousData: {} as RaRecord,
        }),
      ),
    );
    return { data: params.ids };
  },
};
