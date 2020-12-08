# Login

> ## Caso de sucesso

01. ✅ Recebe uma requisição do tipo **POST** na rota **/api/login**
02. ✅ Valida dados obrigatórios **email** e **password**
03. ✅ Valida que o campo **email** é um e-mail válido
04. ✅ **Busca** o usuário com o email e senha fornecidos
05. ✅ Gera um **token** de acesso a partir do ID do usuário
06. ✅ **Atualiza** os dados do usuário com o token de acesso gerado
07. ✅ Retorna **200** com o token de acesso e o nome do usuário

> ## Exceções

01. ✅ Retorna erro **404** se a API não existir
02. ✅ Retorna erro **400** se email ou password não forem fornecidos pelo client
03. ✅ Retorna erro **400** se o campo email for um e-mail inválido
04. ✅ Retorna erro **401** se não encontrar um usuário com os dados fornecidos
05. ✅ Retorna erro **500** se der erro ao tentar gerar o token de acesso
06. ✅ Retorna erro **500** se der erro ao tentar atualizar o usuário com o token de acesso gerado