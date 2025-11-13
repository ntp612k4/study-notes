@echo off
REM Script test ứng dụng Study Notes trên các nền tảng

echo.
echo ======================================
echo  STUDY NOTES - TESTING SCRIPT
echo ======================================
echo.

:menu
echo.
echo Chọn nền tảng để test:
echo 1. Web (Chrome DevTools - Desktop/Mobile)
echo 2. Android (Build và Setup)
echo 3. Build Production
echo 4. Xem Testing Guide
echo 5. Thoát
echo.

set /p choice="Nhập lựa chọn (1-5): "

if "%choice%"=="1" goto web
if "%choice%"=="2" goto android
if "%choice%"=="3" goto build
if "%choice%"=="4" goto guide
if "%choice%"=="5" goto end
echo Lựa chọn không hợp lệ!
goto menu

:web
echo.
echo ========== TEST WEB ==========
echo Chạy ứng dụng trên localhost...
echo.
cd d:\Code_Pro\study-notes
npm run dev
goto menu

:android
echo.
echo ========== BUILD ANDROID ==========
echo.
cd d:\Code_Pro\study-notes

echo Bước 1: Build web...
call npm run build
if errorlevel 1 (
    echo Lỗi build web!
    goto menu
)

echo.
echo Bước 2: Thêm Android platform...
call npx cap add android
if errorlevel 1 (
    echo Android platform đã tồn tại hoặc có lỗi
)

echo.
echo Bước 3: Copy files vào Android...
call npx cap sync android
call npx cap copy android

echo.
echo Bước 4: Mở Android Studio...
call npx cap open android

echo.
echo Android Studio sẽ mở. Vui lòng:
echo 1. Chọn emulator hoặc kết nối device
echo 2. Nhấn Run (Ctrl + R)
echo.

goto menu

:build
echo.
echo ========== BUILD PRODUCTION ==========
echo.
cd d:\Code_Pro\study-notes
call npm run build

echo.
echo Build hoàn tất!
echo Output: d:\Code_Pro\study-notes\dist
echo.
dir dist\assets
echo.

goto menu

:guide
echo.
echo Mở TESTING_GUIDE.md...
start notepad d:\Code_Pro\study-notes\TESTING_GUIDE.md
goto menu

:end
echo.
echo Tạm biệt!
echo.