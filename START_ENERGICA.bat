@echo off
title Energica Portal - Starting...
color 0A

echo ========================================
echo    ENERGICA OWNER'S PORTAL
echo ========================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Node.js is not installed!
    echo.
    echo Please install Node.js first:
    echo 1. Visit https://nodejs.org
    echo 2. Download the LTS version
    echo 3. Run the installer
    echo 4. Restart your computer
    echo 5. Double-click this file again
    echo.
    pause
    exit /b 1
)

echo [OK] Node.js is installed
echo.

REM Check if node_modules exists
if not exist "node_modules\" (
    echo [SETUP] First time setup detected...
    echo [SETUP] Installing required files... (This may take 1-2 minutes)
    echo.
    call npm install
    if %ERRORLEVEL% NEQ 0 (
        echo.
        echo [ERROR] Installation failed!
        echo Please check your internet connection and try again.
        echo.
        pause
        exit /b 1
    )
    echo.
    echo [OK] Installation complete!
    echo.
) else (
    echo [OK] Required files already installed
    echo.
)

echo ========================================
echo    STARTING WEBSITE SERVER...
echo ========================================
echo.
echo The website will open automatically in your browser.
echo Server URL: http://localhost:5173
echo.
echo IMPORTANT: Keep this window open while using the website!
echo            Close this window to stop the server.
echo.
echo ========================================
echo.

REM Start the dev server and open browser
start http://localhost:5173
call npm run dev

REM If the server stops, pause so user can see any errors
echo.
echo ========================================
echo Server stopped.
echo ========================================
pause
