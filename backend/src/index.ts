import express from 'express';
import jwt from 'jsonwebtoken';

const app = express();
const PORT = 5000;

// enable JSON body parsing
app.use(express.json());
const JWT_SECRET = 'baf0ba3b8f8e562b1bffd6f0331f590155d40915';

app.get('/api/message', (_req, res) => {
  res.send('Welcome to Event Desk');
});

app.post('/api/login', (_req, res) => {

  try {
    const { username, password } = _req.body;
    const mockUser = { username: 'admin', password: 'Admin987' };
    if (!username || !password) {
      return res.status(400).send({ message: 'Username and password are required' });
    }

    if (username !== mockUser.username && password !== mockUser.password) {
      return res.status(401).send({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });

    res.status(200).send({ message: 'Login successful', token });
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).send({ message: 'Internal server error' });
  }


});

app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});

