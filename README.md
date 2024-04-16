### To run the code
```
npm install
```
after
```
npm run dev
```

### What is session and why it used for

In the context of computing and web development, a session refers to a period of interaction between a user and a server, during which data can be exchanged back and forth. Sessions are used to maintain state and track user interactions across multiple requests and pages, making a user's experience on a website or application more personalized and efficient.

Here are some key points about sessions and why they are used:

User Identification: Sessions help identify and differentiate users when they interact with a website. For example, when a user logs in, a session can be used to keep track of their identity throughout their visit.

State Management: Web applications are stateless by default, which means each request is independent of the previous one. Sessions help maintain state across multiple requests, enabling features like shopping carts, account management, and preferences.

Personalization: By tracking user data within a session, websites can offer a personalized experience, such as remembering the user's name, preferences, and recent activity.

Security: Sessions can improve security by allowing users to authenticate once per session instead of with every request. Additionally, sessions can be invalidated when a user logs out or after a period of inactivity, which helps protect sensitive information.

Performance: Using sessions can help improve performance by reducing the need to repeatedly query a database or perform complex operations with each request. Data can be temporarily stored in the session and reused as needed.

In summary, sessions are an essential part of creating a smooth and personalized user experience on the web by managing state, user identification, security, and performance across multiple interactions with a website or application.


### Here's how to send requests

GET
To all user data **http://localhost:5000/get**

POST
To Login **http://localhost:5000/login** 
- Note username and password required as body

To Register **http://localhost:5000/register** 
- Note username and password required as body

To log out  **http://localhost:5000/logout**




