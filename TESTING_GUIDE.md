# 🧪 Hướng dẫn Test Ứng dụng Ghi chú Học tập

## 1. Test trên Web (Desktop & Mobile Browser)

### Chạy ứng dụng trên Web

```bash
cd d:\Code_Pro\study-notes
npm run dev
```

Ứng dụng sẽ chạy tại `http://localhost:5174`

### Test Cases cho Web:

- ✅ **Màn hình chính**: Hiển thị đúng 6 môn học với icon và màu sắc
- ✅ **Click vào môn học**: Chuyển đến màn hình ghi chú
- ✅ **Nhập ghi chú**: Có thể nhập text vào textarea
- ✅ **Lưu ghi chú**: Nút "Lưu ghi chú" hoạt động, hiển thị alert
- ✅ **Quay lại**: Nút "Quay lại" trở về màn hình chính
- ✅ **Persistent storage**: Ghi chú được lưu khi quay lại (hiển thị số ký tự)
- ✅ **Responsive**: Layout thích hợp trên desktop, tablet, mobile

---

## 2. Test trên Android

### Chuẩn bị

1. Cài đặt Android Studio (nếu chưa có)
2. Tạo Android Virtual Device (AVD) hoặc kết nối điện thoại Android

### Build cho Android

```bash
cd d:\Code_Pro\study-notes

# Build web project
npm run build

# Thêm platform Android
npx cap add android

# Sync files vào Android project
npx cap sync android

# Copy built files
npx cap copy android
```

### Mở và chạy trong Android Studio

```bash
# Mở Android project trong Android Studio
npx cap open android
```

Sau đó:

1. Chọn emulator hoặc device thật
2. Nhấn "Run" (Ctrl + R)

### Test Cases cho Android:

- ✅ **Hiển thị đúng**: Giao diện phù hợp với màn hình mobile
- ✅ **Touch events**: Click/tap vào môn học hoạt động đúng
- ✅ **Keyboard**: Bàn phím ảo hiển thị khi tap vào textarea
- ✅ **Storage**: Ghi chú được lưu vào Capacitor Storage
- ✅ **Navigation**: Back button quay lại, không reload page
- ✅ **Offline**: Ứng dụng hoạt động offline
- ✅ **Performance**: Không bị lag hoặc crash

---

## 3. Test trên iOS

### Chuẩn bị

1. Máy Mac với Xcode cài đặt
2. iOS Simulator hoặc thiết bị iOS thật

### Build cho iOS

```bash
cd d:\Code_Pro\study-notes

# Build web project
npm run build

# Thêm platform iOS
npx cap add ios

# Sync files vào iOS project
npx cap sync ios

# Copy built files
npx cap copy ios
```

### Mở và chạy trong Xcode

```bash
# Mở iOS project trong Xcode
npx cap open ios
```

Sau đó:

1. Chọn simulator hoặc device
2. Nhấn "Play" button để run

### Test Cases cho iOS:

- ✅ **SafeArea**: Layout phù hợp với notch (nếu có)
- ✅ **Status bar**: Hiển thị đúng
- ✅ **Gestures**: Swipe, tap, long-press hoạt động
- ✅ **Storage**: Dữ liệu được lưu persistent
- ✅ **Performance**: Smooth animations, không stuttering
- ✅ **Native feel**: Navigation cảm giác native iOS

---

## 4. Test Tính năng Lưu trữ (Cross-platform)

### Kiểm tra Capacitor Storage

```javascript
// Mở DevTools (F12 trên desktop)
// Console tab, chạy:
import { Preferences } from "@capacitor/preferences";
await Preferences.get({ key: "study-notes" });
```

### Test data persistence:

1. Thêm ghi chú cho môn Toán: "Hệ phương trình bậc 2"
2. Reload page (F5)
3. Kiểm tra: Ghi chú vẫn còn
4. Chuyển sang môn Lý, thêm ghi chú: "Định luật Newton"
5. Reload page
6. Kiểm tra: Cả 2 ghi chú đều còn

---

## 5. Test trên Chrome DevTools Mobile Simulation

### Không cần emulator/device:

1. Mở ứng dụng tại `http://localhost:5174`
2. Nhấn F12 mở DevTools
3. Nhấn Ctrl+Shift+M để bật Mobile Mode
4. Chọn các device khác nhau:
   - iPhone 12/13/14
   - Pixel 5/6/7
   - iPad Air
   - Samsung Galaxy

### Test Cases:

- ✅ Responsive layout
- ✅ Touch events
- ✅ Orientation (portrait/landscape)
- ✅ Different screen sizes

---

## 6. Cross-browser Testing

### Browsers để test:

- ✅ **Chrome/Chromium**: Web, Android
- ✅ **Firefox**: Web
- ✅ **Safari**: Web, iOS
- ✅ **Edge**: Web

### Checklist:

- [ ] Chrome (Latest)
- [ ] Firefox (Latest)
- [ ] Safari (Latest)
- [ ] Edge (Latest)
- [ ] Android Browser
- [ ] iOS Safari

---

## 7. Performance Testing

### Kiểm tra Performance:

```bash
# DevTools -> Lighthouse tab
# Chạy: Performance, PWA, Accessibility, Best Practices
```

### Metrics cần kiểm tra:

- ✅ First Contentful Paint (FCP) < 1.8s
- ✅ Largest Contentful Paint (LCP) < 2.5s
- ✅ Cumulative Layout Shift (CLS) < 0.1
- ✅ Time to Interactive (TTI) < 3.8s

---

## 8. Accessibility Testing

### Checklist:

- ✅ Keyboard navigation (Tab key)
- ✅ Screen reader (VoiceOver, TalkBack)
- ✅ Contrast ratio (WCAG AA)
- ✅ Font size (readable)
- ✅ Color not only for meaning

---

## 9. Test Scenarios

### Scenario 1: Ghi chú Toán

1. Click môn Toán
2. Nhập: "Phương trình bậc 2: ax² + bx + c = 0"
3. Lưu
4. Quay lại, kiểm tra số ký tự (phải > 0)
5. Click lại Toán, kiểm tra ghi chú còn đó

### Scenario 2: Ghi chú nhiều môn

1. Ghi chú cho 3 môn: Toán, Lý, Anh
2. Reload page
3. Kiểm tra tất cả 3 ghi chú vẫn còn
4. Edit ghi chú Lý
5. Lưu, kiểm tra update đúng

### Scenario 3: Xóa ghi chú

1. Click Hóa, ghi chú không có
2. Nhập "Bảng tuần hoàn"
3. Lưu
4. Quay lại, Hóa hiển thị 15 ký tự
5. Click Hóa, xóa hết, lưu
6. Quay lại, Hóa quay về "Chưa có ghi chú"

---

## 10. Kiểm tra Build Size

```bash
# Build web
npm run build

# Kiểm tra size
dir dist\assets

# Size tối ưu:
# - HTML: < 1KB
# - CSS: < 5KB
# - JS: < 250KB (gzipped < 100KB)
```

---

## ✅ Checklist Test Cuối cùng

- [ ] Web version hoạt động đúng
- [ ] Responsive trên mọi kích thước màn hình
- [ ] Android build thành công
- [ ] iOS build thành công (nếu có Mac)
- [ ] Ghi chú được lưu persistent
- [ ] Không có console errors
- [ ] Performance tốt (< 3s load time)
- [ ] Accessibility đạt WCAG AA
- [ ] Không bị crash khi reload
- [ ] Tất cả animations smooth

---

## 📝 Ghi chú Test

Sau khi test, hãy ghi lại:

- Ngày test: ****\_\_\_****
- Browser/Device: ****\_\_\_****
- Kết quả: ✅ Pass / ❌ Fail
- Vấn đề tìm thấy: ****\_\_\_****

---

Chúc bạn test thành công! 🚀
