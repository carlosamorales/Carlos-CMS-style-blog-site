document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const commentForm = document.getElementById('comment-form');
    const newPostForm = document.getElementById('new-post-form');
  
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
            document.location.replace('/');
          } else {
            alert('Failed to sign up');
          }
        }
      });
    }
  
    if (commentForm) {
      commentForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const comment_text = document.getElementById('comment').value.trim();
        const post_id = window.location.pathname.split('/').pop();
  
        if (comment_text) {
          const response = await fetch(`/api/comments`, {
            method: 'POST',
            body: JSON.stringify({ comment_text, post_id }),
            headers: { 'Content-Type': 'application/json' },
          });
  
          if (response.ok) {
            document.location.reload();
          } else {
            alert('Failed to add comment');
          }
        }
      });
    }
  
    if (newPostForm) {
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
  
      document.querySelectorAll('.edit-post-btn').forEach((btn) => {
        btn.addEventListener('click', async (event) => {
          const id = event.target.getAttribute('data-id');
          const title = prompt('Enter new title:');
          const content = prompt('Enter new content:');
  
          if (title && content) {
            const response = await fetch(`/api/posts/${id}`, {
              method: 'PUT',
              body: JSON.stringify({ title, content }),
              headers: { 'Content-Type': 'application/json' },
            });
  
            if (response.ok) {
              document.location.reload();
            } else {
              alert('Failed to update post');
            }
          }
        });
      });
  
      document.querySelectorAll('.delete-post-btn').forEach((btn) => {
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
    }
  });
  