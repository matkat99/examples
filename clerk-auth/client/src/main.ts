import { mount } from 'svelte'
import './app.css'
import Header from './lib/Header.svelte'

const app = mount(Header, {
  target: document.querySelector('header')!,
  props: {
    protectedRoute: false
  }
})

async function getPublic() {
  const res = await fetch('http://localhost:3000/users/public')
  const data = await res.json();
  document.querySelector("main")?.insertAdjacentHTML('beforeend', `<pre>${JSON.stringify(data, null, 2)}</pre>`);
  // Load and display public information here
}

getPublic()


// export default app
