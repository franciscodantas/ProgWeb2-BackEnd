### **Plano de Testes Unitários para Services**

---

Claro! Vou ajustar os casos de teste para o formato que você indicou:

---

### **Plano de Testes Unitários para Services**

---

#### **1. CreateAdmService**

**Método: `createAdm(data)`**

- **Caso de Teste 1: Criação de um administrador com sucesso**
  - **Descrição**: Verifique se um novo administrador é criado corretamente com um nome e email válidos.
  - **Input**:
    ```json
    {
      "name": "John Doe",
      "email": "john.doe@example.com"
    }
    ```
  - **Resultado Esperado**: O objeto de administrador criado é retornado, contendo os campos `id`, `name`, e `email`.

---

#### **2. DeleteAdmService**

**Método: `deleteAdm(id)`**

- **Caso de Teste 1: Exclusão bem-sucedida de um administrador**
  - **Descrição**: Verifique se o administrador é excluído corretamente quando o `id` é válido.
  - **Input**: `1`
  - **Resultado Esperado**: O administrador deve ser excluído e não deve mais estar no banco de dados.

- **Caso de Teste 2: Tentativa de exclusão de um administrador que não existe**
  - **Descrição**: Simule a exclusão de um administrador inexistente e verifique se a mensagem de erro "Adm not found." é lançada.
  - **Input**: `999`
  - **Resultado Esperado**: Um erro com a mensagem "Adm not found." é lançado.

---

#### **3. GetAdminByIdService**

**Método: `getAdminById(id)`**

- **Caso de Teste 1: Busca bem-sucedida de um administrador por ID**
  - **Descrição**: Verifique se o administrador é retornado corretamente quando o `id` é válido.
  - **Input**: `1`
  - **Resultado Esperado**: O objeto de administrador correspondente ao `id` é retornado.

- **Caso de Teste 2: Tentativa de busca de um administrador que não existe**
  - **Descrição**: Simule a busca de um administrador inexistente e verifique se a mensagem de erro "Adm not found." é lançada.
  - **Input**: `999`
  - **Resultado Esperado**: Um erro com a mensagem "Adm not found." é lançado.

---

#### **4. GetAdminsService**

**Método: `getAdmins()`**

- **Caso de Teste 1: Busca bem-sucedida de todos os administradores**
  - **Descrição**: Verifique se todos os administradores são retornados corretamente.
  - **Input**: N/A
  - **Resultado Esperado**: Uma lista de administradores é retornada.

- **Caso de Teste 2: Nenhum administrador encontrado**
  - **Descrição**: Simule uma situação onde não há administradores no banco de dados e verifique se a função retorna uma lista vazia.
  - **Input**: N/A
  - **Resultado Esperado**: Uma lista vazia é retornada.

---

#### **5. PatchAdmService**

**Método: `patchAdm(id, updates)`**

- **Caso de Teste 1: Atualização parcial bem-sucedida de um administrador - nome**
  - **Descrição**: Verifique se o administrador é atualizado corretamente com os dados fornecidos.
  - **Input**:
    ```json
    {
      "id": 1,
      "name": "Jane Doe"
    }
    ```
  - **Resultado Esperado**: O objeto de administrador atualizado é retornado e o nome é alterado.

- **Caso de Teste 2: Tentativa de atualização parcial de um administrador que não existe**
  - **Descrição**: Simule a atualização de um administrador inexistente e verifique se a mensagem de erro "Adm not found." é lançada.
  - **Input**:
    ```json
    {
      "id": 999,
      "name": "Jane Doe"
    }
    ```
  - **Resultado Esperado**: Um erro com a mensagem "Adm not found." é lançado.

- **Caso de Teste 3: Atualização parcial bem-sucedida de um administrador - email**
  - **Descrição**: Verifique se o administrador é atualizado corretamente com os dados fornecidos.
  - **Input**:
    ```json
    {
      "id": 1,
      "email": "example2@gmail.com"
    }
    ```
  - **Resultado Esperado**: O objeto de administrador atualizado é retornado e o email é alterado.

---

#### **6. UpdateAdmService**

**Método: `updateAdm(id, data)`**

- **Caso de Teste 1: Atualização completa bem-sucedida de um administrador**
  - **Descrição**: Verifique se o administrador é atualizado corretamente com os novos dados fornecidos.
  - **Input**:
    ```typescript
    {
      "id": 1,
      "name": "Jane Doe",
      "email": "jane.doe@example.com"
    }
    ```
  - **Resultado Esperado**: O objeto de administrador atualizado é retornado com todos os novos valores.

- **Caso de Teste 2: Tentativa de atualização completa de um administrador que não existe**
  - **Descrição**: Simule a atualização de um administrador inexistente e verifique se a mensagem de erro "Adm not found." é lançada.
  - **Input**:
    ```json
    {
      "id": 999,
      "name": "Jane Doe",
      "email": "jane.doe@example.com"
    }
    ```
  - **Resultado Esperado**: Um erro com a mensagem "Adm not found." é lançado.


---

#### **1. CreateDisciplineService**

**Método: `createDiscipline(data)`**

- **Caso de Teste 1: Criação bem-sucedida de uma disciplina**
  - **Descrição**: Verifique se uma nova disciplina é criada corretamente com dados válidos.
  - **Input**:
    ```json
    {
      "courseCode": "CS101",
      "curriculumCode": "CUR2024",
      "subjectCode": "SUB123",
      "name": "Introduction to Programming",
      "type": "Core"
    }
    ```
  - **Resultado Esperado**: O objeto de disciplina criado é retornado, contendo os campos `courseCode`, `curriculumCode`, `subjectCode`, `name`, e `type`.

---

#### **2. DeleteDisciplineService**

**Método: `deleteDiscipline(id)`**

- **Caso de Teste 1: Exclusão bem-sucedida de uma disciplina**
  - **Descrição**: Verifique se a disciplina é excluída corretamente quando o ID é válido.
  - **Input**: `1`
  - **Resultado Esperado**: O objeto de disciplina excluída é retornado e não deve mais estar no banco de dados.

- **Caso de Teste 2: Tentativa de exclusão de uma disciplina que não existe**
  - **Descrição**: Simule a exclusão de uma disciplina inexistente e verifique se a mensagem de erro "Discipline not found." é lançada.
  - **Input**: `999`
  - **Resultado Esperado**: Um erro com a mensagem "Discipline not found." é lançado.

---

#### **3. GetAllDisciplineService**

**Método: `getAll()`**

- **Caso de Teste 1: Recuperação bem-sucedida de todas as disciplinas**
  - **Descrição**: Verifique se todas as disciplinas são retornadas corretamente.
  - **Input**: N/A
  - **Resultado Esperado**: Uma lista de disciplinas é retornada com dados de questões incluídos.

- **Caso de Teste 2: Nenhuma disciplina encontrada**
  - **Descrição**: Simule uma situação onde não há disciplinas no banco de dados e verifique se a função retorna uma lista vazia.
  - **Input**: N/A
  - **Resultado Esperado**: Uma lista vazia é retornada.

---

#### **4. GetDisciplineByIdService**

**Método: `getDisciplineById(id)`**

- **Caso de Teste 1: Busca bem-sucedida de uma disciplina por ID**
  - **Descrição**: Verifique se a disciplina é retornada corretamente quando o ID é válido.
  - **Input**: `1`
  - **Resultado Esperado**: O objeto da disciplina correspondente ao ID é retornado com dados de questões incluídos.

- **Caso de Teste 2: Tentativa de busca de uma disciplina que não existe**
  - **Descrição**: Simule a busca de uma disciplina inexistente e verifique se a mensagem de erro "Discipline not found." é lançada.
  - **Input**: `999`
  - **Resultado Esperado**: Um erro com a mensagem "Discipline not found." é lançado.

---

#### **5. PatchDisciplineService**

**Método: `patchDiscipline(id, updates)`**

- **Caso de Teste 1: Atualização parcial bem-sucedida de uma disciplina**
  - **Descrição**: Verifique se a disciplina é atualizada corretamente com os dados fornecidos.
  - **Input**:
    ```json
    {
      "id": 1,
      "name": "Advanced Programming"
    }
    ```
  - **Resultado Esperado**: O objeto de disciplina atualizado é retornado e o nome é alterado.

- **Caso de Teste 2: Tentativa de atualização parcial de uma disciplina que não existe**
  - **Descrição**: Simule a atualização de uma disciplina inexistente e verifique se a mensagem de erro "Discipline not found." é lançada.
  - **Input**:
    ```json
    {
      "id": 999,
      "name": "Advanced Programming"
    }
    ```
  - **Resultado Esperado**: Um erro com a mensagem "Discipline not found." é lançado.

---

#### **6. UpdateDisciplineService**

**Método: `updateDiscipline(id, data)`**

- **Caso de Teste 1: Atualização completa bem-sucedida de uma disciplina**
  - **Descrição**: Verifique se a disciplina é atualizada corretamente com os novos dados fornecidos.
  - **Input**:
    ```json
    {
      "id": 1,
      "courseCode": "CS102",
      "curriculumCode": "CUR2025",
      "subjectCode": "SUB124",
      "name": "Data Structures",
      "type": "Elective"
    }
    ```
  - **Resultado Esperado**: O objeto de disciplina atualizado é retornado com todos os novos valores.

- **Caso de Teste 2: Tentativa de atualização completa de uma disciplina que não existe**
  - **Descrição**: Simule a atualização de uma disciplina inexistente e verifique se a mensagem de erro "Discipline not found." é lançada.
  - **Input**:
    ```json
    {
      "id": 999,
      "courseCode": "CS102",
      "curriculumCode": "CUR2025",
      "subjectCode": "SUB124",
      "name": "Data Structures",
      "type": "Elective"
    }
    ```
  - **Resultado Esperado**: Um erro com a mensagem "Discipline not found." é lançado.

---

#### **1. CreateQuestionService**

**Método: `createQuestion(data: { title: string; content: string; answer: string; image: string; professorId?: number; studentId?: number; disciplineId: number })`**

- **Caso de Teste 1: Criação de uma pergunta com sucesso**
  - **Descrição**: Verifique se uma nova pergunta é criada corretamente com dados válidos.
  - **Input**: 
    ```json
    {
      "title": "Sample Question",
      "content": "This is a sample question content.",
      "answer": "Sample answer.",
      "image": "base64string",
      "studentId": 1,
      "disciplineId": 1
    }
    ```
  - **Resultado Esperado**: O objeto de pergunta criado é retornado, contendo os campos `id`, `title`, `content`, `answer`, `image`, `professorId`, `studentId`, e `disciplineId`.

- **Caso de Teste 2: Tentativa de criação de uma pergunta com título já existente**
  - **Descrição**: Verifique se um erro é lançado quando uma pergunta com o mesmo título já existe.
  - **Input**: 
    ```json
    {
      "title": "Existing Question Title",
      "content": "Content of the new question.",
      "answer": "New answer.",
      "image": "base64string",
      "studentId": 1,
      "disciplineId": 1
    }
    ```
  - **Resultado Esperado**: Um erro com a mensagem "Question with the same title already exists." é lançado.

- **Caso de Teste 3: Tentativa de criação de uma pergunta com disciplina inexistente**
  - **Descrição**: Verifique se um erro é lançado quando a disciplina fornecida não existe.
  - **Input**: 
    ```json
    {
      "title": "Sample Question",
      "content": "Content of the question.",
      "answer": "Answer of the question.",
      "image": "base64string",
      "studentId": 1,
      "disciplineId": 999
    }
    ```
  - **Resultado Esperado**: Um erro com a mensagem "Discipline not found." é lançado.

- **Caso de Teste 4: Tentativa de criação de uma pergunta com autor inexistente (estudante ou professor)**
  - **Descrição**: Verifique se um erro é lançado quando o autor fornecido não existe.
  - **Input**: 
    ```json
    {
      "title": "Sample Question",
      "content": "Content of the question.",
      "answer": "Answer of the question.",
      "image": "base64string",
      "studentId": 999,
      "disciplineId": 1
    }
    ```
  - **Resultado Esperado**: Um erro com a mensagem "Author not found." é lançado.

---

#### **2. DeleteQuestionService**

**Método: `deleteQuestion(id: number)`**

- **Caso de Teste 1: Exclusão bem-sucedida de uma pergunta**
  - **Descrição**: Verifique se a pergunta é excluída corretamente quando o `id` é válido.
  - **Input**: `id = 1`
  - **Resultado Esperado**: O objeto de pergunta excluída é retornado.

- **Caso de Teste 2: Tentativa de exclusão de uma pergunta que não existe**
  - **Descrição**: Simule a exclusão de uma pergunta inexistente e verifique se a mensagem de erro "Question not found." é lançada.
  - **Input**: `id = 999`
  - **Resultado Esperado**: Um erro com a mensagem "Question not found." é lançado.

---

#### **3. GetAllQuestionsService**

**Método: `getAll()`**

- **Caso de Teste 1: Busca bem-sucedida de todas as perguntas**
  - **Descrição**: Verifique se todas as perguntas são retornadas corretamente.
  - **Input**: N/A
  - **Resultado Esperado**: Uma lista de perguntas é retornada, cada uma contendo os detalhes dos relacionamentos (estudante, professor, disciplina).

- **Caso de Teste 2: Nenhuma pergunta cadastrada**
  - **Descrição**: Verifique as perguntas são retornadas corretamente, quando não existe perguntas.
  - **Input**: N/A
  - **Resultado Esperado**: Uma lista vazia é retornada.

---

#### **4. GetQuestionByIdService**

**Método: `getQuestionById(id: number)`**

- **Caso de Teste 1: Busca bem-sucedida de uma pergunta por ID**
  - **Descrição**: Verifique se a pergunta é retornada corretamente quando o `id` é válido.
  - **Input**: `id = 1`
  - **Resultado Esperado**: O objeto de pergunta correspondente ao `id` é retornado, incluindo os detalhes dos relacionamentos.

- **Caso de Teste 2: Tentativa de busca de uma pergunta que não existe**
  - **Descrição**: Simule a busca de uma pergunta inexistente e verifique se a mensagem de erro "Question not found." é lançada.
  - **Input**: `id = 999`
  - **Resultado Esperado**: Um erro com a mensagem "Question not found." é lançado.

---

#### **5. PatchQuestionService**

**Método: `patchQuestion(id: number, updates: any)`**

- **Caso de Teste 1: Atualização parcial bem-sucedida de uma pergunta**
  - **Descrição**: Verifique se a pergunta é atualizada corretamente com os dados fornecidos.
  - **Input**: 
    ```json
    {
      "id": 1,
      "content": "Updated content.",
      "answer": "Updated answer."
    }
    ```
  - **Resultado Esperado**: O objeto de pergunta atualizado é retornado com os campos modificados.

- **Caso de Teste 2: Tentativa de atualização de uma pergunta que não existe**
  - **Descrição**: Simule a atualização de uma pergunta inexistente e verifique se a mensagem de erro "Question not found." é lançada.
  - **Input**: 
    ```json
    {
      "id": 999,
      "content": "Updated content."
    }
    ```
  - **Resultado Esperado**: Um erro com a mensagem "Question not found." é lançado.

---

#### **6. UpdateQuestionService**

**Método: `updateQuestion(id: number, data: any)`**

- **Caso de Teste 1: Atualização completa bem-sucedida de uma pergunta**
  - **Descrição**: Verifique se a pergunta é atualizada corretamente com todos os dados fornecidos, incluindo a conversão de imagem.
  - **Input**: 
    ```json
    {
      "id": 1,
      "title": "Updated Title",
      "content": "Updated content.",
      "answer": "Updated answer.",
      "image": "base64string",
      "studentId": 1,
      "disciplineId": 1
    }
    ```
  - **Resultado Esperado**: O objeto de pergunta atualizado é retornado com todos os campos modificados, incluindo a imagem convertida.

- **Caso de Teste 2: Tentativa de atualização de uma pergunta que não existe**
  - **Descrição**: Simule a atualização de uma pergunta inexistente e verifique se a mensagem de erro "Question not found." é lançada.
  - **Input**: 
    ```json
    {
      "id": 999,
      "title": "Non-existent Question",
      "content": "Content for non-existent question."
    }
    ```
  - **Resultado Esperado**: Um erro com a mensagem "Question not found." é lançado.

---

#### **1. CreateProfessorService**

**Método: `createProfessor(data: { id: number; name: string; identityProviderId: string; code: string; email: string; disciplines: number[] })`**

- **Caso de Teste 1: Criação de um professor com sucesso**
  - **Descrição**: Verifique se um novo professor é criado corretamente com dados válidos.
  - **Input**: 
    ```json
    {
      "id": 1,
      "name": "Dr. John Doe",
      "identityProviderId": "id789",
      "code": "CS201",
      "email": "john.doe@example.com",
      "disciplines": [1, 2]
    }
    ```
  - **Resultado Esperado**: O objeto de professor criado é retornado, contendo os campos `id`, `name`, `identityProviderId`, `code`, `email`, e `disciplines`.

- **Caso de Teste 2: Tentativa de criação de um professor já registrado**
  - **Descrição**: Verifique se um erro é lançado quando um professor com o mesmo `id` já existe.
  - **Input**: 
    ```json
    {
      "id": 1,
      "name": "Dr. John Doe",
      "identityProviderId": "id789",
      "code": "CS201",
      "email": "john.doe@example.com",
      "disciplines": [1, 2]
    }
    ```
  - **Resultado Esperado**: Um erro com a mensagem "Professor already registered" é lançado.

---

#### **2. DeleteProfessorService**

**Método: `deleteProfessor(id: number)`**

- **Caso de Teste 1: Exclusão bem-sucedida de um professor**
  - **Descrição**: Verifique se o professor é excluído corretamente quando o `id` é válido.
  - **Input**: `id = 1`
  - **Resultado Esperado**: O objeto de professor excluído é retornado.

- **Caso de Teste 2: Tentativa de exclusão de um professor que não existe**
  - **Descrição**: Simule a exclusão de um professor inexistente e verifique se a mensagem de erro "Professor not found." é lançada.
  - **Input**: `id = 999`
  - **Resultado Esperado**: Um erro com a mensagem "Professor not found." é lançado.

---

#### **3. GetProfessorByIdService**

**Método: `getProfessorById(id: number)`**

- **Caso de Teste 1: Busca bem-sucedida de um professor por ID**
  - **Descrição**: Verifique se o professor é retornado corretamente quando o `id` é válido.
  - **Input**: `id = 1`
    ```
  - **Resultado Esperado**: O objeto de professor correspondente ao `id` é retornado, incluindo os detalhes dos relacionamentos com `Question` e `disciplines`.

- **Caso de Teste 2: Tentativa de busca de um professor que não existe**
  - **Descrição**: Simule a busca de um professor inexistente e verifique se a mensagem de erro "Professor not found." é lançada.
  - **Input**: `id = 999`
  - **Resultado Esperado**: Um erro com a mensagem "Professor not found." é lançado.

---

#### **4. GetProfessorsService**

**Método: `getAllProfessors()`**

- **Caso de Teste 1: Busca bem-sucedida de todos os professores**
  - **Descrição**: Verifique se todos os professores são retornados corretamente.
  - **Input**: N/A
  - **Resultado Esperado**: Uma lista de professores é retornada, cada um contendo os detalhes dos relacionamentos com `Question` e `disciplines`.

- **Caso de Teste 2: Nenhum professor encontrado**
  - **Descrição**: Verifique se a lista de professores é vazia quando não há professores cadastrados.
  - **Input**: N/A
  - **Resultado Esperado**: Uma lista vazia é retornada.

---

#### **5. PatchProfessorService**

**Método: `patchProfessor(id: number, updates: { name?: string; identityProviderId?: string; code?: string; email?: string; disciplines?: number[] })`**

- **Caso de Teste 1: Atualização parcial bem-sucedida de um professor - nome**
  - **Descrição**: Verifique se o professor é atualizado corretamente com o nome fornecido.
  - **Input**: 
    ```json
    {
      "id": 1,
      "name": "Dr. Jane Doe"
    }
    ```
  - **Resultado Esperado**: O objeto de professor atualizado é retornado com o campo `name` modificado.

- **Caso de Teste 2: Atualização parcial bem-sucedida de um professor - disciplinas**
  - **Descrição**: Verifique se o professor é atualizado corretamente com as novas disciplinas.
  - **Input**: 
    ```json
    {
      "id": 1,
      "disciplines": [3, 4]
    }
    ```
  - **Resultado Esperado**: O objeto de professor atualizado é retornado com o campo `disciplines` modificado.

- **Caso de Teste 3: Tentativa de atualização parcial de um professor que não existe**
  - **Descrição**: Simule a atualização de um professor inexistente e verifique se a mensagem de erro "Professor not found." é lançada.
  - **Input**: 
    ```json
    {
      "id": 999,
      "name": "Dr. Jane Doe"
    }
    ```
  - **Resultado Esperado**: Um erro com a mensagem "Professor not found." é lançado.

---

#### **6. UpdateProfessorService**

**Método: `updateProfessor(id: number, data: { name: string; identityProviderId: string; code: string; email: string; disciplines: number[] })`**

- **Caso de Teste 1: Atualização completa bem-sucedida de um professor**
  - **Descrição**: Verifique se o professor é atualizado corretamente com todos os dados fornecidos.
  - **Input**: 
    ```json
    {
      "id": 1,
      "name": "Dr. Alice Smith",
      "identityProviderId": "id456",
      "code": "CS301",
      "email": "alice.smith@example.com",
      "disciplines": [1, 3]
    }
    ```
  - **Resultado Esperado**: O objeto de professor atualizado é retornado com todos os campos modificados.

- **Caso de Teste 2: Tentativa de atualização completa de um professor que não existe**
  - **Descrição**: Simule a atualização de um professor inexistente e verifique se a mensagem de erro "Professor not found." é lançada.
  - **Input**: 
    ```json
    {
      "id": 999,
      "name": "Dr. Alice Smith",
      "identityProviderId": "id456",
      "code": "CS301",
      "email": "alice.smith@example.com",
      "disciplines": [1, 3]
    }
    ```
  - **Resultado Esperado**: Um erro com a mensagem "Professor not found." é lançado.

---
Aqui está o plano de testes seguindo o padrão fornecido para os serviços de `Student`:

---

#### **1. CreateStudentService**

**Método: `createStudent(data: { id: number; name: string; identityProviderId: string; code: string; email: string; })`**

- **Caso de Teste 1: Criação de um estudante com sucesso**
  - **Descrição**: Verifique se um novo estudante é criado corretamente com dados válidos.
  - **Input**: 
    ```json
    {
      "id": 1,
      "name": "Alice Johnson",
      "identityProviderId": "id123",
      "code": "S123",
      "email": "alice.johnson@example.com"
    }
    ```
  - **Resultado Esperado**: O objeto de estudante criado é retornado, contendo os campos `id`, `name`, `identityProviderId`, `code`, e `email`.

- **Caso de Teste 2: Tentativa de criação de um estudante já registrado**
  - **Descrição**: Verifique se um erro é lançado quando um estudante com o mesmo `id` já existe.
  - **Input**: 
    ```json
    {
      "id": 1,
      "name": "Alice Johnson",
      "identityProviderId": "id123",
      "code": "S123",
      "email": "alice.johnson@example.com"
    }
    ```
  - **Resultado Esperado**: Um erro com a mensagem "Student already registered" é lançado.

---

#### **2. DeleteStudentService**

**Método: `deleteStudent(id: number)`**

- **Caso de Teste 1: Exclusão bem-sucedida de um estudante**
  - **Descrição**: Verifique se o estudante é excluído corretamente quando o `id` é válido.
  - **Input**: `id = 1`
  - **Resultado Esperado**: O objeto de estudante excluído é retornado.

- **Caso de Teste 2: Tentativa de exclusão de um estudante que não existe**
  - **Descrição**: Simule a exclusão de um estudante inexistente e verifique se a mensagem de erro "Student not found." é lançada.
  - **Input**: `id = 999`
  - **Resultado Esperado**: Um erro com a mensagem "Student not found." é lançado.

---

#### **3. GetStudentByIdService**

**Método: `getStudentById(id: number)`**

- **Caso de Teste 1: Busca bem-sucedida de um estudante por ID**
  - **Descrição**: Verifique se o estudante é retornado corretamente quando o `id` é válido.
  - **Input**: `id = 1`
  - **Resultado Esperado**: O objeto de estudante correspondente ao `id` é retornado, incluindo os detalhes dos relacionamentos com `Question`.

- **Caso de Teste 2: Tentativa de busca de um estudante que não existe**
  - **Descrição**: Simule a busca de um estudante inexistente e verifique se a mensagem de erro "Student not found." é lançada.
  - **Input**: `id = 999`
  - **Resultado Esperado**: Um erro com a mensagem "Student not found." é lançado.

---

#### **4. GetStudentService**

**Método: `getAllStudent()`**

- **Caso de Teste 1: Busca bem-sucedida de todos os estudantes**
  - **Descrição**: Verifique se todos os estudantes são retornados corretamente.
  - **Input**: N/A
  - **Resultado Esperado**: Uma lista de estudantes é retornada, cada um contendo os detalhes dos relacionamentos com `Question`.

- **Caso de Teste 2: Nenhum estudante encontrado**
  - **Descrição**: Verifique se a lista de estudantes é vazia quando não há estudantes cadastrados.
  - **Input**: N/A
  - **Resultado Esperado**: Uma lista vazia é retornada.

---

#### **5. PatchStudentService**

**Método: `patchStudent(id: number, data: any)`**

- **Caso de Teste 1: Atualização parcial bem-sucedida de um estudante - nome**
  - **Descrição**: Verifique se o estudante é atualizado corretamente com o nome fornecido.
  - **Input**: 
    ```json
    {
      "id": 1,
      "name": "Alice Smith"
    }
    ```
  - **Resultado Esperado**: O objeto de estudante atualizado é retornado com o campo `name` modificado.

- **Caso de Teste 2: Atualização parcial bem-sucedida de um estudante - email**
  - **Descrição**: Verifique se o estudante é atualizado corretamente com o novo email.
  - **Input**: 
    ```json
    {
      "id": 1,
      "email": "alice.smith@example.com"
    }
    ```
  - **Resultado Esperado**: O objeto de estudante atualizado é retornado com o campo `email` modificado.

- **Caso de Teste 3: Tentativa de atualização parcial de um estudante que não existe**
  - **Descrição**: Simule a atualização de um estudante inexistente e verifique se a mensagem de erro "Student not found." é lançada.
  - **Input**: 
    ```json
    {
      "id": 999,
      "name": "Alice Smith"
    }
    ```
  - **Resultado Esperado**: Um erro com a mensagem "Student not found." é lançado.

---

#### **6. UpdateStudentService**

**Método: `updateStudent(id: number, data: { name: string; identityProviderId: string; code: string; email: string; })`**

- **Caso de Teste 1: Atualização completa bem-sucedida de um estudante**
  - **Descrição**: Verifique se o estudante é atualizado corretamente com todos os dados fornecidos.
  - **Input**: 
    ```json
    {
      "id": 1,
      "name": "Alice Brown",
      "identityProviderId": "id456",
      "code": "S456",
      "email": "alice.brown@example.com"
    }
    ```
  - **Resultado Esperado**: O objeto de estudante atualizado é retornado com todos os campos modificados.

- **Caso de Teste 2: Tentativa de atualização completa de um estudante que não existe**
  - **Descrição**: Simule a atualização de um estudante inexistente e verifique se a mensagem de erro "Student not found." é lançada.
  - **Input**: 
    ```json
    {
      "id": 999,
      "name": "Alice Brown",
      "identityProviderId": "id456",
      "code": "S456",
      "email": "alice.brown@example.com"
    }
    ```
  - **Resultado Esperado**: Um erro com a mensagem "Student not found." é lançado.

---
Para testar a classe `AdmValidation`, o plano de testes pode ser estruturado para verificar a validação de dados para criação e atualização de administradores. Aqui está um exemplo detalhado:

---

#### **1. AdmValidation Class**

**Método: `validate(data: any)`**

- **Caso de Teste 1: Validação bem-sucedida com dados válidos**
  - **Descrição**: Verifique se a validação passa quando dados válidos são fornecidos.
  - **Input**: 
    ```json
    {
      "name": "John Doe",
      "email": "john.doe@example.com"
    }
    ```
  - **Resultado Esperado**: O resultado é `null`, indicando que não há erros de validação.

- **Caso de Teste 2: Falha na validação com `name` ausente**
  - **Descrição**: Verifique se a validação falha e retorna a mensagem de erro correta quando o campo `name` está ausente.
  - **Input**: 
    ```json
    {
      "email": "john.doe@example.com"
    }
    ```
  - **Resultado Esperado**: Uma lista contendo a mensagem "The name is required.".

- **Caso de Teste 3: Falha na validação com `email` inválido**
  - **Descrição**: Verifique se a validação falha e retorna a mensagem de erro correta quando o campo `email` não é um email válido.
  - **Input**: 
    ```json
    {
      "name": "John Doe",
      "email": "john.doe@"
    }
    ```
  - **Resultado Esperado**: Uma lista contendo a mensagem "The email must be a valid email.".

---

**Método: `validatePatch(data: any)`**

- **Caso de Teste 1: Validação bem-sucedida com dados válidos para atualização**
  - **Descrição**: Verifique se a validação passa quando dados válidos para atualização parcial são fornecidos.
  - **Input**: 
    ```json
    {
      "name": "Jane Smith"
    }
    ```
  - **Resultado Esperado**: O resultado é `null`, indicando que não há erros de validação.

- **Caso de Teste 2: Falha na validação com `name` vazio**
  - **Descrição**: Verifique se a validação falha e retorna a mensagem de erro correta quando o campo `name` está vazio.
  - **Input**: 
    ```json
    {
      "name": ""
    }
    ```
  - **Resultado Esperado**: Uma lista contendo a mensagem "The name cannot be empty.".

- **Caso de Teste 3: Falha na validação com `email` inválido durante atualização**
  - **Descrição**: Verifique se a validação falha e retorna a mensagem de erro correta quando o campo `email` não é um email válido durante atualização.
  - **Input**: 
    ```json
    {
      "email": "jane.smith@"
    }
    ```
  - **Resultado Esperado**: Uma lista contendo a mensagem "The email must be a valid email.".

- **Caso de Teste 4: Falha na validação com nenhum campo fornecido**
  - **Descrição**: Verifique se a validação falha e retorna a mensagem de erro correta quando nenhum campo é fornecido para atualização.
  - **Input**: 
    ```json
    {}
    ```
  - **Resultado Esperado**: Uma lista contendo a mensagem "At least one field must be provided for update."

---

#### **1. DisciplineValidation Class**

**Método: `validate(data: any)`**

- **Caso de Teste 1: Validação bem-sucedida com dados válidos**
  - **Descrição**: Verifique se a validação passa quando dados válidos são fornecidos.
  - **Input**: 
    ```json
    {
      "courseCode": "CS101",
      "curriculumCode": "C101",
      "subjectCode": "S101",
      "name": "Introduction to Programming",
      "type": "Core"
    }
    ```
  - **Resultado Esperado**: O resultado é `null`, indicando que não há erros de validação.

- **Caso de Teste 2: Falha na validação com `courseCode` ausente**
  - **Descrição**: Verifique se a validação falha e retorna a mensagem de erro correta quando o campo `courseCode` está ausente.
  - **Input**: 
    ```json
    {
      "curriculumCode": "C101",
      "subjectCode": "S101",
      "name": "Introduction to Programming",
      "type": "Core"
    }
    ```
  - **Resultado Esperado**: Uma lista contendo a mensagem "The course code is required."

- **Caso de Teste 3: Falha na validação com `curriculumCode` vazio**
  - **Descrição**: Verifique se a validação falha e retorna a mensagem de erro correta quando o campo `curriculumCode` está vazio.
  - **Input**: 
    ```json
    {
      "courseCode": "CS101",
      "curriculumCode": "",
      "subjectCode": "S101",
      "name": "Introduction to Programming",
      "type": "Core"
    }
    ```
  - **Resultado Esperado**: Uma lista contendo a mensagem "The curriculum code cannot be empty."

- **Caso de Teste 4: Falha na validação com `subjectCode` não sendo string**
  - **Descrição**: Verifique se a validação falha e retorna a mensagem de erro correta quando o campo `subjectCode` não é uma string.
  - **Input**: 
    ```json
    {
      "courseCode": "CS101",
      "curriculumCode": "C101",
      "subjectCode": 101,
      "name": "Introduction to Programming",
      "type": "Core"
    }
    ```
  - **Resultado Esperado**: Uma lista contendo a mensagem "The subject code must be a string."

- **Caso de Teste 5: Falha na validação com `name` sendo um número**
  - **Descrição**: Verifique se a validação falha e retorna a mensagem de erro correta quando o campo `name` é um número.
  - **Input**: 
    ```json
    {
      "courseCode": "CS101",
      "curriculumCode": "C101",
      "subjectCode": "S101",
      "name": 101,
      "type": "Core"
    }
    ```
  - **Resultado Esperado**: Uma lista contendo a mensagem "The name must be a string."

- **Caso de Teste 6: Falha na validação com `type` vazio**
  - **Descrição**: Verifique se a validação falha e retorna a mensagem de erro correta quando o campo `type` está vazio.
  - **Input**: 
    ```json
    {
      "courseCode": "CS101",
      "curriculumCode": "C101",
      "subjectCode": "S101",
      "name": "Introduction to Programming",
      "type": ""
    }
    ```
  - **Resultado Esperado**: Uma lista contendo a mensagem "The type cannot be empty."

---

**Método: `validatePatch(data: any)`**

- **Caso de Teste 1: Validação bem-sucedida com dados válidos para atualização**
  - **Descrição**: Verifique se a validação passa quando dados válidos para atualização parcial são fornecidos.
  - **Input**: 
    ```json
    {
      "name": "Advanced Programming"
    }
    ```
  - **Resultado Esperado**: O resultado é `null`, indicando que não há erros de validação.

- **Caso de Teste 2: Falha na validação com `courseCode` vazio durante atualização**
  - **Descrição**: Verifique se a validação falha e retorna a mensagem de erro correta quando o campo `courseCode` está vazio durante atualização.
  - **Input**: 
    ```json
    {
      "courseCode": "",
      "name": "Advanced Programming"
    }
    ```
  - **Resultado Esperado**: Uma lista contendo a mensagem "The course code cannot be empty."

- **Caso de Teste 3: Falha na validação com `curriculumCode` não sendo string durante atualização**
  - **Descrição**: Verifique se a validação falha e retorna a mensagem de erro correta quando o campo `curriculumCode` não é uma string durante atualização.
  - **Input**: 
    ```json
    {
      "curriculumCode": 101,
      "name": "Advanced Programming"
    }
    ```
  - **Resultado Esperado**: Uma lista contendo a mensagem "The curriculum code must be a string."

- **Caso de Teste 4: Falha na validação com nenhum campo fornecido para atualização**
  - **Descrição**: Verifique se a validação falha e retorna a mensagem de erro correta quando nenhum campo é fornecido para atualização.
  - **Input**: 
    ```json
    {}
    ```
  - **Resultado Esperado**: Uma lista contendo a mensagem "At least one field must be provided for update."

---

#### **1. ProfessorValidation Class**

**Método: `validate(data: any)`**

- **Caso de Teste 1: Validação bem-sucedida com dados válidos**
  - **Descrição**: Verifique se a validação passa quando todos os dados obrigatórios são fornecidos corretamente.
  - **Input**: 
    ```json
    {
      "id": 1,
      "name": "John Doe",
      "identityProviderId": "provider123",
      "code": "PROF01",
      "email": "johndoe@example.com",
      "disciplines": ["Math", "Science"]
    }
    ```
  - **Resultado Esperado**: O resultado é `null`, indicando que não há erros de validação.

- **Caso de Teste 2: Falha na validação com `id` ausente**
  - **Descrição**: Verifique se a validação falha e retorna a mensagem de erro correta quando o campo `id` está ausente.
  - **Input**: 
    ```json
    {
      "name": "John Doe",
      "identityProviderId": "provider123",
      "code": "PROF01",
      "email": "johndoe@example.com",
      "disciplines": ["Math", "Science"]
    }
    ```
  - **Resultado Esperado**: Uma lista contendo a mensagem "The id is required."

- **Caso de Teste 3: Falha na validação com `name` vazio**
  - **Descrição**: Verifique se a validação falha e retorna a mensagem de erro correta quando o campo `name` está vazio.
  - **Input**: 
    ```json
    {
      "id": 1,
      "name": "",
      "identityProviderId": "provider123",
      "code": "PROF01",
      "email": "johndoe@example.com",
      "disciplines": ["Math", "Science"]
    }
    ```
  - **Resultado Esperado**: Uma lista contendo a mensagem "The name cannot be empty."

- **Caso de Teste 4: Falha na validação com `email` inválido**
  - **Descrição**: Verifique se a validação falha e retorna a mensagem de erro correta quando o campo `email` não é um e-mail válido.
  - **Input**: 
    ```json
    {
      "id": 1,
      "name": "John Doe",
      "identityProviderId": "provider123",
      "code": "PROF01",
      "email": "invalid-email",
      "disciplines": ["Math", "Science"]
    }
    ```
  - **Resultado Esperado**: Uma lista contendo a mensagem "The email must be a valid email."

- **Caso de Teste 5: Falha na validação com `disciplines` não sendo um array**
  - **Descrição**: Verifique se a validação falha e retorna a mensagem de erro correta quando o campo `disciplines` não é um array.
  - **Input**: 
    ```json
    {
      "id": 1,
      "name": "John Doe",
      "identityProviderId": "provider123",
      "code": "PROF01",
      "email": "johndoe@example.com",
      "disciplines": "Math"
    }
    ```
  - **Resultado Esperado**: Uma lista contendo a mensagem "Disciplines must be an array."

- **Caso de Teste 6: Falha na validação com `disciplines` vazio**
  - **Descrição**: Verifique se a validação falha e retorna a mensagem de erro correta quando o campo `disciplines` está vazio.
  - **Input**: 
    ```json
    {
      "id": 1,
      "name": "John Doe",
      "identityProviderId": "provider123",
      "code": "PROF01",
      "email": "johndoe@example.com",
      "disciplines": []
    }
    ```
  - **Resultado Esperado**: Uma lista contendo a mensagem "At least one discipline is required."

---

**Método: `validatePatch(data: any)`**

- **Caso de Teste 1: Validação bem-sucedida com dados válidos para atualização**
  - **Descrição**: Verifique se a validação passa quando dados válidos para atualização parcial são fornecidos.
  - **Input**: 
    ```json
    {
      "name": "Jane Doe",
      "email": "janedoe@example.com"
    }
    ```
  - **Resultado Esperado**: O resultado é `null`, indicando que não há erros de validação.

- **Caso de Teste 2: Falha na validação com `name` vazio durante atualização**
  - **Descrição**: Verifique se a validação falha e retorna a mensagem de erro correta quando o campo `name` está vazio durante atualização.
  - **Input**: 
    ```json
    {
      "name": "",
      "email": "janedoe@example.com"
    }
    ```
  - **Resultado Esperado**: Uma lista contendo a mensagem "The name cannot be empty."

- **Caso de Teste 3: Falha na validação com `email` não sendo um e-mail válido durante atualização**
  - **Descrição**: Verifique se a validação falha e retorna a mensagem de erro correta quando o campo `email` não é um e-mail válido durante atualização.
  - **Input**: 
    ```json
    {
      "name": "Jane Doe",
      "email": "invalid-email"
    }
    ```
  - **Resultado Esperado**: Uma lista contendo a mensagem "The email must be a valid email."

- **Caso de Teste 4: Falha na validação com nenhum campo fornecido para atualização**
  - **Descrição**: Verifique se a validação falha e retorna a mensagem de erro correta quando nenhum campo é fornecido para atualização.
  - **Input**: 
    ```json
    {}
    ```
  - **Resultado Esperado**: Uma lista contendo a mensagem "At least one field must be provided for update."

- **Caso de Teste 5: Falha na validação com `disciplines` vazio durante atualização**
  - **Descrição**: Verifique se a validação falha e retorna a mensagem de erro correta quando o campo `disciplines` está vazio, mesmo que seja opcional.
  - **Input**: 
    ```json
    {
      "disciplines": []
    }
    ```
  - **Resultado Esperado**: Uma lista contendo a mensagem "At least one discipline is required if disciplines are provided."

---

#### **1. QuestionValidation Class**

**Método: `validate(data: any)`**

- **Caso de Teste 1: Validação bem-sucedida com dados válidos**
  - **Descrição**: Verifique se a validação passa quando todos os campos obrigatórios são fornecidos corretamente.
  - **Input**: 
    ```json
    {
      "title": "What is the capital of France?",
      "content": "This is a question about geography.",
      "answer": "Paris",
      "image": "<binary-data>",
      "professorId": 1,
      "studentId": 2,
      "disciplineId": 3
    }
    ```
  - **Resultado Esperado**: O resultado é `null`, indicando que não há erros de validação.

- **Caso de Teste 2: Falha na validação com `title` ausente**
  - **Descrição**: Verifique se a validação falha e retorna a mensagem de erro correta quando o campo `title` está ausente.
  - **Input**: 
    ```json
    {
      "content": "This is a question about geography.",
      "answer": "Paris",
      "disciplineId": 3
    }
    ```
  - **Resultado Esperado**: Uma lista contendo a mensagem "The title is required."

- **Caso de Teste 3: Falha na validação com `content` vazio**
  - **Descrição**: Verifique se a validação falha e retorna a mensagem de erro correta quando o campo `content` está vazio.
  - **Input**: 
    ```json
    {
      "title": "What is the capital of France?",
      "content": "",
      "answer": "Paris",
      "disciplineId": 3
    }
    ```
  - **Resultado Esperado**: Uma lista contendo a mensagem "The content cannot be empty."

- **Caso de Teste 4: Falha na validação com `answer` não fornecido**
  - **Descrição**: Verifique se a validação falha e retorna a mensagem de erro correta quando o campo `answer` não é fornecido.
  - **Input**: 
    ```json
    {
      "title": "What is the capital of France?",
      "content": "This is a question about geography.",
      "disciplineId": 3
    }
    ```
  - **Resultado Esperado**: Uma lista contendo a mensagem "The answer is required."

- **Caso de Teste 5: Falha na validação com `disciplineId` ausente**
  - **Descrição**: Verifique se a validação falha e retorna a mensagem de erro correta quando o campo `disciplineId` está ausente.
  - **Input**: 
    ```json
    {
      "title": "What is the capital of France?",
      "content": "This is a question about geography.",
      "answer": "Paris"
    }
    ```
  - **Resultado Esperado**: Uma lista contendo a mensagem "The discipline ID is required."

---

**Método: `validatePatch(data: any)`**

- **Caso de Teste 1: Validação bem-sucedida com dados válidos para atualização parcial**
  - **Descrição**: Verifique se a validação passa quando dados válidos para atualização parcial são fornecidos.
  - **Input**: 
    ```json
    {
      "title": "Updated Title",
      "answer": "Updated Answer"
    }
    ```
  - **Resultado Esperado**: O resultado é `null`, indicando que não há erros de validação.

- **Caso de Teste 2: Falha na validação com `title` vazio durante atualização**
  - **Descrição**: Verifique se a validação falha e retorna a mensagem de erro correta quando o campo `title` está vazio durante atualização.
  - **Input**: 
    ```json
    {
      "title": "",
      "answer": "Updated Answer"
    }
    ```
  - **Resultado Esperado**: Uma lista contendo a mensagem "The title cannot be empty."

- **Caso de Teste 3: Falha na validação com `content` não fornecido durante atualização**
  - **Descrição**: Verifique se a validação falha e retorna a mensagem de erro correta quando o campo `content` não é fornecido durante atualização.
  - **Input**: 
    ```json
    {
      "title": "Updated Title",
      "answer": "Updated Answer"
    }
    ```
  - **Resultado Esperado**: Uma lista contendo a mensagem "The content cannot be empty."

- **Caso de Teste 4: Falha na validação com nenhum campo fornecido para atualização**
  - **Descrição**: Verifique se a validação falha e retorna a mensagem de erro correta quando nenhum campo é fornecido para atualização.
  - **Input**: 
    ```json
    {}
    ```
  - **Resultado Esperado**: Uma lista contendo a mensagem "At least one field must be provided for update."

---

**Método: `validateUpdate(data: any)`**

- **Caso de Teste 1: Validação bem-sucedida com dados válidos para atualização obrigatória**
  - **Descrição**: Verifique se a validação passa quando todos os campos obrigatórios para atualização são fornecidos corretamente.
  - **Input**: 
    ```json
    {
      "title": "New Question Title",
      "content": "Updated content for the question.",
      "answer": "Updated answer",
      "image": "<binary-data>"
    }
    ```
  - **Resultado Esperado**: O resultado é `null`, indicando que não há erros de validação.

- **Caso de Teste 2: Falha na validação com `image` ausente durante atualização obrigatória**
  - **Descrição**: Verifique se a validação falha e retorna a mensagem de erro correta quando o campo `image` está ausente durante a atualização obrigatória.
  - **Input**: 
    ```json
    {
      "title": "New Question Title",
      "content": "Updated content for the question.",
      "answer": "Updated answer"
    }
    ```
  - **Resultado Esperado**: Uma lista contendo a mensagem "The image must be a binary type."

- **Caso de Teste 3: Falha na validação com `title` vazio durante atualização obrigatória**
  - **Descrição**: Verifique se a validação falha e retorna a mensagem de erro correta quando o campo `title` está vazio durante atualização obrigatória.
  - **Input**: 
    ```json
    {
      "title": "",
      "content": "Updated content for the question.",
      "answer": "Updated answer",
      "image": "<binary-data>"
    }
    ```
  - **Resultado Esperado**: Uma lista contendo a mensagem "The title cannot be empty."

- **Caso de Teste 4: Falha na validação com `content` não fornecido durante atualização obrigatória**
  - **Descrição**: Verifique se a validação falha e retorna a mensagem de erro correta quando o campo `content` não é fornecido durante atualização obrigatória.
  - **Input**: 
    ```json
    {
      "title": "New Question Title",
      "answer": "Updated answer",
      "image": "<binary-data>"
    }
    ```
  - **Resultado Esperado**: Uma lista contendo a mensagem "The content is required."

- **Caso de Teste 5: Falha na validação com `answer` não fornecido durante atualização obrigatória**
  - **Descrição**: Verifique se a validação falha e retorna a mensagem de erro correta quando o campo `answer` não é fornecido durante atualização obrigatória.
  - **Input**: 
    ```json
    {
      "title": "New Question Title",
      "content": "Updated content for the question.",
      "image": "<binary-data>"
    }
    ```
  - **Resultado Esperado**: Uma lista contendo a mensagem "The answer is required."

---

#### **1. StudentValidation Class**

**Método: `validate(data: any)`**

- **Caso de Teste 1: Validação bem-sucedida com dados válidos**
  - **Descrição**: Verifique se a validação passa quando todos os campos obrigatórios são fornecidos corretamente.
  - **Input**: 
    ```json
    {
      "id": 1,
      "name": "John Doe",
      "identityProviderId": "idp123",
      "code": "STU456",
      "email": "john.doe@example.com"
    }
    ```
  - **Resultado Esperado**: O resultado é `null`, indicando que não há erros de validação.

- **Caso de Teste 2: Falha na validação com `id` ausente**
  - **Descrição**: Verifique se a validação falha e retorna a mensagem de erro correta quando o campo `id` está ausente.
  - **Input**: 
    ```json
    {
      "name": "John Doe",
      "identityProviderId": "idp123",
      "code": "STU456",
      "email": "john.doe@example.com"
    }
    ```
  - **Resultado Esperado**: Uma lista contendo a mensagem "The id is required."

- **Caso de Teste 3: Falha na validação com `name` vazio**
  - **Descrição**: Verifique se a validação falha e retorna a mensagem de erro correta quando o campo `name` está vazio.
  - **Input**: 
    ```json
    {
      "id": 1,
      "name": "",
      "identityProviderId": "idp123",
      "code": "STU456",
      "email": "john.doe@example.com"
    }
    ```
  - **Resultado Esperado**: Uma lista contendo a mensagem "The name cannot be empty."

- **Caso de Teste 4: Falha na validação com `email` inválido**
  - **Descrição**: Verifique se a validação falha e retorna a mensagem de erro correta quando o campo `email` não é um e-mail válido.
  - **Input**: 
    ```json
    {
      "id": 1,
      "name": "John Doe",
      "identityProviderId": "idp123",
      "code": "STU456",
      "email": "john.doe@com"
    }
    ```
  - **Resultado Esperado**: Uma lista contendo a mensagem "The email must be a valid email."

- **Caso de Teste 5: Falha na validação com `identityProviderId` ausente**
  - **Descrição**: Verifique se a validação falha e retorna a mensagem de erro correta quando o campo `identityProviderId` está ausente.
  - **Input**: 
    ```json
    {
      "id": 1,
      "name": "John Doe",
      "code": "STU456",
      "email": "john.doe@example.com"
    }
    ```
  - **Resultado Esperado**: Uma lista contendo a mensagem "The identity provider ID is required."

---

**Método: `validatePatch(data: any)`**

- **Caso de Teste 1: Validação bem-sucedida com dados válidos para atualização parcial**
  - **Descrição**: Verifique se a validação passa quando dados válidos para atualização parcial são fornecidos.
  - **Input**: 
    ```json
    {
      "name": "Jane Doe",
      "email": "jane.doe@example.com"
    }
    ```
  - **Resultado Esperado**: O resultado é `null`, indicando que não há erros de validação.

- **Caso de Teste 2: Falha na validação com `name` vazio durante atualização**
  - **Descrição**: Verifique se a validação falha e retorna a mensagem de erro correta quando o campo `name` está vazio durante atualização.
  - **Input**: 
    ```json
    {
      "name": "",
      "email": "jane.doe@example.com"
    }
    ```
  - **Resultado Esperado**: Uma lista contendo a mensagem "The name cannot be empty."

- **Caso de Teste 3: Falha na validação com `identityProviderId` não fornecido durante atualização**
  - **Descrição**: Verifique se a validação falha e retorna a mensagem de erro correta quando o campo `identityProviderId` não é fornecido durante atualização.
  - **Input**: 
    ```json
    {
      "name": "Jane Doe",
      "code": "STU789"
    }
    ```
  - **Resultado Esperado**: Uma lista contendo a mensagem "The identity provider ID cannot be empty."

- **Caso de Teste 4: Falha na validação com nenhum campo fornecido para atualização**
  - **Descrição**: Verifique se a validação falha e retorna a mensagem de erro correta quando nenhum campo é fornecido para atualização.
  - **Input**: 
    ```json
    {}
    ```
  - **Resultado Esperado**: Uma lista contendo a mensagem "At least one field must be provided for update."

---