# CRM-TCS

Full-stack CRM project with a React frontend and Django REST backend.

## PT-BR resumo
Projeto CRM para gerenciamento de operacoes comerciais. Esta versao foi organizada para demonstrar arquitetura full-stack, fluxo de autenticacao JWT e boas praticas de setup local sem expor segredos.

## Tech Stack
- Frontend: React
- Backend: Django + Django REST Framework
- Database: PostgreSQL
- Auth: JWT (SimpleJWT / Djoser)

## Repository Structure
- `frontend/` - web client
- `backend/` - Django API
- `.github/` - CI and release workflows

## Local Setup
### 1) Clone
```bash
git clone https://github.com/MakenRosa/CRM-TCS.git
cd CRM-TCS
```

### 2) Backend setup
```bash
cd backend
python -m venv .venv
# Windows
.venv\Scripts\activate
# Linux/macOS
# source .venv/bin/activate

pip install -r requirements.txt
```

Create your environment file:
```bash
cp .env.example .env
```

Run migrations:
```bash
python manage.py migrate
python manage.py runserver
```

### 3) Frontend setup
```bash
cd ../frontend
npm install
npm start
```

## Security notes
- Secrets are loaded from environment variables.
- Do not commit `.env` files.
- Rotate credentials if any old secret was exposed in history.

## Roadmap
- Improve test coverage in backend and frontend
- Add Docker Compose for one-command local setup
- Add architecture diagram and API contract docs

## License
MIT
