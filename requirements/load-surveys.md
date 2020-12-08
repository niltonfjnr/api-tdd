# Listar enquetes

> ## Caso de sucesso

01. ⬜️ Recebe uma requisição do tipo **GET** na rota **/api/surveys**
02. ⬜️ Valida se a requisição foi feita por um **usuário**
03. ⬜️ Retorna **204** se não tiver nenhuma enquete
04. ⬜️ Retorna **200** com os dados das enquetes

> ## Exceções

01. ⬜️ Retorna erro **404** se a API não existir
02. ⬜️ Retorna erro **403** se não for um usuário
03. ⬜️ Retorna erro **500** se der erro ao tentar listar as enquetes