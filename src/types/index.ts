export interface Venue {
  id: string;
  name: string;
  city: string;
  neighborhood: string;
  totalRooms: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface Room {
  id: string;
  name: string;
  capacity?: number | null;
  venueId: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ExternalLinkInput {
  type:
    | "website"
    | "github"
    | "x"
    | "linkedin"
    | "facebook"
    | "instagram"
    | "other";
  url: string;
}

export interface ExternalLink {
  type: string;
  url: string;
}

export interface Speaker {
  id: string;
  name: string;
  avatarUrl?: string | null;
  bio?: string;
  externalLinks?: ExternalLink[];
  eventSessions?: SpeakerSession[];
  createdAt?: string;
  updatedAt?: string;
}

export interface SpeakerSession {
  id: string;
  eventId: string;
  title: string;
  description?: string | null;
  eventName?: string;
  startTime?: string;
  endTime?: string;
  room?: string;
  neighborhood?: string | null;
  isLive?: boolean;
  speakers?: Array<{ id?: string; name?: string }>;
}

export interface CreateSpeaker {
  name: string;
  avatarUrl?: string;
  bio?: string;
  externalLinks?: ExternalLinkInput[];
}

export type UpdateSpeaker = CreateSpeaker;

export interface Event {
  id: string;
  title: string;
  description?: string;
  online?: boolean;
  startDate: string;
  endDate: string;
  venueId?: string | null;
  eventSessions?: SpeakerSession[];
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateEvent {
  title: string;
  description?: string;
  online?: boolean;
  startDate: string;
  endDate: string;
  venueId?: string;
}

export type UpdateEvent = CreateEvent;

export interface Session {
  id: string;
  eventId: string;
  title: string;
  description?: string;
  startTime: string;
  endTime: string;
  roomId: string;
  roomName?: string;
  capacity?: number;
  speakerIds?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateSession {
  title: string;
  description?: string;
  startTime: string;
  endTime: string;
  roomId: string;
  capacity?: number;
  speakerIds?: string[];
}

export type UpdateSession = CreateSession;

export interface CreateRoom {
  name: string;
  capacity?: number;
  venueId: string;
}

export type UpdateRoom = CreateRoom;

export interface CreateVenue {
  name: string;
  city: string;
  neighborhood: string;
  totalRooms: number;
}

export type UpdateVenue = CreateVenue;

export type EventStatus = "upcoming" | "live" | "past";

export type ExternalLinkType =
  | "website"
  | "github"
  | "x"
  | "linkedin"
  | "facebook"
  | "instagram"
  | "other";
