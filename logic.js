const API_BASE_URL = 'https://se-project-backend-eosin.vercel.app/api';

document.addEventListener('DOMContentLoaded', () => {
  const signupForm = document.getElementById('signupForm');
  const loginForm = document.getElementById('loginForm');
    const contactForm = document.getElementById('contactForm');


  // Registration Logic
  if (signupForm) {
    signupForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const formData = new FormData(signupForm);
      const data = Object.fromEntries(formData.entries());

      if (data.password !== data.confirmPassword) {
        alert('Passwords do not match!');
        return;
      }

      try {
        const response = await fetch(`${API_BASE_URL}/auth/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        const result = await response.json();

        if (response.ok) {
          alert('Registration successful!');
          if (result.token) {
            localStorage.setItem('token', result.token);
          }
          window.location.href = './login.html';
        } else {
          alert(result.message || 'Registration failed.');
        }
      } catch (error) {
        console.error('Error during registration:', error);
        alert('Something went wrong.');
      }
    });
  }

  // Login Logic
// Login Logic
if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(loginForm);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        alert('Login successful!');
        if (result.token) {
          localStorage.setItem('token', result.token);

          // Assuming the role is included in the response, e.g., result.role or result.user.role
          const userRole = result.role || result.user?.role;

          if (userRole === 'admin') {
            window.location.href = './admindashboard.html';
          } else {
            window.location.href = './userdashboard.html';
          }
        }
      } else {
        alert(result.message || 'Login failed.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('Something went wrong.');
    }
  });
}

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const formData = new FormData(contactForm);
      const data = Object.fromEntries(formData.entries());

      try {
        const response = await fetch(`${API_BASE_URL}/contact/submit`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        const result = await response.json();

        if (response.ok) {
          alert('Your message has been sent successfully! Thank you for contacting us.');
          contactForm.reset(); // Optional: clear form
        } else {
          const errors = result.errors?.map(err => err.msg).join('\n') || result.message;
          alert(`Error: ${errors}`);
        }
      } catch (error) {
        console.error('Error submitting contact form:', error);
        alert('Something went wrong. Please try again later.');
      }
    });
  }

// Navbar visibility logic
const loginNav = document.getElementById('loginNav');
const signupNav = document.getElementById('signupNav');
const profileNav = document.getElementById('profileNav');
const logoutNav = document.getElementById('logoutNav');

const token = localStorage.getItem('token');

if (token) {
  try {
    const payloadBase64 = token.split('.')[1];
    const decodedPayload = JSON.parse(atob(payloadBase64));
    const role = decodedPayload.role;

    if (role === 'user') {
      if (loginNav) loginNav.style.display = 'none';
      if (signupNav) signupNav.style.display = 'none';
      if (profileNav) profileNav.style.display = 'inline-block';
    }

      logoutNav.style.display = 'inline-block';

  logoutNav.addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.removeItem('token');
    window.location.href = './login.html';
  });

  } catch (err) {
    console.error('Failed to decode token:', err);
  }
}


  // User Dashboard: Fetch and display user data
  if (window.location.pathname.includes('userdashboard.html') && token) {
    fetch(`${API_BASE_URL}/auth/me`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.user) {
          const user = data.user;

          // Replace static content
          document.querySelector('h1').textContent = `Welcome to your Dashboard, ${user.name || ''}!`;

          const updateField = (selector, value) => {
            const el = document.querySelector(selector);
            if (el) el.textContent = value || '-';
          };

        updateField('#firstNameField', user.firstName);
        updateField('#lastNameField', user.lastName);
        updateField('#fatherNameField', user.fatherName);
        updateField('#dobField', user.dob);
        updateField('#phoneNumberField', user.phoneNumber);
        updateField('#genderField', user.gender);
        updateField('#campusField', user.campus);
        updateField('#batchField', user.batch);
        updateField('#programField', user.program);
        updateField('#graduationYearField', user.graduationYear);
        updateField('#regNoField', user.regNo);
        updateField('#currentCityField', user.currentCity);
        updateField('#currentCountryField', user.currentCountry);
        updateField('#currentOrgField', user.currentOrg);
        updateField('#jobTitleField', user.jobTitle);
        updateField('#permanentAddressField', user.permanentAddress);


        } else {
          alert('Failed to fetch user data.');
        }
      })
      .catch(err => {
        console.error('Error fetching user data:', err);
      });
  }


  // Admin Dashboard: Fetch users and contacts
if (window.location.pathname.includes('admindashboard.html') && token) {
  const payloadBase64 = token.split('.')[1];
  const decodedPayload = JSON.parse(atob(payloadBase64));
  const role = decodedPayload.role;

  if (role !== 'admin') {
    alert('Access denied. Admins only.');
    window.location.href = './login.html';
  }

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };

  // Fetch all users
  fetch(`${API_BASE_URL}/auth/users`, { headers })
    .then(res => res.json())
    .then(data => {
      const usersTable = document.querySelector('#usersTable tbody');
      data.users.forEach(user => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
                <td class="border p-2">${user.firstName || ''}</td>
        <td style="text-wrap:nowrap;" class="border p-2">${user.lastName || ''}</td>
        <td style="text-wrap:nowrap;" class="border p-2">${user.fatherName || ''}</td>
        <td style="text-wrap:nowrap;" class="border p-2">${user.email || ''}</td>
        <td style="text-wrap:nowrap;" class="border p-2">${user.phoneNumber || ''}</td>
        <td style="text-wrap:nowrap;" class="border p-2">${user.dob || ''}</td>
        <td style="text-wrap:nowrap;" class="border p-2">${user.gender || ''}</td>
        <td style="text-wrap:nowrap;" class="border p-2">${user.permanentAddress || ''}</td>
        <td style="text-wrap:nowrap;" class="border p-2">${user.regNo || ''}</td>
        <td style="text-wrap:nowrap;" class="border p-2">${user.graduationYear || ''}</td>
        <td style="text-wrap:nowrap;" class="border p-2">${user.campus || ''}</td>
        <td style="text-wrap:nowrap;" class="border p-2">${user.batch || ''}</td>
        <td style="text-wrap:nowrap;" class="border p-2">${user.program || ''}</td>
        <td style="text-wrap:nowrap;" class="border p-2">${user.currentOrg || ''}</td>
        <td style="text-wrap:nowrap;" class="border p-2">${user.jobTitle || ''}</td>
        <td style="text-wrap:nowrap;" class="border p-2">${user.currentCity || ''}</td>
        <td style="text-wrap:nowrap;" class="border p-2">${user.currentCountry || ''}</td>
        <td style="text-wrap:nowrap;" class="border p-2">${user.role || ''}</td>
      `;
        usersTable.appendChild(tr);
      });
    })
    .catch(err => {
      console.error('Error fetching users:', err);
    });

  // Fetch all contact messages
  fetch(`${API_BASE_URL}/auth/contacts`, { headers })
    .then(res => res.json())
    .then(data => {
      const contactsTable = document.querySelector('#contactsTable tbody');
      data.messages.forEach(msg => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td class="border p-2">${msg.name}</td>
          <td class="border p-2">${msg.email}</td>
          <td class="border p-2">${msg.subject}</td>
          <td class="border p-2">${msg.message}</td>
          <td class="border p-2">${new Date(msg.createdAt).toLocaleString()}</td>
        `;
        contactsTable.appendChild(tr);
      });
    })
    .catch(err => {
      console.error('Error fetching contacts:', err);
    });
}

});
