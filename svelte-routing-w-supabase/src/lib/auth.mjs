import { supabase } from "./supabaseClient.mjs";
import { userStore } from "./stores.mjs";

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
    userStore.set({ isLoggedIn: true, user: data.user });
  } else {
    userStore.set({ isLoggedIn: false, user: null });
  }
  console.log(data, error);
}

export async function checkLogin() {
  const {
    data: { session },
    error
  } = await supabase.auth.getSession();
  if (session) {
    userStore.set({ isLoggedIn: true, user: session?.user });
  } else {
    userStore.set({ isLoggedIn: false, user: null });
  }
  console.log(session);
}

export async function logout() {
  let { error } = await supabase.auth.signOut();
}
