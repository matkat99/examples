import { mount } from 'svelte'
import '../app.css'
import Header from '../lib/Header.svelte'
import { initClerk } from '../lib/auth'

const app = mount(Header, {
  target: document.querySelector('header')!,
  props: {
    protectedRoute: true
  }
})

async function loadProfile() {
  const clerk = await initClerk()
  const res = await fetch('http://localhost:3000/users/protected', {
    headers: {
      Authorization: `Bearer ${await clerk.session?.getToken()}`,
    }
  })
  const data = await res.json();
  document.querySelector("main")?.insertAdjacentHTML('beforeend', `<pre>${JSON.stringify(data, null, 2)}</pre>`);
  // Load and display profile information here
}

loadProfile()