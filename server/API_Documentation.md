# Nysha Beauty Lounge - API Documentation

This document explains how to interact with the Category, Sub-Category, and Service APIs via Postman.

## Authentication
Most `POST`, `PATCH`, and `DELETE` endpoints are protected. You must first log in via your Auth API in Postman. Postman will automatically save your session cookie and send it with subsequent requests.

---

## 1. Category API
**Base URL:** `/api/categories`

### Create Category
- **Method:** `POST /api/categories`
- **Auth:** Required
- **Body (form-data):**
  - `name` (text): e.g., "Hair Care"
  - `description` (text): e.g., "Premium services"
  - `isActive` (text): "true" or "false"
  - `sort_order` (text): e.g., "1"
  - `photo` (file): Select an image file

### Get All Categories
- **Method:** `GET /api/categories`
- **Auth:** Not required

### Edit Category
- **Method:** `PATCH /api/categories/:id`
- **Auth:** Required
- **Body (form-data):**
  - Same fields as Create Category. Only send the fields you want to update.

### Delete Category
- **Method:** `DELETE /api/categories/:id`
- **Auth:** Required

---

## 2. Sub-Category API
**Base URL:** `/api/subcategories`

### Create Sub-Category
- **Method:** `POST /api/subcategories`
- **Auth:** Required
- **Body (form-data):**
  - `categoryId` (text): The MongoDB ID of the parent category
  - `name` (text): e.g., "Hair Cuts"
  - `description` (text): e.g., "Precision styling"
  - `sort_order` (text): e.g., "1"
  - `is_visible` (text): "true"
  - `cover_image` (file): Select a single image
  - `images` (file): You can select multiple files if your Postman supports it (this is for the gallery)

### Get All Sub-Categories
- **Method:** `GET /api/subcategories`
- **Query Params (Optional):** `?categoryId=...` or `?is_visible=true`
- **Auth:** Not required

### Edit Sub-Category
- **Method:** `PATCH /api/subcategories/:id`
- **Auth:** Required
- **Body (form-data):** Same as POST.

### Delete Sub-Category
- **Method:** `DELETE /api/subcategories/:id`
- **Auth:** Required

---

## 3. Service API (Including Variants)
**Base URL:** `/api/services`

### Create a Standard Service (No Variants)
- **Method:** `POST /api/services`
- **Auth:** Required
- **Body (form-data):**
  - `subCategoryId` (text): ID of parent sub-category
  - `title` (text): "Basic Facial"
  - `subtitle` (text): "30 mins refresh"
  - `description` (text): "Cleanse and tone"
  - `duration` (text): "30 mins"
  - `has_variants` (text): "false"  *(Crucial)*
  - `amount` (text): "499"
  - `whats_included` (text): `["Cleansing", "Toning"]` *(Must be a valid JSON string representing an array)*
  - `image_url` (file): Select an image

### Create a Complex Service (WITH Variants)
*This is how you handle services like Haircuts that depend on the stylist's experience.*
- **Method:** `POST /api/services`
- **Auth:** Required
- **Body (form-data):**
  - `subCategoryId` (text): ID of parent sub-category
  - `title` (text): "Haircut & Styling"
  - `has_variants` (text): "true"  *(Crucial)*
  - `variants` (text): This **MUST** be a valid JSON array of objects. 
    **Example Value to paste in Postman:**
    ```json
    [
      { "label": "Standard Cut", "experience": "Junior Stylist", "amount": 299, "duration": "45 mins", "is_visible": true },
      { "label": "Premium Cut", "experience": "Senior Stylist", "amount": 599, "duration": "1 hour", "is_visible": true }
    ]
    ```
  - `image_url` (file): Select an image

### Get All Services
- **Method:** `GET /api/services`
- **Query Params (Optional):** `?subCategoryId=...` or `?is_visible=true`
- **Auth:** Not required

### Get Single Service
- **Method:** `GET /api/services/:id`
- **Auth:** Not required

### Edit Service
- **Method:** `PATCH /api/services/:id`
- **Auth:** Required
- **Body (form-data):** Same fields. If updating variants, you must send the entire `variants` JSON array string again.

### Delete Service
- **Method:** `DELETE /api/services/:id`
- **Auth:** Required

---

## 4. Header API
**Base URL:** `/api/header`

### Create Header Configuration
- **Method:** `POST /api/header`
- **Auth:** Required (Admin)
- **Body (form-data):**
  - `sub_title` (text): e.g., "Welcome to Nysha"
  - `phone_number` (text): e.g., "+971 4 XXX XXXX"
  - `banner_text` (text): e.g., "Book your ultimate spa experience today!"
  - `isActive` (text): "true"
  - `logo` (file): Select your logo image (1 file max)
  - `banner_images` (file): Select your banner images (Up to 2 files)

### Get All Header Configurations
- **Method:** `GET /api/header`
- **Auth:** Not required

### Get Single Header Configuration
- **Method:** `GET /api/header/:id`
- **Auth:** Not required

### Edit Header Configuration
- **Method:** `PATCH /api/header/:id`
- **Auth:** Required (Admin)
- **Body (form-data):**
  - Same fields as Create Header. Send only what you want to replace.
  - *Note: Uploading new `banner_images` will replace the existing array.*

### Delete Header Configuration
- **Method:** `DELETE /api/header/:id`
- **Auth:** Required (Admin)
