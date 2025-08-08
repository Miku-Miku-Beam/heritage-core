# Warisin API Documentation

## Base URL
```
Development: http://localhost:3000/api
Production: https://warisin.platform/api
```

## Authentication
All protected endpoints require Firebase authentication token in the Authorization header:
```
Authorization: Bearer <firebase_token>
```

---

## User Management

### Register User
```http
POST /api/auth/register
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123",
  "role": "ARTISAN" | "APPLICANT"
}
```

**Response:**
```json
{
  "success": true,
  "user": {
    "id": "user_123",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "ARTISAN",
    "createdAt": "2024-01-01T00:00:00Z"
  }
}
```

### Get Current User
```http
GET /api/auth/me
Authorization: Bearer <token>
```

**Response:**
```json
{
  "user": {
    "id": "user_123",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "ARTISAN",
    "profileImageUrl": "https://...",
    "bio": "Traditional craftsman...",
    "createdAt": "2024-01-01T00:00:00Z"
  }
}
```

---

## Programs

### List Programs
```http
GET /api/programs
```

**Query Parameters:**
- `search` (string): Search in title and description
- `difficulty` (string): BEGINNER | INTERMEDIATE | ADVANCED
- `artisanId` (string): Filter by specific artisan
- `page` (number): Page number (default: 1)
- `limit` (number): Items per page (default: 10)

**Response:**
```json
{
  "programs": [
    {
      "id": "prog_123",
      "title": "Traditional Batik Making",
      "description": "Learn the ancient art of batik...",
      "difficulty": "BEGINNER",
      "duration": 8,
      "capacity": 15,
      "currentApplications": 5,
      "imageUrl": "https://...",
      "artisan": {
        "id": "user_123",
        "name": "Master Sari",
        "profileImageUrl": "https://..."
      },
      "createdAt": "2024-01-01T00:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "totalPages": 5,
    "totalItems": 47,
    "hasMore": true
  }
}
```

### Get Program Details
```http
GET /api/programs/:id
```

**Response:**
```json
{
  "program": {
    "id": "prog_123",
    "title": "Traditional Batik Making",
    "description": "Learn the ancient art of batik making from a master craftsman...",
    "requirements": "Basic drawing skills, willingness to learn...",
    "difficulty": "BEGINNER",
    "duration": 8,
    "capacity": 15,
    "currentApplications": 5,
    "imageUrl": "https://...",
    "galleryImages": ["https://...", "https://..."],
    "artisan": {
      "id": "user_123",
      "name": "Master Sari",
      "profileImageUrl": "https://...",
      "bio": "40+ years of experience...",
      "location": "Yogyakarta, Indonesia"
    },
    "createdAt": "2024-01-01T00:00:00Z",
    "updatedAt": "2024-01-01T00:00:00Z"
  }
}
```

### Create Program (Artisan Only)
```http
POST /api/programs
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "title": "Traditional Batik Making",
  "description": "Learn the ancient art of batik making...",
  "requirements": "Basic drawing skills, willingness to learn...",
  "difficulty": "BEGINNER",
  "duration": 8,
  "capacity": 15,
  "imageUrl": "https://example.com/image.jpg",
  "galleryImages": ["https://...", "https://..."]
}
```

**Response:**
```json
{
  "success": true,
  "program": {
    "id": "prog_123",
    "title": "Traditional Batik Making",
    // ... full program object
  }
}
```

### Update Program (Artisan Only)
```http
PUT /api/programs/:id
Authorization: Bearer <token>
```

### Delete Program (Artisan Only)
```http
DELETE /api/programs/:id
Authorization: Bearer <token>
```

---

## Applications

### List User Applications
```http
GET /api/applications
Authorization: Bearer <token>
```

**Query Parameters:**
- `status` (string): PENDING | ACCEPTED | REJECTED | COMPLETED
- `programId` (string): Filter by specific program

**Response:**
```json
{
  "applications": [
    {
      "id": "app_123",
      "status": "ACCEPTED",
      "motivationLetter": "I am passionate about learning...",
      "experience": "I have basic knowledge of...",
      "feedback": "Welcome to the program!",
      "program": {
        "id": "prog_123",
        "title": "Traditional Batik Making",
        "artisan": {
          "name": "Master Sari"
        }
      },
      "progressReports": [
        {
          "id": "report_123",
          "weekNumber": 1,
          "reportText": "This week I learned...",
          "imageUrl": "https://...",
          "createdAt": "2024-01-01T00:00:00Z"
        }
      ],
      "createdAt": "2024-01-01T00:00:00Z"
    }
  ]
}
```

### Get Application Details
```http
GET /api/applications/:id
Authorization: Bearer <token>
```

### Create Application
```http
POST /api/applications
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "programId": "prog_123",
  "motivationLetter": "I am passionate about learning traditional crafts...",
  "experience": "I have basic knowledge of textile arts..."
}
```

**Response:**
```json
{
  "success": true,
  "application": {
    "id": "app_123",
    "status": "PENDING",
    "motivationLetter": "I am passionate about learning...",
    "experience": "I have basic knowledge of...",
    "createdAt": "2024-01-01T00:00:00Z"
  }
}
```

### Update Application Status (Artisan Only)
```http
PUT /api/applications/:id/status
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "status": "ACCEPTED",
  "feedback": "Welcome to the program! Looking forward to working with you."
}
```

---

## Progress Reports

### List Reports for Application
```http
GET /api/progress-reports
Authorization: Bearer <token>
```

**Query Parameters:**
- `applicationId` (string, required): Application ID

**Response:**
```json
{
  "reports": [
    {
      "id": "report_123",
      "weekNumber": 1,
      "reportText": "This week I learned the basics of batik design...",
      "imageUrl": "https://example.com/progress1.jpg",
      "applicationId": "app_123",
      "createdAt": "2024-01-01T00:00:00Z",
      "updatedAt": "2024-01-01T00:00:00Z"
    }
  ]
}
```

### Create Progress Report
```http
POST /api/progress-reports
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "applicationId": "app_123",
  "weekNumber": 1,
  "reportText": "This week I learned the basics of batik design and created my first pattern...",
  "imageUrl": "https://example.com/progress1.jpg"
}
```

**Response:**
```json
{
  "success": true,
  "report": {
    "id": "report_123",
    "weekNumber": 1,
    "reportText": "This week I learned...",
    "imageUrl": "https://...",
    "createdAt": "2024-01-01T00:00:00Z"
  }
}
```

### Update Progress Report
```http
PUT /api/progress-reports/:id
Authorization: Bearer <token>
```

### Delete Progress Report
```http
DELETE /api/progress-reports/:id
Authorization: Bearer <token>
```

---

## Artisans

### List Artisans
```http
GET /api/artisans
```

**Query Parameters:**
- `search` (string): Search in name and bio
- `location` (string): Filter by location
- `specialization` (string): Filter by craft specialization

**Response:**
```json
{
  "artisans": [
    {
      "id": "user_123",
      "name": "Master Sari",
      "bio": "40+ years of experience in traditional batik making...",
      "profileImageUrl": "https://...",
      "location": "Yogyakarta, Indonesia",
      "specialization": "Batik, Traditional Textile Arts",
      "programsCount": 5,
      "studentsCount": 127,
      "rating": 4.8,
      "programs": [
        {
          "id": "prog_123",
          "title": "Traditional Batik Making",
          "difficulty": "BEGINNER"
        }
      ]
    }
  ]
}
```

### Get Artisan Profile
```http
GET /api/artisans/:id
```

**Response:**
```json
{
  "artisan": {
    "id": "user_123",
    "name": "Master Sari",
    "bio": "Master Sari has been practicing traditional batik making...",
    "profileImageUrl": "https://...",
    "location": "Yogyakarta, Indonesia",
    "specialization": "Batik, Traditional Textile Arts",
    "experience": "40+ years",
    "achievements": ["UNESCO Recognition", "Master Craftsman Award"],
    "socialMedia": {
      "instagram": "@mastersari_batik",
      "facebook": "Master Sari Batik"
    },
    "programs": [
      {
        "id": "prog_123",
        "title": "Traditional Batik Making",
        "description": "Learn the ancient art...",
        "difficulty": "BEGINNER",
        "currentApplications": 5,
        "capacity": 15
      }
    ],
    "stats": {
      "totalPrograms": 5,
      "totalStudents": 127,
      "completionRate": 0.85,
      "averageRating": 4.8
    }
  }
}
```

---

## File Upload

### Upload Image
```http
POST /api/upload
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

**Request Body:**
```
file: <image_file>
```

**Response:**
```json
{
  "success": true,
  "url": "https://uploadthing.com/f/abc123...",
  "filename": "image.jpg",
  "size": 1024000
}
```

---

## Error Responses

### Error Format
```json
{
  "success": false,
  "error": "Error message",
  "code": "ERROR_CODE",
  "details": {
    "field": "validation error message"
  }
}
```

### Common Error Codes

| Code | Status | Description |
|------|--------|-------------|
| `UNAUTHORIZED` | 401 | Invalid or missing authentication token |
| `FORBIDDEN` | 403 | Insufficient permissions |
| `NOT_FOUND` | 404 | Resource not found |
| `VALIDATION_ERROR` | 400 | Invalid request data |
| `DUPLICATE_EMAIL` | 400 | Email already registered |
| `PROGRAM_FULL` | 400 | Program has reached capacity |
| `ALREADY_APPLIED` | 400 | User already applied to this program |

---

## Rate Limiting

- **General APIs**: 100 requests per minute per IP
- **Upload APIs**: 10 requests per minute per user
- **Authentication**: 20 requests per minute per IP

Rate limit headers:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 99
X-RateLimit-Reset: 1640995200
```

---

## Webhooks (Future Implementation)

### Application Status Change
```http
POST <webhook_url>
```

**Payload:**
```json
{
  "event": "application.status_changed",
  "data": {
    "applicationId": "app_123",
    "newStatus": "ACCEPTED",
    "programId": "prog_123",
    "userId": "user_456"
  },
  "timestamp": "2024-01-01T00:00:00Z"
}
```

### Progress Report Submitted
```http
POST <webhook_url>
```

**Payload:**
```json
{
  "event": "progress_report.created",
  "data": {
    "reportId": "report_123",
    "applicationId": "app_123",
    "weekNumber": 1,
    "userId": "user_456"
  },
  "timestamp": "2024-01-01T00:00:00Z"
}
```

---

## SDK Examples

### JavaScript/TypeScript
```javascript
const WarisinAPI = {
  baseURL: 'https://warisin.platform/api',
  token: null,

  setToken(token) {
    this.token = token;
  },

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers
    };

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    const response = await fetch(url, {
      ...options,
      headers
    });

    return response.json();
  },

  // Programs
  async getPrograms(params = {}) {
    const query = new URLSearchParams(params);
    return this.request(`/programs?${query}`);
  },

  async createApplication(programId, data) {
    return this.request('/applications', {
      method: 'POST',
      body: JSON.stringify({ programId, ...data })
    });
  },

  // Progress Reports
  async submitReport(applicationId, data) {
    return this.request('/progress-reports', {
      method: 'POST',
      body: JSON.stringify({ applicationId, ...data })
    });
  }
};

// Usage
WarisinAPI.setToken('your_firebase_token');
const programs = await WarisinAPI.getPrograms({ difficulty: 'BEGINNER' });
```

### Python
```python
import requests
from typing import Optional, Dict, Any

class WarisinAPI:
    def __init__(self, base_url: str = "https://warisin.platform/api"):
        self.base_url = base_url
        self.token: Optional[str] = None
    
    def set_token(self, token: str):
        self.token = token
    
    def request(self, endpoint: str, method: str = "GET", data: Optional[Dict] = None) -> Dict[Any, Any]:
        url = f"{self.base_url}{endpoint}"
        headers = {"Content-Type": "application/json"}
        
        if self.token:
            headers["Authorization"] = f"Bearer {self.token}"
        
        response = requests.request(method, url, headers=headers, json=data)
        return response.json()
    
    def get_programs(self, **params) -> Dict[Any, Any]:
        query = "&".join([f"{k}={v}" for k, v in params.items()])
        endpoint = f"/programs?{query}" if query else "/programs"
        return self.request(endpoint)
    
    def create_application(self, program_id: str, motivation: str, experience: str = "") -> Dict[Any, Any]:
        data = {
            "programId": program_id,
            "motivationLetter": motivation,
            "experience": experience
        }
        return self.request("/applications", "POST", data)

# Usage
api = WarisinAPI()
api.set_token("your_firebase_token")
programs = api.get_programs(difficulty="BEGINNER")
```
