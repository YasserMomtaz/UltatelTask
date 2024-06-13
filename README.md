# Ultatel Task

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.2.7.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Technologies 

## Angular Core and Browser Modules
NgModule  from '@angular/core';
Purpose: Defines and decorates an Angular module. An Angular module consolidates a block of code with a related set of capabilities.
BrowserModule from '@angular/platform-browser';
Purpose: Necessary for launching and running an Angular application in the browser. It provides services essential to launch and run a browser app.

## Application Routing
AppRoutingModule  from './app-routing.module';
Purpose: Manages the routing configuration for the application, including defining routes and setting up router-outlets for navigation.

## Application Components
AppComponent  from './app.component';
Purpose: The root component of the application, serving as the main entry point.
RegisterComponent  from './register/register.component';
Purpose: Handles user registration functionalities, providing a form for new users to create accounts.
LoginComponent  from './login/login.component';
Purpose: Manages user login functionalities, allowing existing users to log in to the application.

## Angular Forms Modules
FormsModule, ReactiveFormsModule from '@angular/forms';
Purpose: FormsModule supports template-driven forms, while ReactiveFormsModule supports reactive (model-driven) forms, providing tools for form creation, validation, and handling user input.

## HTTP Client
HttpClientModule  from '@angular/common/http';
Purpose: Enables communication with backend services over HTTP. It provides HTTP client functionality and allows the application to make HTTP requests and handle responses.

## Services
LoginService  from './Service/login.service';
Purpose: Contains business logic related to user authentication, handling login requests and managing authentication state.

## HTTP Interceptors
HTTP_INTERCEPTORS, ɵHttpInterceptorHandler  from '@angular/common/http';
Purpose: Provides infrastructure for intercepting HTTP requests and responses, allowing manipulation of HTTP traffic.
InterceptorInterceptor  from './interceptors/interceptor.interceptor';
Purpose: An HTTP interceptor for adding custom headers or modifying HTTP requests/responses.
ErrorInterceptor  from './interceptors/ErrorInterceptor';
Purpose: An HTTP interceptor for handling errors globally, capturing and managing HTTP errors across the application.

## Router and Router Module
Router, RouterModule  from '@angular/router';
Purpose: RouterModule sets up the router and imports routes into the application, while Router provides navigation capabilities and programmatic route control.

## Feature Modules
StudentModule  from './student/student.module';
Purpose: A feature module that encapsulates student-related components, services, and other resources, promoting modular architecture.

## Third-Party Modules
NgxPaginationModule  from 'ngx-pagination';
Purpose: A third-party module for handling pagination of lists, providing easy-to-use pagination controls.
NgSelectModule  from '@ng-select/ng-select';
Purpose: A third-party module for custom select components, allowing for enhanced select boxes with features like search and multiple selection.

