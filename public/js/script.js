document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const logoutLink = document.getElementById('logout-link');
    const newPostBtn = document.getElementById('new-post-btn');
    const newPostForm = document.getElementById('new-post-form');
    const editPostForm = document.getElementById('edit-post-form');
  
    let idleTime = 0;
    const maxIdleTime = 10 * 1000; // 10 seconds for testing
  
    function resetIdleTimer() {
      idleTime = 0;
    }
  
    function checkIdleTime() {
      idleTime += 1000;
      if (idleTime >= maxIdleTime) {
        alert('You have been idle for too long. Please log in again.');
        document.location.replace('/login');
      }
    }
  
    setInterval(checkIdleTime, 1000);
    document.addEventListener('mousemove', resetIdleTimer);
    document.addEventListener('keypress', resetIdleTimer);
  
    if (loginForm) {
      loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();
  
        if (username && password) {
          const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
          });
  
          if (response.ok) {
            alert('Logged in successfully!');
            document.location.replace('/');
          } else {
            alert('Failed to log in');
          }
        }
      });
    }
  
    if (signupForm) {
      signupForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();
  
        if (username && password) {
          const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
          });
  
          if (response.ok) {
            alert('Signed up successfully!');
            document.location.replace('/');
          } else {
            alert('Failed to sign up');
          }
        }
      });
    }
  
    if (logoutLink) {
      logoutLink.addEventListener('click', async (event) => {
        event.preventDefault();
        const response = await fetch('/api/users/logout', {
          method: 'POST',
        });
  
        if (response.ok) {
          document.location.replace('/');
        } else {
          alert('Failed to log out');
        }
      });
    }
  
    if (newPostBtn) {
      newPostBtn.addEventListener('click', () => {
        newPostForm.style.display = 'block';
      });
  
      newPostForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const title = document.getElementById('post-title').value.trim();
        const content = document.getElementById('post-content').value.trim();
  
        if (title && content) {
          const response = await fetch(`/api/posts`, {
            method: 'POST',
            body: JSON.stringify({ title, content }),
            headers: { 'Content-Type': 'application/json' },
          });
  
          if (response.ok) {
            document.location.reload();
          } else {
            alert('Failed to add post');
          }
        }
      });
    }
  
    document.querySelectorAll('.edit-btn').forEach((btn) => {
      btn.addEventListener('click', (event) => {
        const id = event.target.getAttribute('data-id');
        const title = event.target.parentElement.querySelector('h2').innerText;
        const content = event.target.parentElement.querySelector('p').innerText;
  
        document.getElementById('edit-post-title').value = title;
        document.getElementById('edit-post-content').value = content;
  
        editPostForm.style.display = 'block';
  
        editPostForm.onsubmit = async (e) => {
          e.preventDefault();
          const newTitle = document.getElementById('edit-post-title').value.trim();
          const newContent = document.getElementById('edit-post-content').value.trim();
  
          if (newTitle && newContent) {
            const response = await fetch(`/api/posts/${id}`, {
              method: 'PUT',
              body: JSON.stringify({ title: newTitle, content: newContent }),
              headers: { 'Content-Type': 'application/json' },
            });
  
            if (response.ok) {
              document.location.reload();
            } else {
              alert('Failed to update post');
            }
          }
        };
      });
    });
  
    document.querySelectorAll('.delete-btn').forEach((btn) => {
      btn.addEventListener('click', async (event) => {
        const id = event.target.getAttribute('data-id');
  
        const response = await fetch(`/api/posts/${id}`, {
          method: 'DELETE',
        });
  
        if (response.ok) {
          document.location.reload();
        } else {
          alert('Failed to delete post');
        }
      });
    });
  
    // Comment functionality
    document.querySelectorAll('.add-comment-btn').forEach((btn) => {
      btn.addEventListener('click', (event) => {
        const id = event.target.getAttribute('data-id');
        const commentForm = document.getElementById(`comment-form-${id}`);
        if (commentForm.style.display === 'none') {
          commentForm.style.display = 'block';
        } else {
          commentForm.style.display = 'none';
        }
      });
    });
  
    document.querySelectorAll('.submit-comment-btn').forEach((btn) => {
      btn.addEventListener('click', async (event) => {
        event.preventDefault();
        const id = event.target.getAttribute('data-id');
        const commentText = document.querySelector(`#comment-form-${id} textarea`).value.trim();
  
        if (commentText) {
          const response = await fetch(`/api/comments`, {
            method: 'POST',
            body: JSON.stringify({ comment_text: commentText, post_id: id }),
            headers: { 'Content-Type': 'application/json' },
          });
  
          if (response.ok) {
            document.location.reload();
          } else {
            alert('Failed to add comment');
          }
        }
      });
    });
  });
