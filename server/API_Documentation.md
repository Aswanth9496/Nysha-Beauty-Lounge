# Nysha Beauty Lounge - Comprehensive API Documentation

This documentation provides details for all available API endpoints in the Nysha Beauty Lounge server.

---

## **1. Authentication API**
**Base URL:** `/api/auth`

### **Register Admin**
- **Method:** `POST /api/auth/register`
- **Access:** Public (Temporary for setup)
- **Body (JSON):**
  - `firstName` (string)
  - `lastName` (string)
  - `email` (string)
  - `password` (string)

### **Login Admin**
- **Method:** `POST /api/auth/login`
- **Access:** Public
- **Body (JSON):**
  - `email` (string)
  - `password` (string)
- **Response:** Sets a `token` cookie in the browser/Postman.

### **Get Current Admin Profile**
- **Method:** `GET /api/auth/me`
- **Access:** Private (Requires Login)

### **Update Profile Details**
- **Method:** `PUT /api/auth/updatedetails`
- **Access:** Private
- **Body (JSON):** `firstName`, `lastName`, `email`

### **Update Password**
- **Method:** `PUT /api/auth/updatepassword`
- **Access:** Private
- **Body (JSON):** `currentPassword`, `newPassword`

---

## **2. Categories API**
**Base URL:** `/api/categories`

### **Create Category**
- **Method:** `POST /api/categories`
- **Access:** Private
- **Body (form-data):**
  - `name` (text)
  - `description` (text)
  - `isActive` (text: "true"/"false")
  - `photo` (file): Single image

### **Get All Categories**
- **Method:** `GET /api/categories`
- **Access:** Public (Returns only non-deleted categories)

### **Edit Category**
- **Method:** `PATCH /api/categories/:id`
- **Access:** Private
- **Body (form-data):** Same as Create (Only send fields to update)

### **Delete Category**
- **Method:** `DELETE /api/categories/:id`
- **Access:** Private (Performs a soft delete)

---

## **3. Sub-Categories API**
**Base URL:** `/api/subcategories`

### **Create Sub-Category**
- **Method:** `POST /api/subcategories`
- **Access:** Private
- **Body (form-data):**
  - `categoryId` (text): Parent MongoDB ID
  - `name` (text)
  - `description` (text)
  - `sort_order` (text: number)
  - `is_visible` (text: "true"/"false")
  - `cover_image` (file): Single image
  - `images` (files): Multiple images (up to 10)

### **Get Sub-Categories**
- **Method:** `GET /api/subcategories`
- **Access:** Public
- **Query Params:** `?categoryId=...` (optional filter)

---

## **4. Services API**
**Base URL:** `/api/services`

### **Create Service**
- **Method:** `POST /api/services`
- **Access:** Private
- **Body (form-data):**
  - `subCategoryId` (text)
  - `title` (text)
  - `subtitle` (text)
  - `description` (text)
  - `duration` (text)
  - `amount` (number): Only if `has_variants` is false
  - `image_url` (file): Single image
  - `has_variants` (text: "true"/"false")
  - `variants` (text: JSON String):
    ```json
    [{"label": "Standard", "experience": "Junior", "amount": 200}]
    ```
  - `whats_included` (text: JSON String):
    ```json
    ["Face massage", "Steam", "Cleanup"]
    ```

---

## **5. Header & Shop Config API**
**Base URL:** `/api/header`

### **Create/Update Header**
- **Method:** `POST /api/header` or `PATCH /api/header/:id`
- **Access:** Private
- **Body (form-data):**
  - `sub_title`, `phone_number`, `email`, `address`, `banner_text`
  - `logo` (file)
  - `banner_images` (files): Up to 2 images
  - `shop_image_1` (file), `shop_image_2` (file)

---

## **6. Experts API**
**Base URL:** `/api/experts`

### **Create Expert**
- **Method:** `POST /api/experts`
- **Access:** Private
- **Body (form-data):**
  - `name` (text, required)
  - `role` (text, required)
  - `specialty` (text, optional)
  - `experience` (text, optional)
  - `rating` (text, optional)
  - `availability` (text: "Available", "Busy", "Off")
  - `sort_order` (text: number)
  - `isActive` (text: "true"/"false")
  - `image` (file)

### **Get All Experts**
- **Method:** `GET /api/experts`
- **Access:** Public
- **Query Params:** `?isActive=true` (optional)

### **Edit Expert**
- **Method:** `PATCH /api/experts/:id`
- **Access:** Private
- **Body (form-data):** Same fields as Create.

### **Delete Expert**
- **Method:** `DELETE /api/experts/:id`
- **Access:** Private (Soft Delete)

---

## **Developer Notes**
1. **Soft Deletes:** Categories, Sub-Categories, Services, and Experts use a soft-delete mechanism. They remain in the DB but won't appear in standard GET requests.
2. **File Storage:** Files are stored in `/uploads/` and served statically.
3. **DNS Fallback:** The server uses Google DNS (8.8.8.8) to prevent MongoDB Atlas connection issues during local development.
