<p align="center">
    <img src="https://github.com/itsjatinnagar/spendwise/assets/121741542/143b72c2-6dfb-4f9a-af99-7a2f7c99d8c5" alt="spendwise" width="96" />
</p>

<div align="center">
    <img alt="Latest Release" src="https://img.shields.io/github/v/release/itsjatinnagar/spendwise?style=flat-square">
    <a href="https://github.com/itsjatinnagar/spendwise/releases/latest">
        <img alt="Download" src="https://img.shields.io/badge/Download-22272e?logo=github">
    </a>
</div>

<h1>Spendwise</h1>

Spendwise is an Android application built using the Flutter framework. It helps users track their expenses and manage their finances efficiently.

The app leverages Provider for state management, SQFlite for local database storage, and SharedPreferences for persistent key-value storage. The UI is designed with Material 3 to provide a modern and intuitive user experience.

## Features

-   Track expenses and incomes
-   Categorize expenses and incomes
-   Add and Manage multiple accounts
-   Date-wise Transactions View
-   Lazy-loading of Transactions

## Getting Started

### Prerequisites

-   Flutter SDK: [Installation Guide](https://docs.flutter.dev/get-started/install)
-   Android Studio or Visual Studio Code (recommended IDEs)

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/itsjatinnagar/spendwise.git
    cd spendwise
    ```

1. Install dependencies:

    ```bash
    flutter pub get
    ```

1. Run the application:

    ```bash
    flutter run
    ```

## Project Structure

```bash
spendwise/
├── lib/
│   ├── helpers/
│   ├── managers/
│   ├── models/
│   ├── repositories/
│   ├── screens/
│   ├── services/
│   ├── widgets/
│   ├── app.dart
│   ├── main.dart
│   └── router.dart
└── pubspec.yaml
```

-   **app.dart** - Contains the MaterialApp
-   **main.dart** - Entry point of the application
-   **router.dart** - Contains the AppRouter that extends RouterDelegate
-   **helpers/** - Contains constants, theme and utility functions
-   **managers/** - Contains Provider classes for state management
-   **models/** - Contains data models
-   **repositories/** - Contain DataRepository that handles all the functions
-   **screens/** - Contains the UI screens.
-   **services/** - Contains classes for Database and SharedPreferences
-   **widgets/** - Contains reusable UI components.

## Contributing

This project is open for suggestions and bug reports. However, as it is part of a personal portfolio, direct code contributions are not currently being accepted.

## License

This project is not covered under any specific open-source license and is intended for educational and portfolio use only.
