<!-- Answers to the Short Answer Essay Questions go here -->

1.  Describe Middleware, Sessions (as we know them in express), bcrypt and JWT.
* Middleware is 'software glue' - middlewares are applied to other programs in order to extend their functionality or link them to each other.  I use the redux-thunk middleware in the front-end of this app to allow my actions to dispatch functions instead of objects.
* Sessions are server-side constructs for storing information pertaining to a particular user's actions on the server.
* bcrypt is a library that provides basic hashing/encryption functionality in JavaScript. This is a critical element of safe authentication.
* JWTs are parcels of data that are stored on the client-side after being retrieved from a server. By retaining the token locally and using it in server requests, the client's identity is retained.
1.  What does bcrypt do in order to prevent attacks?
* bcrypt *hashes* information (passwords/other sensitive info), applying a deterministic algorithm to it to render it in a format that can't be read by humans, and more importantly, cannot be reused in a request, as it has mutated from its original form.  This way, if a malicious agent acquires access to the database, they will still not have the necessary information to recreate the authentication credentials.
1.  What are the three parts of the JSON Web Token?
*Header, Payload, and Signature.
