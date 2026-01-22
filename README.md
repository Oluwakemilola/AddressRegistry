# Address Registry 📮

A robust address management system built with Node.js that provides a comprehensive solution for storing, managing, and retrieving address information efficiently.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [Utilities](#utilities)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## 🎯 Overview

Address Registry is a backend API service designed to handle address data management for applications that require location-based services, contact management, or shipping information. The system provides CRUD operations, validation, and efficient querying capabilities.

## ✨ Features

- **Complete Address Management**: Create, read, update, and delete address records
- **Data Validation**: Built-in validation for address fields
- **Search & Filter**: Query addresses by various criteria
- **Utility Functions**: Helper functions for address formatting and validation
- **RESTful API**: Well-structured and documented API endpoints
- **Scalable Architecture**: Modular MVC design pattern
- **Error Handling**: Comprehensive error handling and logging
- **Database Integration**: Persistent data storage

## 🛠 Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: (MongoDB)
- **Architecture**: MVC (Model-View-Controller)
- **Validation**: Custom validation utilities

## 📁 Project Structure

```
AddressRegistry/
├── config/              # Configuration files (database, app settings)
├── controller/          # Business logic and request handlers
├── database/            # Database connection and initialization
├── models/              # Data models and schemas
├── routes/              # API route definitions
├── utils/               # Utility functions and helpers
├── .gitignore          # Git ignore file
├── package.json        # Project dependencies and scripts
├── package-lock.json   # Locked versions of dependencies
└── server.js           # Application entry point
```

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed on your system:

- **Node.js** (v14.x or higher)
- **npm** (v6.x or higher)
- **Database** (MongoDB)
- **Git** (for version control)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Oluwakemilola/AddressRegistry.git
   cd AddressRegistry
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory:

   ```env
   PORT=3000
   DATABASE_URL=your_database_connection_string
   NODE_ENV=development
   ```

### Configuration

1. Navigate to the `config/` directory
2. Update database configuration settings
3. Adjust any application-specific settings as needed

## 💻 Usage

### Start the Development Server

```bash
npm start
```

or with nodemon for auto-restart:

```bash
npm run dev
```

The API will be available at `http://localhost:3000`

### Running Tests

```bash
npm test
```

## 🔌 API Documentation

### Base URL

```
http://localhost:3000/api
```

### Endpoints

#### Addresses

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/addresses` | Get all addresses |
| GET | `/addresses/:id` | Get a specific address |
| POST | `/addresses` | Create a new address |
| PUT | `/addresses/:id` | Update an address |
| DELETE | `/addresses/:id` | Delete an address |
| GET | `/addresses/search` | Search addresses |

### Request Examples

#### Create Address

```bash
POST /api/addresses
Content-Type: application/json

{
  "street": "123 Main Street",
  "city": "Lagos",
  "state": "Lagos",
  "country": "Nigeria",
  "postalCode": "100001",
  "phoneNumber": "+234-xxx-xxx-xxxx"
}
```

#### Response Example

```json
{
  "success": true,
  "message": "Address created successfully",
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "street": "123 Main Street",
    "city": "Lagos",
    "state": "Lagos",
    "country": "Nigeria",
    "postalCode": "100001",
    "phoneNumber": "+234-xxx-xxx-xxxx",
    "createdAt": "2024-01-22T10:30:00Z",
    "updatedAt": "2024-01-22T10:30:00Z"
  }
}
```

#### Update Address

```bash
PUT /api/addresses/:id
Content-Type: application/json

{
  "street": "456 Updated Street",
  "city": "Abuja"
}
```

#### Get All Addresses

```bash
GET /api/addresses?page=1&limit=10
```

#### Search Addresses

```bash
GET /api/addresses/search?city=Lagos&country=Nigeria
```

## 🗄 Database Schema

### Address Model

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | ObjectId/UUID | Auto | Unique identifier |
| street | String | Yes | Street address |
| city | String | Yes | City name |
| state | String | Yes | State/Province |
| country | String | Yes | Country name |
| postalCode | String | No | Postal/ZIP code |
| phoneNumber | String | No | Contact phone number |
| email | String | No | Contact email |
| isDefault | Boolean | No | Default address flag |
| userId | ObjectId/UUID | No | Associated user reference |
| createdAt | DateTime | Auto | Creation timestamp |
| updatedAt | DateTime | Auto | Last update timestamp |

## 🔧 Utilities

The `utils/` directory contains helper functions:

- **Validation**: Address field validation
- **Formatting**: Address formatting utilities
- **Geocoding**: Location coordinate helpers (if applicable)
- **Error Handling**: Custom error classes and handlers

### Example Utility Usage

```javascript
const { validateAddress, formatAddress } = require('./utils/addressHelpers');

// Validate address
const isValid = validateAddress(addressData);

// Format address
const formattedAddress = formatAddress(addressData);
```

## 📊 Error Codes

| Code | Message | Description |
|------|---------|-------------|
| 200 | OK | Request successful |
| 201 | Created | Resource created successfully |
| 400 | Bad Request | Invalid request data |
| 404 | Not Found | Resource not found |
| 500 | Internal Server Error | Server error |

## 🧪 Testing

The project includes test suites for:

- Unit tests for controllers
- Integration tests for API endpoints
- Validation tests for utilities

Run tests with:

```bash
npm test
```

## 🤝 Contributing

Contributions are always welcome! Here's how you can help:

1. **Fork** the repository
2. **Create** a feature branch
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit** your changes
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. **Push** to the branch
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Open** a Pull Request

### Code Style Guidelines

- Follow JavaScript Standard Style
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🛡️ Security

If you discover any security issues, please email the maintainer directly instead of using the issue tracker.

## 📞 Contact

**Oluwakemilola**

- GitHub: [@Oluwakemilola](https://github.com/Oluwakemilola)
- Project Link: [https://github.com/Oluwakemilola/AddressRegistry](https://github.com/Oluwakemilola/AddressRegistry)

## 🙏 Acknowledgments

- Thanks to all contributors who have helped improve this project
- Built with love for efficient address management

## 📈 Roadmap

- [ ] Add geocoding support
- [ ] Implement address verification API integration
- [ ] Add bulk import/export functionality
- [ ] Create frontend dashboard
- [ ] Add address autocomplete feature

---

⭐ **Star this repository** if you find it helpful!

💡 **Suggestions and feedback** are always welcome via issues or pull requests.
