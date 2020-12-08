# Responder enquete

> ## Caso de sucesso

01. ⬜️ Recebe uma requisição do tipo **PUT** na rota **/api/surveys/{survey_id}/results**
02. ⬜️ Valida se a requisição foi feita por um **usuário**
03. ⬜️ Valida o parâmetro **survey_id**
04. ⬜️ Valida se o campo **answer** é uma resposta válida
05. ⬜️ **Cria** um resultado de enquete com os dados fornecidos caso não tenha um registro
06. ⬜️ **Atualiza** um resultado de enquete com os dados fornecidos caso já tenha um registro
07. ⬜️ Retorna **200** com os dados do resultado da enquete

> ## Exceções

01. ⬜️ Retorna erro **404** se a API não existir
02. ⬜️ Retorna erro **403** se não for um usuário
03. ⬜️ Retorna erro **403** se o survey_id passado na URL for inválido
04. ⬜️ Retorna erro **403** se a resposta enviada pelo client for uma resposta inválida
05. ⬜️ Retorna erro **500** se der erro ao tentar criar o resultado da enquete
06. ⬜️ Retorna erro **500** se der erro ao tentar atualizar o resultado da enquete
07. ⬜️ Retorna erro **500** se der erro ao tentar carregar a enquete