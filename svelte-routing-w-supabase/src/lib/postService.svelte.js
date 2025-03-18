import { supabase } from "./supabaseClient.mjs";

export async function createPost(title, body, user_id) {
  const { data, error } = await supabase.from("posts").insert({
    title,
    body,
    user_id
  });
  console.log(data);
}

export async function getUserPosts(user) {
  let { data, error } = await supabase
    .from("posts")
    .select("*")
    // Filters
    .eq("user_id", user.id);
  console.log(data);
  return data;
}

export async function getPostById(id) {
  let { data, error } = await supabase
    .from("posts")
    .select("*")
    // Filters
    .eq("id", id);
  console.log(data);
  return data[0];
}
