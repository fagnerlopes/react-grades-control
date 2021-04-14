# Grades Control system
A basic IGTI Bootcamp exercise built with ReacJs using Function Components and Hooks.

![]('./view.png')

## Clone repository
```
git clone https://github.com/fagnerlopes/react-grades-control.git
```
## Install backend dependencies
```
cd react-grades-control
cd backend
npm install
```

### Start backend
```
npm start
```

## Install frontend dependencies
```
cd ..
cd frontend
yarn
```

### Start frontend
```
yarn start
```

## Enunciado

Aula 12 - roteiro - ✔ 
=====================

### Back End

1. Estudar código-fonte do backend<br>
   (✔) Demonstrar função 'simulateGrades' de app.js<br>
   (✔) Demonstrar linha 84 de app.js<br>


### Front End

1. Utilizar Projeto Base - yarn <br>
2. Limpar componentes desnecessários do
   projeto base<br>

3. Criar pasta 'api' e arquivo 'apiService.js',
   contendo:
   * Utilização do pacote axios
   * Objeto API_URL
   * Objeto GRADE_VALIDATION

   4. Função assíncrona getAllGrades, que:<br>
     (✔) Traz todas notas da API<br>
     (✔) Transforma dados para facilitar comparações, com valores lowercase<br>
     (✔) Inserir flag isDeleted<br>
     (✔) Verifica notas faltantes<br>
     (✔) Preenche as notas com os registros faltantes com 0 e flag de exclusão lógica 
       isDeleted = true
     (✔) Insere as notas faltantes no
       vetor de notas<br>
     (✔) Ordena por:<br>
       1) type<br>
       2) subject<br>
       3) student<br>

     (✔) Por fim, retorna as notas<br>

   (✔) Função assíncrona insertGrade, que
     recebe uma nota, grava na API com
     axios.post e retorna os dados
     recebidos da API.<br>

   (✔) Função assíncrona updateGrade, que
     recebe uma nota, grava na API com
     axios.put e retorna os dados
     recebidos da API.<br>

   (✔) Função assíncrona deleteGrade, que
     recebe uma nota, grava na API com
     axios.post e retorna os dados
     recebidos da API.<br>

   (✔) Função getValidationFromGradeType,
     que recebe um tipo de nota, busca
     em GRADE_VALIDATION com array.find 
     e retorna os dados de minValue e
     maxValue.<br>

  (✔) exporta as seguintes funções:
    getAllGrades, insertGrade,
    updateGrade, deleteGrade,
    getValidationFromGradeType. <br>
     

#### App.js
------

1. Criar state para:
   (✔) allGrades []<br>
   (✔) selectedGrade {}<br>
   (✔) isModalOpen false<br>
   
2. Criar effect para:
   (✔) Carga de dados da api []<br>

3. Criar título "Controle de notas"


#### Componentes:
------------

1. Spinner a partir do Materialize
   (✔) Testar em App.js<br>
   (✔) Deve ser exibido somente enquanto
     'allGrades' estiver com 
     length === 0<br>

2. GradesControl com as seguintes props:
   (✔) grades => allGrades<br>
   (✔) onDeleteGrade => handleDeleteGrade em App.js<br>
   (✔) onPersistGrade => handlePersistGrade em App.js<br>

   (✔) Visível somente se 'allGrades' estiver
     com length > 0<br>

   (✔) Criar array tableGrades, que será composta
     de diversos arrays agrupados por nome e
     disciplina.<br>
   (✔) Para isso, percorremos grades com forEach
     e controlamos a mudança de subject e student<br>

   (✔) Montamos a tela percorrendo tableGrades,
     gerando n tabelas<br>

   (✔) Isolamos as ações de inserção, edição e 
     exclusão no componente Action<br>

   (✔) Funções importantes: handlePersist e
     handleDelete, que invocarão as props
     correspondentes que chegaram de App.js,
     enviando a nota a ser persistida/excluída<br>

   (✔) Chavear a exibição de ícones de inserção,
     edição e exclusão<br>

3. ModalGrade
   (✔) Visível apenas se "isModalOpen" for true<br>
   (✔) Props:<br>
     (✔) onSave => handlePersistData<br>
     (✔) onClose => handleCloseModal<br>
     (✔) selectedGrade => selectedGrade <br> 

     (✔) State:<br>
       (✔) gradeValue<br>
       (✔) gradeValidation<br>
       (✔) errorMessage<br>

     (✔) Effects:<br>
       (✔) Obter validação de apiService [type]<br>
       (✔) Validação da nota [gradeValue, gradeValidation]<br>
       (✔) EventListener de keydown, para monitorar a tecla "Esc",
         que deve cancelar a persistência e fechar a modal<br>

     (✔) Montar modal a partir da biblioteca react-modal<br>
       (✔) Mostrar nome do aluno, disciplina e tipo de
         avaliação com inputs 'readOnly'<br>
       (✔) Tornar o botão "Salvar" desabilitado caso a nota
         esteja em um intervalo diferente do minValue e
         maxValue, conforme gradeValidation<br>
    
     (✔) Funções importantes:<br>
       (✔) handleKeyDown, para monitorar a tecla "Esc"<br>
       (✔) handleGradeChange, para persistir o valor da nota<br>
       (✔) handleModalClose, para fechar a modal sem persistência<br>
       (✔) handleFormSubmit, para obter os dados e persistir
         a nota em App.js<br>


