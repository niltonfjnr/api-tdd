# Criar enquete

> ## Caso de sucesso

01. ⬜️ Recebe uma requisição do tipo **POST** na rota **/api/surveys**
02. ⬜️ Valida se a requisição foi feita por um **admin**
03. ⬜️ Valida dados obrigatórios **question** e **answers**
04. ⬜️ **Cria** uma enquete com os dados fornecidos
05. ⬜️ Retorna **204**, sem dados

> ## Exceções

01. ⬜️ Retorna erro **404** se a API não existir
02. ⬜️ Retorna erro **403** se o usuário não for admin
03. ⬜️ Retorna erro **400** se question ou answers não forem fornecidos pelo client
04. ⬜️ Retorna erro **500** se der erro ao tentar criar a enquete