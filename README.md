## a more 'functional' style service

- no OOP
- benefits from function chaining, Composition and the Inversion of Control design pattern
- faked external services enable the app to work locally i.e. respond to Postman requests (and local endpoint tests)
- automated local 'end-to-end' testing against the app (see 'local-endpoint-tests')
- (additionally, being able to exercise the whole pipeline from the outset with these sorts of tests allows a more fluid, 'end-to-end',
  BDD style of development)
- middleware sets up request variables (e.g. query string), and other 'global' objects (e.g. traceToken, logger) in AsyncLocalStorage to reduce unnecessary 'drilling' / passing of global constants

todo:

implement tsoa

services will get their conn strings from \_env config

extend userApi to contain > 1 method

write tests to prove this implementation of AsyncLocalStorage is thread-safe

### inspired by

https://github.com/EduardBargues/content-functional-dependency-injection-in-nodejs/tree/main/nodejs-functional-di

Warren Scantlebury's suggestion of AsyncLocalStorage

### caveats

we must be sure that implementations of AsyncLocalStorage are thread-safe
