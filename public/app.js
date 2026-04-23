async function loadProfile() {
  try {
    const res = await fetch('/profile');
    const data = await res.json();

    document.getElementById('name').innerText = data.name;
    document.getElementById('title').innerText = data.title;
    document.getElementById('skills').innerText = data.skills;
    document.getElementById('experience').innerText = data.experience;

  } catch (err) {
    console.error('Error loading profile', err);
  }
}