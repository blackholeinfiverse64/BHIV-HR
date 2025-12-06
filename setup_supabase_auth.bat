@echo off
echo ================================================
echo BHIV HR Platform - Supabase Authentication Setup
echo ================================================
echo.

echo [1/3] Checking environment configuration...
if not exist "frontend\.env" (
    echo Creating .env file from .env.example...
    copy "frontend\.env.example" "frontend\.env"
    echo .env file created successfully!
) else (
    echo .env file already exists.
)
echo.

echo [2/3] Installing dependencies...
cd frontend
call npm install
cd ..
echo.

echo [3/3] Setup complete!
echo.
echo ================================================
echo Next Steps:
echo ================================================
echo 1. Configure Supabase database tables (see SUPABASE_AUTH_SETUP.md)
echo 2. Run: cd frontend ^&^& npm run dev
echo 3. Open: http://localhost:5173
echo.
echo For detailed setup instructions, see: SUPABASE_AUTH_SETUP.md
echo ================================================
pause
