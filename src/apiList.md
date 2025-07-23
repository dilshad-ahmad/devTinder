# Need of DevTinder APIs

## auth.Router

-POST/signup
-POST/login
-POST/logout

## Profile router

-GET/profile/view
-PATCH/profile/edit
-PATCH/profile/password

## Connection RequestRouter

-POST/request/send/interested/:userId
-POST/request/send/ignored/:userId
-POST/request/review/accepted/:requestId
-POST/request/review/rejected/:requestId

-GET/connections
-GET/request/received
-GET/feed- Gets you the profile of other uses on platform

status: ignore, interseted, accepted, rejected
