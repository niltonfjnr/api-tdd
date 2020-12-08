# Cadastro

> ## Caso de sucesso

01. ✅ Recebe uma requisição do tipo **POST** na rota **/api/signup**
02. ✅ Valida dados obrigatórios **name**, **email**, **password** e **passwordConfirmation**
03. ✅ Valida que **password** e **passwordConfirmation** são iguais
04. ✅ Valida que o campo **email** é um e-mail válido
05. ⬜️ **Valida** se já existe um usuário com o email fornecido
06. ✅ Gera uma senha **criptografada** (essa senha não pode ser descriptografada)
07. ✅ **Cria** uma conta para o usuário com os dados informados, **substituindo** a senha pela senha criptorafada
08. ⬜️ Gera um **token** de acesso a partir do ID do usuário
09. ⬜️ **Atualiza** os dados do usuário com o token de acesso gerado
10. ⬜️ Retorna **200** com o token de acesso e o nome do usuário

> ## Exceções

01. ✅ Retorna erro **404** se a API não existir
02. ✅ Retorna erro **400** se name, email, password ou passwordConfirmation não forem fornecidos pelo client
03. ✅ Retorna erro **400** se password e passwordConfirmation não forem iguais
04. ✅ Retorna erro **400** se o campo email for um e-mail inválido
05. ⬜️ Retorna erro **403** se o email fornecido já estiver em uso
06. ✅ Retorna erro **500** se der erro ao tentar gerar uma senha criptografada
07. ✅ Retorna erro **500** se der erro ao tentar criar a conta do usuário
08. ⬜️ Retorna erro **500** se der erro ao tentar gerar o token de acesso
09. ⬜️ Retorna erro **500** se der erro ao tentar atualizar o usuário com o token de acesso gerado