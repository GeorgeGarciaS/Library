# LibraryApi

## Technologies used
* MVC Architecture
* Express.js: Base Backend Framework
* React.js: Base Frontend Framework
* MongoDb: Main Database
* Mongoose: module to connect to cloud database host
* MongoDB Atlas: cloud database host(Hosted by AWS in Sydney)
* Jest: Base test Framework
* SuperTest: TDD module to testing routes
* Mongodb-memory-server: Artificial memory server used for Schema testing
* Aync: Asynchronous module to make async code more readable

## Tests

### Integration Tests in Models
* Author Virtual variable lifespan: date format may be incorrect
### Integration Tests in Controllers
* Author validate input: verify validation and sanitization of data input for creation and update
* Book validate input: verify validation and sanitization of data input for creation and update
* Genre validate input: verify validation and sanitization of data input for creation and update


## Architecture Flow Diagram
![Image of Database](https://github.com/GeorgeGarciaS/Library/LibraryApi/blob/main/diagrams/MVCFlowDiagram.svg)

## DataBase Design
![Image of Database](https://github.com/GeorgeGarciaS/Library/LibraryApi/blob/main/diagrams/DatabaseDiagram.svg)

