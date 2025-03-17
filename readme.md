1º Localizar e reportar as causas dos erros de compilação.

FALTAVA O index.js
E FALTAVA ESTABELECER A CONEXÃO COM O BANCO DE DADOS
Model tarefa.js referenciando aluno com objeto e não como string como no relacionamento de disciplinas
Todos os controllers sem importar os models e exportar os metodos

2º Mostrar os Blocos de Try-catch

3º Fluxo de auth JWT

4º Relacionamentos

Aluno ~ Perfil:
Cada aluno possui um único perfil associado (relação 1:1).

Aluno ~ Tarefa:
Cada tarefa pertence a um aluno, e um aluno pode ter várias tarefas (relação 1:N).

Disciplina ~ Tarefa:
Uma disciplina pode ter várias tarefas associadas e cada tarefa pode estar vinculada a várias disciplinas (relação N:N).

Professor ~ Disciplina:
Um professor pode ter várias disciplinas, enquanto cada disciplina é atribuída a um único professor (relação 1:N).

Professor ~ Turma:
Cada turma possui um único professor, e um professor pode ser responsável por diversas turmas (relação 1:N).

Aluno ~ Turma:
Uma turma contém diversos alunos, e um aluno pode estar matriculado em várias turmas (relação N:N).
