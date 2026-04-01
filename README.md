<h1>Finance Dashboard Backend</h1>

<h2>Overview</h2>
<p>
This project implements a backend system for a Finance Dashboard that manages user authentication,
role-based access control, financial records, and analytics.
</p>

<p>
The system is designed with a strong focus on clean architecture, scalability, and security.
</p>

<hr />

<h2>Tech Stack</h2>
<ul>
  <li>Backend: Node.js, Express</li>
  <li>Database: MongoDB (Mongoose)</li>
  <li>Authentication: JWT (JSON Web Tokens)</li>
  <li>Security: bcrypt, helmet, rate limiting</li>
  <li>Architecture: MVC (Model-View-Controller)</li>
  <li>UI : NextJS</li>
</ul>

<hr />

<h2>Project Structure</h2>
<pre>
backend/
├── controllers/
├── models/
├── routes/
├── middleware/
├── services/
├── utils/
├── config/
├── app.js
├── server.js
├── seedAdmin.js
└── .env
</pre>

<hr />

<h2>Authentication and Authorization</h2>

<h3>Authentication</h3>
<ul>
  <li>JWT-based authentication</li>
  <li>Token must be sent in request headers:</li>
</ul>

<pre>Authorization: Bearer &lt;token&gt;</pre>

<h3>Authorization</h3>
<p>
Role-based access control is implemented using middleware to restrict access to specific endpoints.
</p>

<hr />

<h2>Roles and Permissions</h2>

<table border="1" cellpadding="8" cellspacing="0">
  <tr>
    <th>Role</th>
    <th>Permissions</th>
  </tr>
  <tr>
    <td>Viewer</td>
    <td>Can view dashboard summary only</td>
  </tr>
  <tr>
    <td>Analyst</td>
    <td>Can view dashboard and financial records</td>
  </tr>
  <tr>
    <td>Admin</td>
    <td>Full access including user management and CRUD operations</td>
  </tr>
</table>

<p>
The system follows the principle of least privilege, ensuring users only access what is necessary.
</p>

<hr />

<h2>API Endpoints</h2>

<h3>Auth Routes</h3>
<pre>
POST /api/auth/register
POST /api/auth/login
</pre>

<h3>User Routes (Admin Only)</h3>
<pre>
GET /api/users
PATCH /api/users/:id
DELETE /api/users/:id
</pre>

<h3>Financial Records</h3>
<pre>
POST /api/records        (Admin)
GET /api/records         (Analyst, Admin)
PUT /api/records/:id     (Admin)
DELETE /api/records/:id  (Admin - soft delete)
</pre>

<h3>Dashboard</h3>
<pre>
GET /api/dashboard/summary
GET /api/dashboard/categories
GET /api/dashboard/trends
</pre>

<hr />

<h2>Financial Record Model</h2>
<ul>
  <li>amount (Number)</li>
  <li>type (income | expense)</li>
  <li>category (String)</li>
  <li>date (Date)</li>
  <li>notes (String)</li>
  <li>createdBy (User reference)</li>
  <li>isDeleted (Boolean - soft delete)</li>
</ul>

<hr />

<h2>Dashboard Features</h2>

<h3>Summary</h3>
<ul>
  <li>Total Income</li>
  <li>Total Expenses</li>
  <li>Net Balance</li>
</ul>

<h3>Category Breakdown</h3>
<p>Aggregated totals grouped by category</p>

<h3>Trends</h3>
<p>Monthly income vs expenses using MongoDB aggregation pipelines</p>

<hr />

<h2>Key Features</h2>
<ul>
  <li>JWT-based authentication</li>
  <li>Role-based access control (RBAC)</li>
  <li>Pagination and filtering for records</li>
  <li>Soft delete for financial records</li>
  <li>Secure password hashing using bcrypt</li>
  <li>Rate limiting and security headers</li>
  <li>Service layer for business logic separation</li>
</ul>

<hr />

<h2>Setup Instructions</h2>

<h3>1. Install Dependencies</h3>
<pre>npm install</pre>

<h3>2. Configure Environment Variables</h3>
<pre>
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=1d
</pre>

<h3>3. Run Server</h3>
<pre>npm run dev</pre>

<h3>4. Seed Admin User</h3>
<pre>node seedAdmin.js</pre>

<p>Admin Credentials:</p>
<pre>
Email: admin@test.com
Password: Admin@123
</pre>

<hr />

<h2>Security Considerations</h2>
<ul>
  <li>Passwords are hashed using bcrypt</li>
  <li>Admin role cannot be assigned via public registration</li>
  <li>JWT secrets are stored in environment variables</li>
  <li>Rate limiting prevents abuse</li>
</ul>

<hr />

<h2>Design Principles</h2>
<ul>
  <li>Separation of concerns using MVC</li>
  <li>Middleware-driven authorization</li>
  <li>Scalable service-based architecture</li>
  <li>Clean and maintainable code structure</li>
</ul>

<hr />

<h2>Author Note</h2>
<p>
This project demonstrates backend system design with secure role-based access control,
clean architecture, and analytics capabilities suitable for real-world applications.
</p>

<h2>TESTING ACCOUNTS :</h2>
<p>email : atharva@test.com,  password: Athu@9822  [role: VIEWER]</p>
<p>email : rahul@testing.com,  password: rahul123  [role: ANALYST]</p>

<h2>GLOBAL ADMIN CREDENTIALS</h2>
<p>email : admin@test.com,  password: Admin@123  [role: ADMIN]  (single account)</p>
