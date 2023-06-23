## a more 'functional' style service

- less ceremony

### codebase injects dependencies

- benefits from the Inversion of Control design pattern
- major benefit gained in local, end-to-end testability (see 'local-service-tests')
- (additionally, being able to exercise the whole pipeline from the outset with these sorts of tests allows a more fluid, 'end-to-end',
  BDD style of development)

todo:

implement tsoa

implement middleware

pass tracetoken from request

### inspired by

https://github.com/EduardBargues/content-functional-dependency-injection-in-nodejs/tree/main/nodejs-functional-di
