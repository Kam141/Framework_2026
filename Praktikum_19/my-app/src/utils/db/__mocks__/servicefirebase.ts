import { jest } from "@jest/globals";

export const ROLE = { MEMBER: "member", EDITOR: "editor", ADMIN: "admin" };
export const getUserByEmail = jest.fn();
export const retrieveProducts = jest.fn();
export const retrieveDataByID = jest.fn();
export const signIn = jest.fn();
export const signUp = jest.fn();
export const signInWithGoogle = jest.fn();
