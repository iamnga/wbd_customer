# Tài Liệu Đặc Tả Ứng Dụng CRM - WholeSale Banking Digital Solution

## 1. TỔNG QUAN DỰ ÁN

### 1.1. Mục Đích
Xây dựng ứng dụng Power Apps để quản lý khách hàng và theo dõi tiến độ triển khai dịch vụ thu chi hộ cho phòng WholeSale Banking - Digital Solution.

### 1.2. Phạm Vi
- Quản lý thông tin khách hàng doanh nghiệp
- Theo dõi tiến độ dự án triển khai dịch vụ
- Quản lý tác vụ cá nhân theo người xử lý

### 1.3. Người Dùng
- Nhân viên phòng WholeSale Banking - Digital Solution
- Relationship Manager (RM)
- Sales Manager (SM)

---

## 2. KIẾN TRÚC DỮ LIỆU SHAREPOINT

### 2.1. SharePoint List: "Customers"

Đây là bảng chính lưu trữ tất cả thông tin khách hàng.

#### 2.1.1. Các Cột Dữ Liệu

**A. Thông Tin Cơ Bản**

| Tên Cột | Kiểu Dữ Liệu | Bắt Buộc | Mô Tả |
|---------|--------------|----------|-------|
| Title | Single line of text | Yes | Tên khách hàng (đây là cột mặc định của SharePoint) |
| CIF | Single line of text | No | Số CIF (Customer Identification File) của khách hàng |
| Industry | Choice | No | Ngành nghề kinh doanh (xem danh sách chi tiết bên dưới) |
| Website | Hyperlink | No | Website chính thức của khách hàng |
| DocumentsLink | Hyperlink | No | Link đến thư mục SharePoint/OneDrive chứa tài liệu liên quan |

**B. Thông Tin Dịch Vụ & Trạng Thái**

| Tên Cột | Kiểu Dữ Liệu | Bắt Buộc | Mô Tả |
|---------|--------------|----------|-------|
| ServiceType | Choice | Yes | Loại dịch vụ: "Chi hộ", "Thu hộ", "Thu & Chi" |
| Status | Choice | Yes | Trạng thái dự án: "Initiation", "Planning", "Execution", "MonitorNControl", "Closure", "Canceled" |
| StartDate | Date | No | Ngày bắt đầu dự án |
| ExpectedEndDate | Date | No | Ngày kết thúc dự kiến (Golive date) |
| CancelReason | Multiple lines of text | No | Lý do dừng triển khai (chỉ hiển thị khi Status = "Canceled") |

**C. Phân Công & Quản Lý**

| Tên Cột | Kiểu Dữ Liệu | Bắt Buộc | Mô Tả |
|---------|--------------|----------|-------|
| Region | Choice | No | Miền: "Miền Nam", "Miền Bắc" |
| Branch | Choice | No | Chi nhánh: "Hội Sở", "Đô Thành", "Hà Nội", "Hoàn Kiếm" |
| Handler | Person or Group | Yes | Người xử lý (sử dụng kiểu Person để tự động lấy user đang đăng nhập) |

**D. Thông Tin RM (Relationship Manager)**

| Tên Cột | Kiểu Dữ Liệu | Bắt Buộc | Mô Tả |
|---------|--------------|----------|-------|
| RM_FullName | Single line of text | No | Họ tên RM |
| RM_Title | Single line of text | No | Chức danh RM |
| RM_Email | Single line of text | No | Email RM |
| RM_Phone | Single line of text | No | Số điện thoại RM |

**E. Thông Tin SM (Sales Manager)**

| Tên Cột | Kiểu Dữ Liệu | Bắt Buộc | Mô Tả |
|---------|--------------|----------|-------|
| SM_FullName | Single line of text | No | Họ tên SM |
| SM_Title | Single line of text | No | Chức danh SM |
| SM_Email | Single line of text | No | Email SM |
| SM_Phone | Single line of text | No | Số điện thoại SM |

**F. Liên Hệ Khách Hàng 1**

| Tên Cột | Kiểu Dữ Liệu | Bắt Buộc | Mô Tả |
|---------|--------------|----------|-------|
| Contact1_FullName | Single line of text | No | Họ tên người liên hệ 1 |
| Contact1_Title | Single line of text | No | Chức danh người liên hệ 1 |
| Contact1_Email | Single line of text | No | Email người liên hệ 1 |
| Contact1_Phone | Single line of text | No | Số điện thoại người liên hệ 1 |

**G. Liên Hệ Khách Hàng 2**

| Tên Cột | Kiểu Dữ Liệu | Bắt Buộc | Mô Tả |
|---------|--------------|----------|-------|
| Contact2_FullName | Single line of text | No | Họ tên người liên hệ 2 |
| Contact2_Title | Single line of text | No | Chức danh người liên hệ 2 |
| Contact2_Email | Single line of text | No | Email người liên hệ 2 |
| Contact2_Phone | Single line of text | No | Số điện thoại người liên hệ 2 |

**H. Phân Loại Đặc Biệt**

| Tên Cột | Kiểu Dữ Liệu | Bắt Buộc | Mô Tả |
|---------|--------------|----------|-------|
| IsTCG | Yes/No | No | Có phải là TCG (Top Customer Group) hay không |
| HasCustomize | Yes/No | No | Có yêu cầu customize hay không |
| CustomizeDescription | Multiple lines of text | No | Mô tả chi tiết về customize (bắt buộc nếu HasCustomize = Yes) |

**I. Ghi Chú & Metadata**

| Tên Cột | Kiểu Dữ Liệu | Bắt Buộc | Mô Tả |
|---------|--------------|----------|-------|
| Notes | Multiple lines of text | No | Ghi chú chung về khách hàng |
| Created | Date/Time | Auto | Ngày tạo record (tự động) |
| Modified | Date/Time | Auto | Ngày cập nhật lần cuối (tự động) |

#### 2.1.2. Danh Sách Các Choice Values

**ServiceType:**
- Chi hộ
- Thu hộ
- Thu & Chi

**Status:**
- Initiation
- Planning
- Execution
- MonitorNControl
- Closure
- Canceled

**Region:**
- Miền Nam
- Miền Bắc

**Branch:**
- Hội Sở
- Đô Thành
- Hà Nội
- Hoàn Kiếm

**Industry (Ngành Nghề Kinh Doanh):**
- Nông nghiệp, lâm nghiệp và thủy sản
- Khai khoáng
- Công nghiệp chế biến, chế tạo
- Sản xuất và phân phối điện, khí đốt, hơi nước và điều hòa không khí
- Cung cấp nước; hoạt động quản lý và xử lý rác thải, nước thải
- Xây dựng
- Bán buôn và bán lẻ; sửa chữa ô tô, mô tô, xe máy và xe có động cơ khác
- Vận tải, kho bãi
- Dịch vụ lưu trú và ăn uống
- Thông tin và truyền thông
- Hoạt động tài chính, ngân hàng và bảo hiểm
- Hoạt động kinh doanh bất động sản
- Hoạt động chuyên môn, khoa học và công nghệ
- Hoạt động hành chính và dịch vụ hỗ trợ
- Hoạt động của Đảng, tổ chức chính trị – xã hội, quản lý nhà nước, an ninh quốc phòng; bảo đảm xã hội bắt buộc
- Giáo dục và đào tạo
- Y tế và hoạt động trợ giúp xã hội
- Nghệ thuật, vui chơi và giải trí
- Hoạt động dịch vụ khác
- Hoạt động của hộ gia đình với tư cách người sử dụng lao động; sản xuất sản phẩm tự tiêu dùng của hộ gia đình
- Hoạt động của các tổ chức và cơ quan quốc tế

### 2.2. Thiết Kế Mở Rộng

#### 2.2.1. SharePoint List Bổ Sung (Giai Đoạn 2)

**A. List: "ProjectPhases"**
Lưu trữ chi tiết từng giai đoạn của dự án:
- CustomerId (Lookup to Customers)
- Phase (Choice: Initiation, Planning, Execution, MonitorNControl, Closure)
- StartDate
- EndDate
- Status (Choice: Pending, InProgress, Completed)
- Notes

**B. List: "PhaseChecklists"**
Lưu trữ checklist cho từng phase:
- Phase (Choice)
- ChecklistItem (Single line text)
- IsCompleted (Yes/No)
- CustomerId (Lookup)
- CompletedDate
- CompletedBy (Person)

**C. List: "Transactions"** (Nếu cần tracking giao dịch thực tế)
- CustomerId (Lookup)
- TransactionDate
- TransactionType (Choice: Thu, Chi)
- Amount (Currency)
- Description
- Status

---

## 3. CẤU TRÚC ỨNG DỤNG POWER APPS

### 3.1. Trang Chủ (Home Screen)

#### 3.1.1. Mục Đích
- Hiển thị tổng quan nhanh về tình hình khách hàng
- Hiển thị tác vụ cá nhân của người dùng đang đăng nhập
- Truy cập nhanh vào chi tiết khách hàng

#### 3.1.2. Layout & Components

**A. Header Section**
- Tiêu đề: "Trang chủ"
- Màu chủ đạo: #2b6cae (xanh dương ngân hàng)

**B. Statistics Cards (3 Cards Ngang)**

Card 1: **Tổng Số Khách Hàng**
- Icon: TeamOutlined
- Formula: `CountRows(Customers)`
- Background: Gradient xanh dương (#2b6cae -> #92b5d7)
- Màu chữ: Trắng

Card 2: **KH Đã Triển Khai**
- Icon: CheckCircleOutlined
- Formula: `CountRows(Filter(Customers, Status = "Closure"))`
- Background: Gradient xanh lá (#4caf50 -> #81c784)
- Màu chữ: Trắng

Card 3: **KH Đang Triển Khai**
- Icon: SyncOutlined (quay)
- Formula: `CountRows(Filter(Customers, Status <> "Closure" And Status <> "Canceled"))`
- Background: Gradient cam (#f19b38 -> #ffb74d)
- Màu chữ: Trắng

**C. Task Section - "Tác vụ của tôi"**

Không có dropdown selector - tự động hiển thị task của user đang đăng nhập

Data Source Formula:
```
Filter(Customers,
    Status <> "Closure" And
    Status <> "Canceled" And
    Handler.Email = User().Email
)
```

Hoặc nếu Handler được lưu dưới dạng text:
```
Filter(Customers,
    Status <> "Closure" And
    Status <> "Canceled" And
    Handler = User().FullName
)
```

Card Layout (Gallery - 3 columns responsive):
Mỗi customer card hiển thị:
- **Tên khách hàng** (Title, bold, màu #2b6cae)
- **Trạng thái**: Badge với màu tương ứng
  - Initiation: #1890ff (blue)
  - Planning: #722ed1 (purple)
  - Execution: #fa8c16 (orange)
  - MonitorNControl: #13c2c2 (cyan)
  - Closure: #52c41a (green)
  - Canceled: #d9d9d9 (gray)
- **Dịch vụ**: Tag với màu
  - Chi hộ: orange
  - Thu hộ: blue
  - Thu & Chi: cyan
- **Người xử lý**: Icon user + tên người đang đăng nhập
- **Ngày golive**: Icon calendar + ExpectedEndDate (format DD/MM/YYYY, màu cam #f19b38)

Action:
- Click vào card -> Navigate to Customer Detail Screen (View mode)

**D. Empty State**
Khi không có task:
- Icon: Empty image
- Text: "Bạn không có tác vụ nào đang hoạt động"

### 3.2. Quản Lý Khách Hàng (Customer List Screen)

#### 3.2.1. Mục Đích
- Hiển thị danh sách tất cả khách hàng
- Lọc và tìm kiếm khách hàng
- Thêm mới khách hàng
- Truy cập nhanh vào chi tiết

#### 3.2.2. Layout & Components

**A. Header Section**
- Tiêu đề: "Quản lý khách hàng" (left aligned)
- Button "Thêm mới khách hàng" (right aligned, primary color, icon: Plus)

**B. Filter Panel (Card)**

Layout: Grid 6 columns responsive

Filter 1: **Khách hàng**
- Type: Text Input
- Placeholder: "Tìm kiếm..."
- Icon: Search
- Function: Filter theo Title (contains)

Filter 2: **Miền**
- Type: Dropdown
- Options: "Tất cả", "Miền Nam", "Miền Bắc"
- Default: "Tất cả"

Filter 3: **Loại dịch vụ**
- Type: Dropdown
- Options: "Tất cả", "Chi hộ", "Thu hộ", "Thu & Chi"
- Default: "Tất cả"

Filter 4: **Trạng thái**
- Type: Dropdown
- Options: "Tất cả", "Initiation", "Planning", "Execution", "Monitor & Control", "Closure", "Canceled"
- Default: "Tất cả"

Filter 5: **Người xử lý**
- Type: People Picker hoặc Dropdown
- Options: "Tất cả" + danh sách users
- Default: "Tất cả"

Filter 6: **Chi nhánh**
- Type: Dropdown
- Options: "Tất cả", "Hội Sở", "Đô Thành", "Hà Nội", "Hoàn Kiếm"
- Default: "Tất cả"

**C. Data Table (Gallery hoặc Data Table)**

Columns:
1. **Tên khách hàng** (25% width, bold)
2. **Loại dịch vụ** (15% width)
3. **Trạng thái** (15% width, colored badge)
4. **Miền** (15% width)
5. **Chi nhánh** (15% width)
6. **Người xử lý** (15% width)

Features:
- Pagination: 10 items per page
- Show total: "Hiển thị {start}-{end} trong tổng số {total} khách hàng"
- Click row -> Navigate to Customer Detail
- Cursor: pointer on hover

Empty State:
- Text: "Không tìm thấy khách hàng nào"

### 3.3. Chi Tiết Khách Hàng (Customer Detail Screen)

#### 3.3.1. Modes

Màn hình này có 3 modes:
1. **View Mode**: Xem chi tiết (read-only)
2. **Edit Mode**: Chỉnh sửa thông tin
3. **New Mode**: Tạo mới khách hàng

#### 3.3.2. Layout & Components

**A. Header**
- Title:
  - New Mode: "Tạo mới khách hàng"
  - Edit Mode: "Chỉnh sửa khách hàng"
  - View Mode: "Chi tiết khách hàng"
- Color: #2b6cae

**B. Alert Messages**
- Success message: Green alert (closable)
- Error message: Red alert (closable)

**C. Pipeline Section (Chỉ hiển thị ở View Mode, Status != Canceled)**

Component: Steps / Progress Bar

Steps:
1. **Initiation**
   - Icon: 1 (hoặc CheckMark nếu completed)
   - Tooltip checklist items:
     - Đề xuất hợp tác
     - Project Scope
     - Contract & Legal
     - NDA
     - Virtual Account Contract

2. **Planning**
   - Icon: 2 (hoặc CheckMark nếu completed)
   - Tooltip checklist items:
     - Requirements gathering
     - Technical spec
     - Project Management Plan
     - BRD

3. **Execution**
   - Icon: 3 (hoặc CheckMark nếu completed)
   - Tooltip checklist items:
     - Connection Setup
     - Testing
     - System Integration
     - API Development
     - UAT

4. **Monitor & Control**
   - Icon: 4 (hoặc CheckMark nếu completed)
   - Tooltip checklist items:
     - SIT/UAT Results
     - Project Updates

5. **Closure**
   - Icon: 5 (hoặc CheckMark nếu completed)
   - Tooltip checklist items:
     - Acceptance Document
     - Golive Checklist
     - User Guideline

Logic:
- Current step: Highlight màu xanh, status = "process"
- Completed steps: CheckMark icon, status = "finish"
- Future steps: Gray, status = "wait"

**D. Thông Tin Khách Hàng Card**

##### VIEW MODE

Component: Display form hoặc custom labels

Layout: 2 columns descriptions

Fields hiển thị:
- Tên khách hàng
- Loại dịch vụ
- Trạng thái (colored badge)
- Miền
- Chi nhánh
- Người xử lý (hiển thị tên từ Person field)
- Ngày bắt đầu (format: DD/MM/YYYY)
- Ngày kết thúc dự kiến (format: DD/MM/YYYY)
- Số CIF
- Là TCG:
  - Nếu Yes: Tag màu vàng "Top Customer Group"
  - Nếu No: "-"
- Có Customize:
  - Nếu Yes: Tag màu xanh "Có"
  - Nếu No: Tag xám "Không"
- Ngành nghề kinh doanh
- **Mô tả chi tiết Customize** (chỉ hiển thị nếu HasCustomize = Yes, span 2 columns)
- Website (clickable link, open in new tab)
- Link tài liệu liên quan (clickable link, text: "Thư mục tài liệu")

**RM Contact** (chỉ hiển thị nếu có ít nhất 1 field)
- RM - Họ tên
- RM - Chức danh
- RM - Email (clickable mailto:)
- RM - Số điện thoại

**SM Contact** (chỉ hiển thị nếu có ít nhất 1 field)
- SM - Họ tên
- SM - Chức danh
- SM - Email (clickable mailto:)
- SM - Số điện thoại

**Liên Hệ 1** (chỉ hiển thị nếu có ít nhất 1 field)
- Liên hệ 1 - Họ tên
- Liên hệ 1 - Chức danh
- Liên hệ 1 - Email (clickable mailto:)
- Liên hệ 1 - Số điện thoại

**Liên Hệ 2** (chỉ hiển thị nếu có ít nhất 1 field)
- Liên hệ 2 - Họ tên
- Liên hệ 2 - Chức danh
- Liên hệ 2 - Email (clickable mailto:)
- Liên hệ 2 - Số điện thoại

**Ghi chú** (span 2 columns)
- Hiển thị notes, nếu rỗng: "Không có ghi chú"

**Lý do dừng triển khai** (chỉ hiển thị nếu CancelReason có giá trị, span 2 columns)
- Text màu đỏ

##### EDIT MODE / NEW MODE

Component: Edit form

Layout: Grid 4 columns (responsive)

**Thông Tin Cơ Bản**

Row 1:
- **Tên khách hàng** (1 col, required, text input)
- **Loại dịch vụ** (1 col, required, dropdown: Chi hộ, Thu hộ, Thu & Chi)
- **Miền** (1 col, optional, dropdown: Miền Nam, Miền Bắc)
- **Chi nhánh** (1 col, optional, dropdown: Hội Sở, Đô Thành, Hà Nội, Hoàn Kiếm)

Row 2:
- **Người xử lý** (1 col, required, People Picker)
  - New Mode: Default = User đang đăng nhập (User().Email hoặc User().FullName)
  - Edit Mode: Có thể thay đổi
- **Trạng thái** (1 col, CHỈ hiển thị ở Edit Mode, dropdown với tất cả status)
  - New Mode: Tự động set = "Initiation"
- **Ngày bắt đầu** (1 col, optional, date picker format DD/MM/YYYY)
- **Ngày kết thúc dự kiến** (1 col, optional, date picker format DD/MM/YYYY)

Row 3:
- **Số CIF** (1 col, optional, text input, placeholder: "Nhập số CIF khách hàng")
- **Ngành nghề kinh doanh** (2 cols, optional, searchable dropdown)
- **Website** (1 col, optional, text input, placeholder: "https://example.com")

Row 4:
- **Link tài liệu liên quan** (4 cols full width, optional, text input, placeholder: "https://sharepoint.com/...")

Row 5:
- **Là TCG (Top Customer Group)** (1 col, checkbox)
- **Có Customize** (3 cols, checkbox)

Conditional Row (chỉ hiển thị khi HasCustomize = checked):
- **Mô tả chi tiết Customize** (full width, required if visible, multiline text area, 4 rows, placeholder: "Mô tả cụ thể các tính năng/yêu cầu customize...")

**Thông Tin RM Quản Lý**

Subtitle: "Thông tin RM quản lý" (màu #2b6cae)

Grid 4 columns:
- Họ tên (text input, placeholder: "Nhập họ tên RM")
- Chức danh (text input, placeholder: "Nhập chức danh")
- Email (text input, type email, placeholder: "rm@example.com")
- Số điện thoại (text input, placeholder: "0xxx xxx xxx")

**Thông Tin SM Quản Lý**

Subtitle: "Thông tin SM quản lý" (màu #2b6cae)

Grid 4 columns:
- Họ tên (text input, placeholder: "Nhập họ tên SM")
- Chức danh (text input, placeholder: "Nhập chức danh")
- Email (text input, type email, placeholder: "sm@example.com")
- Số điện thoại (text input, placeholder: "0xxx xxx xxx")

**Liên Hệ Khách Hàng 1**

Subtitle: "Liên hệ khách hàng 1" (màu #2b6cae)

Grid 4 columns:
- Họ tên (text input, placeholder: "Nhập họ tên")
- Chức danh (text input, placeholder: "Nhập chức danh")
- Email (text input, type email, placeholder: "contact1@example.com")
- Số điện thoại (text input, placeholder: "0xxx xxx xxx")

**Liên Hệ Khách Hàng 2**

Subtitle: "Liên hệ khách hàng 2" (màu #2b6cae)

Grid 4 columns:
- Họ tên (text input, placeholder: "Nhập họ tên")
- Chức danh (text input, placeholder: "Nhập chức danh")
- Email (text input, type email, placeholder: "contact2@example.com")
- Số điện thoại (text input, placeholder: "0xxx xxx xxx")

**Ghi Chú**

Subtitle: "Ghi chú" (màu #2b6cae)

- Notes (multiline text area, 4 rows, placeholder: "Nhập ghi chú (không bắt buộc)")

**E. Footer Buttons**

Layout: Space between (left and right)

Left side:
- Button "Quay lại" (icon: Arrow Left, navigate back to list)

Right side (buttons change based on mode):

**View Mode:**
- Button "Chỉnh sửa" (primary, icon: Edit, switch to Edit Mode)

**Edit Mode:**
- Button "Dừng triển khai" (danger/red, icon: Stop, chỉ hiển thị nếu Status != "Canceled")
  - Click -> Open modal xác nhận dừng
- Button "Lưu thay đổi" (primary, icon: Save)
  - Validate form
  - Submit changes
  - Show success message
  - Switch to View Mode

**New Mode:**
- Button "Tạo mới" (primary, icon: Plus)
  - Validate form (Title, ServiceType, Handler required)
  - Auto set Status = "Initiation"
  - Auto set Handler = User đang đăng nhập (nếu không chọn khác)
  - Create record
  - Show success message
  - Navigate to Customer List after 1.5s

**F. Modal: Dừng Triển Khai**

Title: "Dừng triển khai khách hàng"

Content:
- Label: "Lý do dừng triển khai" (required indicator)
- Multiline text input (4 rows, placeholder: "Vui lòng nêu rõ lý do...")

Footer Buttons:
- "Hủy bỏ" (icon: Close)
- "Xác nhận dừng" (danger, icon: Check)

Logic:
- Validate CancelReason không rỗng
- Update Status = "Canceled"
- Update CancelReason
- Close modal
- Show success message
- Refresh view

---

## 4. LOGIC NGHIỆP VỤ

### 4.1. Validation Rules

#### 4.1.1. Required Fields
- **Title (Tên khách hàng)**: Luôn bắt buộc
- **ServiceType**: Luôn bắt buộc
- **Handler**: Luôn bắt buộc (default = User đang đăng nhập ở New Mode)

#### 4.1.2. Conditional Validation
- **CustomizeDescription**: Bắt buộc KHI HasCustomize = Yes
  - Error message: "Vui lòng mô tả chi tiết về customize"

#### 4.1.3. Cancel Validation
- **CancelReason**: Bắt buộc khi user click "Dừng triển khai"
  - Warning modal: "Vui lòng nhập lý do dừng triển khai"

#### 4.1.4. Form Validation
- Khi submit form (Create/Edit):
  - Validate tất cả required fields
  - Error message: "Vui lòng kiểm tra và điền đầy đủ thông tin"

### 4.2. Business Rules

#### 4.2.1. Status Workflow
Khách hàng mới luôn bắt đầu với Status = "Initiation"

Workflow progression:
```
Initiation -> Planning -> Execution -> MonitorNControl -> Closure
                                                        |
                                                        v
                                                    Canceled (có thể từ bất kỳ stage nào)
```

#### 4.2.2. Pipeline Display Logic
- Pipeline chỉ hiển thị ở View Mode
- Pipeline KHÔNG hiển thị khi Status = "Canceled"
- Current step được highlight
- Previous steps hiển thị checkmark
- Future steps hiển thị số thứ tự và gray out

#### 4.2.3. Contact Information Logic
- RM, SM, Contact1, Contact2 chỉ hiển thị trong View Mode nếu có ít nhất 1 field được điền
- Email fields phải có format email hợp lệ
- Email trong View Mode là clickable mailto: links
- Website và DocumentsLink là clickable hyperlinks, open in new tab

#### 4.2.4. TCG & Customize Logic
- Là TCG:
  - View Mode: Nếu Yes -> Tag màu gold "Top Customer Group", nếu No -> "-"
- Có Customize:
  - View Mode: Tag màu xanh "Có" hoặc xám "Không"
  - Edit/New Mode: Checkbox control
- Mô tả chi tiết Customize:
  - Chỉ hiển thị/required khi HasCustomize = Yes
  - Ẩn hoàn toàn khi HasCustomize = No

#### 4.2.5. User Context Logic

**Home Screen:**
- Tự động lọc customers theo người đăng nhập:
  ```
  Filter(Customers,
      Status <> "Closure" And
      Status <> "Canceled" And
      Handler.Email = User().Email
  )
  ```

**New Customer:**
- Handler field default value = User().Email (hoặc User())
- User có thể thay đổi nếu cần

#### 4.2.6. Filter Logic

**Customer List:**
- Apply AND logic across all filters
- Text search: Contains (case insensitive)
- Empty filter = no filter applied
- Handler filter: Có thể filter theo bất kỳ user nào (không giới hạn)

### 4.3. Calculations & Formulas

#### 4.3.1. Home Screen Statistics
```
TotalCustomers = CountRows(Customers)
DeployedCustomers = CountRows(Filter(Customers, Status = "Closure"))
DeployingCustomers = CountRows(Filter(Customers, Status <> "Closure" And Status <> "Canceled"))
```

#### 4.3.2. My Tasks Filter
```
MyActiveTasks = Filter(Customers,
    Status <> "Closure" And
    Status <> "Canceled" And
    Handler.Email = User().Email
)
```

---

## 6. NAVIGATION & USER FLOW

### 6.1. Menu Structure

**Main Navigation (Left sidebar hoặc Top menu):**

1. **Trang chủ** (Home)
   - Icon: Home
   - Default landing page
   - Hiển thị tác vụ của user đang đăng nhập

2. **Quản lý khách hàng** (Customer List)
   - Icon: Team
   - Badge: Show total count
   - Xem tất cả customers (không giới hạn theo Handler)

### 6.2. User Flows

#### Flow 1: Xem Tác Vụ Cá Nhân & Truy Cập Chi Tiết
```
Home Screen (auto filter by current user) -> Click Customer Card -> Customer Detail (View Mode) -> Click "Chỉnh sửa" -> Edit Mode -> Click "Lưu thay đổi" -> View Mode (Updated)
```

#### Flow 2: Tìm Kiếm & Xem Tất Cả Khách Hàng
```
Customer List -> Apply Filters (có thể filter theo Handler khác) -> Click Row -> Customer Detail (View Mode)
```

#### Flow 3: Tạo Mới Khách Hàng
```
Customer List -> Click "Thêm mới khách hàng" -> Customer Detail (New Mode) -> Fill Form (Handler default = current user) -> Click "Tạo mới" -> Success -> Navigate to Customer List
```

#### Flow 4: Chỉnh Sửa Khách Hàng
```
Customer Detail (View Mode) -> Click "Chỉnh sửa" -> Edit Mode -> Update Fields -> Click "Lưu thay đổi" -> Validate -> Success -> View Mode (Updated)
```

#### Flow 5: Dừng Triển Khai
```
Customer Detail (Edit Mode) -> Click "Dừng triển khai" -> Modal Opens -> Enter CancelReason -> Click "Xác nhận dừng" -> Validate -> Update Status = "Canceled" -> Success -> View Mode (Updated)
```

---

## 7. UI/UX REQUIREMENTS

### 7.1. Color Palette

**Primary Colors:**
- Primary Blue: #2b6cae (header, titles, primary buttons)
- Light Blue: #92b5d7 (gradient, secondary elements)
- Very Light Blue: #d4e7f7 (backgrounds)

**Secondary Colors:**
- Orange: #f19b38 (warnings, highlights, dates)
- Light Orange: #ffb74d (gradients)
- Green: #4caf50 (success, deployed)
- Light Green: #81c784 (gradients)

**Status Colors:**
- Initiation: #1890ff (blue)
- Planning: #722ed1 (purple)
- Execution: #fa8c16 (orange)
- MonitorNControl: #13c2c2 (cyan)
- Closure: #52c41a (green)
- Canceled: #d9d9d9 (gray)

**Service Type Colors:**
- Chi hộ: orange
- Thu hộ: blue
- Thu & Chi: cyan

**Special Tags:**
- TCG: gold
- Customize Có: blue
- Customize Không: default gray

### 7.2. Typography

**Titles:**
- H2 (Page titles): Size 30px, Weight 600, Color #2b6cae
- H4 (Section titles): Size 20px, Weight 600, Color #2b6cae
- H5 (Subsection titles): Size 16px, Weight 600, Color #2b6cae

**Body Text:**
- Regular: Size 14px, Weight 400
- Strong: Size 14px, Weight 600
- Secondary: Size 12px, Color rgba(0,0,0,0.45)

### 7.3. Spacing & Layout

**Card Spacing:**
- Padding: 24px
- Gap between sections: 24px
- Gap between cards: 16px

**Form Layout:**
- Label margin bottom: 8px
- Input height: 32px (single line) / 128px (multiline)
- Grid gap: 16px (horizontal) / 0px (vertical)

**Responsive Breakpoints:**
- Mobile: < 768px (1 column)
- Tablet: 768px - 1024px (2 columns)
- Desktop: > 1024px (3-4 columns)

### 7.4. Interactive Elements

**Buttons:**
- Size: large (height 40px)
- Border radius: 2px
- Primary: Background #2b6cae, hover darken 10%
- Danger: Background #ff4d4f
- Default: Background white, border gray

**Cards:**
- Border radius: 2px
- Shadow: 0 1px 2px rgba(0,0,0,0.08)
- Hover: Shadow 0 4px 12px rgba(0,0,0,0.15), cursor pointer

**Badges/Tags:**
- Border radius: 2px
- Padding: 2px 8px
- Font size: 12px

**Table/Gallery Rows:**
- Hover: Background #fafafa, cursor pointer
- Selected: Background #e6f7ff

### 7.5. Icons

Icon library: Ant Design Icons hoặc Fluent UI Icons

Common icons:
- Plus: Add new
- Edit: Edit mode
- Save: Save changes
- Arrow Left: Back/Return
- Stop: Cancel/Stop
- Check: Confirm
- Close: Close/Cancel
- Team: Customers
- CheckCircle: Completed
- Sync: In Progress
- User: Person/Handler
- Calendar: Date
- Home: Home screen
- Search: Search

---

## 8. SECURITY & PERMISSIONS

### 8.1. SharePoint Permissions

**Read Access:**
- Tất cả nhân viên phòng WBD - Digital Solution
- View all customers
- View all tasks

**Edit Access:**
- Tất cả nhân viên phòng WBD - Digital Solution
- Create new customers
- Edit existing customers
- Update status
- Cancel projects

**Admin Access:**
- Quản lý phòng
- Manage SharePoint List structure
- Manage app settings
- Export data

### 8.2. Power Apps Security

**Default Behavior:**
- Home screen: Tự động lọc theo user đang đăng nhập
- Customer List: Xem tất cả customers
- Create Customer: Handler default = current user, có thể thay đổi

**Optional Row-Level Security:**
Nếu cần giới hạn quyền:
- User chỉ xem được customers mà họ là Handler
- Implement bằng Filter: `Handler.Email = User().Email`

**Field-Level Security:**
- CancelReason: Chỉ visible khi Status = "Canceled"
- CustomizeDescription: Chỉ visible khi HasCustomize = Yes

### 8.3. Data Validation

**On Create:**
- Title: Not empty
- ServiceType: Must select
- Handler: Default = User(), có thể change
- Status: Auto-set to "Initiation"

**On Update:**
- Validate required fields
- Validate conditional fields (CustomizeDescription)
- Validate CancelReason when changing to Canceled

**On Delete:**
- Soft delete recommended (add IsDeleted flag)
- Or restrict delete to Admin only

---

## 9. PERFORMANCE & OPTIMIZATION

### 9.1. Data Loading

**Delegation:**
- Use delegable functions in Power Apps
- Filter, Sort, Search on SharePoint side
- Avoid complex calculations in galleries

**Caching:**
- Cache customer list in collections
- Refresh on app start and after updates
- Use ClearCollect for full refresh

**Pagination:**
- Customer List: 10 items per page
- Home Tasks: No pagination (usually < 20 items per user)

### 9.2. Formula Optimization

**Use Variables:**
```
OnVisible =
    ClearCollect(colCustomers, Customers);
    Set(varTotalCustomers, CountRows(colCustomers));
    Set(varDeployedCustomers, CountRows(Filter(colCustomers, Status = "Closure")));
    Set(varMyTasks, Filter(colCustomers,
        Status <> "Closure" And
        Status <> "Canceled" And
        Handler.Email = User().Email
    ));
```

**Filter Once:**
```
Set(varFilteredCustomers,
    Filter(colCustomers,
        (IsBlank(varFilterName) Or varFilterName in Title) And
        (IsBlank(varFilterRegion) Or Region = varFilterRegion) And
        ...
    )
);
```

### 9.3. UI Performance

**Use Galleries Instead of:**
- Multiple controls for list items
- Nested galleries (when possible)

**Limit Concurrent Patches:**
- Batch updates where possible
- Show loading spinner during operations

---

## 10. TESTING SCENARIOS

### 10.1. Functional Testing

**Test Case 1: Home Screen - My Tasks Auto Filter**
- Login as User A
- Open Home screen
- Expected: Only see customers where Handler = User A, Status != Closure and != Canceled

**Test Case 2: Create New Customer with Default Handler**
- Click "Thêm mới khách hàng"
- Expected: Handler field pre-filled with current user
- Can change to another user if needed

**Test Case 3: Create Customer Missing Required**
- Input: Missing Title
- Expected: Error message, form not submitted

**Test Case 4: Edit Customer**
- Input: Change Status, update fields
- Expected: Success, view mode shows updated data

**Test Case 5: Conditional Field - Customize**
- Input: Check "Có Customize", leave description empty, submit
- Expected: Error "Vui lòng mô tả chi tiết về customize"

**Test Case 6: Cancel Project**
- Input: Click "Dừng triển khai", leave reason empty
- Expected: Warning modal "Vui lòng nhập lý do"

**Test Case 7: Filter All Customers**
- Input: Select multiple filters in Customer List
- Expected: Table shows only matching records (not limited by current user)

**Test Case 8: Pipeline Display**
- Input: Navigate to customer with Status = "Execution"
- Expected: Pipeline shows steps 1-2 completed, 3 current, 4-5 waiting

### 10.2. UI Testing

**Test Case 9: Responsive Layout**
- Input: View on mobile, tablet, desktop
- Expected: Layout adjusts appropriately

**Test Case 10: Navigation**
- Input: Click between Home and Customer List
- Expected: Smooth navigation, no errors

**Test Case 11: Hover Effects**
- Input: Hover over cards, buttons, rows
- Expected: Visual feedback (shadow, cursor change)

### 10.3. Security Testing

**Test Case 12: User Context**
- Login as User A
- Expected: Home shows only User A's tasks
- Expected: Customer List shows all customers
- Expected: Can create customer assigned to User B

**Test Case 13: Concurrent Edits**
- Input: Two users edit same record
- Expected: Last save wins, or conflict resolution

---

## 11. DEPLOYMENT & MAINTENANCE

### 11.1. Deployment Steps

1. **Create SharePoint List "Customers"**
   - Add all columns as specified in Section 2.1
   - Important: Use "Person or Group" type for Handler field
   - Configure choice values
   - Set up permissions

2. **Import Sample Data**
   - Use Excel import or PowerShell
   - Ensure Handler field has valid user references
   - Validate data structure

3. **Create Power Apps**
   - Start from blank canvas app
   - Connect to SharePoint List
   - Build screens as specified
   - Set up User() context for filtering

4. **Configure App Settings**
   - Set app name: "WBD Customer Management"
   - Set app icon
   - Configure theme colors

5. **Test in Test Environment**
   - Run all test scenarios with multiple users
   - Test user context filtering
   - Fix bugs

6. **Deploy to Production**
   - Publish app
   - Share with users
   - Provide training

### 11.2. Maintenance Plan

**Regular Tasks:**
- Monitor app performance weekly
- Review error logs
- Update choice values as needed (Branches)

**Quarterly Reviews:**
- Collect user feedback
- Identify enhancement opportunities
- Update documentation

**Backup:**
- SharePoint List: Auto-backed up by O365
- App: Export .msapp file monthly
- Store in version control

### 11.3. Support & Documentation

**User Guide:**
- Create user manual with screenshots
- Record demo videos
- Setup FAQ page
- Explain how "My Tasks" auto-filtering works

**Technical Documentation:**
- This specification document
- Database schema diagram
- App architecture diagram
- Formula reference

---

## 12. FUTURE ENHANCEMENTS

### 12.1. Phase 2 Features

**A. Phase Checklist Management**
- Implement ProjectPhases and PhaseChecklists lists
- Add checklist screen for each phase
- Track completion status per item

**B. Document Management**
- Direct document upload/view in app
- Integration with SharePoint Document Library
- Version control for documents

**C. Notifications**
- Email notifications on status change
- Reminder for upcoming golive dates
- Alerts for overdue projects
- Notify when assigned as Handler

**D. Advanced Filtering**
- Save filter presets
- Quick filters: "My Customers", "All Active", "Overdue"
- Filter by date ranges

### 12.2. Phase 3 Features

**A. Transaction Tracking**
- Implement Transactions list
- Real transaction data entry
- Reconciliation features

**B. Mobile Optimization**
- Native mobile app
- Offline capability
- Push notifications

**C. Integration**
- API integration with core banking
- Sync CIF data automatically
- Integration with CRM system

**D. Team Collaboration**
- Comments and notes per customer
- @mention team members
- Activity timeline

---

## 13. GLOSSARY

**TCG (Top Customer Group):** Nhóm khách hàng quan trọng nhất, thường là khách hàng lớn hoặc chiến lược

**RM (Relationship Manager):** Người quản lý mối quan hệ khách hàng từ phía ngân hàng

**SM (Sales Manager):** Người quản lý bán hàng, phụ trách phát triển kinh doanh

**CIF (Customer Identification File):** Số định danh khách hàng trong hệ thống ngân hàng

**Customize:** Yêu cầu tùy chỉnh, phát triển riêng ngoài tính năng chuẩn

**Thu hộ:** Dịch vụ ngân hàng thu tiền hộ cho doanh nghiệp

**Chi hộ:** Dịch vụ ngân hàng chi tiền hộ cho doanh nghiệp

**Golive:** Ngày đưa hệ thống vào vận hành chính thức

**Handler:** Người được phân công xử lý/theo dõi khách hàng

**BRD (Business Requirement Document):** Tài liệu yêu cầu nghiệp vụ

**UAT (User Acceptance Testing):** Kiểm thử chấp nhận người dùng

**SIT (System Integration Testing):** Kiểm thử tích hợp hệ thống

**NDA (Non-Disclosure Agreement):** Thỏa thuận bảo mật thông tin

---

## 14. APPENDIX

### 14.1. Sample Data Set

Dưới đây là 12 mẫu dữ liệu khách hàng để testing (cần gán Handler = actual users trong hệ thống):

1. **Thegioididong** - Thu & Chi, Execution, TCG, Có Customize
2. **Viettel** - Chi hộ, Planning, TCG, Không Customize
3. **Sabeco** - Thu hộ, MonitorNControl, Không TCG, Có Customize
4. **Shopee** - Thu & Chi, Initiation, TCG, Có Customize
5. **Sendo** - Chi hộ, Execution, Không TCG, Không Customize
6. **Momo** - Thu & Chi, Planning, TCG, Có Customize
7. **VNPTPay** - Thu hộ, Initiation, Không TCG, Không Customize
8. **FPT Telecom** - Chi hộ, Closure, TCG, Có Customize
9. **Tiki** - Thu & Chi, Canceled, Không TCG, Không Customize
10. **VinCommerce** - Chi hộ, Execution, TCG, Có Customize
11. **VNPT** - Thu hộ, MonitorNControl, Không TCG, Có Customize
12. **Grab Vietnam** - Thu & Chi, Planning, TCG, Không Customize

### 14.2. Color Reference Codes

```
Primary Blue: #2b6cae
Light Blue: #92b5d7
Very Light Blue: #d4e7f7
Orange: #f19b38
Light Orange: #ffb74d
Green: #4caf50
Light Green: #81c784
Red/Danger: #ff4d4f

Status Colors:
Initiation: #1890ff
Planning: #722ed1
Execution: #fa8c16
MonitorNControl: #13c2c2
Closure: #52c41a
Canceled: #d9d9d9
```

### 14.3. Formula Templates

**My Tasks Filter (Home Screen):**
```
Filter(Customers,
    Status <> "Closure" And
    Status <> "Canceled" And
    Handler.Email = User().Email
)
```

**All Customers Filter with Search (Customer List):**
```
Filter(Customers,
    (IsBlank(varSearchText) Or varSearchText in Title) &&
    (IsBlank(varFilterRegion) Or Region = varFilterRegion) &&
    (IsBlank(varFilterStatus) Or Status = varFilterStatus) &&
    (IsBlank(varFilterHandler) Or Handler.Email = varFilterHandler.Email)
)
```

**Create New Customer:**
```
Patch(Customers, Defaults(Customers),
    {
        Title: txtCustomerName.Text,
        ServiceType: ddServiceType.Selected.Value,
        Handler: If(IsBlank(ppHandler.SelectedItems), User(), ppHandler.SelectedItems),
        Status: "Initiation",
        StartDate: dpStartDate.SelectedDate,
        ExpectedEndDate: dpEndDate.SelectedDate,
        ...
    }
)
```

**Update Customer:**
```
Patch(Customers, LookUp(Customers, ID = varCurrentCustomerID),
    {
        Title: txtCustomerName.Text,
        Status: ddStatus.Selected.Value,
        ...
    }
)
```

---

## NOTES FOR DEVELOPER

Khi xây dựng ứng dụng Power Apps dựa trên tài liệu này:

1. **Handler Field là Person Type** - Đảm bảo sử dụng "Person or Group" trong SharePoint để tận dụng User() context
2. **User Context** - Sử dụng User().Email hoặc User() để filter và default value
3. **Home Screen Auto-Filter** - Không cần dropdown selector, tự động filter theo user đang đăng nhập
4. **Customer List All Access** - Cho phép xem tất cả customers, không giới hạn theo Handler
5. **Test với Multiple Users** - Đảm bảo test với nhiều user accounts khác nhau
6. **Responsive Design** - Test trên nhiều kích thước màn hình

**Tips:**
- Sử dụng Components cho các UI patterns lặp lại (status badge, cards)
- Tạo variables cho colors để dễ maintain theme
- Document formulas phức tạp bằng comments
- Backup app file trước mỗi major change
- Test user context filtering thoroughly

**Khác biệt so với bản đầy đủ:**
- ❌ Không có màn hình Dashboard Báo Cáo Tổng Quan
- ❌ Không có dropdown selector trong Home screen
- ✅ Home screen tự động filter theo user đang đăng nhập
- ✅ Handler field sử dụng Person type để liên kết với user accounts
- ✅ New customer auto-set Handler = current user (có thể thay đổi)

Chúc bạn xây dựng ứng dụng thành công!

---

**END OF SPECIFICATION DOCUMENT**

**Documentation Version:** 1.1 (Simplified)

**Last Updated:** 2025
