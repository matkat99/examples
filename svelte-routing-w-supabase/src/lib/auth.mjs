import { supabase } from "./supabaseClient.mjs";
import { userStore, route } from "./stores.svelte.js";

export async function signUp(user) {
  let { data, error } = await supabase.auth.signUp({
    email: user.email,
    password: user.password
  });

  console.log(data, error);
}

export async function login(user) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email: user.email,
    password: user.password
  });
  if (data) {
    userStore.isLoggedIn = true;
    userStore.user = data.user;
  } else {
    userStore.isLoggedIn = false;
    userStore.user = null;
  }
  console.log(data, error);
  route.pathname = "#posts";
}

export async function checkLogin() {
  const {
    data: { session },
    error
  } = await supabase.auth.getSession();
  if (session) {
    userStore.isLoggedIn = true;
    userStore.user = session.user;
  } else {
    userStore.isLoggedIn = false;
    userStore.user = null;
  }
  console.log(session);
}

export async function logout() {
  let { error } = await supabase.auth.signOut();
}
