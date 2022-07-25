import { setupAPIClient } from "./api";
import { confExternalAPI } from './apiExterna'

export const api = setupAPIClient();
export const apiExterna = confExternalAPI();