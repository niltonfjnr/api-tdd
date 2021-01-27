# HEROKU - https://dashboard.heroku.com/
test-api-tdd


> ## APIs construídas no treinamento

1. [Cadastro](./requirements/signup.md)
2. [Login](./requirements/login.md)
3. [Criar enquete](./requirements/add-survey.md)
4. [Listar enquetes](./requirements/load-surveys.md)
5. [Responder enquete](./requirements/save-survey-result.md)
6. [Resultado da enquete](./requirements/load-survey-result.md)

> ## Princípios

* SOLID
    > * Single Responsibility Principle (SRP)
    > * Open Closed Principle (OCP)
    > * Liskov Substitution Principle (LSP)
    > * Interface Segregation Principle (ISP)
    > * Dependency Inversion Principle (DIP)

* Separation of Concerns (SOC)
* Don't Repeat Yourself (DRY)
* You Aren't Gonna Need It (YAGNI)
* Keep It Simple, Silly (KISS)
* Composition Over Inheritance
* Small Commits

> ## Design Patterns

* Factory
* Adapter 
    > * [adaptRoute](./src/main/adapters/express/express-route-adapter.ts)
* Composite
    > * [ValidationComposite](./src/validation/validators/validation-composite.ts)
* Decorator
    > * [LogControllerDecorator](./src/main/decorators/log-controller-decorator.ts)
* Proxy
* Dependency Injection
* Abstract Server
* Composition Root
* Builder

> ## Metodologias e Designs

* TDD
* Clean Architecture
* DDD
* Conventional Commits
* GitFlow
* Modular Design
* Dependency Diagrams
* Use Cases
* Continuous Integration
* Continuous Delivery
* Continuous Deployment

> ## Camadas (layers) -> 0 most important

* (0) domain (Esta camada depende apenas dela mesma)

* (1)  data (Esta camada conhece apenas a camada "domain")
* (1)  presentation (Esta camada conhece apenas a camada "domain")

* (2)  validation (Esta camada conhece apenas a camada "presentation")
* (3)  infra (Esta camada conhece a camada "data" e "validation")

* (4)  main (Esta camada conhece todas as camadas)
    - De forma direta ou indireta tudo reflete aqui
    - Alta dependência

> ## Bibliotecas e Ferramentas

* NPM
* Typescript
* Git
* Docker
* Jest
* MongoDb
* Travis CI
* Swagger
* Bcrypt
* JsonWebToken
* Faker
* Coveralls
* Validator
* Express
* Supertest
* Husky
* Lint Staged
* Eslint
* Standard Javascript Style
* Sucrase
* Nodemon
* Rimraf
* In-Memory MongoDb Server
* MockDate
* Module-Alias
* Copyfiles
* Npm Check

> ## Features do Node

* Documentação de API com Swagger
* Log de Erro
* Segurança (Hashing, Encryption e Encoding)
* CORS
* Middlewares
* Nível de Acesso nas Rotas (Admin, User e Anônimo)
* Deploy no Heroku
* SErvir Arquivos Estáticos

> ## Features do Git

* Alias
* Log Personalizado
* Branch
* Reset
* Amend
* Tag
* Stash
* Rebase
* Merge

> ## Features do Typescript

* POO Avançado
* Interface
* TypeAlias
* Utility Types
* Modularização de Paths
* Build
* Deploy
* Uso de Breakpoints

> ## Features de Testes

* Testes Unitários
* Testes de Integração
* Cobertura de Testes
* Test Doubles
* Mocks
* Stubs
* Spies
* Fakes

> ## Features do MongoDb

* Connect e Reconnect
* Collections
* InsertOne e InserMany
* Find, FindOne e FindOneAndUpdate
* DeleteMany
* UpdateOne
* Aggregation (Match, Group, Unwind, Lookup, AddFields, Project, Sort)
* ObjectId
* Upsert e ReturnOriginal
* Push, Divide, Multiply, ArrayElemAt, Cond, Sum
* Filter, Map, Reduce, MergeObjects, ConcatArrays

> ## Mongo cli commands
* https://dzone.com/articles/top-10-most-common-commands-for-beginners