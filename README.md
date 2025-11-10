# CRM Dashboard - Hệ thống Quản lý Khách hàng Doanh nghiệp

Ứng dụng web quản lý khách hàng doanh nghiệp được xây dựng với React + TypeScript + Vite.

## Tính năng

### 1. Trang chủ (Dashboard)
- Hiển thị tổng quan số lượng khách hàng
- Cards tác vụ của tôi (chỉ hiển thị KH có trạng thái khác Closure và Canceled)
- Mỗi card hiển thị: Tên KH, Trạng thái, PIC, Dịch vụ, Ngày golive dự kiến
- Click vào card để xem chi tiết khách hàng

### 2. Quản lý khách hàng
- Data table hiển thị danh sách tất cả khách hàng
- Bộ lọc theo: Khách hàng, Miền, Loại dịch vụ, Trạng thái, Người xử lý, Chi nhánh
- Nút thêm mới khách hàng
- Click vào hàng để xem chi tiết

### 3. Chi tiết khách hàng
- **Chế độ xem**: Hiển thị đầy đủ thông tin khách hàng với pipeline/stepper thể hiện tiến độ dự án
- **Chế độ tạo mới**: Form nhập liệu với validation đầy đủ
- **Chế độ chỉnh sửa**:
  - Cập nhật thông tin khách hàng
  - Nút "Dừng triển khai" với modal nhập lý do
  - Validation form trước khi submit
- **Pipeline visualization**: Hiển thị các phase (Initiation → Planning → Execution → Monitor & Control → Closure)
- **Checklist**: Danh sách công việc cho từng phase

### 4. Báo cáo
- Dashboard Power BI với các chỉ số:
  - Tổng số khách hàng đã triển khai
  - Tổng số giao dịch
  - Giá trị giao dịch
  - Casa bình quân
- Bộ lọc theo: Mốc thời gian (Tuần/Tháng/Quý/Năm), Khách hàng
- Bảng thống kê chi tiết theo khách hàng

## Màu sắc thiết kế

- **Primary color**: #2b6cae (Xanh dương)
- **Secondary color**: #f19b38 (Cam)
- **Background**: #fefefe (Trắng)
- **Accent/light section**: #92b5d7 (Xanh nhạt)

## Cấu trúc dự án

```
src/
├── components/          # Các components tái sử dụng
│   ├── Layout.tsx      # Layout chính với sidebar
│   └── StatusBadge.tsx # Badge hiển thị trạng thái
├── contexts/           # React Context cho state management
│   └── CustomerContext.tsx
├── data/              # Mock data
│   └── mockCustomers.ts
├── pages/             # Các trang chính
│   ├── Home.tsx
│   ├── CustomerList.tsx
│   ├── CustomerDetail.tsx
│   └── Reports.tsx
├── types/             # TypeScript types
│   └── index.ts
├── App.tsx            # Main app với routing
├── main.tsx           # Entry point
└── index.css          # Global styles
```

## Cài đặt và chạy

### Yêu cầu
- Node.js >= 16
- npm hoặc yarn

### Các bước cài đặt

1. Clone repository
```bash
git clone <repository-url>
cd wbd_customer
```

2. Cài đặt dependencies
```bash
npm install
```

3. Chạy development server
```bash
npm run dev
```

Ứng dụng sẽ chạy tại http://localhost:5173/

### Build cho production
```bash
npm run build
```

### Preview production build
```bash
npm run preview
```

## Công nghệ sử dụng

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool và dev server
- **React Router DOM** - Client-side routing
- **CSS Variables** - Theming và styling

## Mockdata

Ứng dụng sử dụng mockdata với 12 khách hàng mẫu bao gồm:
- Thegioididong, Viettel, Sabeco, Shopee, Sendo, Momo, VNPTPay, FPT Telecom, Tiki, VinCommerce, VNPT, Grab Vietnam

## Chức năng đã implement

✅ Sidebar navigation với 3 menu items
✅ Trang chủ với cards tổng quan và tác vụ
✅ Quản lý khách hàng với data table và filters
✅ Tạo mới khách hàng với validation
✅ Xem chi tiết khách hàng với pipeline visualization
✅ Chỉnh sửa khách hàng
✅ Dừng triển khai khách hàng với modal
✅ Báo cáo với dashboard metrics
✅ Responsive design
✅ Form validation
✅ Success/Error messages

## License

MIT
