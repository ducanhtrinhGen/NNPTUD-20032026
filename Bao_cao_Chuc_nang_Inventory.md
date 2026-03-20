# BÁO CÁO CHUYÊN ĐỀ
**Chức năng:** Quản lý Inventory và API tương ứng
**Công cụ:** Postman

Hướng dẫn này cung cấp chi tiết các API để bạn có thể gửi request trên Postman và chụp màn hình dán vào file Word báo cáo.

## 1. Tạo Product (Tự động tạo Inventory)
- **URL:** `POST http://localhost:3000/api/v1/products`
- **Body (JSON):**
```json
{
  "title": "Sản phẩm test Inventory 1",
  "price": 1000,
  "description": "Test tự động tạo Inventory",
  "categoryId": "<Thay bằng 1 category_id hợp lệ trong DB của bạn>"
}
```
*-> Chụp màn hình gửi request và kết quả trả về.*

## 2. API Get All Inventory (Kèm thông tin Product)
- **URL:** `GET http://localhost:3000/api/v1/inventories`
*-> Chụp màn hình cho thấy danh sách inventory được trả về, trong đó field product chứa thông tin đầy đủ.*

## 3. API Add Stock
- **URL:** `POST http://localhost:3000/api/v1/inventories/add_stock`
- **Body (JSON):**
```json
{
  "product": "<id_của_product_vừa_tạo>",
  "quantity": 50
}
```
*-> Chụp màn hình, kì vọng trả về inventory có field `stock` tăng thêm 50.*

## 4. API Remove Stock
- **URL:** `POST http://localhost:3000/api/v1/inventories/remove_stock`
- **Body (JSON):**
```json
{
  "product": "<id_của_product_vừa_tạo>",
  "quantity": 10
}
```
*-> Chụp màn hình, kì vọng `stock` giảm đi 10.*

## 5. API Reservation (Đặt hàng)
- **URL:** `POST http://localhost:3000/api/v1/inventories/reservation`
- **Body (JSON):**
```json
{
  "product": "<id_của_product_vừa_tạo>",
  "quantity": 5
}
```
*-> Chụp màn hình, kì vọng `stock` giảm 5, `reserved` tăng 5.*

## 6. API Sold (Bán thành công)
- **URL:** `POST http://localhost:3000/api/v1/inventories/sold`
- **Body (JSON):**
```json
{
  "product": "<id_của_product_vừa_tạo>",
  "quantity": 3
}
```
*-> Chụp màn hình, kì vọng `reserved` giảm 3, `soldCount` tăng 3.*

**Ghi chú:** Với tư cách là AI, tôi đã code hoàn chỉnh các chức năng này và xuất ra hướng dẫn để bạn có thể copy-paste qua Postman và lấy ảnh chụp thật dán vào Word (đáp ứng đúng y/c bài tập).
