import { createStore } from "effector";
import { Event } from "./types";

export const $events = createStore<Event[]>([]);
